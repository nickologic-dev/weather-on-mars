fetch('https://api.nasa.gov/insight_weather/?api_key=rSeiuzYdFB4Uhvgqt2HuCaIL4dIxezO4ML16lKIY&feedtype=json&ver=1.0')

  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data);

    var current = data.sol_keys[data.sol_keys.length - 1];

    var selected = current

    for (var i = 0; i < data.sol_keys.length; i++) {
      var solBtn = document.createElement("button");
      solBtn.classList.add("tabs");

      var solName = document.createElement("h2");
      solName.innerHTML = "Sol " + data.sol_keys[i];
      solName.id = "sol_name"
      solBtn.append(solName);

      var solStartDate = document.createElement("h3");
      solStartDate.innerHTML = "Day Start: " + data[data.sol_keys[i]].First_UTC;
      solBtn.appendChild(solStartDate);

      var solEndDate = document.createElement("h3");
      solEndDate.innerHTML = "Day End: " + data[data.sol_keys[i]].Last_UTC;
      solBtn.appendChild(solEndDate);

      solBtn.onclick = function(event) {
        selected = Number(this.firstChild.innerHTML.substring(4, 7)); 
        assignData(selected, data);
      }

      document.getElementById("sol_tabs").appendChild(solBtn);
    }

    assignData(selected, data)

  })
  .catch((err) => {
    // Do something for an error here
  })

  function assignData(selected, data) {
    console.log(selected)
    document.getElementById("sol_title").innerHTML = "Sol # " + selected
    document.getElementById("season").innerHTML = "Season: " + data[selected].Season 
    document.getElementById("day_start").innerHTML = "Day Start: " + data[selected].First_UTC
    document.getElementById("day_end").innerHTML = "Day End: " + data[selected].Last_UTC 
    document.getElementById("pre_avg").innerHTML = "Avg: " + data[selected].PRE.av + " Pa" 
    document.getElementById("pre_high").innerHTML = "High: " + data[selected].PRE.mx + " Pa" 
    document.getElementById("pre_low").innerHTML = "Low: " + data[selected].PRE.mn + " Pa" 
  }