let countries = [];
const namebox = document.getElementById("namebox");
const select = document.getElementById("select");
const output = document.getElementById("output");
const fileInputEl = document.querySelector("input[type=file]");

// Create elements for displaying the country and city
const countryHeader = document.createElement("h1");
const cityHeader = document.createElement("h2");

// Append these elements to the namebox
namebox.appendChild(countryHeader);
namebox.appendChild(cityHeader);

fetch("countryAndCapitals.json")
  .then(response => response.json())
  .then(data => {
    countries = data;
    console.log(countries);

    // Populate the select element with country options
    for (let i = 0; i < countries.length; i++) {
      const option = document.createElement("option");
      option.value = i;  // Use the index as the value
      option.textContent = countries[i].country;
      select.appendChild(option);
    }

    // Initially display the first country's details
    if (countries.length > 0) {
      countryHeader.textContent = countries[0].country;
      cityHeader.textContent = countries[0].city;
    }

    // Add an event listener to the select element to update the displayed country and city
    select.addEventListener("change", (event) => {
      const selectedIndex = event.target.value;
      countryHeader.textContent = countries[selectedIndex].country;
      cityHeader.textContent = countries[selectedIndex].city;
    });
  })
  .catch(error => console.error('Error fetching data:', error));


