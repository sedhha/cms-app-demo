// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  synthesizeSuccessResponse,
  synthesizeErrorResponse,
  IResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import { IBackendUpdatePostState } from 'constants/immediate-states/post.state'
import {
  IUserDetails,
  withAdminProtect,
} from '@backend-utils/middleware/withAdminProtect'
import { updateArticle } from '@backend-utils/apis/addNewArticle'

type ArticleContent = IBackendUpdatePostState & {
  userBody: IUserDetails
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const payload = req.body as ArticleContent
  const superAdminUser = payload.userBody.userRole === 'Super-Admin'

  const result = await updateArticle(
    payload.articleContent,
    payload.articleName,
    payload.articleId,
    payload.userBody.userRole
  )

  return res.status(result.error ? 400 : 201).json(
    result.error
      ? synthesizeErrorResponse({
          message: result.message ?? 'Unexpected Error',
        })
      : synthesizeSuccessResponse({
          message:
            result.message ?? superAdminUser
              ? 'Article Updated Successfully'
              : 'Article Updated Successfully, however it would only be visible to end users once its approved by Super Admin',
        })
  )
}

export default withAdminProtect(handler)
