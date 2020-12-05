fetch('https://api.nasa.gov/insight_weather/?api_key=rSeiuzYdFB4Uhvgqt2HuCaIL4dIxezO4ML16lKIY&feedtype=json&ver=1.0')

  .then((response) => {
    return response.json()
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);

    for (var i = 0; i < data.sol_keys.length; i++) {
      var solBtn = document.createElement("button");
      solBtn.classList.add("tabs");

      var solName = document.createElement("h2");
      solName.innerHTML = "Sol " + data.sol_keys[i];
      solBtn.append(solName);

      var solStartDate = document.createElement("h3");
      solStartDate.innerHTML = "Day Start: " + data[data.sol_keys[i]].First_UTC;
      solBtn.appendChild(solStartDate);

      var solEndDate = document.createElement("h3");
      solEndDate.innerHTML = "Day End: " + data[data.sol_keys[i]].Last_UTC;
      solBtn.appendChild(solEndDate);

      document.getElementById("sol_tabs").appendChild(solBtn);
    }
    
    var current = data.sol_keys[data.sol_keys.length - 1];
    //temporarily set to current sol
    document.getElementById("sol_title").innerHTML = "Sol # " + current
    document.getElementById("season").innerHTML = "Season: " + data[current].Season 
    document.getElementById("day_start").innerHTML = "Day Start: " + data[current].First_UTC
    document.getElementById("day_end").innerHTML = "Day End: " + data[current].Last_UTC 
    document.getElementById("pre_avg").innerHTML = "Avg: " + data[current].PRE.av + " Pa" 
    document.getElementById("pre_high").innerHTML = "High: " + data[current].PRE.mx + " Pa" 
    document.getElementById("pre_low").innerHTML = "Low: " + data[current].PRE.mn + " Pa" 

  })
  .catch((err) => {
    // Do something for an error here
  })