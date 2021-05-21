// @ts-ignore
import { Dropbox } from "dropbox/dist/Dropbox-sdk";

let util = require("util");
util.TextEncoder = window.TextEncoder;
// Import non-minified version of the Dropbox SDK and disable type checks on it
// because type declarations are out of dat
const dropboxClientId = process.env.REACT_APP_DROPBOX_CLIENT_ID;
if (!window.crypto) {
  // @ts-ignore
  window.crypto = {};
}
(window.crypto as any).randomBytes = require("randombytes");
(window.crypto as any).createHash = require("create-hash");

const dbx = new Dropbox({
  clientId: dropboxClientId,
}) as any;

export function generateAuthorizationLink(redirectUrl: string) {
  if (!dropboxClientId) {
    console.error("process.env.REACT_APP_DROPBOX_CLIENT_ID is not defined");
    return;
  }

  console.log(dbx);
  let url = dbx.auth.getAuthenticationUrl(
    redirectUrl,
    undefined,
    "code",
    "offline",
    undefined,
    "none",
    true
  );

  sessionStorage.setItem("codeChallenge", dbx.auth.codeChallenge);
  sessionStorage.setItem("codeVerifier", dbx.auth.codeVerifier);

  return url;
}

export function tryToParseCodeFromUrl() {
  let params = new URL(window.location.toString()).searchParams;
  return params.get("code");
}

export function tryReceiveDropboxToken(redirectUrl: string) {
  let code = tryToParseCodeFromUrl();
  if (code !== null) {
    dbx.auth.codeChallenge = sessionStorage.getItem("codeChallenge");
    dbx.auth.codeVerifier = sessionStorage.getItem("codeVerifier");

    dbx.auth
      .getAccessTokenFromCode(redirectUrl, code)
      .then(function (token: any) {
        dbx.auth.setRefreshToken(token.result.refresh_token);
        dbx.auth.setAccessToken(token.result.access_token);
        dbx.auth.setAccessTokenExpiresAt(
          new Date(Date.now() + token.result.expires_in * 1000)
        );

        // TODO: Store these tokens somewhere

        dbx
          .usersGetCurrentAccount()
          .then(function (response: any) {
            console.log("response", response);
          })
          .catch(function (error: any) {
            console.error(error);
          });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }
}
