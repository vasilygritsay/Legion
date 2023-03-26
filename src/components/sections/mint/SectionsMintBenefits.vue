<template>
  <section class="sections-mint-benefits">
    <div class="sections-mint-benefits__container">
      <div
        class="sections-mint-benefits__title sections-mint-benefits__title--top"
      >
        <span
          class="sections-mint-benefits__font sections-mint-benefits__font--title"
        >
          LEGION UNIVERSE
        </span>
      </div>

      <div
        class="sections-mint-benefits__title sections-mint-benefits__title--bottom"
      >
        <span
          class="sections-mint-benefits__font sections-mint-benefits__font--title"
        >
          DTC BENEFITS
        </span>
      </div>

      <div class="sections-mint-benefits__cards">
        <template v-for="(card, index) in cards" :key="index">
          <CardsBenefit
            class="sections-mint-benefits__card"
            :title="card.title"
            :text="card.text"
            :image="card.image"
            :side="index % 2 === 0 ? 'left' : 'right'"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import benefits from "@/config/benefits.js";

import CardsBenefit from "@/components/cards/CardsBenefit.vue";

export default {
  name: "SectionsMintBenefits",
  components: { CardsBenefit },
  setup() {
    return {
      cards: benefits,
    };
  },
};
</script>

<style lang="scss">
.sections-mint-benefits {
  position: relative;
  padding: 0 em(135) em(120);

  &:before {
    background-image: url("/images/page-bg/mint-bottom.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: em(500);
    left: 0;
    width: 100%;
    height: em(1800);
    z-index: 1;
    content: "";
  }

  &__container {
    position: relative;
    z-index: 2;
  }

  &__title {
    position: relative;

    &--top {
      background: linear-gradient(
        91.89deg,
        #ffffff 0.45%,
        rgba(255, 255, 255, 0.3) 104.83%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      &:before {
        right: em(-280);
      }
    }

    &--bottom {
      padding-left: em(209);
      background: linear-gradient(
        90.17deg,
        #ffffff 0.05%,
        rgba(255, 255, 255, 0.3) 106.37%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: em(64);

      &:before {
        left: em(-280);
      }
    }

    &:before {
      content: "";
      position: absolute;
      width: em(452);
      height: em(112);
      top: 50%;
      transform: translateY(-50%);
      border: 1px solid $color-white;
      border-radius: em(10);
    }
  }

  &__cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__card {
    width: em(910);

    &:not(:last-child) {
      margin-bottom: em(30);
    }
  }

  &__font {
    &--title {
      font-family: Squada One, sans-serif;
      font-size: em(161);
      line-height: em(188, 161);
    }
  }
}
</style>
