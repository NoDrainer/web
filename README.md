# NoDrainer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Install locally

### Prerequisites:
* [Git](https://git-scm.com/downloads)
* [NodeJs > 6.10.2](https://nodejs.org/en/download/)
* [Yarn](https://yarnpkg.com/) installed globally: `npm i -g yarn`

### Clone and set up:
* Get repo: `git clone https://github.com/NoDrainer/web.git`
* Install deps: `yarn`

## Development server

* Dev: `yarn start`.
* Prod: `yarn run start.prod`.

## Build

* Dev: `yarn run build.dev`.
* Prod: `yarn run build.prod`.

## Running unit tests

* `yarn test`

## Deploy to Production

Project is hosted on AWS.S3 and uses AWS.CloudFront. Deploying requires AWS CLI installed and configured.

### Prerequisites

* [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) installed locally
* Configure AWS defaults: `aws configure`
* AWS preview.cloudfront enabled: `aws configure set preview.cloudfront true`

### Deploy

The following command builds project in production mode, uploads files to S3, and invalidates cache for the html files:

```shell
yarn run deploy
```

