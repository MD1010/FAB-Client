import { SERVER_URL } from "./ServerUrl";

const BASE_API = `${SERVER_URL}/api`;
const WEB_APP_API = `${BASE_API}/web-app`;

export const LOGIN_ENDPOINT = `${BASE_API}/auth/login`;
export const CARDS_ENDPOINT = `${WEB_APP_API}/entities/cards`;
export const NATIONS_ENDPOINT = `${WEB_APP_API}/entities/nations`;
export const TEAMS_ENDPOINT = `${WEB_APP_API}/entities/teams`;
export const LEAGUES_ENDPOINT = `${WEB_APP_API}/entities/leagues`;

export const ACCOUNTS_ENDPOINT = `${SERVER_URL}/api/accounts/`;
export const ADD_ACCOUNT_ENDPOINT = `${SERVER_URL}/api/accounts/add`;
export const DELETE_ACCOUNT_ENDPOINT = `${SERVER_URL}/api/accounts/delete`;

export const LAUNCH_ACCOUNT = `${WEB_APP_API}/login/connect`;
export const FIRST_LOGIN_ACCOUNT = `${WEB_APP_API}/login/first-login`;
export const DISCONNECT_ACCOUNT = `${WEB_APP_API}/login/disconnect`;
export const LAUNCH_WITH_CODE = `${WEB_APP_API}/login/connect-with-code`;
export const RUN_ACCOUNT = `${WEB_APP_API}/actions/start-loop`;
