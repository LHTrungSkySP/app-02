<template>
  <div class="combobox__option grid">
    <TheCheckBox :type="normal" :isCheckAll="isCheckAll" @check="toggleCheck"/>
    <p>{{post }}</p>
  </div>
</template>
<script>
import TheCheckBox from "@/components/base/TheCombobox/TheCheckBox.vue";
export default {
  name: "TheComboboxOption",
  data() {
    return {
      isSelected: false,
    };
  },
  props: {
    post: Object,
    isCheckAll: Boolean,
  },
  components: {
    TheCheckBox,
  },
  watch: {
    isCheckAll: function () {
      this.isSelected = this.isCheckAll;
      // selectedAll();
    },
    isSelected:function(){
      this.$emit("conutSelected",this.isSelected,this.post);

    }
  },

  methods: {
    // selectedAll(){
    //   this.$emit("conutSelected",ischeck,this.post.option);
    // },
    toggleCheck: function(ischeck) {

      this.isSelected = ischeck;

    },
  },
};
</script>
<style scoped>
.grid {
  display: grid;
  grid-template-columns: 50px auto;
}
.combobox__option.grid {
  padding: 0;
  background-color: #ffffff;
}
</style>