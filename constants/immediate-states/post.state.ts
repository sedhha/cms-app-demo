// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

import { IFrontendArticle } from '@backend-utils/interfaces/addArticle'
import { IResponse } from '@backend-utils/responsehandlers/synthesizer'
import { API_ROUTES } from 'constants/routes'

export type IArticleType = 'My Articles' | 'Review Articles'

export interface IPostState {
  articleName: string
  articleContent: string
  error?: string
  success?: string
  loading: boolean
  articles: IFrontendArticle[]
  myPostMode: IArticleType
}

export interface IBackendPostState {
  articleName: string
  articleContent: string
}

export interface IBackendUpdatePostState {
  articleName: string
  articleContent: string
  articleId: string
}

export const initState: IPostState = {
  articleName: '',
  articleContent: '',
  loading: false,
  articles: [],
  myPostMode: 'My Articles',
}

export const ACTIONTYPES = {
  UPDATE_ARTICLE_NAME: 'UPDATE_ARTICLE_NAME',
  UPDATE_ARTICLE_CONTENT: 'UPDATE_ARTICLE_CONTENT',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
  UPDATE_SUCCESS_MESSAGE: 'UPDATE_SUCCESS_MESSAGE',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_ARTICLES: 'UPDATE_ARTICLES',
  UPDATE_ARTICLE_NAV: 'UPDATE_ARTICLE_NAV',
} as const

type ExpectedPayload = string | undefined | boolean | IFrontendArticle[]

type ReducerAction = {
  type: keyof typeof ACTIONTYPES
  payload: ExpectedPayload
}

export const reducer = (
  state: IPostState,
  action: ReducerAction
): IPostState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_ARTICLE_NAME:
      return {
        ...state,
        articleName: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ARTICLE_CONTENT:
      return {
        ...state,
        articleContent: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload as string,
        success: undefined,
      }
    case ACTIONTYPES.UPDATE_SUCCESS_MESSAGE:
      return {
        ...state,
        success: action.payload as string,
        error: undefined,
      }
    case ACTIONTYPES.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }
    case ACTIONTYPES.UPDATE_ARTICLES:
      return {
        ...state,
        articles: action.payload as IFrontendArticle[],
      }
    case ACTIONTYPES.UPDATE_ARTICLE_NAV:
      return {
        ...state,
        myPostMode: action.payload as IArticleType,
      }
    default:
      return state
  }
}

// APIs

export interface IAuthData {
  authToken: string
  authBasic: string
}

export interface IAddArticleAPI {
  authData: IAuthData
  articleName: string
  articleContent: string
}

export const addArticleApi = async (
  payload: IAddArticleAPI
): Promise<{ error: boolean; message: string }> => {
  return fetch(API_ROUTES.AUTH_APIS.ADD_ARTICLE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: payload.authData.authToken,
      authBasic: payload.authData.authBasic,
    },
    body: JSON.stringify({
      articleName: payload.articleName,
      articleContent: payload.articleContent,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
    }))
}

export const viewArticlesApi = async (
  authToken: string,
  authBasic: string
): Promise<{
  error: boolean
  message: string
  articles: IFrontendArticle[]
}> => {
  return fetch(API_ROUTES.AUTH_APIS.VIEW_ARTICLES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      authBasic: authBasic,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
          articles: data.payload as IFrontendArticle[],
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
          articles: [],
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
      articles: [],
    }))
}

export const viewMyArticlesApi = async (
  authToken: string,
  authBasic: string
): Promise<{
  error: boolean
  message: string
  articles: IFrontendArticle[]
}> => {
  return fetch(API_ROUTES.AUTH_APIS.VIEW_MY_ARTICLES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      authBasic: authBasic,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
          articles: data.payload as IFrontendArticle[],
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
          articles: [],
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
      articles: [],
    }))
}

export const updateExistingArticleApi = async (
  authBasic: string,
  authToken: string,
  articlePayload: IBackendUpdatePostState
): Promise<{
  error: boolean
  message: string
}> => {
  return fetch(API_ROUTES.AUTH_APIS.UPDATE_EXISTING_ARTICLE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      authBasic: authBasic,
    },
    body: JSON.stringify(articlePayload),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
    }))
}

export const getReviewArticles = async (
  authToken: string,
  authBasic: string
): Promise<{
  error: boolean
  message: string
  articles: IFrontendArticle[]
}> => {
  return fetch(API_ROUTES.AUTH_APIS.GET_REVIEW_ARTICLES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      authBasic: authBasic,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
          articles: data.payload as IFrontendArticle[],
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
          articles: [],
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
      articles: [],
    }))
}

export const approveArticleApi = async (
  authToken: string,
  authBasic: string,
  articleId: string
): Promise<{
  error: boolean
  message: string
}> => {
  return fetch(API_ROUTES.AUTH_APIS.APPROVE_ARTICLE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
      authBasic: authBasic,
    },
    body: JSON.stringify({
      articleId,
    }),
  })
    .then((response) =>
      response
        .json()
        .then((data: IResponse) => ({
          error: data.error,
          message: data.message,
        }))
        .catch((error) => ({
          error: true,
          message: error.message,
        }))
    )
    .catch((error) => ({
      error: true,
      message: error.message,
    }))
}
