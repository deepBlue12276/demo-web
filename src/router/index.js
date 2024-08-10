import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
    history: createWebHashHistory('/prd.demo/'),
    routes
});
export default router;
