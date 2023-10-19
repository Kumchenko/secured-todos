import ActivateForm from '../ActivateForm/ActivateForm'

const ActivateSection = () => {
    return (
        <section className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl text-center font-semibold">Активація програми</h2>
            <ActivateForm />
        </section>
    )
}

export default ActivateSection
