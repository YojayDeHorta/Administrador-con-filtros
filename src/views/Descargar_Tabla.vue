<template>
    <div>
        <v-card class="card_descarga">
            <v-toolbar flat class="cabecera" color="primary" dark>
                <v-toolbar-title>OPCIONES DE DESCARGA</v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical class="opciones">
                <v-tab class="item_opciones">
                    <v-icon left>
                        mdi-cloud-download
                    </v-icon>
                    DESCARGAR UNA TABLA
                </v-tab>
                <v-tab class="item_opciones">
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
                                    <v-container class="Principal " fluid>
                                        <div class="d-flex justify-center flex-column mt-5">
                                            <v-select :items="items" label="Escoge Una Tabla" dense outlined></v-select>
                                            <!--
                                            <v-text-field prepend-icon="mdi-file-table-outline" label="Nombre Tabla"></v-text-field>
                                        -->
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
                                        <v-list-item-subtitle class="info_card d-flex justify-content-center flex-column">
                                            <strong class="text-center">
                                                Recuerda que el archivo debe tener el formato Correspondientes
                                            </strong>
                                            <v-file-input class="input_archivo" counter hide-input truncate-length="1"></v-file-input>
                                            <v-btn depressed class="mt-5 mb-5" color="primary">
                                                Guardar Tabla
                                            </v-btn>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
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
.card_descarga {
  /*  border: 5px solid red;-*/
}

.opciones {
   /* border: 5px solid black;*/
}

.item_opciones {
    margin-top: 25px;
    border: 5px solid yellow;
    width: 100%;
    text-align: right !important;

}


.cabecera{
  /*  border: 5px solid black !important;*/
    display: flex;
    justify-content: center;
}

.input_archivo{
    position: relative;
   /* border: 5px solid red;*/
    left: 43%;
    width: 10%;
}

</style>
<script>
export default {
    name: 'Elegir_Tabla',
    data: () => ({
        items: ['Tabla_1', 'Tabla_2', 'Tabla_3', 'Tabla_4'],
    }),
}
</script>