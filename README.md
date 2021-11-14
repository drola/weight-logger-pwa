<p align="right">
  <img alt="Tests Results Badge" src="https://github.com/drola/weight-logger-pwa/workflows/Tests/badge.svg" />
  <img alt="Trivy Scan Badge" src="https://github.com/drola/weight-logger-pwa/workflows/Trivy/badge.svg" />
</p>

# Weight Logger

Simple and private body weight tracking.

<p align="center">
<a href="./img/screenshot.png"><img alt="Weight Logger PWA Screenshot" src="./img/screenshot_scaled.png"/></a>
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
- Works without an internet connection

## Development Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Install [Node.js](https://nodejs.org/en/) which includes `npm`

### Clone the repository and install dependencies

```
git clone https://github.com/drola/weight-logger-pwa.git
cd weight-logger-pwa
npm install
```

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

## Roadmap

- [x] Add vertical scale to the chart
- [x] Enable offline mode
- [x] Test for clearData and importData actions in the Redux reducer
- [x] Display chart for last 30 days / all time
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
