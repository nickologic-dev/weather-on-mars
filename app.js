fetch('https://api.nasa.gov/insight_weather/?api_key=rSeiuzYdFB4Uhvgqt2HuCaIL4dIxezO4ML16lKIY&feedtype=json&ver=1.0')
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data)

    for (var i = 0; i < data.sol_keys.length; i++) {
        console.log(data.sol_keys[i]) // date
        var temp = data.sol_keys[i]
        console.log(data[temp].First_UTC) // start time on Earth
    }
    document.getElementById("sol").innerHTML = "Sol # " + data.sol_keys[data.sol_keys.length-1] //set to current sol

  })
  .catch((err) => {
    // Do something for an error here
  })