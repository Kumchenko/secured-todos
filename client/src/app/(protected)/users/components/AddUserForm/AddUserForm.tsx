'use client'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { useAddUserMutation } from '@/services/user'
import { useFormik } from 'formik'

const initialValues = {
    login: '',
    count: 3,
    restricted: false,
}

const AddUserForm = ({ className }: { className?: string }) => {
    const [addUser] = useAddUserMutation()
    const formik = useFormik({
        initialValues,
        onSubmit: ({ login }) => addUser(login),
    })
    return (
        <Form className={`flex flex-col w-80 gap-2 ${className}`} formik={formik}>
            <FormInput label="Логін" type="text" name="login" id="login" placeholder="Kumchenko" />
            <button className="bg-emerald-400 p-1" type="submit">
                Додати
            </button>
        </Form>
    )
}

export default AddUserForm
