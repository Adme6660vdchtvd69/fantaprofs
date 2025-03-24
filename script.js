const characters = [
    { name: "La Fiorella", cost: 666 },
    { name: "Gandolfo", cost: 40 },
    { name: "Sanguedolce", cost: 65 },
    { name: "Pipitone", cost: 65 },
    { name: "Bonafede", cost: 60 },
    { name: "Figuccia", cost: 30 },
    { name: "Gerardi", cost: 25 },
    { name: "Arnone", cost: 60 },
    { nane: "Indelicato", cost: 40 }
];

function startGame() {
    let username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Inserisci il tuo Username");
        return;
    }
    
    // Get or initialize balance
    let users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[username]) {
        users[username] = { balance: 160, turns: [] };
    }
    
    localStorage.setItem("users", JSON.stringify(users));
    document.getElementById("game").style.display = "block";
    document.getElementById("login").style.display = "none";
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
        alert("NON HAI ABBASTANZA PUNTI!");
    }
}

function submitTurn() {
    alert("SQUADRA CREATA!");
    location.href = "index.html";
}
