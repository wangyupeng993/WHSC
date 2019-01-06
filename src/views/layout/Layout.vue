<template>
  <el-container>
    <el-aside width="250px">
      <sidebar></sidebar>
    </el-aside>
    <el-main>
      <el-header>Header</el-header>
      <app-main></app-main>
    </el-main>
  </el-container>
</template>

<script>
import {Sidebar, AppMain} from './components'
export default {
  name: 'Layout',
  data () {
    return {}
  },
  components: {Sidebar, AppMain},
  computed: {},
  mounted () {
    // window.sessionStorage.removeItem('userinfo')
  },
  methods: {}
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
  .el-main {
    text-align: center;
  }

</style>
