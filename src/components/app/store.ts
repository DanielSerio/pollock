import { configureStore } from '@reduxjs/toolkit'
import artFormReducer from '../../features/ArtForm/ArtFormSlice'

export const store = configureStore({
  reducer: {
    artForm: artFormReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch