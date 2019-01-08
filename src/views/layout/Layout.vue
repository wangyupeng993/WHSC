<template>
  <el-container>
    <el-aside width="250px">
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <el-header>
        <el-dropdown @command="removeStorage" trigger="click">
          <img :src="headImg" alt="头像" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command='退出'>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <app-main></app-main>
    </el-main>
  </el-container>
</template>

<script>
import {Sidebar, AppMain} from './components'
import {getUserInfo, removeStorage} from '@/api/sessionStorage'

export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {Sidebar, AppMain},
  computed: {
    headImg () {
      return getUserInfo().headImgUrl
    }
  },
  mounted () {},
  methods: {
    removeStorage (command) {
      if (command === '退出') {
        removeStorage('userinfo')
        window.location.reload()
      }
    }
  }
}
</script>

<style rel="stylesheet/css" lang="css">
  .el-aside {
    height:100vh;
    background-color: #545c64;
  }
  .el-main,.el-header{
    padding:0;
  }
  .el-header{
    line-height:60px;
    background-color:#ffffff;
    border-bottom: solid 1px #e6e6e6
  }
  .el-dropdown{
    float:right;
    width: 80px;
    height:60px;
    text-align: center;
  }
  .el-dropdown img{
    width:40px;
    height:40px;
    border-radius:6px;
    -webkit-border-radius:6px;
    cursor: pointer;
    margin-top:10px;
  }

</style>
