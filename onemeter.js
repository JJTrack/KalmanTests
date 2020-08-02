// Graph showing 5dBm rssi values at 1m, measured vs filtered values
var con = document.getElementById('kalman').getContext('2d');
var conChart = new Chart(con, {
    type: 'line',
    data: {
        labels: distances,
        datasets: [{
            label: 'measured RSSI (-dBm)',
            data: rssiMeasures,
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "red",
        borderWidth: 1,
        responsive: true
        },
        {
        label: 'filtered RSSI (-dBm)',
        data: filteredRssi,
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
            text: "Measured RSSI at 1m vs Kalman Filtered values"
        }
    }
});