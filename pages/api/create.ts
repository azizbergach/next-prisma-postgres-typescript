import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";



const create = async (req: NextApiRequest,res: NextApiResponse) => {
  if(req.method !== "POST"){
    res.status(405).json({message : "Methood error !"})
  }
    try {
      const { user } = req.body;
      const Users = await prisma.users.create({
        data: user
      })
      res.json(Users)
    } 
    catch (error) {
      return res.json(error.message)
    }
  return res.json({message : "the method is not supported"})
}

export default create;