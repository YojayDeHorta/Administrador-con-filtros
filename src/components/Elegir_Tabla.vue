<template>
    <div>
        <v-container fluid>
            <v-row class="Principal Archivo" align="center">
            	<div>
            		<v-select :items="items" label="Escoge Una Tabla" dense outlined></v-select>
            	</div>
            	<div>
            		 <v-text-field prepend-icon="mdi-account" label="Usuario"></v-text-field>
            	</div>
            </v-row>
        </v-container>
    </div>
</template>
<style scoped>
.Principal{
	/*border: 5px solid red;*/
}

.div{
	border: 6px solid red !important;
}

</style>
<script>
export default {
	name:'Elegir_Tabla',
    data: () => ({
        items: ['Tabla_1', 'Tabla_2', 'Tabla_3', 'Tabla_4'],
    }),
}
</script>