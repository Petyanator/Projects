const btn = document.getElementById("addbtn");
let list = document.getElementById("listofitems");
let input = document.getElementById("input");
let itemlist = JSON.parse(localStorage.getItem("itemlist")) || []; // Load the existing items or initialize an empty array

// Function to render the list
function renderList() {
    list.innerHTML = ""; // Clear the list

    // Sort itemlist so that completed items are at the end
    itemlist.sort((a, b) => a.completed - b.completed);

    itemlist.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = item.text;
        li.classList.add("listitem");
        if (item.completed) {
            li.style.textDecoration = "line-through";
        }
        list.appendChild(li);

        let trashcan = document.createElement("button");
        trashcan.id = "trash";
        let span = document.createElement("span");
        span.classList.add("material-symbols-outlined");
        span.textContent = "delete";
        trashcan.appendChild(span);

        let checkBtn = document.createElement("button");
        let spaghetti = document.createElement("span");
        spaghetti.textContent = "check";
        checkBtn.id = "checkbt";
        spaghetti.classList.add("material-symbols-outlined");
        checkBtn.appendChild(spaghetti);

        let box = document.createElement("div");
        box.id = "boxoox";
        box.appendChild(checkBtn);
        box.appendChild(trashcan);
        li.appendChild(box);

        // Add click event for the trash can to remove the item
        trashcan.addEventListener("click", function() {
            itemlist.splice(index, 1); // Remove item from the list
            localStorage.setItem("itemlist", JSON.stringify(itemlist)); // Update localStorage
            renderList(); // Re-render the list
        });

        // Event listener for the check button
        checkBtn.addEventListener("click", function() {
            item.completed = !item.completed; // Toggle completed status
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
    itemlist.push({ text: input.value.trim(), completed: false }); // Add new item with completed status
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
