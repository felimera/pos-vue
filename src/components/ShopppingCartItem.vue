<script setup>
import { formatCurrency } from '../helpers';
defineProps({
    item: {
        type: Object
    }
});
</script>

<template>
    <li class="flex space-x-6 py-6">
        <img :src="item.image" :alt="'Imagen de ' + item.name" class="h-24 w-24 flex-none rounded-md" />

        <div class="flex-auto space-y-2">
            <h3 class="text-gray-900">{{ item.name }}</h3>
            <p class="text-gray-900">{{ formatCurrency(item.price) }}</p>

            <select
                class="w-32 text-center p-2 rounded-lg bg-white"
            >
                <option 
                    v-for="n in 5"
                    :value="n"
                >
                {{n}}
                </option>
            </select>
        </div>
    </li>
</template>