// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import { withUserProtect } from '@backend-utils/middleware/withUserProtect'
import { viewArticles } from '@backend-utils/apis/viewArticles'

const handler = async (_: NextApiRequest, res: NextApiResponse<IResponse>) => {
  return viewArticles()
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

export default withUserProtect(handler)
