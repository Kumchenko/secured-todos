import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import ModalSlice from '@/services/modal'
import api from '@/services'

const reducer = combineReducers({
    [ModalSlice.name]: ModalSlice.reducer,
    [api.reducerPath]: api.reducer,
})

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type IDispatch = typeof store.dispatch
export const useAppDispatch: () => IDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
