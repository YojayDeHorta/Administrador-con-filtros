<template>
    <v-card class="mx-auto" max-width="500">
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
        </v-card-title>
        <v-window v-model="step">
            <v-window-item :value="1">
                <v-card-text>
                    <v-text-field v-model="name" :counter="10" :rules="nameRules" label='Nombre de la Nueva Tabla' required></v-text-field>
                </v-card-text>
            </v-window-item>
            <v-window-item :value="2">
                <v-card-text>
                    <op_archivo></op_archivo>
                </v-card-text>
            </v-window-item>
            <v-window-item :value="3">
                <div class="pa-4 text-center">
                    <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
                    <h3 class="text-h6 font-weight-light mb-2">
                        Welcome to Vuetify
                    </h3>
                    <span class="text-caption grey--text">Thanks for signing up!</span>
                </div>
            </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn :disabled="step === 1" text @click="step--">
                Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="step === 3" color="primary" depressed @click="step++">
                Next
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
import op_archivo from "../components/OpcionArchivo.vue";

export default {
    components: {
        op_archivo
    },
    data: () => ({
        step: 1,
    }),



    computed: {
        currentTitle() {
            switch (this.step) {
                case 1:
                    return 'Sign-up'
                case 2:
                    return 'Create a password'
                default:
                    return 'Account created'
            }
        },
    },
}
</script>