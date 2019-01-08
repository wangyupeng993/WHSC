<template>
  <el-row id="Sort">
    <el-col :span="24">
      <el-table
        :data="Sortquery"
        stripe
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="国际新闻"
          prop="name">
        </el-table-column>
      </el-table>

    </el-col>
  </el-row>
</template>

<script>
import service from '@/api/request'
export default {
  name: 'Sort',
  data () {
    return {
      Sortquery: []
    }
  },
  created () {},
  mounted () {
    service.getSortquery().then(respone => {
      console.log(respone.data.result)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {}
}
</script>

<style scoped>
#Sort{
  padding:15px;
}
</style>
