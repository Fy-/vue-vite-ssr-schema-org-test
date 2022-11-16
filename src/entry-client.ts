import { createApp } from './main';

createApp(false).then(({ app, router }) => {
  router.isReady().then(() => {
    app.mount('#app');
  });
});
