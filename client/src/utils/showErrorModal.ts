import { ModalType } from '@/constants'
import { openModal } from '@/services/modal'
import store from '@/store'
import { AxiosError } from 'axios'

export const showErrorModal = (message?: string) =>
    store.dispatch(
        openModal({
            type: ModalType.Error,
            description: message,
        }),
    )
