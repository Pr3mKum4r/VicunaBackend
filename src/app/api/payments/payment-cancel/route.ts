import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const failureUrl = 'http://localhost:3000/failure';
    try {
        return res.redirect(failureUrl);
    } catch (error) {
        console.log(error);
    }
}
