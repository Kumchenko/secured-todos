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
            className={`fixed top-0 left-0 w-[100vw] h-[100vh] z-50 ${
                show ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
            }`}
        >
            <div
                onClick={e => dispatch(closeModal())}
                className={`
            flex h-full w-full max-w-full flex-col items-center max-md:justify-center overflow-y-auto
            gap-4 p-8 backdrop-blur-sm backdrop-brightness-90 transition-opacity md:items-end md:flex-col-reverse`}
            >
                {modals.map(modal => <Modal key={modal.key} modal={modal} />).reverse()}
            </div>
        </div>
    )
}

export default ModalWrapper
