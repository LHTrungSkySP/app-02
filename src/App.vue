<template>
  <div class="layout">
    <TheMenu/>
    <div class="main">
      <TheHeader/>
      <TheContent/>
    </div>
  </div>
</template>

<script>
import TheContent from "./components/layout/TheContent/TheContent.vue";
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
    TheContent,
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
