const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000
const Database = require('better-sqlite3');
const db = new Database('database.sqlite', { verbose: console.log });
const bcrypt = require("bcrypt")

app.set('view engine', 'ejs')

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index', { title: 'Hola mundo con EJS', param: req.query.param })
})

/*IsAuth = (req, res, next) => {
  if (req.cookies && req.cookies.username) {
    return next();
  }
  res.redirect('/login');
}*/

IsAdmin = (req, res, next) => {
  if (req.cookies && req.cookies.username && req.cookies.role === 'admin') {
    return next();
  }
  res.redirect('/login');
}
IsUser = (req, res, next) => {
  if (req.cookies && req.cookies.username && req.cookies.role === 'user') {
    return next();
  }
  res.redirect('/login');
}



/*app.get('/home', IsAuth, (req, res) => {
  res.render('home', { title: 'Home', param: req.query.param });
});*/


app.get('/admin', IsAdmin, (req, res) => {
  res.render('admin', { title: 'Admin', param: req.query.param });
});
app.get('/user', IsUser, (req, res) => {
  res.render('user', { title: 'User', param: req.query.param });
});

//login
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login', error: null });
});

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.redirect('/login');
});

app.post('/login', (req, res) => {
  
  const { username, password } = req.body;
  console.log(req.body);

  const fila = db.prepare('SELECT * FROM users WHERE username = ?');
  const userdb = fila.get(username);

  const newHashedPassword = bcrypt.hash(password, 10);

  if (bcrypt.compareSync(password, userdb.password)) {
    console.log("Login correcto");
    res.cookie('username', userdb.username);
    res.cookie('role', userdb.role);
    res.redirect("/" + userdb.role);
  } else {
    res.render('login', { title: 'Login', error: 'Invalid username or password' });
  } 

});




app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})






// mover el login a la base de datos