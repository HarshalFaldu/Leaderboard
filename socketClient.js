const {io} = require('socket.io-client')

const socket = io("http://localhost:3000/", {
    path: "/api/socket.io"
});

socket.on("connect", () => {
    console.log("connected")

    // socket.emit('listLeaderboard', {})

    socket.on("leaderbord", (data) => {
        const {leaderboard} = data;
        // console.log(leaderboard.length)
        leaderboard.forEach((e) => {
            console.table(`${e.player.firstName} ${e.player.lastName} has score ${e.score}`)
        });
    })

    socket.emit('updateScore', {playerId: 'jEVyX1Y52oz3MJPCjJcRRZ7s', score: 110})
})