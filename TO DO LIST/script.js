const btn = document.getElementById("addbtn");
let list = document.getElementById("listofitems");
let input = document.getElementById("input");
let itemlist = JSON.parse(localStorage.getItem("itemlist")) || []; // Load the existing items or initialize an empty array

// Function to render the list
function renderList() {
    list.innerHTML = ""; // Clear the list
    itemlist.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item;
        li.classList.add("listitem");
        list.appendChild(li);

        let trashcan = document.createElement("button");
        trashcan.id = "trash";
        let span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.textContent = "delete";
        trashcan.appendChild(span);
        li.appendChild(trashcan);

        // Add click event for the trash can to remove the item
        trashcan.addEventListener("click", function() {
            itemlist.splice(index, 1); // Remove item from the list
            localStorage.setItem("itemlist", JSON.stringify(itemlist)); // Update localStorage
            renderList(); // Re-render the list
        });
    });
}

// Function to add a new item to the list
function addItem() {
    if (input.value.trim() === "") {
        return;
    }
    itemlist.push(input.value.trim()); // Add new item to the list
    localStorage.setItem("itemlist", JSON.stringify(itemlist)); // Save updated list to localStorage
    renderList(); // Re-render the list
    input.value = ""; // Clear the input field
}

// Event listener for the button click
btn.addEventListener("click", addItem);

// Event listener for the Enter key press
input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addItem();
    }
});

// Initial render of the list on page load
document.addEventListener("DOMContentLoaded", renderList);
