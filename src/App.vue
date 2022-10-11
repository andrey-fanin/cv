<script setup lang="ts">
import ContainerComponent from "./components/common/ContainerComponent.vue";
import {computed, ref} from "vue";
import SvgAdobe from "./assets/svg/SvgAdobe.vue";
</script>

<template>
  <router-view
      v-if="
      $route.path === '/resume'
    "
  ></router-view>
  <container-component v-else>
    <div class="main-nav__wrap">
      <router-link to="/resume" class="main-nav__link main-nav__link--blue">open portfolio</router-link>
      <a href="/dist/assets/Andrey_Fanin_Frontend_developer_CV.pdf" download=""
         class="main-nav__link main-nav__link--red">download<div class="main-nav__link-svg">
          <svg-adobe/>
        </div></a>

    </div>
  </container-component>
</template>

<style lang="scss">
@import "./styles/common/main-nav";
</style>
