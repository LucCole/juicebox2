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
        const allPosts = await getPostsByTagName(tagName);


        //http://localhost:3000/api/tags/%23sometagname/posts

        // console.log('testing!!: ', (req.user && post.author.id === req.user.id))

        const posts = allPosts.filter(post => {


            // the post is active, doesn't matter who it belongs to
            if (post.active) {
                return true;
            }

            // the post is not active, but it belogs to the current user
            if (req.user && post.author.id === req.user.id) {
                return true;
            }

            // none of the above are true
            return false;
        });

        res.send({posts});
    } catch (error) {
        next(error);
    }
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();
  
    res.send({
      tags
    });
});



module.exports = tagsRouter;