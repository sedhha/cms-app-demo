// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { registerUser } from '@backend-utils/apis/registerUser'
import { IRegUserExpectedPayload } from '@backend-utils/interfaces/registerUser'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const payload = req.body as IRegUserExpectedPayload
  registerUser(payload).then((response) => {
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
