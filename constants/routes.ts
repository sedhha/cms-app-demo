export const PROFILE_ROUTES = {
  VIEW_ARTICLES: 'view-articles',
  ADD_ARTICLES: 'add-articles',
  REVIEW_ARTICLES: 'review-articles',
}

export const NAVIGATION_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  PROFILE_ADD_POST: '/profile/' + PROFILE_ROUTES.ADD_ARTICLES,
  PROFILE_VIEW_POST: '/profile/' + PROFILE_ROUTES.VIEW_ARTICLES,
  PROFILE_MY_POST: '/profile/' + PROFILE_ROUTES.REVIEW_ARTICLES,
}

export const API_ROUTES = {
  PUBLIC_APIS: {
    REGISTER: '/api/public/register-user',
    LOGIN: '/api/public/login-user',
  },
  AUTH_APIS: {
    ADD_ARTICLE: '/api/auth/add-article',
    VIEW_ARTICLES: '/api/auth/view-articles',
    VIEW_MY_ARTICLES: '/api/auth/my-articles',
    UPDATE_EXISTING_ARTICLE: '/api/auth/update-existing-article',
    GET_REVIEW_ARTICLES: '/api/auth/review-articles',
    APPROVE_ARTICLE: '/api/auth/accept-article',
  },
}
