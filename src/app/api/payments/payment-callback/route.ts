import { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const successUrl = 'http://localhost:3000/success';
    const { razorpay_signature, razorpay_payment_id, razorpay_order_id } = req.body
    console.log(req.body)
    try {
        const string = `${razorpay_order_id}|${razorpay_payment_id}`;

        const generated_signature = crypto
            .createHmac('sha256', process.env.KEY_SECRET || "")
            .update(string)
            .digest('hex');

        if (generated_signature == razorpay_signature) {
            console.log('payment successfull')
            return res.redirect(successUrl);
        }
    } catch (error) {
        console.log(error);
    }
}
