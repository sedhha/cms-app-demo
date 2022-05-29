import Admin from '@backend-utils/firebase-server'
import { ILoginUser } from '@backend-utils/interfaces/loginUser'
import { FirebaseError } from 'firebase-admin'

export const verifySecurityQuestionAnswer = async (
  payload: ILoginUser
): Promise<{ error: boolean; message: string }> => {
  const { idToken, uid, securityQuestion, securityAnswer } = payload
  return Admin.auth
    .verifyIdToken(idToken)
    .then((user) => {
      if (
        user.uid === uid &&
        user.securityQuestion === securityQuestion &&
        user.securityAnswer === securityAnswer
      ) {
        // Encode securityQuestion and answer to base 64 question:answer
        const encodedString = Buffer.from(
          `${securityQuestion}:${securityAnswer}`
        ).toString('base64')
        return { error: false, message: encodedString }
      } else {
        return { error: true, message: 'Incorrect Security Question or Answer' }
      }
    })
    .catch((error: FirebaseError) => ({ error: true, message: error.message }))
}
