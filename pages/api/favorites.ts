import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import without from 'lodash'
import prismadb from '../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        const { currentUser } = await serverAuth(req);
        const favoriteMovies = await prismadb.user.findMany({
            where: {
                id: { in: currentUser?.favoriteIds, }
            }
        })
        return res.status(200).json(favoriteMovies);
    }
    catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}