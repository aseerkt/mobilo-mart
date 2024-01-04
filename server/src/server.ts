import 'dotenv-safe/config';
import http from 'http';
import 'reflect-metadata';

import createApp from './app';
import { errorLog, successLog } from './utils/chalkLogs';

async function startServer() {
  const { app } = await createApp();
  const server = http.createServer(app);

  const PORT = process.env.PORT || 5000;

  server.listen({ port: PORT }, () =>
    console.log(successLog(`Server listening on http://localhost:${PORT}`))
  );
}

startServer().catch((err) => console.error(errorLog(err)));
