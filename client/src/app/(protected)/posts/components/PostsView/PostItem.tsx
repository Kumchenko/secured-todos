import { Post } from '@/interfaces'
import { memo, useState } from 'react'
import { TrashIcon, DocumentCheckIcon } from '@heroicons/react/20/solid'
import { useDeletePostMutation, useUpdatePostMutation } from '@/services/post'
import { useFormik } from 'formik'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'

const PostItem = ({ post: { id, login, text, updated, created } }: { post: Post }) => {
    const [deletePost] = useDeletePostMutation()
    const [updatePost] = useUpdatePostMutation()
    const [editMode, setEditMode] = useState(false)
    const formik = useFormik({
        initialValues: {
            text,
        },
        onSubmit: (values, action) => {
            if (values.text !== text) {
                updatePost({ id, text: values.text })
            }
            setEditMode(false)
            action.resetForm()
        },
        enableReinitialize: true,
    })
    const date = new Date(updated || created)

    return (
        <li className="grid grid-cols-[1fr_auto_auto] items-center justify-items-end bg-cyan-900 p-3 gap-2">
            <span className="text-sm justify-self-start font-semibold text-cyan-100">
                #{id} {login}
            </span>
            <span className="text-right text-cyan-100 font-semibold text-sm">
                {updated ? 'Оновлено' : 'Створено'} – {date.toLocaleString()}
            </span>
            <button onClick={() => deletePost(id)} className="w-6 h-6 flex items-center justify-center">
                <TrashIcon className="w-4 h-4 text-red-500" />
            </button>
            <div className="w-full text-lg col-span-3 justify-self-start">
                <p className={`${editMode ? 'hidden' : 'block'}`} onClick={() => setEditMode(true)}>
                    {text}
                </p>
                <Form className={`w-full gap-2 ${editMode ? 'flex' : 'hidden'}`} formik={formik}>
                    <FormInput type="text" name="text" id="text" className="w-full" />
                    <button type="submit" className="bg-emerald-400 px-4">
                        <DocumentCheckIcon className="w-5 h-5" />
                    </button>
                </Form>
            </div>
        </li>
    )
}

export default memo(PostItem)
