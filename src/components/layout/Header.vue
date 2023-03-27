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
    <button class="header__menu-button">
      <div class="header__line header__line--top" />
      <div class="header__line header__line--middle" />
      <div class="header__line header__line--bottom" />
    </button>
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

  @include mobile {
    padding: em(16) em(14);
  }

  &__logo-wrapper {
    @include mobile {
      position: absolute;
      left: 50%;
      top: em(10);
      transform: translateX(-50%);
    }
  }

  &__logo {
    width: em(143);
    transform: translateY(#{em(4)});

    @include mobile {
      width: em(119);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;

    @include mobile {
      display: none;
    }
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

  &__menu-button {
    position: relative;
    width: em(24);
    height: em(20);
    margin-left: auto;
    display: none;

    @include mobile {
      display: block;
    }
  }

  &__line {
    height: em(2);
    border-radius: em(10);
    position: absolute;
    left: 0;
    background-color: $color-white;

    &--top {
      top: 0;
      width: em(18);
    }

    &--middle {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }

    &--bottom {
      width: em(13);
      bottom: 0;
    }
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
