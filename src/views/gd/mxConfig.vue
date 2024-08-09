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
            <div class="table" v-if="!loading">
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
            <div class="add" v-loading="addLoading">
                <div class="module">
                    <img src="@/assets/images/Frame 427319103 (1).png" alt="" />

                    <div class="form-c">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v1"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-row :gutter="100">
                                <el-col :span="12">
                                    <el-form-item label="模型编码:" prop="a">
                                        <el-input v-model="formList[activeName].a" placeholder="自动生成不可修改" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="模型名称:" prop="b" required>
                                        <el-input v-model="formList[activeName].b" placeholder="请输入" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="100">
                                <el-col :span="12">
                                    <el-form-item label="工单类型:" prop="c" required>
                                        <el-select v-model="formList[activeName].c" placeholder="">
                                            <el-option label="全部" value="全部" />
                                            <el-option label="协转挽留" value="协转挽留" />
                                            <el-option label="降档服务" value="降档服务" />
                                            <el-option label="降档上门服务" value="降档上门服务" />
                                            <el-option label="解约上门服务" value="解约上门服务" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="触发方式:" prop="d" required>
                                        <el-select v-model="formList[activeName].d" placeholder="">
                                            <el-option label="全部" value="全部" />
                                            <el-option label="手动触发" value="手动触发" />
                                            <el-option label="自动触发" value="自动触发" />
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>

                <div class="module">
                    <img src="@/assets/images/Frame 427319103 (2).png" alt="" />
                    <div class="form-c" v-if="activeName == 'v1'">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v1"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-row :gutter="100">
                                <el-col :span="24">
                                    <el-form-item label="" prop="">
                                        <el-checkbox value="低需求客户" name="低需求客户">低需求客户</el-checkbox>
                                        <el-checkbox value="低流量客户" name="低流量客户">低流量客户</el-checkbox>
                                        <el-checkbox value="免打扰客户" name="免打扰客户">免打扰客户</el-checkbox>
                                        <el-checkbox value="不存在客户反馈" name="不存在客户反馈"
                                            >不存在客户反馈</el-checkbox
                                        >
                                        <el-checkbox value="该客户多次外呼未接听" name="该客户多次外呼未接听"
                                            >该客户多次外呼未接听</el-checkbox
                                        >
                                        <el-checkbox value="客户号码确实" name="客户号码确实">客户号码确实</el-checkbox>
                                        <el-checkbox value="客户地址缺失" name="客户地址缺失">客户地址缺失</el-checkbox>
                                        <el-checkbox value="归属网格缺失" name="归属网格缺失">归属网格缺失</el-checkbox>
                                        <el-checkbox value="无推荐产品" name="无推荐产品">无推荐产品</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <el-form-item label="客户年龄段:" prop="f" required>
                                        <el-input v-model="formList.v1.f" placeholder="请输入整数" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-input v-model="formList.v1.g" placeholder="请输入整数" />
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="历史接触次数:" prop="h" required>
                                        <el-input v-model="formList.v1.h" placeholder="大于等于次数" />
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="form-c" v-if="activeName == 'v2'">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v2"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-row :gutter="100">
                                <el-col :span="12">
                                    <el-form-item label="提单合规性:" prop="提单合规性">
                                        <el-checkbox value="统计历史提单次数" name="统计历史提单次数"
                                            >统计历史提单次数</el-checkbox
                                        >
                                        <el-checkbox value="关键信息完整度" name="关键信息完整度"
                                            >关键信息完整度</el-checkbox
                                        >
                                        <el-checkbox value="错误流程提交次数" name="错误流程提交次数"
                                            >错误流程提交次数</el-checkbox
                                        >
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="流转合规性:" prop="流转合规性">
                                        <el-checkbox value="统计流转次数 (单个工单)" name="统计流转次数 (单个工单)"
                                            >统计流转次数 (单个工单)</el-checkbox
                                        >
                                        <el-checkbox value="统计回退次数" name="统计回退次数">统计回退次数</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="100">
                                <el-col :span="12">
                                    <el-form-item label="时长合规性:" prop="时长合规性">
                                        <el-checkbox value="统计节点延迟占比" name="统计节点延迟占比"
                                            >统计节点延迟占比</el-checkbox
                                        >
                                        <el-checkbox value="统计超前完成占比" name="统计超前完成占比"
                                            >统计超前完成占比</el-checkbox
                                        >
                                        <el-checkbox value="统计延迟点分布" name="统计延迟点分布"
                                            >统计延迟点分布</el-checkbox
                                        >
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="回复合规性:" prop="回复合规性">
                                        <el-checkbox value="统计回复次数" name="统计回复次数">统计回复次数</el-checkbox>
                                        <el-checkbox value="统计回复字数" name="统计回复字数">统计回复字数</el-checkbox>
                                        <el-checkbox value="统计回复附件是否带有水印" name="统计回复附件是否带有水印"
                                            >统计回复附件是否带有水印</el-checkbox
                                        >
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="form-c" v-if="activeName == 'v3'">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v1"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item label="重复提单" prop="">
                                        <el-input v-model="formList.v3.e" placeholder="请填写天数" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="tip">天内出现以下相同则判定为重复提单</el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item label=" " prop="">
                                        <el-checkbox value="统计历史提单次数" name="统计历史提单次数"
                                            >统计历史提单次数</el-checkbox
                                        >
                                        <el-checkbox value="关键信息完整度" name="关键信息完整度"
                                            >关键信息完整度</el-checkbox
                                        >
                                        <el-checkbox value="错误流程提交次数" name="错误流程提交次数"
                                            >错误流程提交次数</el-checkbox
                                        >
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="line"></div>
                            <div class="tit">提单超时</div>
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item label="接单时长大于" prop="">
                                        <el-input v-model="formList.v3.e" placeholder="请填写数字" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12" class="tip">小时</el-col>
                            </el-row>
                            <div class="line"></div>
                            <div class="tit">提单超时</div>
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item label="接单时长大于" prop="">
                                        <el-input v-model="formList.v3.f" placeholder="请填写数字" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2" class="tip">小时</el-col>
                                <el-col :span="6">
                                    <el-form-item label="是否自动催办" prop="">
                                        <el-checkbox value="是" name="是">是</el-checkbox>
                                        <el-checkbox value="否" name="否">否</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <div class="line"></div>
                            <div class="tit">处理延迟</div>
                            <el-row :gutter="10">
                                <el-col :span="6">
                                    <el-form-item label="接单时长大于" prop="">
                                        <el-input v-model="formList.v3.h" placeholder="请填写数字" />
                                    </el-form-item>
                                </el-col>
                                <el-col :span="2" class="tip">小时</el-col>
                                <el-col :span="6">
                                    <el-form-item label="是否自动催办" prop="">
                                        <el-checkbox value="是" name="是">是</el-checkbox>
                                        <el-checkbox value="否" name="否">否</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div class="form-c" v-if="activeName == 'v4'">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v4"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-form-item label="" prop="">
                                <el-checkbox value="执行人员缺失" name="执行人员缺失">执行人员缺失</el-checkbox>
                                <el-checkbox value="接口异常" name="接口异常">接口异常</el-checkbox>
                                <el-checkbox value="状态更新异常" name="状态更新异常">状态更新异常</el-checkbox>
                                <el-checkbox value="缺少用户信息" name="缺少用户信息">缺少用户信息</el-checkbox>
                                <el-checkbox value="执行组织缺失" name="执行组织缺失">执行组织缺失</el-checkbox>
                            </el-form-item>
                            <el-row :gutter="10">
                                <el-col :span="12">
                                    <el-form-item label="客户年龄段" prop="客户年龄段" required>
                                        <el-checkbox value="是" name="是">是</el-checkbox>
                                        <el-checkbox value="否" name="否">否</el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="是否生成任务" prop="是否生成任务" required>
                                        <el-checkbox value="是" name="是">是</el-checkbox>
                                        <el-checkbox value="否" name="否">否</el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                </div>
                <div class="module" v-if="activeName == 'v2'">
                    <img src="@/assets/images/Frame 427319103.png" alt="" />
                    <div class="form-c" v-if="activeName == 'v2'">
                        <el-form
                            ref="ruleFormRef"
                            style="max-width: 100%"
                            :model="formList.v2"
                            label-width="auto"
                            status-icon
                            label-position="left"
                        >
                            <el-row :gutter="100">
                                <el-col :span="12">
                                    <el-form-item label="工单状态:" prop="工单状态" required>
                                        <el-select v-model="formList.v2.i" placeholder="">
                                            <el-option label="全部" value="全部" />
                                            <el-option label="在途工单" value="在途工单" />
                                            <el-option label="历史工单" value="历史工单" />
                                        </el-select>
                                    </el-form-item> </el-col
                            ></el-row>
                        </el-form>
                    </div>
                </div>

                <div class="module" v-if="activeName == 'v3'">
                    <img src="@/assets/images/Frame 427319103 (1).png" alt="" />
                    <div class="form-c" v-if="activeName == 'v3'">
                        <el-checkbox value="短信" name="短信">短信</el-checkbox>
                        <el-checkbox value="消息通知" name="消息通知">消息通知</el-checkbox>
                        <el-checkbox value="邮件" name="邮件">邮件</el-checkbox>
                    </div>
                </div>
                <img src="@/assets/images/Frame 427319116 (1).png" alt="" @click="handleClose" />
            </div>
        </template>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import Moment from 'moment';
    const t1 = [
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
    ];
    const t2 = [
        {
            a: 'GDPG00163784394',
            b: '渠道执行力评估',
            c: '赵腾',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG0016378478',
            b: '人员执行力评估',
            c: '郑文锦',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00263784394',
            b: '渠道执行力评估',
            c: '何艳丽',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00378437637',
            b: '渠道执行力评估',
            c: '周妍玥',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00163778767',
            b: '人员执行力评估',
            c: '钱靖埕',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00163743625',
            b: '渠道执行力评估',
            c: '李林颖',
            d: '失效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00160932344',
            b: '人员执行力评估',
            c: '钱筠达',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00163754362',
            b: '渠道执行力评估',
            c: '郑迎华',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG00163784394',
            b: '人员执行力评估',
            c: '周翠娥',
            d: '生效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        },
        {
            a: 'GDPG0016378478',
            b: '渠道执行力评估',
            c: '冯武鹏',
            d: '失效',
            e: '自动触发',
            f: '2024-08-05 01:56:22'
        }
    ];
    const c1 = [
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
    ];
    const c2 = [
        {
            prop: 'a',
            label: '模型编码'
        },
        {
            prop: 'b',
            label: '模型名称'
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
            prop: 'c',
            label: '创建人'
        },
        {
            prop: 'f',
            label: '创建时间'
        }
    ];
    const tableData = ref({
        v1: t1,
        v2: t1,
        v3: t1,
        v4: t1,
        v5: t2
    });
    const columns = ref({
        v1: c1,
        v2: c1,
        v3: c1,
        v4: c1,
        v5: c2
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
        v1: {
            a: '',
            b: '',
            c: '全部',
            d: '全部',
            e: '',
            f: '',
            g: '',
            h: ''
        },
        v2: {
            a: '',
            b: '',
            c: '全部',
            d: '全部',
            e: '',
            f: '',
            g: '',
            h: '',
            i: '全部'
        },
        v3: {
            a: '',
            b: '',
            c: '全部',
            d: '全部',
            e: '',
            f: '',
            g: '',
            h: '',
            i: '',
            j: ''
        },
        v4: {
            a: '',
            b: '',
            c: '全部',
            d: '全部',
            e: '',
            f: '',
            g: '',
            h: ''
        }
    });
    const addLoading = ref(false);
    const handleClose = () => {
        addLoading.value = true;
        const now = new Date();
        tableData.value[activeName.value].unshift({
            a: 'GDPG00163723423',
            b: formList.value[activeName.value].b,
            c: formList.value[activeName.value].c,
            d: '生效',
            e: formList.value[activeName.value].d,
            f: Moment(now).format('yyyy-MM-DD HH:mm:ss')
        });
        setTimeout(() => {
            showForm.value.table = true;
            addLoading.value = false;
            loading.value = true;
            setTimeout(() => {
                loading.value = false;
            }, 500);
        }, 500);
    };
</script>
<style scoped lang="scss">
    /* * {
        color: #ccd1e5 !important;
    } */
    .list-page {
        background: #000928;
        height: 95%;
        overflow: scroll;
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
                .form-c {
                    padding: 40px 80px;
                }
            }
        }
    }
    .line {
        width: 100%;
        height: 1px;
        background: #404088;
        margin-bottom: 40px;
    }
    .tip {
        line-height: 80px;
    }
</style>
