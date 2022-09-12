<template>
  <div class="layout">
    <TheMenu/>
    <div class="main">
      <TheHeader/>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheMenu from "./components/layout/TheMenu/TheMenu.vue";
import TheHeader from "./components/layout/TheHeader/TheHeader.vue";
// import TheDialogDelete from "./components/layout/dialog/TheDialogDelete.vue";
export default {
  name: "App",
  data(){
    return {
      flagDialogAdd: false,
      flagDialogEdit: false,
      flagDialogNotification: false,
    }
  },
  components: {
    // TheDialogEmployeeVue,
    TheMenu,
    TheHeader,
    // TheDialogDelete,
    
},
methods:{
}
};
</script>

<style>
@import url(./css/main.css);
</style>
