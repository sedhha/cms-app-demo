import Admin from '@backend-utils/firebase-server'
import { FirebaseError } from 'firebase-admin'
import {
  verifyPayload,
  VerifierPayload,
} from '@backend-utils/responsehandlers/requestUtils'
// Interfaces
import {
  IRegUserExpectedPayload,
  IRegUserExpectedResponse,
  IUserRole,
} from '@backend-utils/interfaces/registerUser'

// Methods
export const registerUser = async (
  payload: IRegUserExpectedPayload
): Promise<IRegUserExpectedResponse> => {
  // Verify Payload

  const validRequest = verifyPayload(payload as unknown as VerifierPayload, [
    'email',
    'password',
    'securityQuestion',
    'securityAnswer',
  ])

  if (validRequest.error) return validRequest

  return Admin.auth
    .createUser({
      email: payload.email,
      password: payload.password,
    })
    .then((user) =>
      Admin.auth
        .setCustomUserClaims(user.uid, {
          userRole: 'User' as IUserRole,
          securityQuestion: payload.securityQuestion,
          securityAnswer: payload.securityAnswer,
        })
        .then(() => ({ error: false }))
        .catch(firebaseErrorHandler)
    )
    .catch(firebaseErrorHandler)
}

const firebaseErrorHandler = (error: FirebaseError) => ({
  error: true,
  message: error.message.replace('Firebase: ', ''),
})
