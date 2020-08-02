let A = -65.7;
let n = 0.9;
let distances = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let rssiVals = [65.7, 77.2, 83.6, 83, 81.1, 83.8, 85.1, 88.8, 83.8];

// 𝐴−10𝑛log(𝑑).
let rssiFormula = distances.map((distance) => {   
    return (A - 10*n*Math.log(distance)) * -1
})

let rssiMeasures = [71, 62, 61, 72, 67, 66, 64, 63, 65, 66];
let kf = new KalmanFilter({R: 0.01, Q: 3});
let filteredRssi = rssiMeasures.map((rssi)=>{
    return kf.filter(rssi);
})


// Graph showing 5dBm 
async function getData() {
    const response = await fetch('rssi.csv');
    const data = await response.text();
    const rows = data.split('\n').slice(1, -1);
    let obj = [];
    let index = 0;
    rows.forEach(row => {
        
        let blah = row.split(",");

        let nums = blah.slice(1, -2).map((num) => {
            return parseInt(num, 10);
        });

        obj[index] = nums.map((rssi)=>{
            return kf.filter(rssi * -1);
        })

        index++;
    })

    console.log(obj);

    let asdf = obj.map((arr) => {
        let total = arr.reduce((a, b) => a + b, 0);
        return total/9; 
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

    // Graph showing distances


    let expectedDistances = rssiFormula.map((rssi) => {

        let exponent = (A - (rssi*-1))/(10*n)
        return Math.exp(exponent);
    })

    let filteredDistances = asdf.map((rssi) => {

        let exponent = (A - (rssi*-1))/(10*n)
        return Math.exp(exponent); 
    })


    var cy = document.getElementById('dist').getContext('2d');
    var myChart = new Chart(cy, {
        type: 'line',
        data: {
            labels: distances,
            datasets: [{
                label: 'Calculated Distance (m)',
                data: filteredDistances,
            backgroundColor: "rgba(0, 0, 0, 0)",
            borderColor: "red",
            borderWidth: 1,
            responsive: true
            },
            {
            label: 'Expected Distance (m)',
            data: expectedDistances,
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
                        suggestedMax: 10,
                        suggestedMin: 1
                    }
                }]
            },
            title: {
                display: true,
                text: "Expected distance vs Calculated distance after filter"
            }
        }
    });
}

getData();


