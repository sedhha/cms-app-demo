import { useAppSelector } from '@redux-imports/tools/hooks'
import Spinner from 'components/Spinner/Spinner'
import {
  initState,
  reducer,
  ACTIONTYPES,
  addArticleApi,
} from 'constants/immediate-states/post.state'
import React from 'react'

export default function AddPost() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { loggedInData, userRole } = useAppSelector((state) => state.user)
  const { loading, error, success } = state

  const errorHandler = (errorMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: errorMessage })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  const successHandler = (successMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: undefined })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
    dispatch({
      type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE,
      payload: successMessage,
    })
  }

  const onAddPost = () => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    addArticleApi({
      articleContent: state.articleContent,
      articleName: state.articleName,
      authData: {
        authToken: loggedInData?.authToken ?? '',
        authBasic: loggedInData?.authBasic ?? '',
      },
    })
      .then((response) => {
        if (response.error) {
          errorHandler(response.message)
        } else {
          successHandler(response.message)
        }
      })
      .catch((error) => {
        errorHandler(error.message)
      })
  }

  return (
    <React.Fragment>
      {userRole === 'Admin' || userRole === 'Super-Admin' ? (
        <main className="flex flex-col items-center justify-center flex-auto w-full h-full px-20 text-center">
          <div className="w-full h-full p-2">
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
              {loading ? (
                <Spinner />
              ) : (
                <React.Fragment>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Content Title
                    </label>
                    <input
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                      type="text"
                      placeholder="Content Title"
                      value={state.articleName}
                      onChange={(e) => {
                        dispatch({
                          type: ACTIONTYPES.UPDATE_ARTICLE_NAME,
                          payload: e.target.value,
                        })
                      }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                      Content Body
                    </label>
                    <textarea
                      className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                      placeholder="Content Body"
                      rows={10}
                      value={state.articleContent}
                      onChange={(e) => {
                        dispatch({
                          type: ACTIONTYPES.UPDATE_ARTICLE_CONTENT,
                          payload: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={onAddPost}
                  >
                    Add Article
                  </button>
                  {error ? (
                    <p className="mt-2 text-xs italic text-red-500">{error}</p>
                  ) : null}
                  {success ? (
                    <p className="mt-2 text-xs italic text-lime-500">
                      {success}
                    </p>
                  ) : null}
                </React.Fragment>
              )}
            </form>
          </div>
        </main>
      ) : (
        <p className="mt-2 text-xs italic text-red-500">
          You are not authorized to view this content
        </p>
      )}
    </React.Fragment>
  )
}
