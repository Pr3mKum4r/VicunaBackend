import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

interface RequestBody{
    amount: string;
    name: string;
    email: string;
    number: string;
    address: string;
    product: string;
    profile_name: string;
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    let body:RequestBody = JSON.parse(await new Response(req.body).text());
    try {
        var instance = new Razorpay({ key_id: process.env.KEY_ID || "", key_secret: process.env.KEY_SECRET || "" })
        var options = {
            "amount": parseInt(body.amount) * 100,
            "currency": "INR",
            "receipt": "TXN" + Date.now(),
            "notes": {
                key1: body.name,
                key2: body.email,
                key3: body.number,
                key4: body.address,
                key5: body.product,
                key6: body.profile_name,
                key7: body.amount,
            }
        };
        
        const order = await instance.orders.create(options);
        if (order) {
            return NextResponse.json(order.id); // Use res.json to send back the order ID
        } else {
            // Handle the case where order is not created
            return NextResponse.json({ message: "Order creation failed" });
        }
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Something went wrong" });
    }
}


