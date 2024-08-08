<template>
    <div class="wrap">
        <img src="@/assets/images/Group 1312314564.png" alt="" class="top" />
        <div class="msg-box" ref="msgBox">
            <div
                class="msg"
                v-for="msg in msgList"
                @scroll="onScroll"
                :style="'justify-content:flex-' + (msg.type == 'user' ? 'end' : 'start')"
            >
                <template v-if="msg.type == 'user'">
                    <div class="user-msg">
                        <span>{{ msg.msg }}</span>
                    </div>
                </template>
                <div v-else v-loading="msg.loading" class="ai-msg-box">
                    <img :src="msg.msg" alt="" class="ai-msg" v-show="!msg.loading" />
                </div>
            </div>
        </div>
        <div class="input-box">
            <img src="@/assets/images/Frame.png" alt="" class="voice" />
            <van-search
                v-model="inputValue"
                placeholder="欢迎向我提问"
                change="onChange"
                @search="onSearch"
                left-icon=""
                shape="round"
                class="input"
            ></van-search>
            <div class="right"></div>
        </div>
    </div>
</template>
<script setup>
    import msg1 from '@/assets/images/Frame 1597880501.png';
    import msg2 from '@/assets/images/Frame 1597880503.png';
    import msg3 from '@/assets/images/Frame 1597880506.png';
    import msg4 from '@/assets/images/Frame 1597880505.png';
    import msg5 from '@/assets/images/Frame 1597880508.png';
    import { ref, nextTick } from 'vue';
    const msgBox = ref();
    const msgList = ref([]);
    const inputValue = ref('');
    const onScroll = (el) => {
        console.log(el);
    };
    const onSearch = () => {
        const l = msgList.value.length;
        let msg;
        if (l == 0) {
            msg = msg1;
        } else if (l == 2) {
            msg = msg2;
        } else if (l == 4) {
            msg = msg3;
        } else if (l == 7) {
            msg = msg5;
        }
        msgList.value.push({
            type: 'user',
            msg: inputValue.value
        });
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
                    msgBox.value.scrollTop = msgBox.value.scrollHeight;
                });
            }, 500);
        }
        nextTick(() => {
            msgBox.value.scrollTop = 9999;
            console.log(msgBox.value.scrollTop);
            console.log(msgBox.value.scrollHeight);
            console.log(msgBox.value.clientHeight);
            console.log(msgBox.value.offsetHeight);
        });
    };
</script>
<style scoped lang="scss">
    .wrap {
        background: #b5d4fd;
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
            position: absolute;
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
    }
</style>
