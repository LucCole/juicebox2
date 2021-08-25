const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); // THIS IS DIFFERENT
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {

    const {tagName} = req.params

    console.log(tagName)

    try {
        const posts = await getPostsByTagName(tagName);
        res.send({posts});
    } catch ({ name, message }) {
        throw { name, message };
    }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
});



module.exports = tagsRouter;