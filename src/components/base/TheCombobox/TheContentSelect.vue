<template>
  <div class="parent">{{content}}          
      <div
          @click="close"
          class="icon--12 icon-closeOption__cbx close-dialog icon"
        />
  </div>
</template>
<script>
export default {
  name: "TheContentSelect",
  data() {
    return {
    };
  },
  props: ["content"],
  components: {
  },
  watch: {
 
  },

  methods: {
    close(){
      this.$emit("remove",this.content)
    }
   
  },
};
</script>
<style scoped>
  @import url(../../../css/base/icon.css);
.parent{
  line-height: 24px;
  margin: 3px;
  background: #ddd;
  padding-right: 20px;
  padding-left: 5px;
  position: relative;
  border-radius: 5px;
  width: fit-content;
  display: inline-block;
}
.parent>div.close-dialog{
padding: 12px;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}
</style>