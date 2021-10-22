<template>
    <div>
         <elegir_tabla class="tabla mt-5"></elegir_tabla>
         <!--
        <v-card color="basil">
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item class="tabs" v-for="item in 1" :key="item">
                   
                </v-tab-item>
                <v-tab-item class="tabs" v-for="item in 2" :key="item">
                
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
                    </v-card>
                          <v-btn depressed class="mt-5 mb-5" color="primary">
                        Guardar Tabla
                    </v-btn>
                
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    -->
    </div>
</template>
<style scoped>
.tabla {
   /* border: 5px solid red;*/
}

.basil {
    background-color: #78909C !important;
}

.basil--text {
    color: #356859 !important;
}

.tabs {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}


.info_card {}

.input_archivo {
    position: relative;
    left: 45%;
}
</style>
<script>
import elegir_tabla from "../components/Elegir_Tabla.vue"

export default {
    name: 'tabs_usuario',
    data() {
        return {
            tab: null,
            items: [
                'Agregar Una Tabla', 'Subir Tabla'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    components: {
        elegir_tabla
    }

}
</script>