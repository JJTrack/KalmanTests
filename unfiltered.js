// Graph showing average 5dBm rssi values at each distance against expected values
let unfilteredCTX = document.getElementById('chart').getContext('2d');
let unfilteredChart = new Chart(unfilteredCTX, {
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
        },
        {
        label: 'Expected RSSI (-dBm)',
        data: rssiFormula,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "blue",
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
        },
        title: {
            display: true,
            text: "Measured RSSI vs Expected RSSI at -5dBm"
        }
    }
});