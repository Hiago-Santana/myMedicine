<template>
    <div class="flex">
        <div class="my-4">
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined p-2 bg-first text-white rounded-full" style="font-size:40px ;">
                    pill
                </span>
                <h1 >Meus Medicamentos</h1>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PrimaryButton from '../ui/buttons/PrimaryButton.vue';

const route = useRoute();

</script>