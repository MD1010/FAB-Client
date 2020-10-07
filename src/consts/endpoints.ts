import { SERVER_URL } from './ServerUrl';

const WEB_APP_API = `${SERVER_URL}/api/web-app`;
//cards
export const CARDS_ENDPOINT = `${WEB_APP_API}/entities/cards`;
// launch account
export const LAUNCH_ACCOUNT = `${WEB_APP_API}/login/launch`;
export const LAUNCH_WITH_CODE = `${WEB_APP_API}/login/launch-with-code`;
