import { ref } from "vue";
import { defineStore } from "pinia";

export const useCouponStore = defineStore("coupon", () => {
  const couponInput = ref("");

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      console.log("Si existe el cupon");
    } else {
      console.log("NO existe el cupon");
    }
  }

  return {
    couponInput,
    applyCoupon,
  };
});
