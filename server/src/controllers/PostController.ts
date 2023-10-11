import { Request, Response, NextFunction } from 'express'
import { prisma } from '../lib/prisma'
import { UserAccessResponse } from '../interfaces/user'
import {
    PostCreateRequest,
    PostFindRequest,
    PostFindResponse,
    PostUpdateRequest,
    PostUpdateResponse,
    PostsGetRequest,
} from '../interfaces/post'
import ApiError from '../errors/ApiError'

class PostController {
    async find(req: PostFindRequest, res: PostFindResponse, next: NextFunction) {
        try {
            const id = parseInt(req.query.id)
            if (!id) {
                throw ApiError.badRequest('ID не розпізнано!')
            }

            const post = await prisma.post.findUnique({
                where: {
                    id,
                },
            })

            if (!post) {
                throw ApiError.badRequest('Пост не знайдено!')
            }

            res.locals.post = post
            next()
        } catch (e) {
            next(e)
        }
    }
    async create(req: PostCreateRequest, res: UserAccessResponse, next: NextFunction) {
        try {
            const { text } = req.body
            const {
                user: { login },
            } = res.locals

            const post = await prisma.post.create({
                data: {
                    login,
                    text,
                },
            })

            res.json(post)
        } catch (e) {
            next(e)
        }
    }
    async delete(req: Request, res: PostFindResponse, next: NextFunction) {
        try {
            const { id } = res.locals.post
            const post = await prisma.post.delete({
                where: { id },
            })

            res.json(post)
        } catch (e) {
            next(e)
        }
    }
    async update(req: PostUpdateRequest, res: PostUpdateResponse, next: NextFunction) {
        try {
            const { id } = res.locals.post
            const { text } = req.body

            const post = await prisma.post.update({
                data: {
                    text,
                    updated: new Date(),
                },
                where: {
                    id,
                },
            })

            res.json(post)
        } catch (e) {
            next(e)
        }
    }
    async getMany(req: PostsGetRequest, res: Response, next: NextFunction) {
        try {
            const posts = await prisma.post.findMany({
                orderBy: {
                    id: 'desc',
                },
            })

            res.json(posts)
        } catch (e) {
            next(e)
        }
    }
}

export default new PostController()
