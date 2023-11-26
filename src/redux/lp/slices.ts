
import { createSlice } from "@reduxjs/toolkit";

const initialState: Lp = {
    open: false,
}

const lpSlice = createSlice({
    name: 'lp',
    initialState: initialState,
    reducers: {
        openPopupAction: (state) => {
            const open = { ...state, open: true}
            return open
        },
        closePopupAction: (state) => {
            const open = { ...state, open: false}
            return open
        },
    }
})

export const {
    openPopupAction,
    closePopupAction,
} = lpSlice.actions

export const lpReducer = lpSlice.reducer