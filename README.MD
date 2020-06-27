# :books: Simple Books - Back-end

> Application for Simple Books library (Code Challenge)

Here you can find the back-end from the library application. It's an api that represents a CRUD (Create, Read, Update, and Delete) using JavaScript with [Node.js](https://nodejs.org/en/) and NoSQL Database with [MongoDB](https://www.mongodb.com)

## :computer: Development setup

### Project Infos

### Environment Variables

Create a .env file and insert those environment variables

- :key: APP_ URL = Your application url | *Ex : http://localhost:3000*
- :key: MONGO_URL = Your MongoDB url | *Ex: mongodb://localhost:3000/test*
- :key: STORAGE_TYPE = Where the photos will be uploaded | *Options: local or s3*

:warning: Obs: While the application isn't deployed, you can test the aws storage with your own AWS Bucket. Those are the environment variables requured to test the AWS Storage: 

- :key: BUCKET_NAME = Your AWS Bucket's name | *Ex: imgs-upload*
- :key: AWS_ACCESS_KEY_ID = The key given by AWS | *Ex: a long String with letters and numbers*
- :key: AWS_SECRET_ACCESS_KEY= Other key given by AWS | *Ex: a long String with letters and numbers*
- :key: AWS_DEFAULT_REGION = Your AWS Bucket's region | *Ex: us-east-1*



### Dependencies

- :zap: [aws-sdk](https://github.com/aws/aws-sdk-js) - AWS SDK for JavaScript
- :zap: [cors](https://github.com/expressjs/cors#readme) - Node.js CORS Middleware
- :zap: [dotenv](https://github.com/motdotla/dotenv#readme) - Loads environment variables from .env file
- :zap: [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for node.
- :zap: [mongoose](https://github.com/Automattic/mongoose) - Mongoose MongoDB ODM
- :zap: [morgan](https://github.com/expressjs/morgan#readme) - HTTP request logger middleware for node.js
- :zap: [multer](https://github.com/expressjs/multer#readme) - Middleware for handling multipart/form-data.
- :zap: [multer-s3](https://github.com/badunk/multer-s3#readme) - Streaming multer storage engine for AWS S3.
- :zap: [require-dir](https://github.com/aseemk/requireDir) - Helper to require directories.

### Development Dependencies

- :zap: [commitlint](https://github.com/conventional-changelog/commitlint#readme) - Lint commit messages- Shareable commitlint config enforcing conventional commits
- :zap: [commitizen](https://github.com/commitizen/cz-cli) - Git commit, but play nice with conventions.
- :zap: [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) - Commitizen adapter following the conventional-changelog format.
- :zap: [husky](https://github.com/typicode/husky#readme) - Prevents bad commit or push (git hooks, pre-commit/precommit, pre-push/prepush, post-merge/postmerge and all that stuff...)
- :zap: [nodemon](https://github.com/remy/nodemon) - Simple monitor script for use during development of a Node.js app.

### How to use development setup

This application uses Docker to make easier to share the setup. It hasn't been publish at Docker Hub, so for now you will need clone the repository through your terminal and create .env file and set the environments variables. Make sure you have [Docker](https://www.docker.com/get-started) :whale: installed and you can use those commands:

```sh
git clone https://github.com/gabrielemartins/livraria.git
cd livraria/backend
docker build -t name-of-your-image .
docker run -p 3333:3333 -d --name name-of-your-container name-of-your-image
docker compose up
docker start name-of-your-container
```

:checkered_flag: That's it, now you should have the development setup in your computer.

:warning: Obs: If some error appear because of ports, make sure you aren't using requested ports, Docker may need to use your 3333 port for Node.js application image and 27017 port for MongoDB image, but you can try make ports redirection, if you want to.
