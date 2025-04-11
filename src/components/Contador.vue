<script setup lang="ts">

import { useCounter } from '../composables/userCounter';

const { contador, increment } = useCounter();

</script>

<template>
    <div>
        <h2>{{ contador }}</h2>

        <button class="btn btn-success" @click="increment">Incrementar</button>
    </div>
</template>