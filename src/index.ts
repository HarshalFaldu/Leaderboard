import express, { Router } from 'express';
import http from 'http';
import { initSocket } from './socket';
import path from 'path';
import { router } from './routes/index';
import { IS_SEED_ENABLED, PORT } from './appConfig';
import { seedPlayers, seedScores } from './seeder/seed';

const app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname, '../public')));
// const io = new Server(server);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const routes: { basePath: string; router: Router }[] = [{ basePath: '/api', router }];

  // load routes
for (const route of routes) {
    app.use(route.basePath, route.router);
}

server.listen(PORT || 3000, async () => {
    if(IS_SEED_ENABLED) {
        await seedPlayers()
        await seedScores()
    }
    initSocket(server);
    console.log(`Server is running on http://localhost:${PORT}`);
});
