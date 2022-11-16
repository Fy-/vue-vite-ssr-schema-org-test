import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(__dirname, p);

export async function createServer(root = process.cwd(), hmrPort) {
  const app = express();
  const vite = await (
    await import('vite')
  ).createServer({
    base: '/',
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  });
  // use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    try {
      let template;

      template = fs.readFileSync(resolve('index.html'), 'utf-8');
      template = await vite.transformIndexHtml(req.originalUrl, template);
      const render = (await vite.ssrLoadModule('/src/entry-server.ts')).render;

      const data = await render(req.originalUrl, () => {});
      console.log(data);
      const html = template
        .replace('<!--app-->', data.app)
        .replace('<!--meta-->', data.meta)
        .replace('<!--body-tags-->', data.bodyTags);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}
createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  })
);
