const express = require(`express`);
const app = express();
const db = require(`./db/connection`);
const bodyParser = require(`body-parser`);
const path = require(`path`);
const loginRouter = require(`./routes/login`);
const {engine} = require(`express-handlebars`);
const session = require(`express-session`);
const flash = require(`connect-flash`);
const PORT = 3000;

app.use(session({
  secret: 'uma_chave_secreta_aqui', // chave para assinar a sessão
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

//body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//handlebars
app.engine(`handlebars`, engine({defaultLayout: `main`}));
app.set(`view engine`, `handlebars`);
app.set(`views`, `./views`);

//Variaveis Globais
app.use((req, res, next) => {
    res.locals.success_msg = req.flash(`success_msg`);
    res.locals.error_msg = req.flash(`error_msg`);
    next();
});

//public
app.use(express.static(path.join(__dirname, `public`)));

//Rotas
app.get(`/`, (req, res) => {
  res.redirect(`/auth`)
})
app.use(`/auth`, loginRouter);

// Conexão com banco
db.authenticate()
  .then(() => console.log('Conectou ao banco com sucesso'))
  .catch(err => console.log('Erro ao conectar:', err));

db.sync()
  .then(() => console.log('Banco sincronizado'))
  .catch(err => console.log(err));
  
app.listen(PORT, function() {
    console.log(`O servidor esta ouvindo a porta ${PORT}`);
})