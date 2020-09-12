let util = require("util");
util.TextEncoder = window.TextEncoder;
// Import non-minified version of the Dropbox SDK and disable type checks on it
// because type declarations are out of dat
let dropbox = require("dropbox/dist/Dropbox-sdk") as any;
const dropboxClientId = process.env.REACT_APP_DROPBOX_CLIENT_ID;

let redirectUrl = "http://localhost:3000";
let dbx = new dropbox.Dropbox({
  clientId: dropboxClientId,
  fetch: window.fetch.bind(window), // Prevents "'fetch' called on an object that does not implement interface Window."
});

export function generateAuthorizationLink() {
  let url = dbx.getAuthenticationUrl(
    redirectUrl,
    null,
    "code",
    "offline",
    null,
    "none",
    true
  );

  sessionStorage.setItem("codeChallenge", dbx.codeChallenge);
  sessionStorage.setItem("codeVerifier", dbx.codeVerifier);

  return url;
}

export function tryToParseCodeFromUrl() {
  let params = new URL(window.location.toString()).searchParams;
  return params.get("code");
}

export function tryReceiveDropboxToken() {
  let code = tryToParseCodeFromUrl();
  if (code !== null) {
    dbx.codeChallenge = sessionStorage.getItem("codeChallenge");
    dbx.codeVerifier = sessionStorage.getItem("codeVerifier");

    dbx
      .getAccessTokenFromCode(redirectUrl, code)
      .then(function (token: any) {
        console.log("Token Result:" + JSON.stringify(token));
        dbx.setRefreshToken(token.refreshToken);
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
