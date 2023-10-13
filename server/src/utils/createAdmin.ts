import { prisma } from '../lib/prisma'
import { defaultAdminParams, defaultModerParams } from '../configs'

export const createAdmin = async () => {
    const admin = await prisma.user.findUnique({ where: { login: 'ADMIN' } })
    const moder = await prisma.user.findUnique({ where: { login: 'MODERATOR' } })
    if (!admin) {
        await prisma.user.create({ data: defaultAdminParams })
        console.log('Admin created')
    }
    if (!moder) {
        await prisma.user.create({ data: defaultModerParams })
        console.log('Moderator created')
    }
}
