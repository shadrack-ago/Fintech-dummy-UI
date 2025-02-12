// Load stored balance and history
let balance = parseFloat(localStorage.getItem("balance")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

document.getElementById("balance").textContent = balance;
updateHistory();

// Deposit function
function deposit() {
    let amount = parseFloat(document.getElementById("deposit-amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    balance += amount;
    saveData(`Deposited: KES ${amount}`);
    document.getElementById("deposit-amount").value = "";
}

// Withdraw function
function withdraw() {
    let amount = parseFloat(document.getElementById("withdraw-amount").value);
    
    if (isNaN(amount) || amount <= 0) {
        alert("Enter a valid amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient balance!");
        return;
    }

    balance -= amount;
    saveData(`Withdrew: KES ${amount}`);
    document.getElementById("withdraw-amount").value = "";
}

// Transfer function
function transfer() {
    let recipient = document.getElementById("recipient").value.trim();
    let amount = parseFloat(document.getElementById("transfer-amount").value);

    if (recipient === "" || isNaN(amount) || amount <= 0) {
        alert("Enter valid recipient and amount.");
        return;
    }

    if (amount > balance) {
        alert("Insufficient balance for transfer!");
        return;
    }

    balance -= amount;
    saveData(`Transferred: KES ${amount} to ${recipient}`);
    document.getElementById("recipient").value = "";
    document.getElementById("transfer-amount").value = "";
}

// Save data and update UI
function saveData(transaction) {
    balance = parseFloat(balance.toFixed(2));
    localStorage.setItem("balance", balance);
    document.getElementById("balance").textContent = balance;

    history.push(transaction);
    localStorage.setItem("history", JSON.stringify(history));

    updateHistory();
}

// Update transaction history
function updateHistory() {
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    
    history.forEach(entry => {
        let li = document.createElement("li");
        li.textContent = entry;
        historyList.appendChild(li);
    });
}
