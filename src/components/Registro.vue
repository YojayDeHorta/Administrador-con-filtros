<template>
    <div>
        <v-card height="100%" width="480px">
            <v-form class="text-center" @submit.prevent="submitAdmin">
                <v-card-title class="title d-flex justify-center" align="center">
                    <h3 class="Titulo text-center mt-5">Registrarme</h3>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <br>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field prepend-icon="mdi-account" label="Nombres"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                          <v-text-field prepend-icon="mdi-account" label="Apellido"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                               <v-text-field prepend-icon="mdi-email" label="Email"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Confirmar Contraseña"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <v-btn x-large color="primary" type="submit"> Ingresar </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
export default {

}
</script>
<style>
</style>