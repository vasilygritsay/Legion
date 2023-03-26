<template>
  <component
    :is="component.element"
    v-bind="component.attrs"
    class="c-button"
    :class="{
      [`c-button--theme--${theme}`]: theme,
      'c-button--withLines': withLines,
    }"
  >
    <div class="c-button__background" />

    <div class="c-button__icon-wrapper c-button__icon-wrapper--left">
      <slot name="icon-left" />
    </div>

    <div class="c-button__text">
      <slot />
    </div>

    <div class="c-button__icon-wrapper c-button__icon-wrapper--right">
      <slot name="icon-right" />
    </div>
  </component>
</template>

<script>
import { toRefs } from "vue";
import { useButtonComponent } from "@/composables/useButtonComponent.js";

const themes = ["primary", "transparent", "bordered"];
export default {
  name: "CButton",
  props: {
    href: {
      type: String,
      default: undefined,
    },
    to: {
      type: String,
      default: undefined,
    },
    target: {
      type: String,
      default: undefined,
    },
    theme: {
      type: String,
      default: "transparent",
      validator(value) {
        return themes.includes(value);
      },
    },
    withLines: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { href, to, target } = toRefs(props);

    const { component } = useButtonComponent(href, to, target);

    return {
      component,
    };
  },
};
</script>

<style lang="scss">
.c-button {
  position: relative;
  $parent: &;

  &__background {
    display: none;
  }

  &--withLines {
    padding: em(20) 0;
    &:before,
    &:after {
      position: absolute;
      right: 0;
      content: "";
      height: 1px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        #ffffff 14.58%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &:before {
      top: em(-20);
      width: em(226);
    }

    &:after {
      bottom: em(-20);
      width: em(256);
    }
  }

  &--theme {
    &--primary {
      // backdrop-filter: blur(57px);
      //clip-path: polygon(10% 0%, 101% 0, 100% 100%, 0 100%, 0% 33%);
      //box-shadow: 0 0 em(74) rgba(34, 245, 195, 0.55);

      #{$parent} {
        &__background {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          right: 0;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          background-image: url("/images/bg/button.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
