# NoDrainer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.4.

## Install locally

### Prerequisites:
* [Git](https://git-scm.com/downloads)
* [NodeJs > 6.10.2](https://nodejs.org/en/download/)

### Clone and set up:
* Get repo: `git clone https://github.com/NoDrainer/web.git`
* Install deps: `npm install`

## Development server

* Dev: `npm start`.
* Prod: `npm run start.prod`.

## Build

 `npm run build`.

## Running unit tests

* `npm test`

## Deploy to Production

Project is hosted on AWS.S3 and uses AWS.CloudFront. Deploying requires AWS CLI installed and configured.

### Prerequisites

* [AWS CLI](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) installed locally
* Configure AWS defaults: `aws configure`
* AWS preview.cloudfront enabled: `aws configure set preview.cloudfront true`

### Deploy

The following command builds project in production mode, uploads files to S3, and invalidates cache for the html files:

```shell
npm run deploy
```
