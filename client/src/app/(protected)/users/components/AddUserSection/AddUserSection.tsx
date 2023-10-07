import AddUserForm from '../AddUserForm/AddUserForm'

const AddUserSection = () => {
    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl text-center font-semibold">Додати нового користувача</h2>
            <AddUserForm />
        </section>
    )
}

export default AddUserSection
