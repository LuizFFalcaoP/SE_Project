function relacionShipExpends(){
    receitaMod1 = document.querySelector("receitaMod1");
    despesasMod1 = document.querySelector("despesasMod1");
    receitaMod2  = document.querySelector("receitaMod2");
    despesasMod2 = document.querySelector("despesasMod2");
    tetoDespesas = document.querySelector("tetoDespesas");
    percentualGastoModulo1 = (receitaMod1 - despesasMod1) /100 * despesasMod1;
    percentualGastoModulo2 = (receitaMod2 -despesasMod2) /100 * despesasMod2;
    if(tetoDespesas>=percentualGastoModulo1 || tetoDespesas>=percentualGastoModulo2 ){
        return "Vocês está dentro da meta estimada"
    }
    return "Será necessário fazer reajuste de gastos"
}

function relacionShipIncomes(){
    receitaMod1 = document.querySelector("receitaMod1");
    receitaMod2 = document.querySelector("receitaMod2");
    despesasMod1 = document.querySelector("despesasMod1");
    depesasMod2 = document.querySelector("depesasMod2");
    console.log(receitaMod1)

    receitaGeral = receitaMod1 + receitaMod2
    despesasTotais = despesasMod1 + despesasMod2

    if(receitaGeral > despesasTotais){
        return "Parabéns, você conseguirá pagar as contas desse mês"
    }
}