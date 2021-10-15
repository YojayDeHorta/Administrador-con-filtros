<template>
    <div class="Filtrar mt-7 ">
        <div class="Margen_Filtrar">
            <v-card class="mx-auto mb-7">
                <v-card-title class="text-h6 font-weight-regular justify-space-between">
                    <span>{{ currentTitle }}</span>
                    <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
                </v-card-title>
                <v-window v-model="step">
                    <v-window-item :value="1">
                        <v-card class="mx-auto" width="700" height="200" outlined>
                            <v-container class="Principal" fluid>
                                <div>
                                	<br>
                                    <v-select :items="items" label="Escoge Una Tabla" dense outlined></v-select> <br>
                                    <v-text-field prepend-icon="mdi-file-table-outline" label="Nombre Tabla"></v-text-field>
                                </div>
                            </v-container>
                        </v-card>
                    </v-window-item>
                    <v-window-item :value="2">
                        <v-card-text>
                               <div class="CRUD_FILTRO">
                               	<CrudClientes :adminVerification="false" :idHoja="0" ></CrudClientes>
                               </div>
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
        </div>
        <!--
        <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>
    -->
    </div>
</template>
<style scoped>
.Filtrar {
    border: 5px solid red;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.Margen_Filtrar{
    border: 5px solid black;
    width: 100%;
}

.CRUD_FILTRO{
	border: 5px solid purple;
	/*width: 100% !important;
	height: 100px !important;*/
}

</style>
<script>
import CrudClientes from "../components/CrudClientes.vue"
import elegir_tabla from "../components/Elegir_Tabla.vue"

export default {
    components: {
        CrudClientes,
        elegir_tabla

    },
    data: () => ({
        step: 1,
        items: ['Tabla_1', 'Tabla_2', 'Tabla_3', 'Tabla_4'],
    }),
    computed: {
        currentTitle() {
            switch (this.step) {
                case 1:
                    return 'Seleccione La Tabla'
                case 2:
                    return 'Filtre los datos de la tabla'
                default:
                    return 'Account created'
            }
        },
    },
}
</script>