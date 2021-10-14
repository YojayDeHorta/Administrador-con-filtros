<template>
    <div>
        <v-card class="mx-auto" max-width="344" height="200" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                        <strong>PUEDES AGREGAR UN NUEVO DOCUMENTO EN EXCEL</strong>
                    </div>
                </v-list-item-content>
            </v-list-item>
            <v-card-actions class="d-flex justify-center">
                <v-btn outlined rounded text>
                	<!---->
                    <v-file-input v-model="files" placeholder="Upload your documents" label="File input" multiple prepend-icon="mdi-paperclip">
                        <template v-slot:selection="{ text }">
                            <v-chip small label color="primary">
                                elegir_tabla
                            </v-chip>
                        </template>
                    </v-file-input>
                    <!--
                    <v-file-input show-size counter multiple label="File input"> </v-file-input>
                -->
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<style scoped>
</style>
<script>
import elegit_tabla from "../components/Elegir_Tabla.vue"
export default {
    name: 'next',
    data: () => ({
        files: [],
    }),
    components:{
    	elegir_tabla
    }
}
</script>