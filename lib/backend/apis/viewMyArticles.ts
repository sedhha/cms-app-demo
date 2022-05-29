import Admin from '@backend-utils/firebase-server'
import {
  IArticleDocument,
  IFrontendArticle,
} from '@backend-utils/interfaces/addArticle'
import { ARTICLES_PATH } from './addArticle'

export const viewMyArticles = async (email: string) => {
  const articleDocuments = await Admin.db
    .collection(ARTICLES_PATH)
    .where('author', '==', email)
    .get()
  const articles = articleDocuments.docs.map(
    (doc) => doc.data() as IArticleDocument
  )
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
