const express = require('express')
const cookieParser = require('cookie-parser');
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('index', { title: 'Hola mundo con EJS', param: req.query.param })
})

IsAuth = (req, res, next) => {
    if (req.cookies && req.cookies.username) {
        return next();
    }
    res.redirect('/login');
}

IsAdmin = (req, res, next) => {
    if (req.cookies && req.cookies.username) {
        return next();
    }
    res.redirect('/login');
}

app.get('/home', IsAuth, (req, res) => {
    res.render('home', { title: 'Home', param: req.query.param });
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
    //console.log(req.body);

    if (username === 'admin' && password === '1234') {
        console.log('Usuario y contraseña correctos');
        res.cookie('username', username);
        res.redirect('/home?param=' + encodeURIComponent(username));
    } else {
        console.log('Usuario y/o contraseña incorrectos');
        res.status(401).redirect('/login');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})


