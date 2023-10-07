import ChangePassForm from '../ChangePassForm/ChangePassForm'

const ChangePassSection = () => {
    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl text-center font-semibold">Зміна паролю</h2>
            <ChangePassForm />
        </section>
    )
}

export default ChangePassSection
