import { useAppSelector } from '@redux-imports/tools/hooks'
import Spinner from 'components/Spinner/Spinner'
import {
  ACTIONTYPES,
  initState,
  reducer,
  viewArticlesApi,
} from 'constants/immediate-states/post.state'
import React from 'react'

export default function ViewPost() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { isLoggedIn, loggedInData } = useAppSelector((state) => state.user)
  const { error, success, loading } = state
  const errorHandler = (errorMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: errorMessage })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  const successHandler = (_: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  React.useEffect(() => {
    if (!isLoggedIn) {
      errorHandler('You must be logged in to view this page')
    } else {
      viewArticlesApi(
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
  }, [])

  return state.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <div className="p-4">
        {state.articles.map((element, index) => (
          <React.Fragment key={index}>
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
            </div>
          </React.Fragment>
        ))}
      </div>
      {error ? (
        <p className="mt-2 text-xs italic text-red-500">{error}</p>
      ) : null}
    </React.Fragment>
  )
}
