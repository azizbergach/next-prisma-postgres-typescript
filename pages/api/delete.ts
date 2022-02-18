import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";



export default async function Delete(req: NextApiRequest,res:NextApiResponse) {

    if(req.method !== "POST"){
        res.json({message : "the method is defferent to POST"})
    }

    try {
        const { id } = req.body;
        const removedUser = await prisma.users.delete({
            where: {id}
        })
        res.json(removedUser)
    } catch (error) {
        res.json(error.message)
    }
    
}