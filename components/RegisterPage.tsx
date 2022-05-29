import React from 'react'
import Head from 'next/head'
import {
  ACTIONTYPES,
  initState,
  reducer,
  securityQuestions,
  registerCMSUser,
} from 'constants/immediate-states/register.state'
import Link from 'next/link'
import { NAVIGATION_ROUTES } from 'constants/routes'
import { FirebaseError } from 'firebase/app'
import Spinner from './Spinner/Spinner'
import { siteMetaData } from 'constants/metadata'

export default function LoginPage() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { email, password, reEnterPassword, loading, success } = state

  const updateError = (errorMessage: string): void => {
    dispatch({
      type: ACTIONTYPES.UPDATE_ERROR_MESSAGE,
      payload: errorMessage,
    })
    dispatch({
      type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE,
      payload: undefined,
    })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  const updateSuccess = (successMessage: string): void => {
    dispatch({
      type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE,
      payload: successMessage,
    })
    dispatch({
      type: ACTIONTYPES.UPDATE_ERROR_MESSAGE,
      payload: undefined,
    })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }

  const registerUser = () => {
    if (password !== reEnterPassword) {
      updateError('Passwords do not match')
      return
    }
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    registerCMSUser({
      email: state.email,
      password: state.password,
      securityQuestion: state.securityQuestion,
      securityAnswer: state.securityAnswer,
    })
      .then(() =>
        updateSuccess(
          'Registration Successful. Kindly goto login page and login'
        )
      )
      .catch((error: FirebaseError) =>
        updateError(error.message.replace('Firebase: ', ''))
      )
  }
  const { error } = state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{siteMetaData.title}: Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold font-std">
          Register with {siteMetaData.title}
        </h1>
        <br />
        <div className="w-2/4 max-w-s">
          <div className="w-full px-4 pt-2 pb-2 mb-2 bg-white rounded shadow-md">
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email Address
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONTYPES.UPDATE_EMAIL,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="password"
                    placeholder="******************"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONTYPES.UPDATE_PASSWORD,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-1 text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="password"
                    placeholder="******************"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONTYPES.UPDATE_RE_ENTER_PASSWORD,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Security Question
                  </label>
                  <select
                    className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow focus:shadow-outline focus:outline-none"
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_SECURITY_QUESTION,
                        payload: e.target.value,
                      })
                    }}
                  >
                    {securityQuestions.map((element) => (
                      <option key={element}>{element}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Security Answer
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="text"
                    placeholder="Security Answer"
                    onChange={(e) =>
                      dispatch({
                        type: ACTIONTYPES.UPDATE_SECURITY_ANSWER,
                        payload: e.target.value,
                      })
                    }
                  />
                </div>
                {error ? (
                  <p className="mt-2 text-xs italic text-red-500">{error}</p>
                ) : null}
                {success ? (
                  <p className="mt-2 text-xs italic text-lime-500">{success}</p>
                ) : null}
                <div className="flex items-center justify-between">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={registerUser}
                  >
                    Register
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
          <p>
            Already Registered? Go to{' '}
            <Link href={NAVIGATION_ROUTES.LOGIN}>
              <a className="text-indigo-600 underline">Login</a>
            </Link>{' '}
            Page
          </p>
        </div>
      </main>
    </div>
  )
}
