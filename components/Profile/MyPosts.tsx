import { useAppSelector } from '@redux-imports/tools/hooks'
import Spinner from 'components/Spinner/Spinner'
import {
  ACTIONTYPES,
  approveArticleApi,
  getReviewArticles,
  IBackendUpdatePostState,
  initState,
  reducer,
  updateExistingArticleApi,
  viewArticlesApi,
  viewMyArticlesApi,
} from 'constants/immediate-states/post.state'
import React from 'react'

export default function MyArticles() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { isLoggedIn, loggedInData, userRole } = useAppSelector(
    (state) => state.user
  )
  const { error, success, loading } = state
  const errorHandler = (errorMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: errorMessage })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  const successHandler = (successMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
    dispatch({
      type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE,
      payload: successMessage,
    })
  }

  const inViewMode = state.myPostMode === 'My Articles'
  React.useEffect(() => {
    if (!isLoggedIn) {
      errorHandler('You must be logged in to view this page')
    } else {
      if (inViewMode) {
        viewMyArticlesApi(
          loggedInData?.authToken ?? '',
          loggedInData?.authBasic ?? ''
        )
          .then((data) => {
            if (data.error) {
              errorHandler(data.message)
            } else {
              successHandler(data.message)
              dispatch({
                type: ACTIONTYPES.UPDATE_ARTICLES,
                payload: data.articles,
              })
            }
          })
          .catch((error) => {
            errorHandler(error.message)
          })
      } else {
        getReviewArticles(
          loggedInData?.authToken ?? '',
          loggedInData?.authBasic ?? ''
        )
          .then((data) => {
            if (data.error) {
              errorHandler(data.message)
            } else {
              successHandler(data.message)
              dispatch({
                type: ACTIONTYPES.UPDATE_ARTICLES,
                payload: data.articles,
              })
            }
          })
          .catch((error) => {
            errorHandler(error.message)
          })
      }
    }
  }, [inViewMode])

  const onApproveArticles = (articleId: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    approveArticleApi(
      loggedInData?.authToken ?? '',
      loggedInData?.authBasic ?? '',
      articleId
    )
      .then((response) => {
        if (response.error) {
          errorHandler(response.message)
        } else {
          successHandler(response.message)
          getReviewArticles(
            loggedInData?.authToken ?? '',
            loggedInData?.authBasic ?? ''
          )
            .then((data) => {
              if (data.error) {
                errorHandler(data.message)
              } else {
                successHandler(data.message)
                dispatch({
                  type: ACTIONTYPES.UPDATE_ARTICLES,
                  payload: data.articles,
                })
              }
            })
            .catch((error) => {
              errorHandler(error.message)
            })
        }
      })
      .catch((error) => {
        errorHandler(error.message)
      })
  }

  const onSpecificElementTitleChangeHandler = (
    newTitle: string,
    index: number
  ) => {
    const newArticles = [...state.articles]
    newArticles[index].title = newTitle
    dispatch({ type: ACTIONTYPES.UPDATE_ARTICLES, payload: newArticles })
  }
  const onSpecificElementContentChangeHandler = (
    newContent: string,
    index: number
  ) => {
    const newArticles = [...state.articles]
    newArticles[index].content = newContent
    dispatch({ type: ACTIONTYPES.UPDATE_ARTICLES, payload: newArticles })
  }

  const updateExisting = (payload: IBackendUpdatePostState) => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    updateExistingArticleApi(
      loggedInData?.authBasic ?? '',
      loggedInData?.authToken ?? '',
      payload
    )
      .then((response) => {
        if (response.error) {
          errorHandler(response.message)
        } else {
          successHandler(response.message)
        }
      })
      .catch((error) => errorHandler(error.message))
  }

  const MyArticles =
    state.articles.length > 0 ? (
      state.articles.map((element, index) => (
        <React.Fragment key={element.articleId}>
          <div className="mb-4">
            <input
              className="px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
              value={element.title}
              onChange={(e) =>
                onSpecificElementTitleChangeHandler(e.target.value, index)
              }
            />

            <label className="block mb-2 text-sm font-bold text-gray-700">
              Author: {element.author}
            </label>
            <textarea
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
              placeholder="Content Body"
              value={element.content}
              onChange={(e) =>
                onSpecificElementContentChangeHandler(e.target.value, index)
              }
            />
            <button
              className="p-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={() =>
                updateExisting({
                  articleContent: element.content,
                  articleName: element.title,
                  articleId: element.articleId,
                })
              }
            >
              Save Changes
            </button>
          </div>
        </React.Fragment>
      ))
    ) : (
      <label>Start creating your first article!</label>
    )

  const ArticlesForReview =
    state.articles.length > 0 ? (
      state.articles.map((element) => (
        <React.Fragment key={element.articleId}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Title: {element.title}
            </label>
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Author: {element.author}
            </label>
            <textarea
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
              placeholder="Content Body"
              disabled
              value={element.content}
            />
            <button
              className="p-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
              type="button"
              onClick={() => onApproveArticles(element.articleId)}
            >
              Approve Article
            </button>
          </div>
        </React.Fragment>
      ))
    ) : (
      <label>No Articles to Review</label>
    )

  return state.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {error ? (
        <p className="mt-2 text-xs italic text-red-500">{error}</p>
      ) : null}
      {success ? (
        <p className="mt-2 text-xs italic text-lime-500">{success}</p>
      ) : null}
      <div className="p-4">
        {
          <div className="flex justify-between w-full">
            <label
              className={
                'mb-2 block cursor-pointer text-sm font-bold text-gray-700 underline' +
                (inViewMode ? '' : 'underline')
              }
              onClick={() =>
                dispatch({
                  type: ACTIONTYPES.UPDATE_ARTICLE_NAV,
                  payload: 'My Articles',
                })
              }
            >
              My Articles
            </label>
            {userRole === 'Super-Admin' ? (
              <label
                className={
                  'mb-2 block cursor-pointer text-sm font-bold text-gray-700 ' +
                  (inViewMode ? '' : 'underline')
                }
                onClick={() =>
                  dispatch({
                    type: ACTIONTYPES.UPDATE_ARTICLE_NAV,
                    payload: 'Review Articles',
                  })
                }
              >
                Articles For Review
              </label>
            ) : null}
          </div>
        }
        {inViewMode ? MyArticles : ArticlesForReview}
      </div>
    </React.Fragment>
  )
}
