<template>
  <div ref="app" :style="{ fontSize: fSize + 'px' }">
    <slot />
  </div>
</template>

<script>
const defaultFont = 16;

const desktopConfig = {
  defaultWidth: 1440,
  minWidth: 768,
  defaultHeight: 700,
  minHeight: 0,
};

const mobileConfig = {
  defaultWidth: 375,
  minWidth: 280,
  defaultHeight: 600,
  minHeight: 200,
};

export default {
  name: "Resize",
  mounted() {
    window.addEventListener("resize", this.onResize.bind(this));
    this.onResize();
    this.isMobile();
    this.$root.$emit("resize");
  },
  data() {
    return {
      vW: document.body.clientWidth,
      vH: document.body.clientHeight,
    };
  },
  computed: {
    fSize() {
      const config = this.isMobile() ? mobileConfig : desktopConfig;

      const horizontalRatio =
        Math.max(config.minWidth, this.vW) / config.defaultWidth;
      const verticalRatio =
        Math.max(config.minHeight, this.vH) / config.defaultHeight;
      const minRatio = Math.min(horizontalRatio, verticalRatio);
      return defaultFont * minRatio;
    },
  },
  methods: {
    isMobile() {
      return this.vW < desktopConfig.minWidth;
    },
    onResize() {
      this.$root.$emit("onResize");
      this.vW = document.body.clientWidth;
      this.vH = document.body.clientHeight;

      const vh = this.vH * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
};
</script>
