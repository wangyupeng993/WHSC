<template>
    <section v-if="!item.hidden&&item.children" class="menu-wrapper">
      <el-menu
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu :index="item.path">
          <template slot="title">
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item v-for="child in item.children" v-if="!child.hidden" :key="child.name" :index="child.path">
              <router-link :to="'/'+child.path" tag="span" exact>
                {{child.meta.title}}
              </router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
