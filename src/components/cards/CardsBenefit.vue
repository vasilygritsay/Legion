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

  @include mobile {
    flex-direction: column;
    justify-content: flex-start;
  }

  &__content {
    padding-top: em(39);
    width: em(313);

    @include mobile {
      position: relative;
      z-index: 2;
      padding-top: 0;
    }
  }

  &__title {
    margin-bottom: em(19);
  }

  &__image {
    width: em(409);
    height: em(307);
    border-radius: em(10);

    @include mobile {
      width: em(314);
      height: em(235);
    }
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
      position: relative;
      background-image: url("/images/bg/card-left.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding: em(30) em(30) em(30) em(87);

      @include mobile {
        background-image: none;
        padding: 0 em(20) em(20);

        &:before {
          background-image: url("/images/bg/card-mobile.png");
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          top: em(-17);
          left: 0;
          z-index: 1;
          content: "";
          width: 103%;
          height: em(612);
        }
      }

      #{$parent} {
        &__content {
          order: 1;
          margin-right: em(70);

          @include mobile {
            order: 2;
            margin-right: 0;
          }
        }

        &__image {
          order: 2;

          @include mobile {
            order: 1;
            margin-bottom: em(23);
          }
        }
      }
    }

    &--right {
      position: relative;
      background-image: url("/images/bg/card-right.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      padding: em(30) em(87) em(30) em(30);

      @include mobile {
        background-image: none;
        padding: 0 em(20) em(20);

        &:before {
          background-image: url("/images/bg/card-mobile.png");
          background-size: contain;
          background-repeat: no-repeat;
          position: absolute;
          top: em(-17);
          left: 0;
          z-index: 1;
          content: "";
          width: 103%;
          height: em(612);
        }
      }

      #{$parent} {
        &__content {
          order: 2;
        }

        &__image {
          order: 1;
          margin-right: em(70);

          @include mobile {
            margin-bottom: em(23);
          }
        }
      }
    }
  }
}
</style>
