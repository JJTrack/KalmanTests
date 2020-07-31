let distances = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rssiVals = [65.7, 77.2, 83.6, 83, 81.1, 83.8, 85.1, 88.8, 83.8];
// 𝐴−10𝑛log(𝑑).
let rssiFormula = rssiVals.map((rssi) => {
    let A = 65.7;
    let n = 2;
    
    return A - 10*n*Math.log()
})


var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: distances,
        datasets: [{
            label: 'RSSI (-dBm)',
            data: rssiVals,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "red",
        borderWidth: 1,
        responsive: true
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    suggestedMax: 100,
                    suggestedMin: 50
                }
            }]
        }
    }
});