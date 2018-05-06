<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
div#app {
   display: inline;
}
</style>
<style lang="less" src="./styles/common.less"></style>

<script>
export default {
  created: function(){
    console.log('created');
    const web3_ = '';
    this.$store.commit('SetWeb3',web3_);
  }
}
</script>

