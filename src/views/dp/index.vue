<template>
    <div v-loading.fullscreen.lock="l1" class="page">
        <div v-if="dialog1" class="dialog" @click="dialog1 = false">
            <img src="@/assets/images/弹框 copy 2.png" alt="" @click="dialog1 = false" />
        </div>
        <div v-if="dialog2" class="dialog" @click="dialog2 = false">
            <img src="@/assets/images/Group 1321315624.png" alt="" @click="dialog2 = false" />
        </div>
        <div v-if="dialog3" class="dialog" @click="dialog3 = false">
            <img src="@/assets/images/Group 1321315624 copy.png" alt="" @click="dialog3 = false" />
        </div>
        <el-dialog v-model="dialog4" title="" width="600" :before-close="handleClose">
            <div class="dialog-t">
                <span>是否发起外呼</span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialog4 = false"> 是 </el-button>
                    <el-button @click="dialog4 = false">否</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialog5" title="" width="600" :before-close="handleClose">
            <div class="dialog-t">
                <span>是否发起在线会议</span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="dialog5 = false"> 是 </el-button>
                    <el-button @click="dialog5 = false">否</el-button>
                </div>
            </template>
        </el-dialog>
        <div v-if="dialog6" class="dialog6" @click="dialog6 = false">
            <img src="@/assets/images/501723429284_.pic.jpg" alt="" @click="dialog6 = false" />
        </div>
        <img class="head" src="@/assets/images/7.png" />
        <div class="content">
            <img v-if="current == 'd1'" src="@/assets/images/Frame 427320245.png" alt="" class="left" />
            <img v-if="current == 'd2'" src="@/assets/images/Frame 4273202451.png" alt="" class="left" />
            <img v-if="current == 'd3'" src="@/assets/images/Frame 427320245 copy 2.png" alt="" class="left" />
            <div class="middle">
                <div
                    v-if="current == 'd1'"
                    class="map"
                    @mouseenter="() => (showHover = true)"
                    @mouseleave="() => (showHover = false)"
                >
                    <img v-show="!showHover && current == 'd1'" src="@/assets/images/Group 1321315590.png" alt="" />
                    <img
                        v-show="showHover && current == 'd1'"
                        src="@/assets/images/Group 13213155901.png"
                        alt=""
                        @click="
                            loadingFull(() => {
                                current = 'd2';
                            })
                        "
                    />
                </div>
                <div
                    v-if="current == 'd2'"
                    class="map d2"
                    @mouseenter="() => (showHover = true)"
                    @mouseleave="() => (showHover = false)"
                >
                    <img v-show="!showHover && current == 'd2'" src="@/assets/images/地图.png" alt="" />
                    <img
                        v-show="showHover && current == 'd2'"
                        src="@/assets/images/地图-芙蓉区.png"
                        alt=""
                        @click="
                            loadingFull(() => {
                                current = 'd3';
                            })
                        "
                    />
                </div>
                <div v-if="current == 'd3'" class="d3-btn-l">
                    <div
                        v-for="i in d3Btns"
                        :key="i.t"
                        class="btn"
                        :class="currentD3 == i.v ? 'active' : ''"
                        @click="
                            loadingl2(() => {
                                currentD3 = i.v;
                            })
                        "
                    >
                        {{ i.t }}
                    </div>
                </div>
                <div v-if="current == 'd3'" v-loading="l2" class="map d2">
                    <img v-show="currentD3 == 'a'" src="@/assets/images/Group 1321315595.png" alt="" />
                    <img
                        v-show="currentD3 == 'b'"
                        src="@/assets/images/Group 1321315595 copy.png "
                        alt=""
                        @click="dialog3 = true"
                    />
                    <img v-show="currentD3 == 'c'" src="@/assets/images/Group 132131559511.png" alt="" />
                    <img
                        v-show="currentD3 == 'd'"
                        src="@/assets/images/Group 1321315595123.png"
                        alt=""
                        @click="dialog1 = true"
                    />
                    <img v-show="currentD3 == 'e'" src="@/assets/images/Group 1321315595.png" alt="" />
                    <img
                        v-show="currentD3 == 'f'"
                        src="@/assets/images/Group 1321315595 copy 2.png"
                        alt=""
                        @click="dialog2 = true"
                    />
                </div>
                <div v-if="current == 'd2'" class="middle-d2">
                    <img src="@/assets/images/省市区切换.png" alt="" />
                </div>
                <div
                    v-if="current == 'd3'"
                    class="middle-d3"
                    :style="currentD3 == 'a' ? 'justify-content: flex-end;' : ''"
                >
                    <img
                        v-if="currentD3 == 'b'"
                        style="height: 100%"
                        class="l"
                        src="@/assets/images/Frame 427320283.png"
                        alt=""
                    />
                    <img v-if="currentD3 == 'c'" class="l" src="@/assets/images/Frame 427320212383.png" alt="" />
                    <img v-if="currentD3 == 'd'" class="l" src="@/assets/images/Frame 42732023283.png" alt="" />
                    <img v-if="currentD3 == 'f'" class="l" src="@/assets/images/Frame 42732013283.png" alt="" />
                    <img src="@/assets/images/省市区切换.png" alt="" />
                </div>
                <img v-if="current == 'd1'" src="@/assets/images/Frame 427320244.png" alt="" class="middle-b" />
                <img v-if="current == 'd2'" src="@/assets/images/Frame 427320244 copy.png" alt="" class="middle-b" />
                <img v-if="current == 'd3'" src="@/assets/images/Frame 427320244 copy 2.png" alt="" class="middle-b" />
            </div>
            <div class="right">
                <img v-if="current == 'd1'" src="@/assets/images/Frame 427320243.png" alt="" class="a" />
                <img v-if="current == 'd1'" src="@/assets/images/Frame 427320242.png" alt="" class="b" />
                <img v-if="current == 'd2'" src="@/assets/images/Frame 427320243 copy.png" alt="" class="a" />
                <img v-if="current == 'd2'" src="@/assets/images/Frame 427320242 copy.png" alt="" class="b" />
                <img v-if="current == 'd3'" src="@/assets/images/Frame 427320243 copy 2.png" alt="" class="a" />
                <img v-if="current == 'd3'" src="@/assets/images/Frame 427320242 copy 2.png" alt="" class="b" />
                <div class="tk">
                    <img src="@/assets/images/弹框.png" alt="" class="c" />
                    <img src="@/assets/images/Frame 427320261.png" alt="" class="d" />
                    <div class="content">
                        <div class="shop">中国移动(和顺营业厅)</div>
                        <div class="address">地址：长沙市岳麓区和顺路和顺洋湖壹号</div>
                        <div class="loadText">{{ loadText }}</div>
                        <div class="text">建议操作：</div>
                        <div class="btns">
                            <div class="btn" @click="dialog1 = true">查看监控</div>
                            <div class="btn" @click="dialog4 = true">外呼</div>
                            <div class="btn" @click="dialog5 = true">发起在线会议</div>
                            <div class="btn" @click="dialog6 = true">发起调度任务</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const showHover = ref(false);
    const current = ref('d1');
    const currentD3 = ref('a');
    const d3Btns = ref([
        { t: '市场', v: 'a' },
        { t: '人员', v: 'b' },
        { t: '资源', v: 'c' },
        { t: '渠道', v: 'd' },
        { t: '任务', v: 'e' },
        { t: '商机', v: 'f' }
    ]);
    const l1 = ref(false);
    const loadingFull = (fn) => {
        l1.value = true;
        setTimeout(() => {
            fn && fn();
            l1.value = false;
        }, 500);
    };
    const l2 = ref(false);
    const loadingl2 = (fn) => {
        l2.value = true;
        setTimeout(() => {
            fn && fn();
            l2.value = false;
        }, 500);
    };
    loadingFull();
    const text = '该渠道连续5日业务量为“0”，且该渠道营业状态正常，是否发起调度干预。';
    const loadText = ref('');
    const index = ref(0);
    const showNextCharacter = () => {
        if (index.value < text.length) {
            loadText.value += text[index.value];
            index.value++;
        } else {
            clearInterval(timer);
        }
    };
    let timer = null;
    const handleLoadT = () => {
        timer = setInterval(showNextCharacter, 200);
    };
    handleLoadT();
    const dialog1 = ref(false);
    const dialog2 = ref(false);
    const dialog3 = ref(false);
    const dialog4 = ref(false);
    const dialog5 = ref(false);
    const dialog6 = ref(false);
