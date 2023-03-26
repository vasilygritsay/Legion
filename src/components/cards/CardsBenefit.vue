<template>
  <div
    class="cards-benefit"
    :class="{ [`cards-benefit--side--${side}`]: side }"
  >
    <div class="cards-benefit__content">
      <div class="cards-benefit__title">
        <span class="cards-benefit__font cards-benefit__font--title">
          {{ title }}
        </span>
      </div>

      <div class="cards-benefit__text">
        <span class="cards-benefit__font cards-benefit__font--text">
          {{ text }}
        </span>
      </div>
    </div>

    <img
      class="cards-benefit__image"
      :src="`/images/benefits/${image}.jpg`"
      alt="image"
    />
  </div>
</template>

<script>
export default {
  name: "CardsBenefit",
  props: {
    title: {
      type: String,
      default: undefined,
    },
    text: {
      type: String,
      default: undefined,
    },
    image: {
      type: String,
      default: undefined,
    },
    side: {
      type: String,
      default: "left",
    },
  },
};
</script>

<style lang="scss">
.cards-benefit {
  $parent: &;
  display: flex;
  justify-content: center;

  &__content {
    padding-top: em(39);
    width: em(313);
  }

  &__title {
    margin-bottom: em(19);
  }

  &__image {
    width: em(409);
    height: em(307);
    border-radius: em(10);
  }

  &__font {
    &--title {
      font-family: Squada One, sans-serif;
      font-size: em(42);
      line-height: em(71, 42);
    }

    &--text {
      font-size: em(15);
      line-height: em(25, 15);
    }
  }

  &--side {
    &--left {
      background-image: url("/images/bg/card-left.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding: em(30) em(30) em(30) em(87);

      #{$parent} {
        &__content {
          order: 1;
          margin-right: em(70);
        }

        &__image {
          order: 2;
        }
      }
    }

    &--right {
      background-image: url("/images/bg/card-right.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding: em(30) em(87) em(30) em(30);

      #{$parent} {
        &__content {
          order: 2;
        }

        &__image {
          order: 1;
          margin-right: em(70);
        }
      }
    }
  }
}
</style>
