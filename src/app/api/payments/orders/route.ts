import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        var instance = new Razorpay({ key_id: process.env.KEY_ID || "", key_secret: process.env.KEY_SECRET || "" })
        var options = {
            "amount": parseInt(req.body.amount) * 100,
            "currency": "INR",
            "receipt": "TXN" + Date.now(),
            "notes": {
                key1: req.body.name,
                key2: req.body.email,
                key3: req.body.number,
                key4: req.body.address,
                key5: req.body.product,
                key6: req.body.profile_name,
                key7: req.body.amount,
            }
        };

        console.log(req.body.amount);
        
        const order = await instance.orders.create(options);
        if (order) {
            res.json(order.id); // Use res.json to send back the order ID
        } else {
            // Handle the case where order is not created
            res.status(500).json({ message: "Order creation failed" });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong" });
    }
}


