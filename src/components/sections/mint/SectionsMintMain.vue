<template>
  <section class="sections-mint-main">
    <div class="sections-mint-main__content">
      <div class="sections-mint-main__container">
        <div class="sections-mint-main__title">
          <span
            class="sections-mint-main__font sections-mint-main__font--title"
          >
            Legion Universe
          </span>
        </div>

        <div class="sections-mint-main__buttons">
          <CButton
            class="sections-mint-main__button sections-mint-main__button--connect"
            theme="primary"
            with-lines
          >
            <span
              class="sections-mint-main__font sections-mint-main__font--connect"
            >
              Connect Wallet
            </span>
          </CButton>

          <CButton
            class="sections-mint-main__button sections-mint-main__button--buy"
            theme="bordered"
          >
            <span
              class="sections-mint-main__font sections-mint-main__font--text"
            >
              Buy with credit card
            </span>

            <template #icon-left>
              <LeafIcon class="sections-mint-main__icon" />
            </template>
          </CButton>

          <NumberInput
            class="sections-mint-main__input"
            :value="quantity"
            @input="setQuantity"
          >
            <span
              class="sections-mint-main__font sections-mint-main__font--text"
            >
              Credit card quantity
            </span>
          </NumberInput>
        </div>
      </div>
    </div>

    <img
      class="sections-mint-main__card"
      src="/images/cards/main.jpg"
      alt="card"
    />
  </section>
</template>

<script>
import LeafIcon from "@/assets/svg/leaf.svg";
import CButton from "@/components/ui/CButton.vue";
import NumberInput from "@/components/ui/NumberInput.vue";

export default {
  name: "SectionsMintMain",
  components: { NumberInput, CButton, LeafIcon },
  data() {
    return {
      quantity: 1,
    };
  },
};
</script>

<style lang="scss">
.sections-mint-main {
  display: flex;
  justify-content: space-between;
  padding: em(107) em(135) 0;
  position: relative;

  @include mobile {
    padding: em(12) em(10) 0;
    flex-direction: column;
  }

  &:before {
    background-image: url("/images/page-bg/mint-top.png");
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: em(950);
    z-index: 1;
    content: "";

    @include mobile {
      display: none;
    }
  }

  &__content {
    position: relative;
    z-index: 2;
    width: em(630);
    padding: em(47) em(120) em(50);

    @include mobile {
      width: 100%;
      padding: em(30) em(26) em(40);
      margin-bottom: em(49);
    }

    &:before {
      position: absolute;
      left: 50%;
      top: em(-72);
      width: 124%;
      height: 113%;
      transform: translateX(-50%);
      content: "";
      background-image: url("/images/bg/left-bottom-corner.png");
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 1;

      @include mobile {
        width: em(580);
        left: em(10);
        right: em(10);
        height: em(800);
        transform: translateX(-15%);
        background-size: auto;
        background-image: url("/images/bg/left-bottom-corner-mobile.png");
      }
    }
  }

  &__container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-bottom: em(25);

    @include mobile {
      margin-bottom: em(45);
    }
  }

  &__button {
    &--connect {
      width: em(271);
      height: em(85);
      margin-bottom: em(61);

      @include mobile {
        margin-bottom: em(50);
      }
    }

    &--buy {
      width: em(270);
      height: em(78);
      margin-bottom: em(10);
    }
  }

  &__input {
    width: em(270);
    height: em(78);
  }

  &__card {
    width: em(368);
    position: relative;
    z-index: 2;

    @include mobile {
      width: em(271);
      margin: 0 auto;
    }
  }

  &__font {
    &--title {
      font-family: Squada One, sans-serif;
      font-size: em(64);
      line-height: em(110, 64);

      @include mobile {
        font-size: em(42);
        line-height: 1;
      }
    }

    &--connect {
      font-family: Squada One, sans-serif;
      font-size: em(30);
      line-height: em(30, 30);
    }

    &--text {
      font-family: Outfit, sans-serif;
      font-size: em(17);
      font-weight: 600;
      line-height: em(31, 17);
    }
  }
}
</style>
