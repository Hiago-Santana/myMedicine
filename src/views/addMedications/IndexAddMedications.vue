<template>
    <form class="mt-4">
        <div class="border border-gray-200 rounded-md shadow-md/20 p-2 w-full ">

            <!-- header -->
            <div class="flex justify-between my-2">
                <h2 class="font-bold">Adicionar medicamento</h2>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>

            <div class="flex gap-2 my-4">
                <div>
                    <label class="font-semibold">Nome do medicamento</label>
                    <input v-model="name" type="text" placeholder="Ex: Losartana"
                        class="w-full border border-gray-300 rounded-md p-1 capitalize">
                </div>
                <div>
                    <label class="font-semibold">Dosagem</label>
                    <input v-model="name" type="text" placeholder="Ex: Losartana"
                        class="w-full border border-gray-300 rounded-md p-1 capitalize">
                </div>
            </div>


        </div>
    </form>

</template>
<script setup>
import { ref } from 'vue';

const name = ref(null);
</script>