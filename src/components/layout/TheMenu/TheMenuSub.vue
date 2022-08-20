<template>
      <!-- menu sub  -->
      <div class="menu-sub" v-if="showMenuSub">
          <div class="menu-sub__header">
            <p>Hệ thống</p>
          </div>
          <div class="menu-sub__content">
            <div class="menu-sub__item">Danh sách thiết bị</div>
            <div class="menu-sub__item">Tăng thiết bị</div>
            <div class="menu-sub__item">Theo dõi hỏng mất</div>
            <div class="menu-sub__item">Kiểm kê</div>
            <div class="menu-sub__item">Thanh lý</div>
            <div class="menu-sub__item">Giảm thiết bị</div>
          </div>
        </div>
</template>
<script>
export default {
    name: 'TheMenuSub',
    data(){
        showMenuSub: true;
    },

}
</script>
<style scoped>
@import url(../../../css/layout/menu.css);
</style>