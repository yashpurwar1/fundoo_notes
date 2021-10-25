
# FUNDOO_NOTES

FUNDOO_NOTES is a basic note keeping app backend like google keep. It uses express framework, mongoDB database and nodejs. It is having many functional apis like user login, crud api for note and collabrator for note.


## Authors

- [@yashpurwar1](https://www.github.com/octokatherine)

  
## Installation

Install all the packages after cloning the repo. 

```bash
  npm i
```
After installing just go through the routes in the:

```bash
  localhost:300/{route}
```
## Features

- User registration
- User login with token
- Forgot and reset password
- Crud Apis for notes
- Note Collabrations
- Label addition in the notes
- Social login

  
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`URL`: Having the database url. 

`PORT`: Port number

`SECRET_KEY`: For jwt purpose

`EMAIL`: For node mailer

`PASSWORD` Of the above mentioned email

`RESET_URL`: http://localhost:{PORT}

`CLIENT_ID`: google oauth CLIENT_ID

`CLIENT_SECRET`: google oauth CLIENT_SECRET
## Running Tests

To run tests, run the following command

```bash
  npm run test
```
