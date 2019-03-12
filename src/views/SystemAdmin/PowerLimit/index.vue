<template>
    <el-row id="powerlimit">
      <el-col :span="24">
        <el-row class="el-list-header">
          <el-col :span="22">
            <el-breadcrumb>
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{item.meta.title}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="2">
            <el-button icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="parentNav('0')">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="childrenNav(scope.row.id)" :show-header="false">
                <el-table-column prop="icon" label="icon图标" width="80px">
                  <template slot-scope="scope">
                    <i :class="scope.row.icon"></i>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="权限名称" width="120px"></el-table-column>
                <el-table-column prop="description" label="角色描述"></el-table-column>
                <el-table-column prop="url" label="权限地址" width="233px"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="150px"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间" width="150px"></el-table-column>
                <el-table-column prop="orderId" label="排序" width="50px"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button-group>
                      <el-button type="primary" size="medium" icon="el-icon-edit">修改</el-button>
                      <el-button type="danger" size="medium" icon="el-icon-delete">删除</el-button>
                    </el-button-group>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column prop="icon" label="icon图标" width="80px">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="权限名称" width="120px"></el-table-column>
          <el-table-column prop="description" label="角色描述"></el-table-column>
          <el-table-column prop="url" label="权限地址" width="233px"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="150px"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="150px"></el-table-column>
          <el-table-column prop="orderId" label="排序" width="50px"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">新增</el-button>
                <el-button type="success" size="medium" icon="el-icon-edit">修改</el-button>
                <el-button type="danger" size="medium" icon="el-icon-delete">删除</el-button>
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
  name: 'PowerLimit',
  data () {
    return {
      token: getUserInfo('userinfo').token,
      navbarlist: []
    }
  },
  async mounted () {
    await this.getPermission({token: this.token})
  },
  methods: {
    getPermission (query) {
      service.getpermission(query)
        .then(respone => {
          this.navbarlist = respone.data.result.map(item => item)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 筛选子级导航
    childrenNav (parentid) {
      return this.navbarlist.filter(item => item.parentId === Number(parentid))
    },
    // 筛选父级导航
    parentNav (toplavelid) {
      return this.navbarlist.filter(item => item.parentId === Number(toplavelid))
    }
  }
}
</script>
