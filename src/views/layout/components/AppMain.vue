<template>
    <div class="app-main">
      <transition name="el-fade-in-linear" mode="out-in">
        <router-view/>
      </transition>
    </div>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
  .app-main {
    /*50 = navbar  */
    /*min-height: calc(100vh - 50px);*/
    position: relative;
    overflow: hidden;
  }
</style>
