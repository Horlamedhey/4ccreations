import {Router} from 'express'
import User from '../models/user'
const router = Router()

export default
{
  users: router.post('/createUser', (req, res) => {
    let user = new User()
    user._id = user._id
    user.title = req.body.title
    user.name = req.body.name
    user.username = req.body.username
    user.phone = req.body.phone
    user.email = req.body.email
    user.status = req.body.status
    user.password = req.body.password
    user.nationality = req.body.nationality
    user.state = req.body.state
    user.city = req.body.city
    user.newsletter = req.body.newsletter
    user.createdOn = req.body.createdOn
    // if (User.findOne(user.email)) {
    //   res.send('voila')
    // }
    user.save(function (error) {
      console.log(user)
      if (error) {
        throw error
      }
      res.send('Registered Successfully')
    })
  })
}
