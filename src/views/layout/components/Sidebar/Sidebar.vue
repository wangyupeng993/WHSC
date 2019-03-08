<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" style="width:220px;" >
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      router
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from '../Sidebar/SidebarItem'
export default {
  name: 'Sidebar',
  data () {
    return {}
  },
  components: {SidebarItem},
  computed: {
    routes () {
      return this.$router.options.routes
    }
  },
  created () {},
  mounted () {
    console.log(this.$route.path)
  },
  methods: {}
}
</script>

<style scoped></style>
