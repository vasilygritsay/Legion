<template>
  <header class="header">
    <RouterLink class="header__logo-wrapper" :to="routes.MAIN">
      <img class="header__logo" src="/images/logo.png" alt="logo" />
    </RouterLink>

    <div class="header__buttons">
      <nav class="header__nav">
        <template v-for="(item, index) in navigation" :key="index">
          <CButton class="header__nav-button" :to="item.to">
            <span class="header__font header__font--button">
              {{ item.text }}
            </span>
          </CButton>
        </template>
      </nav>

      <CButton class="header__connect-button" theme="primary">
        <span class="header__font header__font--button"> Connect Wallet </span>
      </CButton>
    </div>
  </header>
</template>

<script>
import routes from "@/constants/routes.js";
import navigation from "@/config/navigation.js";

import CButton from "@/components/ui/CButton.vue";

export default {
  name: "Header",
  components: { CButton },
  setup() {
    return {
      navigation: navigation.header,
      routes,
    };
  },
};
</script>

<style lang="scss">
.header {
  padding: em(12) em(135);
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo {
    width: em(143);
    transform: translateY(#{em(4)});
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__nav {
    display: flex;
    align-items: center;
    margin-right: em(50);
  }

  &__nav-button {
    &:not(:last-child) {
      margin-right: em(50);
    }
  }

  &__connect-button {
    width: em(143);
    height: em(45);
  }

  &__font {
    &--button {
      font-size: em(15);
      font-weight: 600;
      line-height: em(15, 27);
    }
  }
}
</style>
