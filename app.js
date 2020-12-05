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
    
    var current = data.sol_keys[data.sol_keys.length-1]
    document.getElementById("sol_num").innerHTML = "Sol # " + current //set to current sol
    document.getElementById("season").innerHTML = "Season: " + data[current].Season //set to current sol
    document.getElementById("day_start").innerHTML = "Day Start: " + data[current].First_UTC //set to current sol
    document.getElementById("day_end").innerHTML = "Day End: " + data[current].Last_UTC //set to current sol
    document.getElementById("pre_avg").innerHTML = "Avg: " + data[current].PRE.av + " Pa" //set to current sol
    document.getElementById("pre_high").innerHTML = "High: " + data[current].PRE.mx + " Pa" //set to current sol
    document.getElementById("pre_low").innerHTML = "Low: " + data[current].PRE.mn + " Pa" //set to current sol

  })
  .catch((err) => {
    // Do something for an error here
  })