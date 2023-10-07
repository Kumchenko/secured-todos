import { FormikContextType } from 'formik'
import { HTMLInputTypeAttribute } from 'react'

export type FormProps = React.PropsWithChildren<{
    formik: FormikContextType<any>
    className?: string
}>

export type FormFieldProps = {
    label?: string
    name: string
    id: string
    className?: string
    type: HTMLInputTypeAttribute
    placeholder?: string
    pattern?: string
    autoComplete?: string
    required?: boolean
    disabled?: boolean
}
