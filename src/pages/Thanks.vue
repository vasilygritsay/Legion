<template>
  <div class="thanks-page">
    <div class="thanks-page__wrapper">
      <h1 class="thanks-page__title">
        <span class="thanks-page__font thanks-page__font--title">
          Thank you
        </span>
      </h1>

      <div class="thanks-page__text">
        <span class="thanks-page__font thanks-page__font--text">
          Congratulations on your purchase of a Legion NFT! You can now share
          this event with your friends on Twitter.
        </span>
      </div>

      <CButton
        class="thanks-page__button"
        theme="primary"
        with-lines
        @click="share"
      >
        <span class="thanks-page__font thanks-page__font--button">
          Share on twitter
        </span>
      </CButton>
    </div>
  </div>
</template>

<script>
import { share } from "@/tools/helpers.js";

import CButton from "@/components/ui/CButton.vue";

export default {
  name: "Thanks",
  components: { CButton },
  methods: {
    share() {
      share(
        "tw",
        import.meta.env.VITE_APP_URL,
        {
          title: "Already copped up my Legion NFT. Who else is getting one?",
          image: import.meta.env.VITE_APP_URL + "/images/share.jpg",
        },
        () => {}
      );
    },
  },
};
</script>

<style lang="scss">
.thanks-page {
  position: relative;
  padding: em(121) 0 em(230);

  @include mobile {
    padding: em(66) 0 em(210);
  }

  &:before {
    background-image: url("/images/page-bg/thanks.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: em(950);
    z-index: 1;
    content: "";

    @include mobile {
      top: em(57);
      left: em(-245);
      width: 270%;
      height: em(1030);
    }

    @media screen and (max-width: 425px) {
      height: em(740);
    }
  }

  &__wrapper {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    background: linear-gradient(
      92.97deg,
      #ffffff 2.9%,
      rgba(255, 255, 255, 0) 109.66%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    margin-bottom: em(18);
  }

  &__text {
    max-width: em(515);
    text-align: center;
    margin-bottom: em(73);

    @include mobile {
      max-width: em(309);
      margin-bottom: em(96);
    }
  }

  &__button {
    width: em(271);
    height: em(85);
  }

  &__font {
    &--title {
      font-family: Squada One, sans-serif;
      font-size: em(115, 32);
      line-height: em(158, 115);

      @include mobile {
        font-size: em(55, 32);
        line-height: em(66, 55);
      }
    }

    &--text {
      font-size: em(20);
      line-height: em(28, 20);
    }

    &--button {
      font-family: Squada One, sans-serif;
      font-size: em(30);
      line-height: em(27, 30);
    }
  }
}
</style>
