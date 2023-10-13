import { Post, PostUpdateArgs } from '@/interfaces'
import api from './'

const postApi = api.injectEndpoints({
    endpoints: build => ({
        getPosts: build.query<Post[], void>({
            query: () => ({
                url: '/post/all',
            }),
            providesTags: res =>
                res
                    ? [...res.map(post => ({ type: 'Post' as const, id: post.id })), { type: 'Post', id: 'LIST' }]
                    : [{ type: 'Post', id: 'LIST' }],
        }),
        addPost: build.mutation<Post, string>({
            query: text => ({
                url: '/post',
                method: 'POST',
                data: { text },
            }),
            invalidatesTags: (res, err) =>
                res
                    ? [
                          { type: 'Post', id: res.id },
                          { type: 'Post', id: 'LIST' },
                      ]
                    : [{ type: 'Post', id: 'LIST' }],
        }),
        deletePost: build.mutation<Post, number>({
            query: id => ({
                url: '/post',
                method: 'DELETE',
                params: { id },
            }),
            invalidatesTags: res =>
                res
                    ? [
                          { type: 'Post' as const, id: res.id },
                          { type: 'Post', id: 'LIST' },
                      ]
                    : [{ type: 'Post', id: 'LIST' }],
        }),
        updatePost: build.mutation<Post, PostUpdateArgs>({
            query: ({ text, id }) => ({
                url: '/post',
                method: 'PATCH',
                data: { text },
                params: { id },
            }),
            invalidatesTags: res => (res ? [{ type: 'Post', id: res.id }] : [{ type: 'Post', id: 'LIST' }]),
        }),
    }),
})

export const { useGetPostsQuery, useAddPostMutation, useDeletePostMutation, useUpdatePostMutation } = postApi
