import { IUserRole } from '@backend-utils/interfaces/registerUser'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  isLoggedIn: boolean
  loggedInData?: {
    authToken: string
    uid: string
    email: string
    authBasic: string
  }
  userRole?: IUserRole
}

// Define the initial state using that type
const initialState: UserState = {
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    updateLoggedInWithData: (
      state: UserState,
      action: PayloadAction<UserState>
    ) => {
      const { payload } = action
      state.isLoggedIn = payload.isLoggedIn
      state.loggedInData = payload.loggedInData
    },
    updateUserRole: (state: UserState, action: PayloadAction<IUserRole>) => {
      state.userRole = (action.payload as IUserRole) ?? 'User'
    },
    resetToInitState: () => initialState,
  },
})

export const { updateLoggedInWithData, resetToInitState, updateUserRole } =
  userSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default userSlice.reducer
