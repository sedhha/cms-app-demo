// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { verifySecurityQuestionAnswer } from '@backend-utils/apis/loginUser'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import { ILoginUser } from '@backend-utils/interfaces/loginUser'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const payload = req.body as ILoginUser
  return verifySecurityQuestionAnswer(payload).then((response) => {
    return res.status(response.error ? 400 : 201).json(
      response.error
        ? synthesizeErrorResponse({
            message: response.message ?? 'Unexpected Error',
          })
        : synthesizeSuccessResponse({
            message:
              response.message ??
              'User Registered Successfully. Go back and Log In',
          })
    )
  })
}
