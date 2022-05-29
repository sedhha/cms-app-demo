export interface IArticleContent {
  content: string
  title: string
  lastModified: number
}
export interface IArticleDocument {
  /* 
        Currently Article Versions are stored in Document
        This would be better if we could break it even more into collection as 
        article Id and all article updates in Article Documents.

        For now, considering time constraint following this data structure.
        However the ideal one would be

        articles[collection] => 
                                [
                                    articleUpdates: {...},
                                    articleUpdates: {...},
                                    articleUpdates: {...},
                                    ...
                                ]

    */

  articleId: string
  articleContent: IArticleContent[]
  inReview: boolean
  author: string // Email of the Author
  publicationTimeStamp: number
}

export interface IFrontendArticle {
  author: string
  title: string
  content: string
  articleId: string
}
