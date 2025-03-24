const characters = [
    { name: "Warrior", cost: 50 },
    { name: "Mage", cost: 70 },
    { name: "Archer", cost: 40 }
];

function startGame() {
    let username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }
    
    // Get or initialize balance
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
        users[username] = { balance: 160, turns: [] };
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("game").style.display = "block";
    document.getElementById("balance").innerText = users[username].balance;
    
    // Show character selection
    let characterDiv = document.getElementById("characters");
    characterDiv.innerHTML = "";
    characters.forEach((char, i) => {
        characterDiv.innerHTML += `
            <button onclick="buyCharacter('${username}', ${i})">
                ${char.name} - ${char.cost} points
            </button>
        `;
    });
}

function buyCharacter(username, index) {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users[username];

    if (user.balance >= characters[index].cost) {
        user.balance -= characters[index].cost;
        user.turns.push(characters[index].name);
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("balance").innerText = user.balance;
    } else {
        alert("Not enough points!");
    }
}

function submitTurn() {
    alert("Turn submitted!");
    location.href = "index.html";
}
