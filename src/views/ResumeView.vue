<script setup>
import HeaderComponent from "../components/common/HeaderComponent.vue";
import projects from "../data/projects/projects";
import LoaderComponent from "../components/common/LoaderComponent.vue";
import {onMounted, ref} from "vue";
import SvgChanger from "../components/common/SvgChanger.vue";

const isReady = ref(false);
onMounted(() => {
  setTimeout(() => {
    isReady.value = true
  }, 1000);
})

</script>

<template>
    <template v-if="isReady">
      <header-component/>
      <div class="container">
      <div class="resume__wrap">
        <ul class="resume__list">
          <li class="resume__item" v-for="item in projects" :key="item.id">
            <div class="resume__item-title">
              <a class="resume__item-title__link" :href="item.link">
                {{ item.name }}
              </a>
              <div class="resume__item-title__icon">
                <svg-changer :item="item"/>
              </div>
            </div>
            <p class="resume__item-descr">
              {{ item.descr }}
            </p>
          </li>
        </ul>
      </div>
    </div>
    </template>
    <loader-component v-else/>
</template>


<style lang="scss">
@import "./src/styles/views/resume.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
</style>