<template>
    <div class="page">
        <img class="head" src="@/assets/images/顶部.png" alt="" />
        <div class="body">
            <el-menu
                active-text-color="#A4A8D9"
                background-color="#1A1848"
                class="menu"
                default-active="1"
                text-color="#fff"
            >
                <el-menu-item index="1" @click="menuClick(1)">
                    <img class="menu-icon" src="@/assets/images/菜单图标.png" alt="" />
                    <span>指标库</span>
                </el-menu-item>
                <el-menu-item index="2" @click="menuClick('/zb/zb2')">
                    <img class="menu-icon" src="@/assets/images/菜单图标 (1).png" alt="" />
                    <span>指标整合报表</span>
                </el-menu-item>
                <el-menu-item index="3" @click="menuClick('/zb/zb1')">
                    <img class="menu-icon" src="@/assets/images/菜单图标 (2).png" alt="" />
                    <span>指标整合图表</span>
                </el-menu-item>
            </el-menu>
            <div class="content" v-loading="loading">
                <div class="view">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const loading = ref(false);
    const router = useRouter();
    const menuClick = (path) => {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
        }, 500);
        router.push({
            path
        });
    };
</script>
<style scoped lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
    .head {
        width: 100%;
    }
    .body {
        width: 100%;
        height: 100%;
        background: #000928;
        display: flex;
        .menu {
            width: 18%;
            height: 100%;
            border: none;
        }
        .el-menu-item {
            gap: 20px;
        }
        .el-menu-item:hover::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 10px;
            left: 0;
            background: #307bff;
        }
        .is-active::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 10px;
            left: 0;
            background: #307bff;
        }
        .is-active {
            background: #273079;
        }
        .el-menu-item:hover {
            background: #273079;
        }
        .menu-icon {
            width: 50px;
        }
        .content {
            width: 100%;
            height: 100%;
            padding: 30px;
            .view {
                background: #111037;
                width: 100%;
                height: 100%;
                overflow: hidden;
                border-radius: 5px;
            }
        }
    }
</style>
