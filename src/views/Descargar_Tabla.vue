<template>
    <div>
        <v-card>
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title>User Profile</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
                <v-tab>
                    <v-icon left>
                        mdi-cloud-download
                    </v-icon>
                    DESCARGAR UNA TABLA
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-cloud-upload
                    </v-icon>
                    SUBIR UNA TABLA
                </v-tab>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <div>
                                <v-card class="mx-auto" width="700" height="200" outlined>
                                    <v-container class="Principal" fluid>
                                        <div>
                                            <v-select :items="items" label="Escoge Una Tabla" dense outlined></v-select>
                                            <v-text-field prepend-icon="mdi-file-table-outline" label="Nombre Tabla"></v-text-field>
                                            <v-btn depressed color="primary">
                                                DESCARGAR TABLA
                                            </v-btn>
                                        </div>
                                    </v-container>
                                </v-card>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <v-card class="mx-auto" max-width="344" outlined>
                                <v-list-item three-line>
                                    <v-list-item-content>
                                        <v-list-item-subtitle class="info_card d-flex justify-center flex-column">
                                            <strong>
                                                Recuerda que el archivo debe tener el formato Correspondientes
                                            </strong>
                                            <v-file-input class="input_archivo" counter hide-input truncate-length="1"></v-file-input>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-btn depressed class="mt-5 mb-5" color="primary">
                                    Guardar Tabla
                                </v-btn>
                            </v-card>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h1>NUMERO 3</h1>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>
<style scoped>
</style>
<script>
export default {
    name: 'Elegir_Tabla',
    data: () => ({
        items: ['Tabla_1', 'Tabla_2', 'Tabla_3', 'Tabla_4'],
    }),
}
</script>