<template>
    <div class="wrap">
        <img src="@/assets/images/Group 1312314564.png" alt="" class="top" />
        <div ref="msgBox" class="msg-box">
            <div
                v-for="msg in msgList"
                class="msg"
                :style="'justify-content:flex-' + (msg.type == 'user' ? 'end' : 'start')"
                @scroll="onScroll"
            >
                <template v-if="msg.type == 'user'">
                    <div class="user-msg">
                        <span>{{ msg.msg }}</span>
                    </div>
                </template>
                <template v-if="msg.type == 'img'">
                    <div class="user-img">
                        <img :src="msg.msg" alt="" />
                    </div>
                </template>
                <div v-if="msg.type == 'ai'" v-loading="msg.loading" class="ai-msg-box">
                    <img v-show="!msg.loading && msg.msg" :src="msg.msg" alt="" class="ai-msg" />
                    <div v-show="!msg.loading && !msg.msg" class="box">
                        <img src="@/assets/images/图层 1 1 copy.png" alt="" class="icon" />
                        <div class="msg">
                            好的哦，任务已接取，请小主按时完成哦，请网格经理到达目的后先完成任务第一项打卡操作哦!请点击<span
                                @click="dkClick"
                                >&nbsp;打卡</span
                            >
                            拍照发给我就可以啦!
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="input-box">
            <img src="@/assets/images/Frame.png" alt="" class="voice" />
            <van-search
                v-model="inputValue"
                placeholder="欢迎向我提问"
                change="onChange"
                left-icon=""
                shape="round"
                class="input"
                @search="onSearch"
            ></van-search>
            <div class="right"></div>
        </div>
    </div>
    <div v-if="isVisible" class="fullscreen-video" @click="close">
        <video ref="video" :src="videoSrc" autoplay muted playsinline webkit-playsinline @ended="onVideoEnded"></video>
    </div>
</template>
<script setup>
    import { ref, nextTick } from 'vue';
    import msg1 from '@/assets/images/Frame 1597880501.png';
    import videoS from '@/assets/images/4ad7de3c30bb845d04c5f67922faa16f.mp4';
    import msg3 from '@/assets/images/Frame 1597880506.png';
    import msg4 from '@/assets/images/Frame 1597880505.png';
    import msg5 from '@/assets/images/Frame 1597880508.png';
    import msg6 from '@/assets/images/微信图片_20240811152252.jpg';

    const msgBox = ref();
    const msgList = ref([]);
    const inputValue = ref('');
    const onScroll = (el) => {
        console.log(el);
    };
    const onSearch = (e, type) => {
        const l = msgList.value.length;
        let msg;
        if (l == 0) {
            msg = msg1;
        } else if (l == 2) {
            msg = null;
        } else if (l == 4) {
            msg = msg3;
        } else if (l == 7) {
            msg = msg5;
        }
        if (type == 'img') {
            msgList.value.push({
                type: 'img',
                msg: msg6
            });
        } else {
            msgList.value.push({
                type: 'user',
                msg: inputValue.value
            });
        }

        inputValue.value = '';
        msgList.value.push({
            type: 'ai',
            msg,
            loading: true
        });
        setTimeout(() => {
            msgList.value[msgList.value.length - 1].loading = false;
        }, 500);
        if (msgList.value.length == 6) {
            setTimeout(() => {
                msgList.value.push({
                    type: 'ai',
                    msg: msg4,
                    loading: true
                });
                setTimeout(() => {
                    msgList.value[msgList.value.length - 1].loading = false;
                }, 500);
                nextTick(() => {
                    setTimeout(() => {
                        msgBox.value.scrollTop = 9999;
                    }, 500);
                });
            }, 500);
        }
        nextTick(() => {
            setTimeout(() => {
                msgBox.value.scrollTop = 9999;
            }, 500);
        });
    };
    const videoSrc = ref('');
    const isVisible = ref(false);
    const video = ref(null);
    const onVideoEnded = () => {
        isVisible.value = false;
        onSearch('', 'img');
    };
    const dkClick = () => {
        isVisible.value = true;
        nextTick(() => {
            videoSrc.value = videoS;
            video.value.requestFullscreen();
        });
    };
</script>
<style scoped lang="scss">
    video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        outline: none;
    }
    .wrap {
        background: #e9f2ff;
        height: 100%;
        .top {
            width: 100%;
            position: absolute;
            top: -80px;
            z-index: 4;
        }
        .msg-box {
            position: absolute;
            background: #e9f2ff;
            height: 72vh;
            width: 100vw;
            margin-top: 230px;
            border-top-right-radius: 100px;
            border-top: 4px solid #fff;
            border-right: 4px solid #fff;
            z-index: 10;
            padding: 40px 40px;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            gap: 30px;
            margin-bottom: 120px;

            .msg {
                width: 100%;
                display: flex;
                align-items: center;
            }
            .user-msg {
                display: inline-block;
                overflow: hidden;
                padding: 20px 40px;
                max-width: 80%;
                background-image: linear-gradient(45deg, #50a2ff 10%, #0078fe 100%);
                border-radius: 36px 36px 6px 36px;
                span {
                    width: 100%;
                    word-wrap: break-word;
                    color: #fff;
                    font-size: 34px;
                }
            }
            .user-img {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                img {
                    width: 50%;
                    border-radius: 40px;
                }
            }
            .ai-msg {
                width: 100%;
            }
        }
        .input-box {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40px;
            height: 120px;
            width: 100%;
            background: #fff;
            position: fixed;
            bottom: 0;
            z-index: 15;
            .voice {
                width: 50px;
            }
            .input {
                width: 800px;
                background: inherit;
            }
        }
        .ai-msg-box {
            width: 100%;
        }
        .box {
            display: flex;
            flex-direction: row;
            img {
                height: 150px;
            }
            .msg {
                display: block;
                width: 82%;
                background: #fff;
                border-radius: 10px 30px 30px 30px;
                color: #14181c;
                padding: 30px;
                font-size: 35px;
                font-family: PingFang SC;
                line-height: 50px;
                font-weight: 500;
                span {
                    color: #0078fe;
                    cursor: pointer;
                }
            }
        }
    }
</style>
