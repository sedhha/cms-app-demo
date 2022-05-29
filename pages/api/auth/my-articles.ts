// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import {
  IUserDetails,
  withAdminProtect,
} from '@backend-utils/middleware/withAdminProtect'
import { viewMyArticles } from '@backend-utils/apis/viewMyArticles'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const payload = req.body as {
    userBody: IUserDetails
  }
  return viewMyArticles(payload.userBody.email)
    .then((data) =>
      res.status(200).json(
        synthesizeSuccessResponse({
          message: 'Articles Retrieved Successfully',
          payload: data,
        })
      )
    )
    .catch((error) =>
      res.status(401).json(
        synthesizeErrorResponse({
          message: error.message ?? 'Unexpected Error',
        })
      )
    )
}

export default withAdminProtect(handler)
