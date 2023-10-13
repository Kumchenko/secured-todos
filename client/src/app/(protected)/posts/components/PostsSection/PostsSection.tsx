'use client'
import { useGetPostsQuery } from '@/services/post'
import PostsList from '../PostsView/PostsList'
import AddPostForm from '../AddPostForm/AddPostForm'
import { pollingInterval } from '@/constants'

const PostsSection = () => {
    const {
        data: posts,
        isError,
        isLoading,
    } = useGetPostsQuery(undefined, {
        pollingInterval,
    })
    return (
        <section className="flex flex-col items-center gap-2">
            <h2 className="text-2xl text-center font-semibold">Стрічка постів</h2>
            <p className="text-center">Примітка: для редагування допису, натисніть на його зміст</p>
            {isError ? (
                <span className="text-xl text-center text-red-500 font-semibold">Помилка завантаження!</span>
            ) : null}
            {isLoading ? <span className="text-xl text-center font-semibold">Завантаження...</span> : null}
            {posts ? <PostsList posts={posts} /> : null}
        </section>
    )
}

export default PostsSection