</script>
<style scoped lang="scss">
    .page {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        background: #110b4a;
        background-image: url('../../assets//images/背景图片.png');
        background-size: 100% 100%;
        overflow: hidden;
    }
    .head {
        width: 100%;
    }
    .content {
        display: flex;
        flex: 1;
        width: 100%;
        min-height: 0;
        justify-content: space-between;

        .left {
            height: 100%;
            object-fit: cover;
        }
        .middle {
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .active {
                background-image: url('@/assets/images/Group 48097267.png');
                background-size: 100% 100%;
            }
            .d3-btn-l {
                width: 100%;
                display: flex;
                padding: 0 80px;
                .btn {
                    cursor: pointer;
                    width: 200px;
                    height: 80px;
                    line-height: 80px;
                    text-align: center;
                }
            }
            .map {
                height: 60%;
                img {
                    height: 100%;
                    cursor: pointer;
                }
            }
            .d2 {
                height: 40%;
            }
            .middle-d2 {
                height: 10%;
                width: 100%;
                display: flex;
                justify-content: flex-end;
                margin-bottom: 5vh;
            }
            .middle-d3 {
                margin-top: -5vh;
                height: 10%;
                width: 100%;
                display: flex;
                padding: 0 50px;
                justify-content: space-between;
                margin: 3vh 0;
                .l {
                    height: 50%;
                    margin-top: 50px;
                }
            }

            .middle-b {
                height: 40%;
            }
        }
        .right {
            display: flex;
            flex-direction: column;
            height: 100%;
            align-items: center;
            position: relative;
            width: auto;
            .a {
                height: 28%;
                width: auto;
            }
            .b {
                height: 28%;
            }
            .tk {
                position: absolute;
                width: 100%;
                height: 40%;
                bottom: -50px;
                .content {
                    position: absolute;
                    top: 0;
                    left: 120px;
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    font-size: 30px;
                    .shop {
                        font-size: 40px;
                        font-weight: 600;
                        margin-bottom: 20px;
                    }
                    .address {
                        margin-bottom: 70px;
                    }
                    .loadText {
                        height: 100px;
                        width: 100%;
                    }
                    .text {
                        margin-bottom: 40px;
                    }
                    .btns {
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        .btn {
                            cursor: pointer;
                            height: 80px;
                            line-height: 80px;
                            width: 200px;
                            width: 40%;
                            gap: 30px;
                            margin-bottom: 30px;
                            text-align: center;
                            border-radius: 80px;
                            box-shadow: 0px -2px 5px #233bd7;
                            background-image: linear-gradient(45deg, #010082 100%, #00045e 100%);
                        }
                    }
                }
            }
            .c {
                width: 100%;
                position: absolute;
                bottom: 50px;
            }
            .d {
                position: absolute;
                bottom: 0;
                width: 100%;
            }
        }
    }
    .dialog {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        background: #0000004b;
        text-align: center;
        img {
            height: 100%;
            cursor: pointer;
        }
        /* top: 50%;
        left: 50%;
        transform: translateX(-50%);
        transform: translateY(-50%); */
    }
    .dialog6 {
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 999;
        background: #0000004b;
        text-align: center;
        img {
            width: 100%;
            cursor: pointer;
        }
    }
    .dialog-footer {
        display: flex;
        justify-content: center;
        gap: 200px;
        margin-top: 100px;
        margin-bottom: 100px;
    }
    .dialog-t {
        height: 300px;
        line-height: 300px;
        text-align: center;
        font-size: 40px;
    }
</style>
