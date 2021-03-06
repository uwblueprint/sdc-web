# Social Development Centre

### Master [![CircleCI](https://circleci.com/gh/uwblueprint/sdc-web/tree/master.svg?style=shield)](https://circleci.com/gh/uwblueprint/sdc-web/tree/master)

## Introduction

This is the web client portion of the Social Development Centre Project for [UW Blueprint](https://https://uwblueprint.org/).

This project was started in Fall 2019 and is currently in development.

### Fall 2019 Team

**Project Lead:** Daniel Williams - [@ddgwilli](https://github.com/ddgwilli)

**Project Manager:** Leonard Zhang - [@leonardz](https://github.com/leonardz)

**Designers:**

- Annie Xu
- Carmen Lee

**Developers:**

- Lee Ma - [@lee-ma](https://github.com/lee-ma)
- Daniel Peng - [@danielpeng2](https://github.com/danielpeng2)
- Ritika Rao - [@ritikarao](https://github.com/ritikarao)
- Megan Niu - [@meganniu](https://github.com/meganniu)
- Jayant Shrivastava - [@jayshrivastava](https://github.com/jayshrivastava)

### Winter 2020 Team

**Project Lead:** Leon Ouyang - [@LeozMaxwellJilliams](https://github.com/LeozMaxwellJilliams)

**Project Manager:** James Lu

**Designer:** Brandon Law

**Developers:**

- Ainley Pena
- Faizaan Madhani
- Nim Wijetunga
- Patrick Du
- Stephanie Xu

## Onboarding

This project uses [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Apollo](https://www.apollographql.com/docs/react/), and [SCSS](https://sass-lang.com/).

## Development Setup

Install [Node and NPM](https://nodejs.org/dist/v10.15.0/node-v10.15.0.pkg)
if you haven't already

```
# install dependencies
npm install
```

#### Environment Variable Setup

Create the following `.env.development.local` file:

```
REACT_APP_API_URL=http://localhost:5000
```

#### Running

```
npm start
```

### Deployment

#### Initial Deployment

This app can be best deployed using Heroku. Currently, it is running [here](https://guarded-plains-51025.herokuapp.com). For a new deployment, begin by setting up Heroku account [here](https://heroku.com) and installing the Heroku CLI [here](https://devcenter.heroku.com/articles/heroku-cli).

Then, login:

```
heroku login
```

Inside the project folder, to create a new heroku project:

```
heroku create
```

This project is built using the Heroku Buildpack for Create-React-App found [here](https://github.com/mars/create-react-app-buildpack). Set it during initial deployment:

```
heroku buildpacks:set --buildpack mars/create-react-app
```

Then, push:

```
git add .
git commit -m "<Add a commit message here>"
git push heroku master
heroku open
```

#### Subsequent Deployments

For all future deployments, just push to Heroku using Git:

```
git add .
git commit -m "<Add a commit message here>"
git push heroku master
heroku open
```
