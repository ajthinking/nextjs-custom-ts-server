import next from 'next';
import { createServer } from 'http';
import { parse } from 'url';
import { message } from './message';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// eslint-disable-next-line @typescript-eslint/no-floating-promises
app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    if (!req.url) {
      res.statusCode = 400;
      res.end("Bad Request: URL is undefined");
      return;
    }

    // My custom things here

    const parsedUrl = parse(req.url, true);
    void handle(req, res, parsedUrl);
  });

  // Start the HTTP server
  const PORT = process.env.PORT ?? 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
    console.log('Custom server starting <3')
    console.log(`It can import other modules: ${ message }`)    
  });
});