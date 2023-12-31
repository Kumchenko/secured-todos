import Form from '@/components/Form/Form'
import FormInput from '@/components/Form/FormInput'
import { IdentifyStatus } from '@/interfaces'
import LoginButton from './LoginButton'
import { FormikContextType } from 'formik'

const LoginSectionView = ({
    isIdentified,
    isError,
    formik,
}: {
    isIdentified: IdentifyStatus | null
    isError: boolean
    formik: FormikContextType<any>
}) => {
    return (
        <section>
            <h2 className="text-2xl text-center font-bold mb-2">Введіть дані для входу</h2>
            <Form className="flex flex-col w-80 bg-cyan-900 p-2 gap-3" formik={formik}>
                <FormInput type="text" name="login" label="Логін" id="login" />
                <FormInput
                    className={`${isIdentified !== IdentifyStatus.Ok && 'hidden'}`}
                    type="password"
                    name="password"
                    label="Пароль"
                    id="password"
                />
                <FormInput
                    className={`${isIdentified !== IdentifyStatus.New && 'hidden'}`}
                    type="password"
                    name="newPassword"
                    label="Новий пароль"
                    id="newPassword"
                />
                <FormInput
                    className={`${isIdentified !== IdentifyStatus.New && 'hidden'}`}
                    type="password"
                    name="repeat"
                    label="Повторіть пароль"
                    id="repeat"
                />
                <LoginButton isError={isError} isIdentified={isIdentified} />
            </Form>
        </section>
    )
}

export default LoginSectionView
