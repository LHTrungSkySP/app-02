<template>
    <div class="paging">
      <div class="paging-bar">
        <div class="paging__ele paging__ele-btn">
          <img
            class="icon--24"
            src="../../assets/Icons/ic_MoveToFirst.png"
            alt=""
          />
        </div>
        <div class="paging__ele paging__ele-btn">
          <img class="icon--24" src="../../assets/Icons/ic_Back.png" alt="" />
        </div>
        <input class="input paging__ele" />
        <div class="paging__ele paging__ele-btn">
          <img class="icon--24" src="../../assets/Icons/ic_Next.png" alt="" />
        </div>
        <div class="paging__ele paging__ele-btn">
          <img
            class="icon--24"
            src="../../assets/Icons/ic_MoveToLast.png"
            alt=""
          />
        </div>
        <div class="paging__ele">1/2 trang</div>
        <div class="paging__ele">({{this.number}} giáo viên)</div>
      </div>
    </div>
</template>
<script>

export default {
  name: "TheMenu",
  data() {
    return{
    number: this.numberOfficer

    }
  },
  props:{
    numberOfficer: String,
  },
  components: {
  },
  methods: {}
};
</script>
<style scoped>
@import url(../../css/layout/paging.css);
@import url(../../css/base/icon.css);
</style>