<template>
  <div id="app">
    <div class="navbar">
      <router-link class="navbar-item" to='/message'>
        <span class="icon-bubble"></span>
      </router-link>
      <router-link class="navbar-item" to='/relation'>
        <span class="icon-users"></span>
      </router-link>
      <router-link class="navbar-item" to='/myself'>
        <span class="icon-user"></span>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>


  export default {
    name: 'app',
    data() {
      return {}
    },
    created() {
      //
    },
    methods: {
      changeColor: function(e) {
        let div = e.target.className
        document.querySelector(".navbar").style.color = "#000"
        div.style.color = "#3385ff"
      }
    }
  }
</script>

<style lang="less">
  @import url('./public/css/style.less');

  html,body {
    width: 100%;
    height: 100%;
    background-color: #eee;
  }
  #app {
    height: 100%;
    min-height: 100%;
  }
  .navbar {
    display: -webkit-flex;
    display: flex;
    position: fixed;
    top: 100%;
    left: 0;
    margin-top: -50px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #ccc;
    background-color: #fff;
    z-index: 1000;
    .navbar-item {
      flex: 1;
      font-size: 19px;
      text-align: center;
      &.router-active {
        color: #3385ff; 
      }
    }
  }
</style>
