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

let message = "";

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

  res.render("pages/index", { user, message });

  setTimeout(() => {
    message = "";
  }, 1000);
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
      userid: 1,
    });
  }

  if (!!viagem) {
    await Cost.create({
      label: "Despesa com viagem",
      value: viagem,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.VIAGENS,
      userid: 1,
    });
  }

  if (!!material) {
    await Cost.create({
      label: "Despesa com Material Escolar",
      value: material,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.MATERIALESCOLAR,
      userid: 1,
    });
  }

  if (!!gerais) {
    await Cost.create({
      label: "Despesas Gerais",
      value: gerais,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.CUSTOSGERAIS,
      userid: 1,
    });
  }

  message = "Despesas atualizadas com sucesso!";

  res.redirect("/");
});

app.get("/despesasMensaisEAnuais", async (req, res) => {
  const costs = await Cost.findAll({
    where: {
      type: tipos.DESPESA,
    },
  });

  const gastosComMaterialEscolar = await Cost.findAll({
    where: {
      category: categorias.MATERIALESCOLAR,
    },
  });

  // const gastosComViagens = await Cost.findAll({
  //   where: {
  //     category: categorias.VIAGENS,
  //   },
  // });

  const gastosGerais = await Cost.findAll({
    where: {
      category: categorias.CUSTOSGERAIS,
    },
  });

  const gastosComEscola = await Cost.findAll({
    where: {
      category: categorias.ESCOLA,
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

  res.send({
    DespesasMensais: [
      gastosComMaterialEscolar
        .map((gasto) => gasto.dataValues.value)
        .reduce(function (soma, i) {
          return (soma += i);
        }),
      300,
      gastosGerais
        .map((gasto) => gasto.dataValues.value)
        .reduce(function (soma, i) {
          return (soma += i);
        }),
      gastosComEscola
        .map((gasto) => gasto.dataValues.value)
        .reduce(function (soma, i) {
          return (soma += i);
        }),
    ],
    DespesasAnuais: [
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
  });
});

app.get("/grafico", (req, res) => {
  res.render("pages/grafico");
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

  message = "Metas atualizadas com sucesso!";

  res.redirect("/");
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

  message = "Planos atualizados com sucesso!";
  res.redirect("/");
});

app.get("/receita", (req, res) => {
  res.render("pages/receitas");
});

app.post("/receita", async (req, res) => {
  const user = await User.findByPk(1);
  const {
    receitaMod1,
    despesasMod1,
    receitaMod2,
    despesasMod2,
    tetoDespesas,
  } = req.body;

  if (!!receitaMod1) {
    await Cost.create({
      label: "Receitas Módulo 1",
      value: receitaMod1,
      date: new Date(),
      type: tipos.RECEITA,
      category: categorias.CARTAODECREDITO,
      userid: 1,
    });
  }

  if (!!despesasMod1) {
    await Cost.create({
      label: "Despesas Módulo 1",
      value: despesasMod1,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.CARTAODECREDITO,
      userid: 1,
    });
  }

  if (!!receitaMod2) {
    await Cost.create({
      label: "Receitas Módulo 2",
      value: receitaMod2,
      date: new Date(),
      type: tipos.RECEITA,
      category: categorias.IMOVEISEALUGUEIS,
      userid: 1,
    });
  }

  if (!!despesasMod2) {
    await Cost.create({
      label: "Despesas Módulo 2",
      value: despesasMod2,
      date: new Date(),
      type: tipos.DESPESA,
      category: categorias.IMOVEISEALUGUEIS,
      userid: 1,
    });
  }

  if (!!tetoDespesas) {
    user.expenseceiling = tetoDespesas;
    await user.save();
  }

  message = "Receitas atualizadas com sucesso!";
  res.redirect("/");
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
    userid: 1,
  });

  message = "Renda atualizada com sucesso!";

  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
