<template>
  <label class="number-input">
    <div class="number-input__input-wrapper">
      <input
        class="number-input__input"
        type="number"
        :value="value"
        @input="emitInput"
      />

      <div class="number-input__arrows">
        <button class="number-input__arrow">
          <ArrowIcon class="number-input__icon number-input__icon--top" />
        </button>

        <button class="number-input__arrow">
          <ArrowIcon class="number-input__icon number-input__icon--bottom" />
        </button>
      </div>
    </div>

    <div class="number-input__text">
      <span class="number-input__font number-input__font--text">
        <slot />
      </span>
    </div>
  </label>
</template>

<script>
import ArrowIcon from "@/assets/svg/input-arrow.svg";

export default {
  name: "NumberInput",
  components: { ArrowIcon },
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style lang="scss">
.number-input {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  border: em(2) solid $color-accent;
  border-radius: em(10);
  padding: em(8);

  &__input-wrapper {
    width: em(60);
    height: em(58);
    background: rgba(0, 0, 0, 0.3);
    border-radius: em(6);
    padding-right: em(10);
    display: flex;
    align-items: center;
    margin-right: em(18);
  }

  &__input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: none;
    padding-left: em(20, 17);
    font-size: em(17);
    font-weight: 600;
  }

  &__arrow {
    height: em(8);

    &:first-child {
      margin-bottom: em(6);
    }
  }

  &__icon {
    width: em(7);

    &--bottom {
      transform: rotate(180deg);
    }
  }
}
</style>
