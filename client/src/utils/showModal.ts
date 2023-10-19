import { ModalType } from '@/constants'
import { openModal } from '@/services/modal'
import store from '@/store'

export const showErrorModal = (message?: string) =>
    store.dispatch(
        openModal({
            type: ModalType.Error,
            description: message,
        }),
    )

export const showLicenseModal = () =>
    store.dispatch(
        openModal({
            type: ModalType.Info,
            title: 'Активація програми',
            description:
                'Дана версія програми не є повноцінною комерційною версією. Зареєструйте програму на сторінці "Активація"',
        }),
    )
