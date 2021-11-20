const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded())

const User = require('./models/user')
const Cost = require('./models/cost')
const Bill = require('./models/bill')

app.get('/', (req, res) => {
  res.render('pages/index')
})

app.get('/despesas', (req, res) => {
  res.render('pages/despesas')
})

app.get('/grafico', (req, res) => {
  res.render('pages/grafico')
})

app.get('/metas', (req, res) => {
  res.render('pages/metas')
})

app.get('/planos', (req, res) => {
  res.render('pages/planos')
})

app.get('/receitas', (req, res) => {
  res.render('pages/receitas')
})

app.get('/renda', (req, res) => {
  res.render('pages/renda')
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
)
