let test = new Object()
const seledka = document.getElementById("select")
const bomba = document.getElementById("bomba")
const begin = document.getElementById("begin")
let date = "2024-07-31"


h1 = begin.appendChild(document.createElement("h1"))
explanation = bomba.appendChild(document.createElement("p"))
image = bomba.appendChild(document.createElement("img"))


seledka.addEventListener("change", function(e){
    API_KEY = "Enter your API KEY"
    let bombaklat = e.target.value
    console.log(bombaklat)
    date = bombaklat
    console.log(date)
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`)
   .then(response => response.json())
   .then(data => {
    test = data
    h1.textContent = test.title
    explanation.textContent = test.explanation
    image.src = test.url

   })
})