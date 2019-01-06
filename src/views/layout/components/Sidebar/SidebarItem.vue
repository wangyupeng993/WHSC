<template>
    <section v-if="!item.hidden&&item.children" class="menu-wrapper">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!--<template slot="title">
          <span>{{item.meta.title}}</span>
        </template>-->
        <!--<el-menu-item-group v-for="(items,index) in item.children" :key="index">-->
          <!--<el-submenu :index="items.path" v-if="items.children">-->
            <!--<template slot="title">{{items.meta.title}}</template>-->
            <!--<el-menu-item v-for="(itemslen,index) in items.children" :key="index" :index="itemslen.path">{{itemslen.meta.title}}</el-menu-item>-->
          <!--</el-submenu>-->
          <!--<el-menu-item v-else :index="items.path">{{items.meta.title}}</el-menu-item>-->
        <!--</el-menu-item-group>-->
      </el-menu>
    </section>
</template>

<script>
export default {
  name: 'SidebarItem',
  data () {
    return {}
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNestL: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
