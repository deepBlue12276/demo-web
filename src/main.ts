import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import router from '../src/router';
import '@/style/index.scss';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);
app.use(router);
app.use(ElementPlus);

app.mount('#app');
