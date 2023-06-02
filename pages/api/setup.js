import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(501).end()
    }
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ message: 'Not logged in' })

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    })
    if (!user) return res.status(401).json({ message: 'User not found' })

    await prisma.user.update({
        where: { id: user.id },
        data: {
            name: req.body.name,
        },
    })
    res.end()
    return
}