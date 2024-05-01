import App from './App.svelte';
import '@fontsource/inter/400.css';
import './styles/_base.scss';
import { registerSW } from 'virtual:pwa-register';

registerSW();

const app = new App({
  target: document.getElementById('app')!,
});

export default app;
