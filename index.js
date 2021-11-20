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

app.get('/', async (req, res) => {
  const user = await User.findByPk(1)

  res.render('pages/index', { user })
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

app.get('/receita', (req, res) => {
  res.render('pages/receitas')
})

app.get('/renda', async (req, res) => {
  const user = await User.findByPk(1)
  res.render('pages/renda', {renda: user.monthlyreceipt})
})

app.post('/renda', async (req, res) => {
  const user = await User.findByPk(1)
  const {rendaMensal, ganhoExterno} = req.body

  user.monthlyreceipt = rendaMensal

  await user.save()
  await Cost.create({
    label: 'Ganho Externo',
    value: ganhoExterno,
    date: new Date(),
    type: 'receita',
    category: 'Custos gerais',
    userId: user.id
  })

  res.redirect('/')
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
)
