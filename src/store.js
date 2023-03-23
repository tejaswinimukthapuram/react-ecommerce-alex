import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './reducers/wishlist'

export const store = configureStore({
  reducer: {
    wishlist:wishlistReducer
  },
})