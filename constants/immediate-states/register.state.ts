// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

import { IRegUserExpectedPayload } from '@backend-utils/interfaces/registerUser'
import { API_ROUTES } from 'constants/routes'
import { IResponse } from '@backend-utils/responsehandlers/synthesizer'
export interface IRegisterState {
  email: string
  password: string
  reEnterPassword: string
  securityQuestion: string
  securityAnswer: string
  error?: string
  success?: string
  loading: boolean
}

export const initState: IRegisterState = {
  email: '',
  password: '',
  reEnterPassword: '',
  securityQuestion: 'What was the name of your first Cat?',
  securityAnswer: '',
  loading: false,
}

export const securityQuestions = [
  'What was the name of your first Cat?',
  'What is your favourite Pet?',
  'What is your favourite Food?',
  'What is your favourite Movie?',
  'What is your favourite Book?',
  'What is your favourite Colour?',
  'What is your favourite Sport?',
  'What is your favourite Game?',
]

export const ACTIONTYPES = {
  UPDATE_EMAIL: 'UPDATE_EMAIL',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_RE_ENTER_PASSWORD: 'UPDATE_RE_ENTER_PASSWORD',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
  UPDATE_SUCCESS_MESSAGE: 'UPDATE_SUCCESS_MESSAGE',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_SECURITY_QUESTION: 'UPDATE_SECURITY_QUESTION',
  UPDATE_SECURITY_ANSWER: 'UPDATE_SECURITY_ANSWER',
} as const

type ExpectedPayload = string | undefined | boolean

type ReducerAction = {
  type: keyof typeof ACTIONTYPES
  payload: ExpectedPayload
}

export const reducer = (
  state: IRegisterState,
  action: ReducerAction
): IRegisterState => {
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
    case ACTIONTYPES.UPDATE_RE_ENTER_PASSWORD:
      return {
        ...state,
        reEnterPassword: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_SECURITY_QUESTION:
      return {
        ...state,
        securityQuestion: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_SECURITY_ANSWER:
      return {
        ...state,
        securityAnswer: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload as string | undefined,
      }
    case ACTIONTYPES.UPDATE_SUCCESS_MESSAGE:
      return {
        ...state,
        success: action.payload as string | undefined,
      }
    case ACTIONTYPES.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }
    default:
      return state
  }
}

// APIs

export const registerCMSUser = (
  payload: IRegUserExpectedPayload
): Promise<{ error: boolean; message: string }> =>
  fetch(API_ROUTES.PUBLIC_APIS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => data)
        .catch((error) => ({ error: true, message: error.message }))
    )
    .catch((error) => ({ error: true, message: error.message }))
