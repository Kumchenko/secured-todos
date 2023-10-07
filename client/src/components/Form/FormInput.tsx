import { useFormikContext } from 'formik'
import { memo } from 'react'
import { FormFieldProps } from './interfaces'

const FormInput = ({
    label,
    name,
    id,
    className,
    type,
    placeholder,
    pattern,
    autoComplete,
    required,
    disabled,
}: FormFieldProps) => {
    const { handleBlur, handleChange, getFieldProps, getFieldMeta } = useFormikContext()
    const { value } = getFieldProps(name)
    const { error, touched } = getFieldMeta(name)

    return (
        <div className={`grid-cols-[auto auto] grid w-full gap-2 ${className}`}>
            {label ? <label htmlFor={id}>{label}</label> : null}
            <span
                className={`
                break-words text-red-500
                ${label ? 'justify-self-end text-right' : 'order-1 col-span-2 text-center'}
                ${error && touched ? 'block' : 'hidden'}
            `}
            >
                {error}
            </span>
            <input
                className={`
                    col-span-2 h-[2.125rem] w-full border px-3 py-1
                    ${error && touched ? 'border-red-600 text-red-500 placeholder:text-red-light' : 'border-current'}
                `}
                value={value}
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                pattern={pattern}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    )
}

export default memo(FormInput)
