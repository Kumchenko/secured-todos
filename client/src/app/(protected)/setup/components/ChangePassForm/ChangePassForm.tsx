'use client'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { openModal } from '@/services/modal'
import { useChangeUserPasswordMutation } from '@/services/user'
import { useAppDispatch } from '@/store'
import { useFormik } from 'formik'
import { useEffect } from 'react'

const initialValues = {
    password: '',
    newPassword: '',
    repeat: '',
}

const ChangePassForm = ({ className }: { className?: string }) => {
    const [changePass, { isSuccess }] = useChangeUserPasswordMutation()
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues,
        onSubmit: (values, action) => {
            changePass(values)
            action.resetForm()
        },
    })

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                openModal({
                    description: 'Пароль успішно змінено!',
                    timeout: 3000,
                }),
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <Form className={`flex flex-col w-80 gap-2 ${className}`} formik={formik}>
            <FormInput label="Старий пароль" type="password" name="password" id="password" placeholder="****" />
            <FormInput label="Новий пароль" type="password" name="newPassword" id="newPassword" />
            <FormInput label="Повторіть пароль" type="password" name="repeat" id="repeat" />
            <button className="bg-emerald-400 p-1" type="submit">
                Змінити
            </button>
        </Form>
    )
}

export default ChangePassForm
