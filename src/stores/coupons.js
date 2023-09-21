import { ref, watch, computed } from "vue";
import { defineStore } from "pinia";
import { useCartStore } from "./cart";

export const useCouponStore = defineStore("coupon", () => {
  const cart = useCartStore();
  const couponInput = ref("");
  const couponValidationMessage = ref("");
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: "10DESCUENTO", discount: 0.1 },
    { name: "20DESCUENTO", discount: 0.2 },
  ];

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2);
  });

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = "Aplicando...";

      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount;
        couponValidationMessage.value = "¡Descuento Validado!";
      }, 3000);
    } else {
      couponValidationMessage.value = "NO existe el cupón";
    }

    setTimeout(() => {
      couponValidationMessage.value = "";
    }, 3000);
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0);

  return {
    couponInput,
    discount,
    applyCoupon,
    couponValidationMessage,
    isValidCoupon,
  };
});
