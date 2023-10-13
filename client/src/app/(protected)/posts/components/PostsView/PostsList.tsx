import { Post } from '@/interfaces'
import PostItem from './PostItem'

const PostsList = ({ posts }: { posts: Post[] }) => {
    return (
        <ul className="w-[440px] flex flex-col gap-6">
            {posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    )
}

export default PostsList
