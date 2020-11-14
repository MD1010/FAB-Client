import { useContext } from "react";
import { AppContext } from "src/context/AppContext";
import {
  getTokenIdentity,
  setNewAccessTokenIfExpired,
  isAccessTokenExpired,
  getToken,
  TokenType,
} from "./jwt";

export function getLoggedInUser(): string | null {
  const token = getToken(TokenType.ACCESS);
  return token ? getTokenIdentity(token) : null;
}
