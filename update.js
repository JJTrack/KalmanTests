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
    console.log("hello");

}


$(document).ready(function() {

    const $valueSpan = $('.valueSpan2');
    const $value = $('#customRange11');
    $valueSpan.html($value.val());
    $value.on('input change', () => {
  
      $valueSpan.html($value.val());

      n = $value.val();
      rssiFormula = distances.map((distance) => {   
        return (A - 10*n*Math.log(distance)) * -1
        })
      updateUnfiltered();

    });
});