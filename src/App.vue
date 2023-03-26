<template>
  <Resize class="layout">
    <Header class="layout__header" />

    <RouterView class="layout__page" />

    <Footer class="layout__footer" />
  </Resize>
</template>

<script>
import Resize from "@/components/common/Resize.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

export default {
  name: "App",
  components: { Footer, Header, Resize },
};
</script>

<style lang="scss">
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__header {
    position: relative;
    z-index: 10;
  }

  &__page {
    position: relative;
    z-index: 1;
  }

  &__footer {
    position: relative;
    z-index: 10;
    margin: auto em(135) 0;
  }
}
</style>
