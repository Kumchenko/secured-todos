import { Role } from '@/interfaces'
import AddPostSection from './components/AddPostSection/AddPostSection'
import PostsSection from './components/PostsSection/PostsSection'

const PostsPage = () => {
    return (
        <div className="flex flex-col gap-6">
            <AddPostSection />
            <PostsSection />
        </div>
    )
}

export default PostsPage
