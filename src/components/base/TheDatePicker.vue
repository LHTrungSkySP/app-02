<template>
   <el-date-picker
    v-model="value1"
    type="date"
    placeholder="dd/mm/yyyy"
    :size="size"
  />
</template>
<script>
// import TheDatePicker from '@/components/base/TheDatePicker.vue';
export default {
    name: "TheDatePicker",
}
</script>