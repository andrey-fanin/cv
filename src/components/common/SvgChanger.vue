<script setup>
import ImgHtmlCss from "../../assets/img/ImgHtmlCss.vue";
import ImgJs from "../../assets/img/ImgJs.vue";
import ImgVue from "../../assets/img/ImgVue.vue";
defineProps({
  item: Object
})

</script>

<template>
  <img-html-css v-if="item.id === 1"/>
  <img-js v-else-if="item.id === 2"/>
  <img-vue v-else />
</template>


<style lang="scss">
//@import "@/";
</style>