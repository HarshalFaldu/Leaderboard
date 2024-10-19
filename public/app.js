const socket = io('http://localhost:3000', {
    path: "/api/socket.io"
});

const EVENTS_TO_LISTEN = {
    LEADERBOARD: 'leaderbord',
    ERROR: 'error'
}

const EVENTS_TO_SEND = {
    LIST_LEADERBOARD: 'listLeaderboard',
    UPDATE_SCORE: 'updateScore'
}

// Function to render player data into the table
function renderPlayerTable(players) {
    const playerTableBody = document.getElementById('playerTableBody');
    playerTableBody.innerHTML = '';

    players.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.player.firstName}</td>
            <td>${player.player.lastName}</td>
            <td>${player.score}</td>
        `;
        playerTableBody.append(row);
    });
}

// Get initial list of leaderboard
socket.emit(EVENTS_TO_SEND.LIST_LEADERBOARD)

// Handle receiving messages
socket.on(EVENTS_TO_LISTEN.LEADERBOARD, (data) => {
    const players = data.leaderboard
    renderPlayerTable(players);
});

socket.on(EVENTS_TO_LISTEN.ERROR, (data) => {
    alert(data.message)
})

fetch('/api/players').then(async (data) => {
    const response = await data.json()
    document.addEventListener('DOMContentLoaded', populatePlayerSelect(response.players));
})

function populatePlayerSelect(players) {
    const playerSelect = document.getElementById('playerSelect');
    
    playerSelect.innerHTML = '';

    const option = document.createElement('option');
        option.textContent = `Select a player`;
        option.disabled = true;
        option.selected = true;
        playerSelect.appendChild(option);

    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.firstName} ${player.lastName}`;
        playerSelect.appendChild(option);
    });
}

// Listener for the update score button
document.getElementById('updateScoreBtn').addEventListener('click', () => {
    const playerSelect = document.getElementById('playerSelect');
    const selectedPlayerId = playerSelect.value;
    const newScore = document.getElementById('scoreInput').value;

    if (selectedPlayerId && newScore) {
        const scoreValue = Number(newScore);
        if (scoreValue < 0 || scoreValue > 100) {
            alert('Score must be between 0 and 100.');
            return;
        }
        // Update score socket
        socket.emit(EVENTS_TO_SEND.UPDATE_SCORE, {playerId: selectedPlayerId, score: newScore})
        document.getElementById('scoreInput').value = '';
        playerSelect.selectedIndex = 0

    } else {
        alert('Please select a player and enter a score.');
    }
});
