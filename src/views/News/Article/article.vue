<template>
  <el-row id="Article">
    <el-col :span="24">
      <el-table
        :data="tableData"
        stripe
      >
        <el-table-column
          prop="title"
          label="文章标题"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="结束时间"
        ></el-table-column>
        <el-table-column
        label="审批状态"
      >
        <template slot-scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>
        <el-table-column
          label="国际新闻"
        >
          <template slot-scope="scope">
            <span>{{scope.row.category_id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新闻类型"
        >
          <template slot-scope="scope">
            <span>{{scope.row.type_id}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

<script>
import service from '@/api/request'
export default {
  name: 'Article',
  data () {
    return {
      tableData: []
    }
  },
  computed: {},
  created () {
    service.getArticleall().then(respones => {
      this.tableData = respones.data.result.map(item => item)
    }).catch(error => {
      console.log(error)
    })
  },
  mounted () {

  },
  methods: {}
}
</script>

<style  rel="stylesheet/css" lang="css">
#Article{
  padding:20px;
}
</style>
