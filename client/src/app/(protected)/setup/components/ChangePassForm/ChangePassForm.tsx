'use client'
import CaptchaForm from '@/components/Captcha/CaptchaForm'
import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { ModalType } from '@/constants'
import { AxiosBaseQueryError } from '@/interfaces'
import { openModal } from '@/services/modal'
import { useChangeUserPasswordMutation } from '@/services/user'
import { useAppDispatch } from '@/store'
import { useFormik } from 'formik'
import { useCallback, useEffect } from 'react'
import * as Yup from 'yup'

const initialValues = {
    password: '',
    newPassword: '',
    repeat: '',
    isCaptchaPassed: false,
}

const validationSchema = Yup.object({
    password: Yup.string(),
    newPassword: Yup.string().required('Обовʼязково'),
    repeat: Yup.string()
        .required('Обовʼязково')
        .oneOf([Yup.ref('newPassword')], 'Паролі не співпадають'),
})

const ChangePassForm = ({ className }: { className?: string }) => {
    const [changePass] = useChangeUserPasswordMutation()
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, action) => {
            changePass(values)
                .unwrap()
                .then(() =>
                    dispatch(
                        openModal({
                            description: 'Пароль успішно змінено!',
                            timeout: 3000,
                        }),
                    ),
                )
                .finally(() => action.resetForm())
        },
    })

    const { setFieldValue, setFieldTouched } = formik

    const onSubmit = useCallback((isValid: boolean) => setFieldValue('isCaptchaPassed', isValid), [])
    const onTouch = useCallback(() => setFieldTouched('isCaptchaPassed', true), [])

    return (
        <Form className={`flex flex-col w-80 gap-2 ${className}`} formik={formik}>
            <FormInput label="Старий пароль" type="password" name="password" id="password" placeholder="****" />
            <FormInput label="Новий пароль" type="password" name="newPassword" id="newPassword" />
            <FormInput label="Повторіть пароль" type="password" name="repeat" id="repeat" />
            <CaptchaForm
                key={`${formik.isSubmitting}`}
                className="self-center"
                setTouched={onTouch}
                setResult={onSubmit}
                error={formik.errors.isCaptchaPassed}
            />
            <button className="bg-emerald-400 p-1" type="submit">
                Змінити
            </button>
        </Form>
    )
}

export default ChangePassForm
