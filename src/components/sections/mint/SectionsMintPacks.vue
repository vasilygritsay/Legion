<template>
  <section class="sections-mint-packs">
    <div class="sections-mint-packs__container">
      <div class="sections-mint-packs__title-wrapper">
        <div class="sections-mint-packs__title">
          <span
            class="sections-mint-packs__font sections-mint-packs__font--title"
          >
            BONUS PACKS
          </span>
        </div>

        <div class="sections-mint-packs__text">
          <span
            class="sections-mint-packs__font sections-mint-packs__font--text"
          >
            Qualify for the following Bonus Packs by purchasing the Bonus Pack
            number of Legion Universe Digital Trading Cards. A Bonus Pack gives
            you additional physical bonuses (items mailed to you) as well as
            potential opportunities to join with us in the physical production
            and premiers of the films.
          </span>
        </div>
      </div>

      <div class="sections-mint-packs__content">
        <template v-for="(pack, index) in packs" :key="index">
          <IconList
            class="sections-mint-packs__list"
            :icon-name="pack.iconName"
            :title="pack.title"
            :list="pack.list"
          />
        </template>
      </div>

      <div class="sections-mint-packs__interrupter">
        <div class="sections-mint-packs__interrupter-title">
          <span
            class="sections-mint-packs__font sections-mint-packs__font--interrupter-title"
          >
            Buy 50 Digital Trading Cards
          </span>
        </div>

        <div class="sections-mint-packs__interrupter-text">
          <span
            class="sections-mint-packs__font sections-mint-packs__font--interrupter-text"
          >
            and you are guranteed receive an invitation to attend a RED CARPET
            PREMIER SCREENING for one of the films
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import packs from "@/config/packs.js";
import IconList from "@/components/blocks/IconList.vue";
export default {
  name: "SectionsMintPacks",
  components: { IconList },
  setup() {
    return {
      packs,
    };
  },
};
</script>

<style lang="scss">
.sections-mint-packs {
  position: relative;
  padding: 0 em(135);

  &:before {
    background-image: url("/images/page-bg/mint-middle.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: em(150);
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

  &__title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: em(48);
  }

  &__content {
    display: flex;
    margin-bottom: em(112);
  }

  &__list {
    width: 100%;

    &:not(:last-child) {
      margin-right: em(52);
    }
  }

  &__title {
    background: linear-gradient(
      92.97deg,
      #ffffff 2.9%,
      rgba(255, 255, 255, 0) 109.66%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-right: em(41);
    white-space: nowrap;
  }

  &__interrupter {
    background-image: url("/images/page-bg/interrupter.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: em(20);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: em(121) 0 em(65);
  }

  &__interrupter-title {
    text-align: center;
    max-width: em(500);
  }

  &__interrupter-text {
    text-align: center;
    max-width: em(500);
  }

  &__font {
    &--title {
      font-family: Squada One, sans-serif;
      font-size: em(95);
      line-height: em(158, 95);
    }

    &--text {
      font-size: em(15);
      line-height: em(28, 15);
    }

    &--interrupter-title {
      font-family: Squada One, sans-serif;
      font-size: em(75);
      line-height: em(81, 75);
    }

    &--interrupter-text {
      font-size: em(20);
      line-height: em(39, 20);
    }
  }
}
</style>
