import { FormikProvider } from 'formik'
import { FormProps } from './interfaces'
import { memo } from 'react'

const Form = ({ children, className, formik }: FormProps) => {
    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className={className}>
                {children}
            </form>
        </FormikProvider>
    )
}

export default memo(Form)
