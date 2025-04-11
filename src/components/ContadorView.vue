<script setup lang="ts">

import { useCounter } from '../composables/userCounter';

const { contador } = useCounter();

</script>

<template>
        <h2>{{ contador }}</h2>
</template>