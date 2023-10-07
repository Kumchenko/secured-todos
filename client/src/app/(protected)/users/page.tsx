import { Role } from '@/interfaces'
import AddUserSection from './components/AddUserSection/AddUserSection'
import UsersSection from './components/UsersSection/UsersSection'

function MainPage() {
    return (
        <div className="flex flex-col gap-12">
            <AddUserSection />
            <UsersSection />
        </div>
    )
}

export default MainPage
