<template>
  <footer class="footer">
    <RouterLink class="footer__logo-wrapper" :to="routes.MAIN">
      <img class="footer__logo" src="/images/logo.png" alt="logo" />
    </RouterLink>

    <nav class="footer__nav">
      <template v-for="(item, index) in navigation" :key="index">
        <CButton class="footer__button" :to="item.to">
          <span class="footer__font footer__font--button">
            {{ item.text }}
          </span>
        </CButton>
      </template>
    </nav>
  </footer>
</template>

<script>
import routes from "@/constants/routes.js";
import navigation from "@/config/navigation.js";

import CButton from "@/components/ui/CButton.vue";

export default {
  name: "Footer",
  components: { CButton },
  setup() {
    return {
      navigation: navigation.footer,
      routes,
    };
  },
};
</script>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: em(31) 0 em(52);
  border-top: 1px solid $color-white;
  background-color: transparent;

  @include mobile {
    flex-direction: column;
  }

  &__logo {
    width: em(143);

    @include mobile {
      width: em(119);
      margin-bottom: em(26);
    }
  }

  &__nav {
    display: flex;
    align-items: center;
  }

  &__button {
    &:not(:last-child) {
      margin-right: em(45);

      @include mobile {
        margin-right: em(24);
      }
    }
  }

  &__font {
    &--button {
      font-size: em(12);
      line-height: em(21, 12);
    }
  }
}
</style>
