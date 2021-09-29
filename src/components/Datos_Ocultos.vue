<template>
    <div>
        <v-col cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">Datos&nbsp;OCULTOS</v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-toolbar style="border:5px solid red !important" class="d-flex justify-center" color="primary" dark><h2><strong>DATOS OCULTOS</strong></h2></v-toolbar>
                        <v-card-text>
                            <div class="text-h2 text-center pa-12">
                            	<h6 class="text-center mb-10" style="font-size:15px">Ingrese la contraseña para mostrar los datos</h6>
                            	<v-text-field prepend-icon="mdi-lock-outline">ola mundo</v-text-field>
                            	<v-btn class="">Mostrar</v-btn>
                            <!--
                            		<v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña">
                            -->
                            </div>
                        </v-card-text>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </div>
</template>
<style scoped>
</style>
<script>
export default {
	name:'Oculto'
}
</script>