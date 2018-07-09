import {Router} from 'express'
const Post = require('../models/post')
const router = Router()

router.post('/newPost', (req, res) => {
  let post =
    {
      title: req.body.title,
      description: req.body.description,
      img: req.body.img,
      category: req.body.category,
      comments: req.body.comments,
      likes: req.body.likes,
      uploader: req.body.uploader,
      uploaderImg: req.body.uploaderImg,
      time: req.body.time
    }
  Post.create(post, function (err, post) {
    if (err) {
      console.log(err)
      res.send('Unable to create post at this moment, please try again.')
    } else {
      res.send(post)
    }
  })
})

router.get('/fetchPosts', (req, res) => {
  Post.find(function (err, posts) {
    if (err) {
      console.log(err)
      res.send('Unable to fetch post at this moment, please try again.')
    } else {
      res.send(posts)
    }
  })
})

export default router
