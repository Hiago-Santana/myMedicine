<template>
    <form class="mt-4">
        <div class="border border-gray-200 rounded-md shadow-md/20 p-2 pb-10 w-full ">

            <!-- header -->
            <div class="flex justify-between my-2">
                <h2 class="font-bold">Adicionar medicamento</h2>
                <span class="material-symbols-outlined">
                    close
                </span>
            </div>

            <div class="flex flex-col gap-4 my-4">
                <div class="my-1">
                    <label class="font-semibold">Nome do medicamento</label>
                    <input v-model="name" type="text" placeholder="Ex: Losartana"
                        class="w-full border border-gray-300 rounded-md p-1 capitalize">
                </div>
                <div class="my-1">
                    <label class="font-semibold">Dosagem</label>
                    <div class="flex gap-2">
                        <input v-model="dosage" type="number" placeholder="Ex: 50"
                            class="w-full border border-gray-300 rounded-md p-1">

                        <select v-model="dosageUnit" class="border border-gray-300 rounded-md p-1">
                            <option value="mg">mg</option>
                            <option value="g">g</option>
                            <option value="ml">ml</option>
                            <option value="mcg">mcg</option>
                            <option value="UI">UI</option>
                            <option value="gotas">gotas</option>
                        </select>
                    </div>
                </div>
                <div class="my-1">
                    <label class="font-semibold">Quantidade e apresentação</label>
                    <div class="flex gap-2">
                        <input v-model="quantity" type="number" placeholder="Ex: 2"
                            class="border border-gray-300 rounded-md p-1 w-12 max-w-20">

                        <select v-model="formType" class="w-full border border-gray-300 rounded-md p-1">
                            <option value="cp">comprimido(s)</option>
                            <option value="cap">capsula(s)</option>
                            <option value="gota">gota(s)</option>
                            <option value="ml">ml</option>
                            <option value="aplicacao">aplicação(ões)</option>
                            <option value="inalacao">inalação(ões)</option>
                            <option value="sache">sachê(s)</option>
                        </select>
                    </div>
                </div>
                <div class="my-1">
                    <label class="font-semibold">Horário da primeira dose</label>
                    <input v-model="time" type="time" class="w-full border border-gray-300 rounded-md p-1 capitalize">
                </div>
                <div class="my-1">
                    <label class="font-semibold">Frequência</label>
                    <div class="flex items-center gap-2 mb-2">

                        <input v-model="frequencyValue" type="number"
                            class="border border-gray-300 text-center rounded-md p-1 w-12 max-w-20">

                        <span class="text-nowrap">vez por</span>

                        <select v-model="frequencyUnit" class="w-full border border-gray-300 rounded-md p-1">
                            <option value="dia">dia</option>
                            <option value="semana">semana</option>
                            <option value="mes">mês</option>
                        </select>

                    </div>
                    <span class="font-light text-md">Ex: 2 vezes por dia</span>
                </div>
                <div class="flex flex-col my-1">
                    <label class="font-semibold">Observações</label>
                    <textarea v-model="notes" rows="3" class="w-full border border-gray-300 rounded-md p-1"></textarea>
                </div>
            </div>
            <div class="flex gap-4 my-2">
                <div class="w-full text-center font-semibold border border-gray-300 hover:bg-gray-200 p-2 rounded-md">
                    Cancelar
                </div>
                <div class="w-full text-center font-semibold bg-first text-white hover:bg-first/85 p-2 rounded-md">
                    Adicionar Medicamento
                </div>

            </div>
        </div>

    </form>

</template>
<script setup>
import { ref } from 'vue';
import PrimaryButton from '../../components/ui/buttons/PrimaryButton.vue';

const name = ref(null);
const dosage = ref(null);
const dosageUnit = ref('mg');
const quantity = ref(null);
const formType = ref('cp');
const time = ref(null);
const frequencyValue = ref(1);
const frequencyUnit = ref('dia');
const notes = ref(null);

</script>