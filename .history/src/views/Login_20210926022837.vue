<template>
    <div class="Marco">
        <!--
        <h1 class="Titulo text-center font-weight-bold text-h2 basil--text mt-5">
            BIENVENIDO<br>
        </h1>
        -->
        <div class="Marco_Login d-flex justify-center">
            <v-card class="mt-10 mb-10" height="550px" style="width: 450px">
                <v-hover  v-slot="{ hover }" open-delay="200">
                    <v-form class="text-center" @submit.prevent="submitAdmin">
                    <v-card-title class="title d-flex justify-center" align="center">
                        <h2 style="width: 200px" class="Titulo text-center mt-5">
                            Iniciar Sesión
                             <v-icon class="Filtrar mt-5" style="font-size:100px">mdi-account-circle</v-icon>
                        </h2>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row class="mt-5">
                                <v-col cols="12">
                                    <v-text-field prepend-icon="mdi-account" label="Usuario"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn :to="{ name: 'Options' }" exact text class="primary"><span>Iniciar sesion</span></v-btn>
                    </v-card-actions>
                </v-form>

                </v-hover>
               
            </v-card>
        </div>

    </div>
</template>
<script>
    export default {
        name: "Home",
    };
</script>
<style scoped>
    .Marco_Login {
        border: 5px solid red;

    }
    
</style>