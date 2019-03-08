<template>
    <el-row>
      <el-col :span="24">
        <el-pagination @current-change="handleSizeChange"
                       :page-sizes="pageSizes"
                       :page-size="pageSize"
                       :total="total"
                       :layout="layout" />
      </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'pagination',
  data () { return {} },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    total: {
      type: Number,
      default: 0
    },
    pageNumber: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => {
        return []
      }
    },
    layout: {
      type: String,
      default: 'total,prev, pager, next, jumper'
    }
  },
  methods: {
    handleSizeChange (page) {
      this.$emit('handle-change', page)
    }
  }
}
</script>
