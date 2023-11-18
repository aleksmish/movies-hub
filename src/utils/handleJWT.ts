import { AuthenticationResponse } from "../types/auth";
import { Claim } from "../types/claim";

const tokenKey = "token"
const expirationKey = "token-expiration"

export const saveToken = (authData: AuthenticationResponse) => {
  localStorage.setItem(tokenKey, authData.token)
  localStorage.setItem(expirationKey, authData.expiration.toString())
}

export const getClaims = (): Claim[] => {
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return [];
  }

  const expiration = localStorage.getItem(expirationKey);
  const expirationDate = new Date(expiration!);

  if (expirationDate <= new Date()) {
    logout();
    return [];
  }

  const dataToken = JSON.parse(atob(token.split(".")[1]));
  const response: Claim[] = [];

  for (const property in dataToken) {
    response.push({name: property, value: dataToken[property]})
  }

  return response;
}

export const getJWT = () => {
  return localStorage.getItem(tokenKey);
}

export const logout = () => {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(expirationKey);
}
