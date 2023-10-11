import { Post } from '@prisma/client'
import { Request, Response } from 'express'
import { UserData } from './user'

export type PostIdData = {
    id: string
}

export type PostData = {
    post: Post
}

export type CreatePostData = {
    text: string
}

export type PostFindRequest = Request<{}, {}, {}, PostIdData>
export type PostFindResponse = Response<{}, PostData & UserData>
export type PostCreateRequest = Request<{}, {}, CreatePostData>
export type PostsGetRequest = Request
export type PostUpdateRequest = Request<{}, {}, CreatePostData>
export type PostUpdateResponse = Response<{}, PostData & UserData>
