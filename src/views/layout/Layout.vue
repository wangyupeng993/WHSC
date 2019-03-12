<template>
  <el-container id="container">
    <el-header>
      <div class="el-header-logo">
        <div>
          <img src="@/assets/images/logo.jpg" alt="logo" />
          <strong>中联支付</strong>
        </div>
      </div>
      <el-dropdown @command="removeStorage" trigger="click">
        <div>
          <img :src="headImg" alt="头像" />
          <span>用户名称</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='退出'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <sidebar></sidebar>
      <el-main>
        <el-scrollbar>
          <app-main></app-main>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {Sidebar, AppMain} from './components'
import {removeStorage} from '@/api/sessionStorage'
import headImg from '@/assets/images/user.png'

export default {
  name: 'Layout',
  data () {
    return {headImg}
  },
  components: {Sidebar, AppMain},
  computed: {
    /* headImg () {
      return getUserInfo().headImgUrl
    } */
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
