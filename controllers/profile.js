const handleProfileGet = (req, res, db) => {
  const { id } = req.params;

  db.select('*').from('users')
    .where({ id })
    .then(user => {
        if(user.length === 1) {
          res.json(user[0])
        } else {
          res.status(400).json("User not found!")
        }
      }
    )
    .catch(err => res.status(400).json("Error fetching user!"));
}

module.exports = {
  handleProfileGet
}
