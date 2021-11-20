const containerAnnual = document.getElementById('containerAnnual')
const containerMonth = document.getElementById('containerMonth')

const categoriesMonth = ['Material escolar', 'Viagens', 'Comida', 'Transporte']
const categoriesAnnual = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

const expensesMonth = [250, 150, 100, 70]
const expensesAnnual = [250, 150, 100, 70, 80, 70, 62, 92, 828, 298, 38, 48]


function createChart(expenses, isAnnual){
    const correctId = isAnnual ? 'myChartAnnual' : 'myChartMonth';
    const ctx = document.getElementById(correctId).getContext('2d');
    const myChart = new Chart(ctx, {
        type: isAnnual ? 'bar' : 'pie',
        data: {
            labels: isAnnual ? categoriesAnnual : categoriesMonth,
            datasets: [{
                label: isAnnual ? '': '# of Votes',
                data: expenses,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function showGrafMensal(){
    if(containerMonth.style.display === 'none'){
        containerAnnual.style.display = 'none'
        containerMonth.style.display = 'block'
    }else{
        containerMonth.style.display = 'none'
    }
}

function showGrafAnual(){

    if(containerAnnual.style.display === 'none'){
        containerMonth.style.display = 'none'
        containerAnnual.style.display = 'block'
    }else{
        containerAnnual.style.display = 'none'
    }
}
showGrafAnual()
showGrafMensal()

createChart(expensesMonth, false)
createChart(expensesAnnual, true)

