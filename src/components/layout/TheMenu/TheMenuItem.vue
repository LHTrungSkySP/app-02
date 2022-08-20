<template>
  <a class="menu__item">
    <div class="img" :class="[icon]" />
    <span v-if="flagDragMenu1">{{ title }}</span>

  </a>
</template>

<script>
export default {
  name: "TheMenuItem",
  created() {
    // console.log(this.link, typeof this.link);
  },
  data(){
    return{
      flagDragMenu1:this.flagDragMenu
    }
  },
  props: {
    icon: String,
    title: String,
    flagDragMenu: Boolean,
  },
  watch: {
    flagDragMenu: function () {
      this.flagDragMenu1=this.flagDragMenu;
    },
  },
  methods:{
  }
};
</script>


<style scoped>
@import url(../../../css/base/icon.css);
.menu__item {
  border-left: 3px solid transparent;
  margin: 4px 0 8px 0;
  height: 40px;
  padding: 0 4px 0 9px;
  display: flex;
  align-items: center;
  position: relative;
  color: #ffffff;
  text-decoration: none;
}
.menu__item:hover {
  border-color: #0dd469;
  background-color: #404f64;
  color: #0dd469;
  cursor: pointer;
}
.menu__item > .img {
  margin-right: 8px;
  height: 32px;
  width: 32px;
  /* background-image: url(this.link); */
}

</style>
