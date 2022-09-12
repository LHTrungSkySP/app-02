<template>
  <vue-excel-xlsx
    :data="dataExport.data"
    :columns="dataExport.columns"
    :file-name="'filename'"
    :file-type="'xlsx'"
    :sheet-name="'sheetname'"
  >
    Download
  </vue-excel-xlsx>
</template>
<script>
// import VueExcelXlsx from "../../../../node_modules/vue-excel-xlsx/VueExcelXlsx.vue";
// import TheDatePicker from "../../base/TheDatePicker.vue"
import ExportStyle from "../../../javascript/ExportStyle";
export default {
  name: "TheOverview",
  data() {
    return {
      dataExport: ExportStyle,
    };
  },
  methods: {},
};
</script>
    <style scoped>
@import url(../../../css/main.css);
@import url(../../../css/layout);
</style>