'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ChangeUserPasswordArgs, IdentifyStatus, LoginUserArgs } from '@/interfaces'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import LoginSectionView from './LoginSectionView'
import { activateUser, identifyUser, loginUser } from '@/services/user'
import { cryptPassword } from '@/utils/cryptPassword'

const LoginSection = () => {
    const [isIdentified, setIsIdentified] = useState<IdentifyStatus | null>(null)
    const [isError, setIsError] = useState(false)
    const router = useRouter()

    const formik = useFormik({
        initialValues,
        validationSchema: getValidationSchema(isIdentified),
        onSubmit: values => handleAuth(values),
        enableReinitialize: true,
    })

    const { login, password, newPassword, repeat } = formik.values

    useEffect(() => {
        if (isIdentified) {
            setIsIdentified(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login])

    useEffect(() => {
        if (isError) {
            setIsError(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [login, password, newPassword, repeat])

    const handleAuth = useCallback(
        ({ login, password, newPassword, repeat }: LoginUserArgs & ChangeUserPasswordArgs) => {
            async function asyncHandle() {
                try {
                    switch (isIdentified) {
                        case IdentifyStatus.Ok: {
                            const hash = cryptPassword(login, password)
                            const user = await loginUser({ login, password: hash })
                            router.push('/')
                            break
                        }
                        case IdentifyStatus.New: {
                            const user = await activateUser({ login, newPassword, repeat })
                            router.push('/')
                            break
                        }
                        case null: {
                            const res = await identifyUser(login)
                            setIsIdentified(res.data)
                            break
                        }
                        default: {
                            const _exhaustiveCheck: never = isIdentified
                            break
                        }
                    }
                } catch {
                    setIsError(true)
                }
            }
            asyncHandle()
        },
        [isIdentified, router],
    )

    return <LoginSectionView isIdentified={isIdentified} isError={isError} formik={formik} />
}

const initialValues = {
    login: '',
    password: '',
    newPassword: '',
    repeat: '',
}

const getValidationSchema = (isIdentified: IdentifyStatus | null) => {
    const schema = Yup.object({
        login: Yup.string().required('Обовʼязково'),
        password: Yup.string().required('Обовʼязково'),
        newPassword: Yup.string().required('Обовʼязково'),
        repeat: Yup.string()
            .required('Обовʼязково')
            .oneOf([Yup.ref('newPassword')], 'Паролі не співпадають'),
    })

    switch (isIdentified) {
        case IdentifyStatus.Ok: {
            return schema.omit(['newPassword', 'repeat'])
        }
        case IdentifyStatus.New: {
            return schema.omit(['password'])
        }
        case null: {
            return schema.omit(['password', 'newPassword', 'repeat'])
        }
        default: {
            const _exhaustiveCheck: never = isIdentified
            return schema
        }
    }
}

export default LoginSection
