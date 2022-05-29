import { IArticleDocument } from '@backend-utils/interfaces/addArticle'
import Admin from '@backend-utils/firebase-server'
import { IUserRole } from '@backend-utils/interfaces/registerUser'

export const ARTICLES_PATH = 'articles'
export const updateArticle = async (
  articleContent: string,
  articleTitle: string,
  articleId: string,
  userType: IUserRole
): Promise<{ error: boolean; message?: string }> => {
  const articleDocument = Admin.db.collection(ARTICLES_PATH).doc(articleId)
  const latestArticle = await articleDocument.get()
  if (!latestArticle.exists) return { error: true, message: 'No such Article' }
  const latestArticleContent = latestArticle.data() as IArticleDocument
  const timestamp = new Date().getTime()
  const inReview = userType !== 'Super-Admin'
  const article = {
    articleContent: [
      ...latestArticleContent.articleContent,
      {
        content: articleContent,
        title: articleTitle,
        lastModified: timestamp,
      },
    ],
    inReview,
    publicationTimeStamp: timestamp,
  }
  await articleDocument.set(article, { merge: true })
  return { error: false, message: 'Article Updated Successfully!' }
}
