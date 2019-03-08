<template>
    <section v-if="!item.hidden&&item.children" class="menu-wrapper">
      <el-submenu :index="item.path">
        <template slot="title">
          <span>{{item.meta.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" v-if="!child.hidden" :key="child.name" :index="item.path + '/'+ child.path">
            <template slot="title">
              {{child.meta.title}}
            </template>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
