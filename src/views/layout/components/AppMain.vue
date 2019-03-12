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
