<template>
    <div class="wrap">
        <img class="head" src="@/assets/images/顶部.png" alt="" />
        <div class="body">
            <img src="@/assets/images/导航.png" class="left" alt="" @mousedown="onMouseDown" />
            <div v-loading="loading" class="right">
                <div class="view">
                    <img src="@/assets/images/Frame 427319113.png" alt="" />
                    <div class="cc">
                        <img
                            src="@/assets/images/Frame 427319104 copy.png"
                            alt=""
                            style="cursor: pointer"
                            @click="dialog = true"
                        />
                        <div class="table">
                            <el-table :data="tableData" width="auto" header-row-class-name="table-head">
                                <el-table-column
                                    v-for="c in columns"
                                    :key="c.prop"
                                    style="height: 120px"
                                    :prop="c.prop"
                                    :label="c.label"
                                    align="center"
                                />

                                <el-table-column style="height: 120px" align="center" label="操作">
                                    <template #default="scope">
                                        <el-button link type="primary" size="small">详情</el-button>
                                        <el-button link type="primary" size="small">修改</el-button>
                                        <el-button link type="primary" size="small">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <img src="@/assets/images/Frame 427319134.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <el-dialog v-model="dialog" v-loading="addLoading" title="" width="500" align-center>
            <el-form ref="ruleFormRef" style="max-width: 100%" :model="formList" label-width="auto" status-icon>
                <el-form-item label="接口权限编码：" prop="" required>
                    <el-input v-model="formList.a" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="接口权限名称：" prop="" required>
                    <el-input v-model="formList.b" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="接口权限等级：" prop="" required>
                    <el-select v-model="formList.d" placeholder="请选择">
                        <el-option label="一级菜单" value="一级菜单" />
                    </el-select>
                </el-form-item>
                <el-form-item label="接口权限地址：" prop="" required>
                    <el-input v-model="formList.c" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="请求方式：" prop="" required>
                    <el-input v-model="formList.e" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="接口权限排序：" prop="" required>
                    <el-input v-model="formList.f" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="外围系统：" prop="" required>
                    <el-input v-model="formList.g" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="外围系统接口：" prop="" required>
                    <el-input v-model="formList.h" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="接口协议：" prop="" required>
                    <el-select v-model="formList.i" placeholder="请选择">
                        <el-option label="http(默认)" value="http(默认)" />
                        <el-option label="sop" value="sop" />
                    </el-select>
                </el-form-item>
                <el-form-item label="请求头header参数：" prop="" required>
                    <el-input v-model="formList.j" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="请求内容：" prop="" required>
                    <el-input v-model="formList.k" placeholder="请输入" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialog = false">取消</el-button>
                    <el-button type="primary" @click="add"> 生成接口组件 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import Moment from 'moment';

    const loading = ref(false);

    const tableData = ref([
        {
            a: '1',
            b: 'ZB00000001',
            c: 'oao外部渠道处理',
            d: 'IOP',
            e: '一级',
            f: '1',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '2',
            b: 'ZB00000002',
            c: '在线处理',
            d: 'IOP',
            e: '二级',
            f: '2',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '3',
            b: 'ZB00000003',
            c: '宣传展陈回单',
            d: 'OA',
            e: '三级',
            f: '2',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '4',
            b: 'ZB00000004',
            c: '派单人处理',
            d: 'IOP',
            e: '二级',
            f: '1',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '5',
            b: 'ZB00000005',
            c: '黑白名单分页查询',
            d: 'IOP',
            e: '一级',
            f: '4',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '6',
            b: 'ZB00000006',
            c: '黑白名单分页查询',
            d: 'IOP',
            e: '一级',
            f: '1',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '7',
            b: 'ZB00000007',
            c: '黑白名单分页查询',
            d: 'IOP',
            e: '二级',
            f: '2',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '8',
            b: 'ZB00000008',
            c: '黑白名单分页查询',
            d: 'IOP',
            e: '二级',
            f: '4',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '9',
            b: 'ZB00000009',
            c: '任务调度',
            d: 'IOP',
            e: '三级',
            f: '3',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        },
        {
            a: '10',
            b: 'ZB000000010',
            c: 'oao外部渠道处理',
            d: 'IOP',
            e: '三级',
            f: '5',
            g: 'GET',
            h: '2024-08-01 03:48',
            i: '2024-08-01 03:48'
        }
    ]);
    const columns = ref([
        {
            prop: 'a',
            label: '序号'
        },
        {
            prop: 'b',
            label: '接口编号'
        },
        {
            prop: 'c',
            label: '接口名称'
        },
        {
            prop: 'd',
            label: '外围系统'
        },
        {
            prop: 'e',
            label: '接口权限等级'
        },
        {
            prop: 'f',
            label: '接口权限排序'
        },
        {
            prop: 'g',
            label: '请求方式'
        },
        {
            prop: 'h',
            label: '创建时间'
        },
        {
            prop: 'i',
            label: '更新时间'
        }
    ]);
    const dialog = ref(false);
    const formList = ref({
        a: '',
        b: '',
        c: '',
        d: '一级菜单',
        e: '',
        f: '',
        g: '',
        h: '',
        i: 'http(默认)',
        j: '',
        k: ''
    });
    const addLoading = ref(false);
    const showForm = ref(false);

    const add = () => {
        addLoading.value = true;
        const now = new Date();
        dialog.value = false;
        tableData.value.unshift({
            a: '1',
            b: 'GDPG0016',
            c: formList.value.b,
            d: formList.value.g,
            e: '一级',
            f: '1',
            g: formList.value.e,
            h: Moment(now).format('yyyy-MM-DD HH:mm'),
            i: Moment(now).format('yyyy-MM-DD HH:mm')
        });
        tableData.value.pop();
        tableData.value.forEach((item, index) => {
            item.a = index + 1;
        });
        setTimeout(() => {
            showForm.value = true;
            addLoading.value = false;
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 500);
        }, 500);
    };
</script>
<style scoped lang="scss">
    .wrap {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: #000928;
        .body {
            width: 100%;
            height: 100%;
            display: flex;
        }
        .left {
            height: 100%;
        }
        .right {
            width: 100%;
            height: 100%;
            padding: 50px;
            .view {
                width: 100%;
                height: 100%;
                overflow: scroll;
                border-radius: 5px;
                /* 隐藏垂直滚动条 */
                &::-webkit-scrollbar {
                    width: 0;
                }

                /* 隐藏水平滚动条 */
                &::-webkit-scrollbar {
                    height: 0;
                }
                img {
                    width: 100%;
                }
                .cc {
                    margin-top: 50px;
                    padding-top: 40px;
                    background: #1a1848;
                    .table {
                        margin: 50px 0;
                    }
                }
            }
        }
    }
</style>
