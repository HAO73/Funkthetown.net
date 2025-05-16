import { createApp } from 'vue';
import App from './App.vue';

// Importations explicites pour résoudre les erreurs 404
import './router/routes.js';
import './store.js';

createApp(App).mount('#app');
