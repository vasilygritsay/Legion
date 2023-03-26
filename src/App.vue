<template>
  <Resize class="layout">
    header

    <router-view> </router-view>

    footer
  </Resize>
</template>

<script>
import Resize from "@/components/common/Resize.vue";

export default {
  name: "App",
  components: { Resize },
};
</script>
