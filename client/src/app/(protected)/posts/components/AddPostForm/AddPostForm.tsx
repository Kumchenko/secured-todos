'use client'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { useAddPostMutation } from '@/services/post'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    text: '',
}

const validationSchema = Yup.object({
    text: Yup.string().required('Обовʼязково!'),
})

const AddPostForm = ({ className }: { className?: string }) => {
    const [addPost] = useAddPostMutation()
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, action) => {
            addPost(values.text)
            action.resetForm()
        },
    })
    return (
        <Form className={`flex flex-col w-80 mx-auto gap-2 ${className}`} formik={formik}>
            <FormInput label="Текст посту" type="text" name="text" id="text" placeholder="Щось цікаве :)" />
            <button className="bg-emerald-400 p-1" type="submit">
                Змінити
            </button>
        </Form>
    )
}

export default AddPostForm
