<template>
    <el-row :gutter="10" class="el-list-header">
      <el-col :span="6">
        <el-breadcrumb>
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{item.meta.title}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="10">
        <span style="color:#606266;">账户可用总余额: <i style="color:#409eff;font-size:18px;">{{totalAmount}}</i></span>
        <span style="color:#606266;">待提现结算总金额: <i style="color:#409eff;font-size:18px;">{{totalFreezeAmount}}</i></span>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" icon="el-icon-plus">新增</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  components: {},
  props: {
    totalAmount: {
      type: Number,
      default: 0
    },
    totalFreezeAmount: {
      type: Number,
      default: 0
    }
  },
  mounted () {},
  methods: {}
}
</script>
