<template>
  <div class="icon-list">
    <div class="icon-list__icon-wrapper">
      <img
        class="icon-list__icon"
        :src="`/images/icons/packs/${iconName}.png`"
        alt="icon"
      />
    </div>

    <div class="icon-list__list-wrapper">
      <div class="icon-list__title">
        <span class="icon-list__font icon-list__font--title">
          {{ title }}
        </span>
      </div>

      <ul class="icon-list__items">
        <template v-for="(item, index) in list" :key="index">
          <li class="icon-list__item">
            <span class="icon-list__font icon-list__font--number">
              {{ listNumber(index) }}
            </span>
            <div class="icon-list__text-wrapper">
              <span class="icon-list__font icon-list__font--item">
                {{ item }}
              </span>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconList",
  props: {
    iconName: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
    list: {
      type: String,
      default: undefined,
    },
  },
  methods: {
    listNumber(number) {
      return number < 9 ? "0" + (number + 1) : number + 1;
    },
  },
};
</script>

<style lang="scss">
.icon-list {
  @include mobile {
    display: flex;
  }

  &__icon-wrapper {
    background-image: url("/images/bg/icon-wrapper-transparent.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    width: em(64);
    height: em(65);
    margin-bottom: em(22);
    flex-shrink: 0;

    @include mobile {
      margin-right: em(20);
      margin-bottom: 0;
    }
  }

  &__icon {
    width: em(50);
    height: em(38);
  }

  &__list-wrapper {
    @include mobile {
      margin-top: em(18);
    }
  }

  &__title {
    margin-bottom: em(23);
  }

  &__item {
    display: flex;
    list-style: none;

    &:not(:last-child) {
      margin-bottom: em(13);
    }
  }

  &__text-wrapper {
    margin-left: em(2);
  }

  &__font {
    &--title {
      font-size: em(20);
      font-weight: 600;
      line-height: em(31, 20);
    }

    &--item {
      font-size: em(15);
      line-height: em(26, 15);
      color: rgba($color-white, 0.4);
    }

    &--number {
      display: block;
      width: em(26);
      color: $color-accent;
      flex-shrink: 0;
      font-size: em(15);
      line-height: em(26, 15);
    }
  }
}
</style>
