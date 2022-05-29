import { IArticleDocument } from '@backend-utils/interfaces/addArticle'
import { IBackendPostState } from 'constants/immediate-states/post.state'
import Admin from '@backend-utils/firebase-server'
import { IUserRole } from '@backend-utils/interfaces/registerUser'

export const ARTICLES_PATH = 'articles'
export const addArticle = async (
  articleContent: IBackendPostState,
  userRole: IUserRole,
  email: string
): Promise<{ error: boolean; message?: string }> => {
  const articleDocument = Admin.db.collection(ARTICLES_PATH).doc()
  const timestamp = new Date().getTime()
  const inReview = userRole !== 'Super-Admin'

  const article: IArticleDocument = {
    articleId: articleDocument.id,
    articleContent: [
      {
        content: articleContent.articleContent,
        title: articleContent.articleName,
        lastModified: timestamp,
      },
    ],
    inReview,
    publicationTimeStamp: timestamp,
    author: email,
  }

  return articleDocument
    .set(article)
    .then(() => ({
      error: false,
      message: inReview
        ? 'Article Added as Draft and would be kept in Review until approved by super admins.'
        : 'Article Added Successfully!',
    }))
    .catch((error) => ({ error: true, message: error.message }))
}
