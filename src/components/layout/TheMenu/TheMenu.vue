<template>
  <!-- thanh menu -->
  <div class="menu" :class="{ 'menu-small': !flagDragMenu }">
    <!-- tiêu đề trang -->
    <div class="menu__header">
      <div id="menu__header__title">
        <!-- <transition> -->
        <div v-if="flagDragMenu" class="icon icon-IconThietBi icon--32"></div>
          <p v-if="flagDragMenu">Thiết bị</p>
        <!-- </transition> -->
          

      </div>
      <div @click="dragMenu()" >
        <span class="icon-expand icon icon--24"></span>
      </div>
    </div>
    <!-- tác vụ menu  -->

    <div class="menu__content">
      <TheMenuItem 
      :flagDragMenu="flagDragMenu"
      v-for="item in menuItem"
      :key="item"
      :title="item.title"
      :icon="item.icon"
      @click="gotoDevice(item.title)"
      />
    </div>
  </div>
</template>
<script>
import TheMenuItem from "./TheMenuItem.vue";
export default {
  name: "TheMenu",
  data() {
    return {
      menuItem: [
        { title: "Tổng quan", icon: "icon-TongQuan" },
        { title: "Thiết bị", icon: "icon-ThietBi" },
        { title: "Mượn trả", icon: "icon-MuonTra" },
        { title: "Báo cáo", icon: "icon-BaoCao" },
        { title: "Hệ thống", icon: "icon-HeThong" },
      ],
      flagDragMenu: true,
    };
    // flagMenu: true
  },
  components: {
    TheMenuItem,
  },
  watch:{
  },
  methods: {
    gotoDevice(title){
      if(title=="Thiết bị"){
        // this.$router.removeRoute();
        this.$router.push('/device')
      }
      if(title=="Hệ thống"){
        // this.$router.removeRoute();
        this.$router.push('/')
      }
      if(title=="Tổng quan"){
        // this.$router.removeRoute();
        this.$router.push('/overview')
      }
    },
    dragMenu() {
      this.flagDragMenu = !this.flagDragMenu;
    },
  },
};
</script>
<style scoped>
@import url(../../../css/base/icon.css);
@import url(../../../css/layout/menu.css);
</style>