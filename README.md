<img alt="Tests Results Badge" src="https://github.com/drola/weight-logger-pwa/workflows/Tests/badge.svg" align="right"/>

# Weight Logger

Simple and private body weight tracking.

<p align="center">
<a href="./img/screenshot.png"><img alt="Weight Logger PWA Screenshot" src="./img/screenshot_scaled.png"/></a>
<a href="./img/screenshot_settings.png"><img alt="Weight Logger Settings Screenshot" src="./img/screenshot_settings_scaled.png"/></a>
<br/>
<a href="https://weight-logger.catdad.net/" title="Open Weight Logger PWA">Body Weight Logger. Simple and private.</a>
</p>

Tracking your body weight is an essential tool for anyone who wants to maintain,
lose or gain a few kilos. Observe, decide, act.
By logging numbers from the scale you'll be able to distinguish minor fluctuations
from trends. This will give you ample opportunity to course-correct or keep going.

_Weight Logger_ will be always with you in your pocket.

## Features

- Simple, attractive and mobile-optimized design
- You own the data. Everything stays on your device by default.
- Export data as a CSV file
- Import data from a CSV file
- **Coming soon** backup to OwnCloud, Dropbox or Office 365.
- **Coming soon** launch the app without an internet connection

---

Reading is great for learning, but it can only take you so far. This app is a place to put things into practice.

Things I want to try:

- Material Design + Material UI
- "bring your own storage": This app won't have it's own cloud backend.
  Instead it will rely on existing cloud accounts such as NextCloud, Dropbox, Google Drive, OneDrive.
  Inspiration: draw.io, KeeWeb. File format will be something text based, potentially compressed.
- CSS-in-JS, because Material UI comes with that and haven't had a chance to try out whether it's a good concept
- react-router
- animated transitions, along the lines of what Material Design guidelines suggest
- Progressive Web Apps: let's see how far they can take us
- Writing out the decision making process

## Infrastructure

- minikube, kubectl

```sh
snap install kubectl --classic
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
```

## Lighthouse report

### Performance - score 99/100

Potential improvements:

- lazy load everything related to datetime-picker (~70kB)
- lazy load Dropbox stuff

### Accessibility - score 73/100

To improve:

- <del>buttons should have accessible names.</del>
- <del>links should have discernable names</del>
- <del>allow users to scale the app (meta tag - max-scale >= 5 or user-scalable="yes")</del>

## TODO

- [ ] Test for clearData and importData actions in the Redux reducer
- [ ] Display chart for last 14 days / last month / last 3 months
- [x] Deploy (CI, CD) to AWS Amplify
- [x] Add "Coming Soon" badge to the Dropbox Settings screen
- [x] Persist weight values to the Local Storage
- [x] Add "Clear data" button to the settings
- [x] Add "Save as CSV" button
- [ ] Cache with service worker - make it work offline
- Connection to Dropbox:
  - [x] Trigger and complete Dropbox OAuth flow
  - [ ] Store received tokens
  - [ ] If connected, indicate that in Settings
  - [ ] Add syncing
- <del>Generate favicon https://favicon.io/favicon-generator/</de;>
- Pack as desktop app https://github.com/tauri-apps/tauri
- [x] New color scheme https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=0277BD&primary.text.color=ffffff&secondary.color=FB8C00&secondary.text.color=FAFAFA
- Icons, favicon
- <del>editing, deleting: load actual record based on the URL</del>
- <del>Refactor: Do sorting on all displays/exports but not internally in reducers. This is to be able to refer records simply by their index - not needed anymore</del>
- <del>complete CRUD screens and integrate w redux state</del>
- <del>test reducers</del>
- <del>install redux</del>
- <del>Outline structure of the app state</del>
- <del>research local storage options</del> -> use IndexedDB
- <del>tests for chart utility functions</del>
- <del>Simple home screen chart</del>
- CSV <del>parser</del>, <del>writer</del>

## Decisions

### Identifying objects in URLs?

- hash: problem if two records have same date + weight
- indices: volatile - they can change after date on record changed and records sorted
- **WINNER**: Unique records IDs, valid only within Redux state - not stored in the CSV.

### State

```
- Weight log entries
- Index of the entry being edited
- Storage connections: to IndexedDB, Dropbox, NextCloud
```

#### Actions

```
 - add log entry [entry data]
 - update log entry [entry index, data]
 - delete log entry [entry index]
 - loaded log entries [list of entries]
 - connect storage [type]
 - import/export
```

### Is text based file storage viable?

#### Why is this a concern?

Having dumb text files as a storage will require transferring the whole file on each change.
WebDAV and other APIs don't seem to support any partial file transfers.

#### Numbers:

Data point (datetime+weight)

```js
new Date().toISOString().length; // 24
```

Entry length = 24 (datetime) + 1 (comma) + 5 (weight) + 1 (new line)
= 31 bytes

Year worth of daily entries = 11 kB.

#### Conclusion

CSV is completely ok for this.

### Why React and create-react-app?

React and JSX feel like a very natural extension of HTML and JS.

### Dropbox integration

- Oauth2
- https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle (SHA256, random values)
- https://www.dropbox.com/lp/developers/reference/oauth-guide

## Significant takeaways / things I didn't expect / things I learned

### Composability of Material UI

In the beginning it bothered me that Material UI didn't come with premade common screen layouts. Assumption
was that components that the AppBar, Floating Action Button and the main body of the app need to be composed
in a specific way to look ok. This assumption is wrong. In the age of flexbox layout things got much simpler. Correct
paddings and vertical stretching are much easier to achieve nowadays. The components of Material UI are mostly
self contained. They don't have margins outside and they are easy to position
by wrapping them in a parent div with correct positioning attributes.

### Immer gotcha

Plain `array.indexOf(...)` doesn't work when wrapped inside Immer because the array
is actually an array of proxy objects.

Use `array.findIndex(v => original(v) === myObj)` instead.

## create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
