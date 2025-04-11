import { ref } from 'vue';

 const contador = ref(0);
export function useCounter() {
    const increment = () => {
        contador.value++;
    };
    return {
        contador,
        increment
    }
}