import Admin from '@backend-utils/firebase-server'
import {
  IArticleDocument,
  IFrontendArticle,
} from '@backend-utils/interfaces/addArticle'
import { ARTICLES_PATH } from './addArticle'

export const getReviewArticles = async () => {
  const articleDocuments = await Admin.db
    .collection(ARTICLES_PATH)
    .where('inReview', '==', true)
    .get()
  if (articleDocuments.empty) return []
  console.log(
    'Non Empty doc = ',
    articleDocuments.docs.map((element) => element.data())
  )
  const articles = articleDocuments.docs.map(
    (doc) => doc.data() as IArticleDocument
  )
  console.log('Articles = ', articles)
  return articles.map((element) => {
    const latestArticle = element.articleContent.sort(
      (a, b) => b.lastModified - a.lastModified
    )[0]
    return {
      author: element.author,
      title: latestArticle.title,
      content: latestArticle.content,
      articleId: element.articleId,
    } as IFrontendArticle
  })
}
