<template>
    <el-row>
      <el-col :span="24">
        <el-row class="el-list-header">
          <el-col :span="21">
            <el-breadcrumb>
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{item.meta.title}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="3">
            <el-button icon="el-icon-circle-plus-outline" type="primary">新增角色</el-button>
          </el-col>
        </el-row>
        <el-table :data="rolelist" border stripe>
          <el-table-column prop="id" label="#" width="50px"></el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="description" label="角色描述"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary">配置</el-button>
                <el-button type="primary">修改</el-button>
                <el-button type="danger">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
import service from '@/api/request/systemadmin'
import {getUserInfo} from '@/api/sessionStorage'
export default {
  name: 'Role',
  data () {
    return {
      token: getUserInfo('userinfo').token,
      rolelist: []
    }
  },
  mounted () {
    this.getRolelist({token: this.token})
  },
  methods: {
    getRolelist (query) {
      service.getRolelist(query)
        .then(respone => {
          this.rolelist = respone.data.result.map(item => item)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
