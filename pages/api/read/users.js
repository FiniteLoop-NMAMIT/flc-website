// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../libs/prisma"

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.status(405).send({ message: 'Only GET requests allowed' })
        return
    }
    try {
        const session = await unstable_getServerSession(req, res, authOptions)
        if (session.user) {
            const { q } = req.query
            if (q) {
                const users = await prisma.user.findMany({
                    where: {
                        OR: [
                            {
                                email: {
                                    contains: q,
                                    mode: 'insensitive',
                                },
                            },
                            {
                                name: {
                                    contains: q,
                                    mode: 'insensitive',
                                }
                            },
                        ],
                    },
                    include: {
                        Team: true,
                    }
                })
                res.status(200).json({ message: 'Users', data: users })
                return
            }
            const users = await prisma.user.findMany()
            res.status(200).json({ message: 'Users', data: users })
        }
        res.status(401).json({ message: 'No Permission' })
        return
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error })
        return
    }
}
