<script setup>
import {cv} from '../../data/links/links'
import SvgAdobe from "../../assets/svg/SvgAdobe.vue";

</script>

<template>
  <div class="container">
    <header class="header">
      <a :href="cv" download=""
         class="header__link">
        download
        <div class="header__link-svg">
          <svg-adobe/>
        </div>
      </a>
    </header>
  </div>
</template>


<style lang="scss">
@import "./src/styles/common/header";
</style>