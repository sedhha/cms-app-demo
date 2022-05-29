import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Server from '@backend-utils/firebase-server'
import { synthesizeErrorResponse } from '@backend-utils/responsehandlers/synthesizer'
import { FirebaseError } from 'firebase-admin'
import { IUserRole } from '@backend-utils/interfaces/registerUser'

export interface IUserDetails {
  authToken: string
  uid: string
  email: string
  userRole: IUserRole
  securityQuestion: string
  securityAnswer: string
}

export interface IClaims {
  userRole: IUserRole
  securityQuestion: string
  securityAnswer: string
}

/*
        Intercepting and Authenticating all Authentication Requests
*/

const verifySecurityQuestionAnswer = (
  authBasic: string,
  sQ: string,
  sA: string
): boolean => {
  // Decode base64 string
  const decodedString = Buffer.from(authBasic, 'base64').toString()
  // Split string into email and password
  const [securityQuestion, securityAnswer] = decodedString.split(':')
  // Verify if the questions and answers match
  return securityQuestion === sQ && securityAnswer === sA
}

export const withUserProtect = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const firebaseToken = request.headers.authorization ?? ''
    const authBasic = request.headers.authbasic ?? ''
    if (firebaseToken === '' || authBasic === '')
      return response.status(401).json(
        synthesizeErrorResponse({
          message: 'Unauthorized User. Please Log In',
          status_code: 401,
        })
      )
    try {
      const decodedToken = await Server.auth.verifyIdToken(firebaseToken)
      const uid = decodedToken.uid
      const validAccount = verifySecurityQuestionAnswer(
        authBasic as string,
        decodedToken.securityQuestion,
        decodedToken.securityAnswer
      )
      if (!validAccount)
        return response.status(401).json(
          synthesizeErrorResponse({
            message: 'Incorrect Security Question or Answer',
          })
        )
      const userBody: IUserDetails = {
        authToken: firebaseToken,
        email: decodedToken.email ?? 'Guest User',
        uid,
        userRole: decodedToken.userRole,
        securityQuestion: decodedToken.securityQuestion,
        securityAnswer: decodedToken.securityAnswer,
      }
      request.body.userBody = userBody
      return handler(request, response)
    } catch (e) {
      console.log('Auth Error = ', e)
      const result = synthesizeErrorResponse({
        message: (e as FirebaseError).message,
        status_code: 401,
      })
      return response.status(result.status_code).json(result)
    }
  }
}
