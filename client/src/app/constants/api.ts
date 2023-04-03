export const API_SERVER_URL: string = 'http://localhost:5000'

// AUTH API-CONSTANTS
export const LOGIN: string = '/auth/login'
export const LOGOUT: string = '/auth/logout'
export const REGISTRATION: string = '/auth/registration'
export const REFRESH_ACCESS: string = '/auth/refresh-access'

// USER CONSTANTS
export const EDIT_PROFILE: string = '/auth/edit-profile'
export const CHANGE_PASSWORD: string = '/auth/change-password'
export const FETCH_USERS: string = '/user/all'
export const CHANGE_ACCESS_STATE = '/auth/change-access-state'

// UNIVERSITY CONSTANTS
export const GET_UNIVERSITIES: string = '/university/all'
export const GET_UNIVERSITY: string = '/university/'
export const GET_GROUPS: string = '/group'
export const GET_GROUP: string = '/group/one'

// TEST CONSTANTS
export const CREATE_TEST: string = '/test/'
export const EDIT_TEST: string = '/test/'
export const GET_TESTS: string = '/test/all'
export const GET_TEST: string = '/test/'
export const GET_TEST_FOR_PASSING: string = '/test/for-passing'
export const CALCULATE_RESULT: string = '/test/calculate-result'
export const GET_TEST_RESULT: string = '/test/result'
export const GET_TESTS_RESULT: string = '/test/result/all'