<template>
    <div class="flex justify-between p-1">
        <dl class="font-bold">
            <slot name="label" />
        </dl>
        <dd class="text-gray-900">
            <slot></slot>
        </dd>
    </div>
</template>
