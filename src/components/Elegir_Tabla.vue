<template>
    <div>
        <v-card class="mx-auto" width="700" height="200" outlined>
            <v-container class="Principal" fluid>
                <div>
                    <v-select :items="items" label="Escoge Una Tabla" dense outlined></v-select>
                    <v-text-field prepend-icon="mdi-file-table-outline" label="Nombre Tabla"></v-text-field>
                    <v-btn depressed color="primary">
                        Guardar Tabla
                    </v-btn>
                </div>
            </v-container>
        </v-card>
    </div>
</template>
<style scoped>
.Principal {
    /*border: 5px solid red;*/

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