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
                <div class="chat-single-message left"  v-if="item.user === 'bot'">

                    <div class="chat-message-content">
                        <p class="mb-3"> {{ item.message }}</p>
                        <p class="chat-time mb-0">
                            <span class="badge bg-primary">Bot</span>
                        </p>
                    </div>
                </div>
                <div v-else class="chat-single-message right">
                    <div class="chat-message-content">
                        <p class="mb-3">
                            {{ item.message }}
                        </p>
                        <p class="chat-time mb-0">
                            <span>User</span>
                        </p>
                    </div>
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