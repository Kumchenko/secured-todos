import { ModalType, modalTimeout } from '@/constants'
import { Modal, ModalArgs } from '@/interfaces'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let modalCounter = 0

type IInitialState = {
    show: boolean
    modals: Modal[]
}

const initialState: IInitialState = {
    show: false,
    modals: [],
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ModalArgs>) => {
            if (!state.show) state.show = true
            state.modals.push({
                ...action.payload,
                key: modalCounter++,
                type: action.payload.type || ModalType.Info,
                timeout: action.payload.timeout || 0,
            })
        },
        closeModal: (state, action: PayloadAction<number | undefined>) => {
            if (action.payload) {
                state.modals = state.modals.filter(modal => modal.key !== action.payload)
            } else {
                state.modals = initialState.modals
            }

            if (!state.modals.length) state.show = false
        },
    },
})

const { actions, reducer } = ModalSlice

export default ModalSlice
export const { openModal, closeModal } = actions
