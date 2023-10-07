import { ModalType } from '@/constants'
import { Modal } from '@/interfaces'
import { closeModal } from '@/services/modal'
import { useAppDispatch } from '@/store'
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter'
import { ExclamationCircleIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import { HTMLAttributes, useEffect } from 'react'

const Modal = ({ modal: { type, description, title, timeout, key } }: { modal: Modal }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (timeout > 0) {
            setTimeout(() => {
                dispatch(closeModal(key))
            }, timeout)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div
            onClick={e => e.stopPropagation()}
            className={`${getStyle(type)} min-w-[140px] md:max-w-md bg-cyan-800 p-4 relative`}
        >
            <button onClick={e => dispatch(closeModal(key))} className="absolute right-0 top-0 z-10 p-2">
                <XMarkIcon className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-1">
                {getIcon(type)}
                <h5 className="text-h5 font-semibold">{title || capitalizeFirstLetter(type)}</h5>
            </div>
            <p className="whitespace-break-spaces">{description}</p>
        </div>
    )
}

const getIcon = (type: ModalType) => {
    switch (type) {
        case ModalType.Info: {
            return <InformationCircleIcon className="h-6 w-6" />
        }
        case ModalType.Error: {
            return <ExclamationCircleIcon className="h-6 w-6" />
        }
        default: {
            const _exhaustiveCheck: never = type
            return null
        }
    }
}

const getStyle = (type: ModalType): HTMLAttributes<HTMLDivElement>['className'] => {
    switch (type) {
        case ModalType.Info: {
            return ''
        }
        case ModalType.Error: {
            return 'text-red-300'
        }
        default: {
            const _exhaustiveCheck: never = type
            return ''
        }
    }
}

export default Modal
