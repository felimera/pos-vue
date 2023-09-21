<script setup>
import Amount from './Amount.vue';
import ShopppingCartItem from './ShopppingCartItem.vue'
import { useCartStore } from '../stores/cart';
import { formatCurrency } from '../helpers';

const cart = useCartStore();
</script>

<template>
    <p v-if="cart.isEmpty" class="text-xl text-center text-gray-900">El Carrito esta Vacio</p>

    <div v-else>
        <p class="text-4xl font-bold text-gray-900">Resumen de Venta</p>
        <ul role="list" class="mt-16 divide-y divide-gray-300">
            <ShopppingCartItem v-for="item in cart.items" :key="item.id" :item="item" />
        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal : </template>
                {{ formatCurrency(item.price) }}
            </Amount>
            <Amount>
                <template #label>Impuestos : </template>
                {{ formatCurrency(0) }}
            </Amount>
            <Amount>
                <template #label>Total a Pagar : </template>
                {{ formatCurrency(0) }}
            </Amount>
        </dl>
    </div>
</template>
