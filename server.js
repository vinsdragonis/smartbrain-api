const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const saltRounds = 12;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '1',
      name: 'Dragonis',
      email: 'dragonis@gmail.com',
      password: 'ROAR!',
      entries: 0,
      joined: new Date()
    },
    {
      id: '2',
      name: 'Vineeth',
      email: 'vinsdragonis@gmail.com',
      password: 'ROAR!!!',
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: '128',
      hash: '',
      email: ''
    }
  ]
}

app.get("/", (req, res) => {
  res.send(database.users);
});

app.post("/signin", (req, res) => {
  bcrypt.compare("ROAR!!", "$2b$12$vDFuG.RuXwhYSrGI.uyG0eRRj6r9RtXvCoJtJhcb3YVrkmn.Q1qi6", function(err, result) {
    console.log("Success");
  });

  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("ERROR");
  }
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const len = database.users.length;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log(hash);
  });

  database.users.push({
    id: len + 1,
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date()
  });

  res.json(database.users[database.users.length-1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });

  if (!found) {
    res.status(404).json("User not found!");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });

  if (!found) {
    res.status(404).json("User not found!");
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})
