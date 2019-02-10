const api = {}

api.signup = User => (req, res) => {
  if (!req.body.username || !req.body.password || !req.body.email)
    return res.json({ success: false, message: 'Please, pass an username and password.' })
  else {
    const user = new User({
      name: req.body.username,
      password: req.body.password,
      email: req.body.email,
      pictire: '0'
    })
    user.save(error => {
      if (error) return res.status(400).json({ success: false, message: 'Username already exists.' })
      return res.json({ success: true, message: 'Account created successfully' })
    })
  }
}

api.index = (User, Token) => (req, res) => {
  if (Token) {
    User.findOne({ _id: req.user._id }, (error, user) => {
      if (error) throw error
      return res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, pictire: user.pictire} })
    })
  } else return res.status(403).send({ success: false, message: 'Unauthorized' })
}

module.exports = api
