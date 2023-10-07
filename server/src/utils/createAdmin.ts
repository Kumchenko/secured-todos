import { prisma } from '../lib/prisma'
import { defaultAdminParams } from '../configs'

export const createAdmin = async () => {
    const admin = await prisma.user.findUnique({ where: { login: 'ADMIN' } })
    if (!admin) {
        await prisma.user.create({ data: defaultAdminParams })
    }
}
