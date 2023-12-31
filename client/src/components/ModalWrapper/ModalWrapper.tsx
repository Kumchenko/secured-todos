'use client'
import { closeModal } from '@/services/modal'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import Modal from '../Modal/Modal'

const ModalWrapper = () => {
    const dispatch = useAppDispatch()
    const { show, modals } = useAppSelector(state => state.modal)

    useEffect(() => {
        if (show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'initial'
        }
    }, [show])

    return (
        <div
            onClick={e => dispatch(closeModal())}
            className={`
            ${show ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'}
            absolute left-0 top-0 z-50 flex h-[100vh] w-[100vw] max-w-full flex-col items-center justify-center
            gap-4 p-8 backdrop-blur-sm backdrop-brightness-90 transition-opacity md:items-end md:justify-end`}
        >
            {modals.map(modal => (
                <Modal key={modal.key} modal={modal} />
            ))}
        </div>
    )
}

export default ModalWrapper
