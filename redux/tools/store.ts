import { configureStore } from '@reduxjs/toolkit'
import user from '@redux-imports/slices/posts'
const store = configureStore({
  reducer: {
    user,
  },
  devTools: process.env.NODE_ENV === 'development',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store
