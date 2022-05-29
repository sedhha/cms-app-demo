// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import {
  IUserDetails,
  withSuperAdminProtect,
} from '@backend-utils/middleware/withSuperAdminProtect'
import { approveArticle } from '@backend-utils/apis/approveArticle'

type ArticleContent = {
  userBody: IUserDetails
  articleId: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const payload = req.body as ArticleContent

  const result = await approveArticle(payload.articleId)

  return res.status(result.error ? 400 : 201).json(
    result.error
      ? synthesizeErrorResponse({
          message: result.message ?? 'Unexpected Error',
        })
      : synthesizeSuccessResponse({
          message: 'Article Approved Successfully',
        })
  )
}

export default withSuperAdminProtect(handler)
