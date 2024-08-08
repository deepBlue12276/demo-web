<template>
    <div class="list-page">
        <div class="head" v-if="showForm.table">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="工单预评估模型" name="v1" class="v1"> </el-tab-pane>
                <el-tab-pane label="工单健康度模型" name="v2"> ></el-tab-pane>
                <el-tab-pane label="调度预警模型" name="v3"> </el-tab-pane>
                <el-tab-pane label="工单巡检模型" name="v4"> </el-tab-pane>
                <el-tab-pane label="执行力评估模型" name="v5"> </el-tab-pane>
            </el-tabs>
            <div class="form">
                <img src="@/assets/images/Frame 427319103.png" alt="" />
                <img src="@/assets/images/Frame 427319111 (1).png" alt="" />
                <img src="@/assets/images/Frame 427319114 (4).png" alt="" />
                <img src="@/assets/images/Frame 427319115 (2).png" alt="" />
            </div>
        </div>
        <div class="content" v-loading="loading" v-if="showForm.table">
            <img
                src="@/assets/images/Frame 427319135 (1).png"
                alt=""
                v-if="activeName == 'v1'"
                @click="
                    showForm.v1 = true;
                    showForm.table = false;
                "
            />
            <img
                src="@/assets/images/Frame 427319135.png"
                alt=""
                v-if="activeName == 'v2'"
                @click="
                    showForm.v2 = true;
                    showForm.table = false;
                "
            />
            <img
                src="@/assets/images/Frame 427319135 (2).png"
                alt=""
                v-if="activeName == 'v3'"
                @click="
                    showForm.v3 = true;
                    showForm.table = false;
                "
            />
            <img
                src="@/assets/images/Frame 427319135 (3).png"
                alt=""
                v-if="activeName == 'v4'"
                @click="
                    showForm.v4 = true;
                    showForm.table = false;
                "
            />
            <img
                src="@/assets/images/Frame 427319135 (4).png"
                alt=""
                v-if="activeName == 'v5'"
                @click="
                    showForm.v5 = true;
                    showForm.table = false;
                "
            />
            <div class="table">
                <el-table :data="tableData[activeName]" width="auto" header-row-class-name="table-head">
                    <el-table-column
                        style="height: 120px"
                        :prop="c.prop"
                        :label="c.label"
                        v-for="c in columns[activeName]"
                        align="center"
                    />

                    <el-table-column style="height: 120px" align="center" label="操作">
                        <template #default="scope">
                            <el-button link type="primary" size="small" v-if="scope.row.d == '生效'">失效</el-button>
                            <el-button link type="primary" size="small" v-if="scope.row.d == '失效'">生效</el-button>
                            <el-button link type="primary" size="small" v-if="scope.row.d == '失效'">编辑</el-button>
                            <el-button link type="primary" size="small">查看详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <template v-if="!showForm.table">
            <div class="add">
                <div class="module">
                    <img src="@/assets/images/Frame 427319103 (1).png" alt="" />

                    <div class="form">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v1"
                            label-width="auto"
                            status-icon
                        >
                            <el-form-item label="Activity name" prop="name">
                                <el-input v-model="formList.v1.a" />
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <div class="module">
                    <img src="@/assets/images/Frame 427319103 (2).png" alt="" />
                </div>
                <img src="@/assets/images/Frame 427319116 (1).png" alt="" />
            </div>
        </template>
    </div>
</template>
<script setup>
    import { ref } from 'vue';

    const tableData = ref({
        v1: [
            {
                a: 'GDPG00163784394',
                b: '携转工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG0016378478',
                b: '触客工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00263784394',
                b: '营销工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00378437637',
                b: '携转工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00163778767',
                b: '携转工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00163743625',
                b: '触客工单评估',
                c: '携转工单',
                d: '失效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00160932344',
                b: '营销工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00163754362',
                b: '携转工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG00163784394',
                b: '携转工单评估',
                c: '携转工单',
                d: '生效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            },
            {
                a: 'GDPG0016378478',
                b: '触客工单评估',
                c: '携转工单',
                d: '失效',
                e: '自动触发',
                f: '2024-08-05 01:56:22'
            }
        ],
        v2: [],
        v3: []
    });
    const columns = ref({
        v1: [
            {
                prop: 'a',
                label: '模型编码'
            },
            {
                prop: 'b',
                label: '模型名称'
            },
            {
                prop: 'c',
                label: '工单类型'
            },
            {
                prop: 'd',
                label: '生效状态'
            },
            {
                prop: 'e',
                label: '触发方式'
            },
            {
                prop: 'f',
                label: '创建时间'
            }
        ],
        v2: [],
        v3: []
    });
    const loading = ref(false);
    const activeName = ref('v1');
    const handleClick = (v) => {
        loading.value = true;
        setTimeout(() => {
            loading.value = false;
            activeName.value = v.paneName;
        }, 500);
    };
    const showForm = ref({
        v1: false,
        v2: false,
        v3: false,
        v4: false,
        v5: false,
        table: true
    });
    const formList = ref({
        v1: {}
    });
</script>
<style scoped lang="scss">
    .list-page {
        background: #000928;
        .head {
            background: #111037;
            padding: 20px 0;
            margin-bottom: 50px;
        }
        .form {
            display: flex;
            flex-direction: column;
            gap: 50px;

            img {
                width: 100%;
            }
        }
        .content {
            padding: 40px 0;
            display: flex;
            background: #111037;
            flex-direction: column;
            gap: 50px;
            height: 100%;
            img {
                width: 100%;
                cursor: pointer;
            }
            .table {
                padding: 0 40px;
            }
        }
        .add {
            display: flex;
            flex-direction: column;
            gap: 50px;
            img {
                width: 100%;
            }
            .module {
                background: #111037;

                padding: 40px 0;
            }
        }
    }
</style>
