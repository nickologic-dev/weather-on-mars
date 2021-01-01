fetch('https://api.nasa.gov/insight_weather/?api_key=rSeiuzYdFB4Uhvgqt2HuCaIL4dIxezO4ML16lKIY&feedtype=json&ver=1.0')

  .then((response) => {
    return response.json()
  })
  .then((data) => {
    console.log(data);

    var length = data.sol_keys.length - 1
    var current = data.sol_keys[length];

    var selected = current

    //create tab buttons
    for (var i = 0; i < data.sol_keys.length; i++) {
      var solBtn = document.createElement("button");
      solBtn.classList.add("tabs");

      var solName = document.createElement("h2");
      solName.innerHTML = "Sol " + data.sol_keys[length-i];
      solName.id = "sol_name"
      solBtn.append(solName);

      var solStartDate = document.createElement("h3");
      solStartDate.innerHTML = "Day Start: " + data[data.sol_keys[length-i]].First_UTC;
      solBtn.appendChild(solStartDate);

      var solEndDate = document.createElement("h3");
      solEndDate.innerHTML = "Day End: " + data[data.sol_keys[length-i]].Last_UTC;
      solBtn.appendChild(solEndDate);

      solBtn.onclick = function(event) {
        selected = Number(this.firstChild.innerHTML.substring(4, 7)); 
        assignData(selected, data);
      }

      document.getElementById("sol_tabs").appendChild(solBtn);
    }

    //create wind diagram
    var dir_array = ["N", "E", "S", "W"];
    for (var i = 0; i < 4; i++) {
      var newDir = document.createElement("h2");
      newDir.className = "direction_name";
      newDir.setAttribute("style", "--x: " + ((i%2) * (2-i)) + "; --y: " + (((i+1)%2) * (i-1)) + ";");
      newDir.innerHTML = dir_array[i];

      document.getElementById("wind").appendChild(newDir);
    }
    for (var i = 0; i < 16; i++) {
      var newDiv = document.createElement("div");
      newDiv.className = "pie_segment";
      newDiv.setAttribute("style", "--offset: " + (i * 6.25) + "; --value: " + 6.25 + ";");
      document.getElementById("wind_pie").appendChild(newDiv);

      var newCTPie = document.createElement("div");
      newCTPie.className = "ct_pie";
      newCTPie.id = "direction_" + [i+1].toString();
      document.getElementById("wind").appendChild(newCTPie);

      var newSegment = document.createElement("div");
      newSegment.className = "pie_segment";
      newSegment.setAttribute("style", "--offset: " + (3.125 + (i * 6.25)) + "; --value: " + 6.25 +
      "; --bg: aqua");
      newCTPie.appendChild(newSegment);
    }

    assignData(selected, data)

  })
  .catch((err) => {
    // Do something for an error here
  })

  function assignData(selected, data) {
    document.getElementById("sol_title").innerHTML = "Sol # " + selected
    document.getElementById("season").innerHTML = "Season: " + data[selected].Season 
    document.getElementById("day_start").innerHTML = "Day Start: " + data[selected].First_UTC
    document.getElementById("day_end").innerHTML = "Day End: " + data[selected].Last_UTC 
    document.getElementById("pre_avg").innerHTML = "Avg: " + data[selected].PRE.av + " Pa" 
    document.getElementById("pre_high").innerHTML = "High: " + data[selected].PRE.mx + " Pa" 
    document.getElementById("pre_low").innerHTML = "Low: " + data[selected].PRE.mn + " Pa"
    for (i = 0; i < 16; i++) {
      if (data[selected].WD[i] != null) {
        document.getElementById("direction_" + [i+1].toString()).setAttribute(
            "style", "--ctSize: " + data[selected].WD[i].ct + ";"
        )
      } else {
        document.getElementById("direction_" + [i+1].toString()).setAttribute(
            "style", "--ctSize: 0;"
        )
      }
    }
  }