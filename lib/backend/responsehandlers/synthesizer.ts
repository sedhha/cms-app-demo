export interface IResponse {
  error: boolean
  message: string
  payload: any
  status_code: number
}

export interface IErrorResponse {
  message: string
  status_code?: number
  payload?: any
}

export interface IOpsResponse {
  error: boolean
  message?: string
}

export interface ISuccessResponse {
  message?: string
  status_code?: number
  payload?: any
}

export const synthesizeErrorResponse = (
  payload: IErrorResponse
): IResponse => ({
  error: true,
  message: payload.message,
  payload: payload.payload ?? {},
  status_code: payload.status_code ?? 400,
})

export const synthesizeSuccessResponse = (
  payload: ISuccessResponse
): IResponse => ({
  error: false,
  message: payload.message ?? 'Success',
  payload: payload.payload ?? {},
  status_code: payload.status_code ?? 200,
})
