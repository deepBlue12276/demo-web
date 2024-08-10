import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VantResolver } from '@vant/auto-import-resolver';
import Component from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve } from 'path';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import postcssPxToRem from 'postcss-pxtorem';
// https://vitejs.dev/config/
export default ({ mode }) => {
    const root = process.cwd();
    return defineConfig({
        // base: '/prd.demo/',
        plugins: [
            vue(),
            AutoImport({
                resolvers: [VantResolver(), ElementPlusResolver()]
            }),
            Component({
                resolvers: [VantResolver(), ElementPlusResolver()]
            })
        ],
        server: {
            port: 4003
        },
        css: {
            postcss: {
                plugins: [
                    postcssPxToRem({
                        rootValue: 37.5,
                        propList: ['*'],
                        exclude: /node_modules/i
                    })
                ]
            }
        },
        resolve: {
            alias: {
                '@': resolve(__dirname, './src')
            }
        }
    });
};
