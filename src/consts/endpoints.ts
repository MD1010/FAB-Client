import { SERVER_URL } from "./ServerUrl";

const BASE_API = `${SERVER_URL}/api`;
const WEB_APP_API = `${BASE_API}/web-app`;
const AUTH_API = `${BASE_API}/auth`;

//auth
export const LOGIN_ENDPOINT = `${AUTH_API}/login`;
export const REFRESH_TOKEN = `${AUTH_API}/refresh`;

// entities
export const CARDS_ENDPOINT = `${BASE_API}/entities/cards`;
export const NATIONS_ENDPOINT = `${BASE_API}/entities/nations`;
export const TEAMS_ENDPOINT = `${BASE_API}/entities/teams`;
export const LEAGUES_ENDPOINT = `${BASE_API}/entities/leagues`;
export const ACCOUNTS_ENDPOINT = `${BASE_API}/entities/accounts`;

//accounts
export const ADD_ACCOUNT_ENDPOINT = `${ACCOUNTS_ENDPOINT}/add`;
export const DELETE_ACCOUNT_ENDPOINT = `${ACCOUNTS_ENDPOINT}/delete`;

//webapp
export const LAUNCH_ACCOUNT = `${WEB_APP_API}/login/connect`;
export const FIRST_LOGIN_ACCOUNT = `${WEB_APP_API}/login/first-login`;
export const DISCONNECT_ACCOUNT = `${WEB_APP_API}/login/disconnect`;
export const LAUNCH_WITH_CODE = `${WEB_APP_API}/login/connect-with-code`;
export const RUN_ACCOUNT = `${WEB_APP_API}/actions/start-loop`;
