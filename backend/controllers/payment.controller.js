import Coupon from "../models/coupon.model.js";
import { stripe } from "../libs/stripe.js";
import Order from "../models/order.model.js";

export const createCheckoutSession = async (req, res) => {
    try {
        const { products, couponCode } = req.body;
        if (!Array.isArray(products) || products.length === 0) {
            return res
                .status(400)
                .json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;
        const lineItems = products.map((p) => {
            const amount = Math.round(p.price); // Đã là VND, không nhân với 100
            totalAmount += amount * p.quantity;

            return {
                price_data: {
                    currency: "vnd",
                    product_data: {
                        name: p.name,
                        images: [p.image],
                    },
                    unit_amount: amount, // Không cần nhân 100
                },
                quantity: p.quantity || 1,
            };
        });

        let coupon = null;
        let discountAmount = 0;

        if (couponCode) {
            coupon = await Coupon.findOne({
                code: couponCode,
                userId: req.user._id,
                isActive: true,
            });

            if (coupon) {
                discountAmount = Math.round(
                    (totalAmount * coupon.discountPercentage) / 100
                );
                discountAmount = Math.min(discountAmount, totalAmount); // Không cho giảm quá tổng tiền
                totalAmount -= discountAmount;
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            discounts: coupon
                ? [
                      {
                          coupon: await createStripeCoupon(
                              coupon.discountPercentage
                          ),
                      },
                  ]
                : [],
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
                products: JSON.stringify(
                    products.map((p) => ({
                        id: p._id,
                        quantity: p.quantity,
                        price: p.price,
                    }))
                ),
            },
        });

        // Nếu tổng tiền > 20,000 VND, tạo mã giảm giá mới
        if (totalAmount > 20000) {
            await createNewCoupon(req.user._id);
        }

        return res
            .status(200)
            .json({ id: session.id, totalAmount: totalAmount });
    } catch (error) {
        console.log("error in createCheckoutSession", error.message);
        return res
            .status(500)
            .json({ message: "Server error something", error: error.message });
    }
};

export const checkSuccess = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            if (session.metadata.couponCode) {
                await Coupon.findOneAndUpdate(
                    {
                        code: session.metadata.couponCode,
                        userId: session.metadata.userId,
                    },
                    {
                        isActive: false,
                    }
                );
            }

            // Kiểm tra metadata
            if (!session.metadata || !session.metadata.products) {
                throw new Error("Metadata or products is missing");
            }

            let products;
            try {
                products = JSON.parse(session.metadata.products);
            } catch (err) {
                throw new Error("Invalid products metadata format");
            }

            // Tạo đơn hàng
            const newOrder = new Order({
                user: session.metadata.userId,
                products: products.map((p) => ({
                    product: p.id,
                    quantity: p.quantity,
                    price: p.price,
                })),
                totalAmount: session.amount_total, // Đã đúng đơn vị VND
                stripeSessionId: sessionId,
            });

            await newOrder.save();

            return res.status(200).json({
                success: true,
                message:
                    "Payment successful, order created, and coupon deactivated if used",
                orderId: newOrder._id,
            });
        }
    } catch (error) {
        console.log("error in checkSuccess", error.message);
        return res
            .status(500)
            .json({ message: "Server error something", error: error.message });
    }
};

// support func
const createStripeCoupon = async (discountPercentage) => {
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    });

    return coupon.id;
};

const createNewCoupon = async (userId) => {
    await Coupon.findOneAndDelete({ userId });
    const newCoupon = new Coupon({
        code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        discountPercentage: 10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        userId: userId,
    });

    await newCoupon.save();
    return newCoupon;
};
