<template>
    <el-row v-loading.fullscreen.lock="Loading">
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
            <el-button @click="newsChangeRole()" icon="el-icon-circle-plus-outline" type="primary">新增角色</el-button>
          </el-col>
        </el-row>
        <el-table :data="rolelist" border stripe>
          <el-table-column prop="id" label="#" width="50px"></el-table-column>
          <el-table-column prop="name" label="角色名称"></el-table-column>
          <el-table-column prop="description" label="角色描述"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="300px">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click="configpower(scope.$index,scope.row)" type="primary" icon="el-icon-setting">配置</el-button>
                <el-button @click="newsChangeRole(scope.$index,scope.row)" type="primary" icon="el-icon-edit">修改</el-button>
                <el-button @click="deleteRole(scope.$index,scope.row)" type="danger" icon="el-icon-delete">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <role-dialog v-if="newsroleDialog"
                     :visible.sync="newsroleDialog"
                     :title.sync="roletitle"
                     @handle-click="handleSubmit"
                     @cancel-submit="getRolelist({token: token})"
                     :item.sync="roleinfo" />
        <limit-dialog v-if="limitDialog"
                      :item.sync="roleinfo"
                      @handle-click="handlechange"
                      :visible.sync="limitDialog"
                      :title.sync="limitTitle" />
      </el-col>
    </el-row>
</template>

<script>
import service from '@/api/request/systemadmin'
import {getUserInfo} from '@/api/sessionStorage'
import {RoleDialog, LimitDialog} from '@/views/SystemAdmin/components'
export default {
  name: 'Role',
  data () {
    return {
      Loading: false,
      newsroleDialog: false,
      limitDialog: false,
      token: getUserInfo('userinfo').token,
      rolelist: [],
      roleinfo: null,
      limitTitle: null,
      roletitle: '新增角色'
    }
  },
  components: {RoleDialog, LimitDialog},
  mounted () {
    this.getRolelist({token: this.token})
  },
  methods: {
    // 角色列表
    getRolelist (query) {
      this.Loading = true
      service.getRolelist(query)
        .then(respone => {
          this.rolelist = respone.data.result.map(item => item)
          this.Loading = false
        })
        .catch(error => {
          this.Loading = false
          console.log(error)
        })
    },
    // 新增修改角色
    newsChangeRole (index, row) {
      this.newsroleDialog = true
      if (index === undefined && row === undefined) {
        this.roleinfo = {
          id: '',
          name: '',
          description: ''
        }
        this.roletitle = `新增角色`
      } else {
        this.roleinfo = row
        this.roletitle = `修改 ${row.name}`
      }
    },
    // 提交新增修改
    async handleSubmit (query) {
      delete query.createTime
      delete query.updateTime
      await service.changeRole({token: this.token, ...query})
        .then(respone => {
          console.log(respone)
          this.newsroleDialog = false
        })
        .catch(error => {
          console.log(error)
        })
      await this.getRolelist({token: this.token})
    },
    // 删除角色
    deleteRole (index, row) {
      this.$confirm(`确认要删除 ${row.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'})
        .then(() => {
          service.deleteRole({token: this.token, id: row.id})
            .then(respone => {
              console.log(respone)
              this.getRolelist({token: this.token})
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(() => {})
    },
    // 配置权限
    configpower (index, row) {
      this.limitDialog = true
      this.roleinfo = row
      this.limitTitle = `修改 ${row.name} 的权限`
    },
    // 提交修改权限
    async handlechange (query) {
      await service.changeRolePermission(query)
        .then(respone => {
          this.getRolelist({token: this.token})
          this.limitDialog = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
