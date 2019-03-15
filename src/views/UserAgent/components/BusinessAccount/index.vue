<template>
    <el-row :gutter="20">
      <el-col :span="24"></el-col>
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
