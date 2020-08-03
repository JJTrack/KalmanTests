function updateUnfiltered() {

    unfilteredChart.data.datasets = [{
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

    unfilteredChart.update();

}

function updateCon() {

    conChart.data.datasets = [{
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

    conChart.update();

}




$('.toast').toast('show');


$(document).ready(function() {

    const $valueSpan = $('.valueSpan2');
    const $value = $('#customRange11');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
  
      $valueSpan.html($value.val());

      n = parseFloat($value.val());
      console.log(n);
      rssiFormula = distances.map((distance) => {   
        return (A - 10*n*Math.log(distance)) * -1
        })
      updateUnfiltered();

    });
});

$(document).ready(function() {

    const $valueSpan = $('.valueSpan3');
    const $value = $('#customRange12');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
  
      $valueSpan.html($value.val());

        R = parseFloat($value.val());

        let kg = new KalmanFilter({R: R, Q: Q});
        filteredRssi = rssiMeasures.map((rssi)=>{
            return kg.filter(rssi);
        })

        updateCon();


    });
});