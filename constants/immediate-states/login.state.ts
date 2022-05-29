// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

import { ILoginUser } from '@backend-utils/interfaces/loginUser'
import { IResponse } from '@backend-utils/responsehandlers/synthesizer'
import { API_ROUTES } from 'constants/routes'

export interface ILoginState {
  email: string
  password: string
  securityAnswer: string
  securityQuestion?: string
  error?: string
  loading: boolean
  inSecurityAnswerStage: boolean
  authToken?: string
  uid?: string
}

export const initState: ILoginState = {
  email: '',
  password: '',
  loading: false,
  securityAnswer: '',
  inSecurityAnswerStage: false,
}

export const ACTIONTYPES = {
  UPDATE_EMAIL: 'UPDATE_EMAIL',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_SECURITY_ANSWER: 'UPDATE_SECURITY_ANSWER',
  UPDATE_SECURITY_QUESTION: 'UPDATE_SECURITY_QUESTION',
  UPDATE_IN_SECURITY_ANSWER_STAGE: 'UPDATE_IN_SECURITY_ANSWER_STAGE',
  UPDATE_AUTH_TOKEN: 'UPDATE_AUTH_TOKEN',
  UPDATE_UID: 'UPDATE_UID',
} as const

type ExpectedPayload = string | undefined | boolean

type ReducerAction = {
  type: keyof typeof ACTIONTYPES
  payload: ExpectedPayload
}

export const reducer = (
  state: ILoginState,
  action: ReducerAction
): ILoginState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload as string | undefined,
      }
    case ACTIONTYPES.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }
    case ACTIONTYPES.UPDATE_SECURITY_ANSWER:
      return {
        ...state,
        securityAnswer: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_IN_SECURITY_ANSWER_STAGE:
      return {
        ...state,
        inSecurityAnswerStage: action.payload as boolean,
      }
    case ACTIONTYPES.UPDATE_SECURITY_QUESTION:
      return {
        ...state,
        securityQuestion: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_UID:
      return {
        ...state,
        uid: action.payload as string,
      }
    default:
      return state
  }
}

// APIs

export const loginUserAPI = async (payload: ILoginUser) =>
  fetch(API_ROUTES.PUBLIC_APIS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((res) =>
      res
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
    }))
