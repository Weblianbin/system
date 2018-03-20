<template>
  <div class="MainBox">
    <Header @openOrClose='openOrClose'></Header>
    <el-container>
      <Aside :isOpenOrClose='isOpenOrClose'></Aside>
      <el-main class="mainChildren base_background">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Aside from '@/components/Aside/index.vue'
export default {
  components: {
    Header,
    Aside
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isOpenOrClose: null
    }
  },
  methods: {
    openOrClose (value) {
      this.isOpenOrClose = value
    }
  }
}
</script>

<style scoped>
.mainChildren{
  height: calc(100% - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
