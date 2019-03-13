<template>
    <el-row id="powerlimit" v-loading.fullscreen.lock="Loading">
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
            <el-button @click="addedpermission()" icon="el-icon-circle-plus-outline" type="primary">新增</el-button>
          </el-col>
        </el-row>
        <el-table :data="parentNav()" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="childrenNav(props.row.id)" :show-header="false">
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
                      <el-button @click="modifypermission(scope.$index,scope.row)" type="primary" size="medium" icon="el-icon-edit">修改</el-button>
                      <el-button  @click="removepermission(scope.$index,scope.row)" type="danger" size="medium" icon="el-icon-delete">删除</el-button>
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
                <el-button @click="addedpermission(scope.$index,scope.row)" type="primary" size="medium" icon="el-icon-circle-plus-outline">新增</el-button>
                <el-button @click="modifypermission(scope.$index,scope.row)" type="primary" size="medium" icon="el-icon-edit">修改</el-button>
                <el-button @click="removepermission(scope.$index,scope.row)" type="danger" size="medium" icon="el-icon-delete">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <nav-popup v-if="popup" @handle-onclick="handlesure"
                   @handle-cancel="getPermission({token: token})"
                   :title.sync="popupTitle"
                   :visible.sync="popup" :item="navdata"/>
      </el-col>
    </el-row>
</template>

<script>
import service from '@/api/request/systemadmin'
import {getUserInfo} from '@/api/sessionStorage'
import {NavPopup} from '@/views/SystemAdmin/components'
export default {
  name: 'PowerLimit',
  data () {
    return {
      Loading: false,
      popup: false,
      popupTitle: '新增权限',
      token: getUserInfo('userinfo').token,
      navbarlist: [],
      navdata: null
    }
  },
  components: {NavPopup},
  async mounted () {
    await this.getPermission({token: this.token})
  },
  methods: {
    getPermission (query) {
      this.Loading = true
      service.getpermission(query)
        .then(respone => {
          this.navbarlist = respone.data.result.map(item => item)
          this.Loading = false
        })
        .catch(error => {
          console.log(error)
          this.Loading = false
        })
    },
    confirmpopup (name, callback, Errorback) {
      this.$confirm(name, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(callback)
        .catch(Errorback)
    },
    // 筛选子级导航
    childrenNav (parentid) {
      return this.navbarlist.filter(item => item.parentId === Number(parentid))
    },
    // 筛选父级导航
    parentNav (toplavelid) {
      const parent = toplavelid || 0
      if (parent === 0) {
        return this.navbarlist.filter(item => item.parentId === Number(parent))
      } else {
        return this.navbarlist.filter(item => item.id === Number(parent))
      }
    },
    // 新增
    addedpermission (index, row) {
      index !== undefined && row !== undefined ? this.popupTitle = `新增 ${row.name} > 子权限` : this.popupTitle = `新增权限`
      this.navdata = {
        name: '',
        icon: '',
        parent_id: index !== undefined && row !== undefined ? row.id : 0,
        order_id: '',
        url: '',
        description: ''
      }
      this.popup = true
    },
    // 提交
    async handlesure (query) {
      delete query.createTime
      delete query.updateTime
      delete query.data
      delete query.checked
      console.log(query)
      await service.changePermission({token: this.token, ...query})
        .then(respone => {
          this.popup = false
        })
        .catch(error => {
          this.popup = false
          console.log(error)
        })
      await this.getPermission({token: this.token})
    },
    // 修改
    modifypermission (index, row) {
      const parentnav = this.parentNav(row.parentId)[0]
      this.popup = true
      this.navdata = {
        id: row.id,
        name: row.name,
        icon: row.icon,
        url: row.url,
        description: row.description,
        order_id: row.orderId,
        parent_id: row.parentId
      }
      row.parentId === 0 && row.parentId === parentnav.id ? this.popupTitle = `修改 ${parentnav.name} > ${row.name}` : this.popupTitle = `修改 ${parentnav.name}`
    },
    // 删除
    removepermission (index, row) {
      this.confirmpopup(`确认删除 ${row.name}?`, () => {
        service.deletePermission({token: this.token, id: row.id})
          .then(respone => {
            console.log(respone)
            this.getPermission({token: this.token})
          })
          .catch(error => {
            console.log(error)
          })
      }, () => {})
    }
  }
}
</script>
