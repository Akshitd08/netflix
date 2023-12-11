import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { without } from 'lodash'
import prismadb from '../../../lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if(req.method !== 'GET') return res.status(405).end();
    try{
        await serverAuth(req);
        const {movieId} = req.query;
        if(typeof movieId !== 'string') throw new Error('Invalid Id');
        if(!movieId) throw new Error('Invalid Id');
        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId,
            }
        });
        if(!movie) throw new Error('Invalid Id');
        return res.status(200).json(movie);

   }
    catch (e) {
        console.log(e);
        return res.status(500).end();
    }
}
