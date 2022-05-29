import Admin from '@backend-utils/firebase-server'

export const ARTICLES_PATH = 'articles'
export const approveArticle = async (
  articleId: string
): Promise<{ error: boolean; message?: string }> => {
  const articleDocument = Admin.db.collection(ARTICLES_PATH).doc(articleId)
  const latestArticle = await articleDocument.get()
  if (!latestArticle.exists) return { error: true, message: 'No such Article' }

  await articleDocument.set({ inReview: false }, { merge: true })
  return { error: false, message: 'Article Accepted Successfully!' }
}
