<template>
    <div class="page" :style="route.name == '统一待办中心' ? '' : 'display: flex;'">
        <div class="head">
            <img src="@/assets/images/icon_箭头_左.png" class="left" alt="" />
            <div class="title">{{ route.name }}</div>
            <div class="right">
                <img
                    src="@/assets/images/图层 1 1.png"
                    @click="router.push('/h5/ai')"
                    alt=""
                    v-if="route.name == '统一待办中心'"
                />
            </div>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup>
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();
</script>
<style scoped lang="scss">
    .page {
        height: 100vh;
        width: 100vw;
        flex-direction: column;
    }
    .head {
        background: #0078fe;
        width: 100%;
        height: 100px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        z-index: 5;
        .left {
            height: 50px;
        }
        .right {
            height: 100%;
            display: flex;
            align-items: center;
            cursor: pointer;
            img {
                width: 100px;
            }
        }
    }
    .content {
        height: 100%;
    }
</style>
