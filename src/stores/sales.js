import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { collection, query, where } from "firebase/firestore";
import { useFirestore, useCollection } from "vuefire";

export const useSalesStore = defineStore("sales", () => {
  const date = ref("");
  const db = useFirestore();

  const salesSource = computed(() => {
    if (date.value) {
      const q = query(collection(db, "sales"), where("date", "==", date.value));
      return q;
    }
  });

  const salesCollection = useCollection(salesSource);

  const isDateSelected = computed(() => date.value);

  const noSales = computed(() => !salesCollection.length && date.value);

  return {
    date,
    isDateSelected,
    salesCollection,
    noSales,
  };
});
