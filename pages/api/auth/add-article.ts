// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addArticle } from '@backend-utils/apis/addArticle'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import { IBackendPostState } from 'constants/immediate-states/post.state'
import {
  IUserDetails,
  withAdminProtect,
} from '@backend-utils/middleware/withAdminProtect'

type ArticleContent = IBackendPostState & {
  userBody: IUserDetails
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const payload = req.body as ArticleContent
  const articlePayload: IBackendPostState = {
    articleContent: payload.articleContent,
    articleName: payload.articleName,
  }
  const result = await addArticle(
    articlePayload,
    payload.userBody.userRole,
    payload.userBody.email
  )

  return res.status(result.error ? 400 : 201).json(
    result.error
      ? synthesizeErrorResponse({
          message: result.message ?? 'Unexpected Error',
        })
      : synthesizeSuccessResponse({
          message: result.message ?? 'Article Added Successfully',
        })
  )
}

export default withAdminProtect(handler)
