// Graph showing 5dBm rssi values at each distance against expected values

let distances = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rssiVals = [65.7, 77.2, 83.6, 83, 81.1, 83.8, 85.1, 88.8, 83.8];
// 𝐴−10𝑛log(𝑑).
let rssiFormula = distances.map((distance) => {
    let A = -65.7;
    let n = 1;
    
    return (A - 10*n*Math.log(distance)) * -1
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

// Graph showing 5dBm rssi values at 1m, measured vs filtered values

let rssiMeasures = [71, 62, 61, 72, 67, 66, 64, 63, 65, 66];
let kf = new KalmanFilter({R: 0.01, Q: 3});
let filteredRssi = rssiMeasures.map((rssi)=>{
    return kf.filter(rssi);
})


var con = document.getElementById('kalman').getContext('2d');
var myChart = new Chart(con, {
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

// Graph showing 5dBm 

async function getData() {
    const response = await fetch('rssi.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1);

    let obj = [];
    let index = 0;
    rows.forEach(row => {

        let blah = row.split(",");
        let nums = blah.slice(1, -1).map((num) => {
            return parseInt(num, 10);
        });

        obj[index] = nums.map((rssi)=>{
            return kf.filter(rssi * -1);
        })

        index++;
    })

    let asdf = obj.map((arr) => {
        let total = arr.reduce((a, b) => a + b, 0);
        return total/10; 
    })

    var cx = document.getElementById('kal').getContext('2d');
    var myChart = new Chart(cx, {
        type: 'line',
        data: {
            labels: distances,
            datasets: [{
                label: 'Filtered RSSI (-dBm)',
                data: asdf,
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
                text: "Filtered RSSI vs Expected RSSI at -5dBm"
            }
        }
    });
}

getData();


