import { ref } from "vue";
import { defineStore } from "pinia";

export const useCouponStore = defineStore("coupon", () => {
  const couponInput = ref("");

  return {
    couponInput,
  };
});
