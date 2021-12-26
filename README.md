# EXPRESS-SEQUELIZE-SQLITE APPLICATION

## Run Locally

Clone the project

```bash
  git clone https://github.com/AndreyRoztorguev/express-sequelize-sqlite.git
```

Go to the project directory

```bash
  cd express-sequelize-sqlite
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```

## Authors

- [Andrey Roztorguev](https://github.com/AndreyRoztorguev/express-sequelize-sqlite.git)

## Keywords

    bcrypt,
    config,
    express,
    express-validator,
    i18next,
    i18next-fs-backend,
    i18next-http-middleware,
    sequelize,
    sqlite3,
    cross-env,
    nodemon,
    multer

## Deployment

Deploy to heroku

```bash
  git add .
  git commit -m 'commit message'

```

Installation heroku

```
brew install heroku/brew/heroku

```

Login to heroku

```
heroku login
```

Create heroku repository

```
heroku create

```

Configure heroku

```
heroku config:set NPM_CONFIG_PRODUCTION=false YARN_CONFIG_PRODUCTION=false
```

Push souce to heroku

```
git push heroku heroku-deployment:master
```

Watch logs

```
heroku logs --tail
```
