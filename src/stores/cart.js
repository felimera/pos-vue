import { ref, computed, watchEffect } from "vue";
import { defineStore } from "pinia";

import { collection, addDoc } from "firebase/firestore";
import { useFirestore } from "vuefire";

import { useCouponStore } from "./coupons";
import { getCurrentDate } from "../helpers";

export const useCartStore = defineStore("cart", () => {
  const coupon = useCouponStore();

  const db = useFirestore();

  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);

  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.1;

  watchEffect(() => {
    subtotal.value = items.value.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2));
    total.value = Number(
      (subtotal.value + taxes.value - coupon.discount).toFixed(2)
    );
  });

  function addItem(item) {
    const index = isItemInCart(item.id);
    if (index >= 0) {
      if (isProductAvailable(item, index)) {
        alert("Haz alcanzado el limite de 5 productos.");
        return;
      }
      // Actualizar la cantidad
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkout() {
    try {
      await addDoc(collection(db, "sales"), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);

  const isProductAvailable = (item, index) =>
    items.value[index].quantity >= item.availability ||
    items.value[index].quantity >= MAX_PRODUCTS;

  const isEmpty = computed(() => items.value.length === 0);

  const checkProductAvailability = computed(
    () => (product) =>
      product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
  );

  return {
    items,
    subtotal,
    taxes,
    total,
    addItem,
    updateQuantity,
    removeItem,
    checkout,
    isEmpty,
    checkProductAvailability,
  };
});
