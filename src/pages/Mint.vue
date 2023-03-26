<template>
  <div class="pages-mint">
    <SectionsMintMain class="pages-mint__section pages-mint__section--main" />
    <SectionsMintPacks class="pages-mint__section pages-mint__section--packs" />
    <SectionsMintBenefits class="pages-mint__section pages-mint__section" />
  </div>
</template>

<script>
import SectionsMintMain from "@/components/sections/mint/SectionsMintMain.vue";
import SectionsMintPacks from "@/components/sections/mint/SectionsMintPacks.vue";
import SectionsMintBenefits from "@/components/sections/mint/SectionsMintBenefits.vue";

export default {
  name: "mint",
  components: { SectionsMintBenefits, SectionsMintPacks, SectionsMintMain },
};
</script>

<style lang="scss">
.pages-mint {
  &__section {
    &--main {
      margin-bottom: em(143);
    }

    &--packs {
      margin-bottom: em(84);
    }
  }
}
</style>
