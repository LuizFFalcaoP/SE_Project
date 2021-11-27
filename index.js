const express = require("express");
const path = require("path");
const datefns = require("date-fns");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const User = require("./models/user");
const Cost = require("./models/cost");
const Bill = require("./models/bill");

tipos = {
  RECEITA: "receita",
  DESPESA: "despesa",
};

categorias = {
  CARTAODECREDITO: "Cartão de crédito",
  IMOVEISEALUGUEIS: "Imóveis e aluguéis",
  ESCOLA: "Escola",
  VIAGENS: "Viagens",
  MATERIALESCOLAR: "Material Escolar",
  CUSTOSGERAIS: "Custos gerais",
};

DespesasDeJaneiro = 0;
DespesasDeFevereiro = 0;
DespesasDeMarco = 0;
DespesasDeAbril = 0;
DespesasDeMaio = 0;
DespesasDeJunho = 0;
DespesasDeJulho = 0;
DespesasDeAgosto = 0;
DespesasDeSetembro = 0;
DespesasDeOutubro = 0;
DespesasDeNovembro = 0;
DespesasDeDezembro = 0;

DespesasAnuais = [];

const despesasPorMes = (mes, valor) => {
  switch (mes) {
    case 1:
      DespesasDeJaneiro += valor;
      break;
    case 2:
      DespesasDeFevereiro += valor;
      break;
    case 3:
      DespesasDeMarco += valor;
      break;
    case 4:
      DespesasDeAbril += valor;
      break;
    case 5:
      DespesasDeMaio += valor;
      break;
    case 6:
      DespesasDeJunho += valor;
      break;
    case 7:
      DespesasDeJulho += valor;
      break;
    case 8:
      DespesasDeAgosto += valor;
      break;
    case 9:
      DespesasDeSetembro += valor;
      break;
    case 10:
      DespesasDeOutubro += valor;
      break;
    case 11:
      DespesasDeNovembro += valor;
      break;
    case 12:
      DespesasDeDezembro += valor;
      break;
    default:
      break;
  }
};

const retornaAno = (data) => {
  return datefns.getYear(new Date(data));
};

app.get("/", async (req, res) => {
  const user = await User.findByPk(1);

  res.render("pages/index", { user });
});

app.get("/despesas", (req, res) => {
  res.render("pages/despesas");
});

app.post("/despesas", async (req, res) => {
  const { escola, viagem, material, gerais } = req.body;

  if (!!escola) {
    await Cost.create({
      label: "Despesa com escola",
      value: escola,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.ESCOLA,
      userid: user.id,
    });
  }

  if (!!viagem) {
    await Cost.create({
      label: "Despesa com viagem",
      value: viagem,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.VIAGENS,
      userid: user.id,
    });
  }

  if (!!material) {
    await Cost.create({
      label: "Despesa com Material Escolar",
      value: material,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.MATERIALESCOLAR,
      userid: user.id,
    });
  }

  if (!!gerais) {
    await Cost.create({
      label: "Despesas Gerais",
      value: viagem,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.CUSTOSGERAIS,
      userid: user.id,
    });
  }

  res.redirect("/");
});

app.get("/grafico", async (req, res) => {
  const costs = await Cost.findAll({
    where: {
      type: tipos.DESPESA,
    },
  });

  costs.forEach((cost) => {
    despesasPorMes(datefns.getMonth(new Date(cost.date), cost.value));
  });

  costs.forEach((cost) => {
    if (DespesasAnuais.length === 0)
      DespesasAnuais.push({ value: cost.value, year: retornaAno(cost.year) });

    DespesasAnuais.forEach((element) => {
      if (element.year !== retornaAno(cost.date)) {
        DespesasAnuais.push({ value: cost.value, year: retornaAno(cost.year) });
      } else {
        element.value += cost.value;
      }
    });
  });

  res.render("pages/grafico", {
    DespesasMensais: [
      DespesasDeJaneiro,
      DespesasDeFevereiro,
      DespesasDeMarco,
      DespesasDeAbril,
      DespesasDeMaio,
      DespesasDeJunho,
      DespesasDeJulho,
      DespesasDeAgosto,
      DespesasDeSetembro,
      DespesasDeOutubro,
      DespesasDeNovembro,
      DespesasDeDezembro,
    ],
    DespesasAnuais: DespesasAnuais.map((despesa) => despesa.value),
  });
});

app.get("/metas", async (req, res) => {
  const user = await User.findByPk(1);
  res.render("pages/metas", {
    user,
  });
});

app.post("/metas", async (req, res) => {
  const user = await User.findByPk(1);
  const { reducao, aumento } = req.body;

  user.increasegoal = aumento;
  user.decreasegoal = reducao;

  await user.save();

  res.redirect("pages/metas");
});

app.get("/planos", async (req, res) => {
  const user = await User.findByPk(1);
  res.render("pages/planos", {
    escola: user.receiptpercenttoschool,
    viagens: user.receiptpercenttotravel,
    material: user.receiptpercenttoschoolarshipmaterial,
    geral: user.receiptpercenttogeneral,
  });
});

app.post("/planos", async (req, res) => {
  const user = await User.findByPk(1);
  const { escola, viagens, material, geral } = req.body;

  user.receiptpercenttoschool = escola;
  user.receiptpercenttotravel = viagens;
  user.receiptpercenttoschoolarshipmaterial = material;
  user.receiptpercenttogeneral = geral;

  await user.save();
  res.redirect("/");
});

app.get("/receita", (req, res) => {
  res.render("pages/receitas");
});

app.get("/renda", async (req, res) => {
  const user = await User.findByPk(1);
  res.render("pages/renda", { renda: user.monthlyreceipt });
});

app.post("/renda", async (req, res) => {
  const user = await User.findByPk(1);
  const { rendaMensal, ganhoExterno } = req.body;

  user.monthlyreceipt = rendaMensal;

  await user.save();

  await Cost.create({
    label: "Ganho Externo",
    value: ganhoExterno,
    date: new Date(),
    type: "receita",
    category: "Custos gerais",
    userid: user.id,
  });

  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
