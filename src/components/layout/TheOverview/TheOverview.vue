<template>
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
        :size="size"
      />
    </div>
  <!-- <div><TheDatePicker></TheDatePicker></div> -->
</template>
<script>
  // import TheDatePicker from '@/components/base/TheDatePicker.vue';
  export default {
    name: "TheOverview",
    component:{
      // TheDatePicker,
    },
    data(){
      return{
        value: "",
      }
    }
  }
</script>
<style scoped>
  .block{
    height: 100px;
  }
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}
.demo-date-picker .block {
  padding: 10px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
.demo-date-picker .block:last-child {
  border-right: none;
}
.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>