<template>
    <div class="paging">
      <div class="paging-bar">
        <div @click="pagingFirst" class="paging__ele paging__ele-btn">
          <img
            class="icon--24"
            src="@/assets/Icons/ic_MoveToFirst.png"
            alt=""
          />
        </div>
        <div class="paging__ele paging__ele-btn">
          <img  @click="pagingReduce" class="icon--24" src="@/assets/Icons/ic_Back.png" alt="" />
        </div>
        <input class="input paging__ele" v-model="paging" @change="changePaging"/>
        <div class="paging__ele paging__ele-btn">
          <img @click="pagingAdd" class="icon--24" src="@/assets/Icons/ic_Next.png" alt="" />
        </div>
        <div @click="pagingLast" class="paging__ele paging__ele-btn">
          <img
            class="icon--24"
            src="@/assets/Icons/ic_MoveToLast.png"
            alt=""
          />
        </div>
        <div class="paging__ele">{{positionPaging}}/{{pageCount}} trang</div>
        <div class="paging__ele">({{numberRecord}} giáo viên)</div>
      </div>
    </div>
</template>
<script>

export default {
  name: "ThePaging",
  data() {
    return{
      paging: 1,

      positionPaging: 1,
    }
  },
  props:["numberRecord","pageCount"],
  
  components: {
  },
  methods: {
    changePaging(){
      var tam=parseInt(this.paging);
      if(!isNaN(tam)){
        if(tam<=this.pageCount && tam>=1){
          this.$emit('changPage',tam);
          this.positionPaging=tam;
        }
      }
      else{
        console.log("nguvl")
      }
    },
    pagingAdd(){
      if(this.positionPaging+1 <= this.pageCount){
        this.positionPaging++;
        this.paging=this.positionPaging;
        this.$emit('changPage',this.positionPaging);
      }
    },
    pagingReduce(){
      if(this.positionPaging-1 >=1){
        this.positionPaging--;
        this.paging=this.positionPaging;
        this.$emit('changPage',this.positionPaging);

      }
    },
    pagingFirst(){
      this.positionPaging=1;
      this.paging=this.positionPaging;
      this.$emit('changPage',this.positionPaging);
    },
    pagingLast(){
      this.positionPaging=this.pageCount;
      this.paging=this.positionPaging;
      this.$emit('changPage',this.positionPaging);
    }
  }
};
</script>
<style scoped>
@import url(@/css/layout/paging.css);
@import url(@/css/base/icon.css);
</style>