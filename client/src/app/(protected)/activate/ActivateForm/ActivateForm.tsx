'use client'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { ModalType } from '@/constants'
import { openModal } from '@/services/modal'
import { useAppDispatch } from '@/store'
import { isKeyValid } from '@/utils/isKeyValid'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

const ActivateForm = ({ className }: { className?: string }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            key: '',
        },
        onSubmit: ({ key }, action) => {
            localStorage.setItem('key', key)
            if (isKeyValid(localStorage.getItem('key'))) {
                dispatch(
                    openModal({
                        description: 'Програму активовано',
                    }),
                )
            } else {
                dispatch(
                    openModal({
                        type: ModalType.Error,
                        description: 'Ключ невірний!',
                    }),
                )
            }
            action.resetForm()
        },
    })

    const isValid = typeof window !== 'undefined' ? isKeyValid(window.localStorage.getItem('key')) : false

    return (
        <Form className={`flex flex-col w-80 gap-2 ${className}`} formik={formik}>
            <FormInput label="Код" name="key" id="key" type="text" />
            <button disabled={isValid} className="bg-emerald-400 p-1" type="submit">
                {isValid ? 'Активовано' : 'Активувати'}
            </button>
        </Form>
    )
}

export default ActivateForm
