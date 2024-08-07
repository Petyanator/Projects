const btn = document.getElementById("addbtn")
let list  = document.getElementById("listofitems")
let input = document.getElementById("input")
let nickname = prompt("Enter your nickname")
let itemlist = []
document.addEventListener("DOMContentLoaded", function(e){
    localStorage.getItem(`${nickname}`, itemlist)
    for(i = 0; i < itemlist.length; i++){
        let li = list.appendChild(document.createElement("li"))
        li.textContent = itemlist[i]
        li.classList.add("listitem")
        trashcan = document.createElement("button")
        trashcan.id = "trash"
        span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.textContent = "delete"
        trashcan.appendChild(span)
        li.appendChild(trashcan)
    }
})
// Creating a trash can
btn.addEventListener("click", function(e){
    if(input.value.trim() === ""){
        return
    }
    let li = list.appendChild(document.createElement("li"))
    li.textContent = input.value
    itemlist += li.textContent + " "
    localStorage.setItem(`${nickname}`, itemlist)
    console.log(itemlist)
    li.classList.add("listitem")
    trashcan = document.createElement("button")
    trashcan.id = "trash"
    span = document.createElement("span")
    span.classList.add("material-symbols-outlined")
    span.textContent = "delete"
    trashcan.appendChild(span)
    li.appendChild(trashcan)
    trashcan.addEventListener("click", function(e){
        list.removeChild(li)
    })
})