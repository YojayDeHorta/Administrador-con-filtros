<template>
    <div>
        <v-card height="400px" style="width:400px">
            <v-form class="text-center" @submit.prevent="submitAdmin">
                <v-card-title class="title d-flex justify-center" align="center">
                    <h2 style="width:200px" class="Titulo text-center mt-5">Iniciar Sesión</h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <br>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field prepend-icon="mdi-account" label="Usuario"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="password"  prepend-icon="mdi-lock-outline" label="Contraseña"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">

                      <v-btn :to="{name: 'Options'}" exact text class="primary"><span>Iniciar sesion</span></v-btn>
                    
       
            
                </v-card-actions>
            </v-form>
        </v-card>
    </div>
</template>
<script>
    export default{

	}
</script>
<style scoped>
.Ingresar{
	border:5px solid red;
	text-decoration: none;   
}
</style>