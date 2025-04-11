<script setup lang="ts">
import { ref } from 'vue';
import type { ChatMessage } from '../../models/ChatModels';
import useGoogleAI from '../../composables/useGoogleAI';

const { senToAI, isLoading } = useGoogleAI();

const chatMessages = ref<ChatMessage[]>([{
    message: 'Hola, soy un bot. ¿En qué puedo ayudarte?',
    user: 'bot'
}]);

const sendMessage = async () => {
    chatMessages.value.push(curretHumanMessage.value);    
    const aiResponse =  await senToAI(curretHumanMessage.value.message);

    if(!aiResponse.isSuccess){
        alert(aiResponse.response);
    }
    chatMessages.value.push({ message: aiResponse.response, user: 'bot' });    
    curretHumanMessage.value = { message: '', user: 'human' };
}

const curretHumanMessage = ref<ChatMessage>({ message: '', user: 'human' });

</script>

<template>
    <div>
        <div class="list-group mb-3">
            <div class="list-group-item" v-for="item in chatMessages" :key="item.message">

                <div v-if="item.user === 'bot'">
                    <span class="badge bg-primary">Bot</span>
                    <span style="max-width: 50%;">
                        {{ item.message }}
                    </span>
                </div>
                <div v-else>
                    <span class="badge bg-success float-end">User</span>
                    <span style="max-width: 50%;">
                        {{ item.message }}
                    </span>
                </div>
            </div>
        </div>
        <div class="mb-3" v-if="isLoading">
            <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="100"
                aria-valuemin="0" aria-valuemax="100" style="height: 5px">
                <div class="progress-bar progress-bar-striped progress-bar-animated" style="width: 100%"></div>
            </div>
        </div>
        <div class="input-group">
            <textarea class="form-control" rows="3" v-model="curretHumanMessage.message"
                placeholder="Escribe tu mensaje aquí..."></textarea>
            <button class="btn btn-primary" :disabled="isLoading" @click="sendMessage">Enviar</button>
        </div>
    </div>
</template>