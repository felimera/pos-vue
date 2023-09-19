<script setup>
import { RouterLink } from 'vue-router';
import { formatCurrency } from '../helpers';

defineProps({
    product: {
        type: Object
    }
});
</script>

<template>
    <li class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow">
        <img :src="product.image" :alt="product.name" class="h-24 w-24">
        <div class="space-y-2 flex-auto">
            <h3 class="text-gray-900">{{ product.name }}</h3>
            <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
            <p>{{ product.availability }} en Existencia</p>
        </div>
        <div>
            <RouterLink :to="{
                name: 'edit-product',
                params: { id: product.id }
            }">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            </RouterLink>

        </div>
    </li>
</template>
