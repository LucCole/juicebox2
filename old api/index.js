const express = require('express');
const apiRouter = express.Router();

/* 
this is used anytime that the browser detects the url that matches the first arg.
"use" is used to speify what middleware will be used as the callback function.
*/

// users
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

// posts
const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

// tags
const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

module.exports = apiRouter;