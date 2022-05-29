export interface IRegUserExpectedPayload {
  email: string
  password: string
  securityQuestion: string
  securityAnswer: string
}

export interface IRegUserExpectedResponse {
  error: boolean
  message?: string
}

export type IUserRole = 'Super-Admin' | 'Admin' | 'User'
