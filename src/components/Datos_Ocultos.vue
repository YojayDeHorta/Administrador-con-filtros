<template>
    <div>
        <v-col cols="auto" v-if="rol=='secretariaRol'">
            <v-dialog transition="dialog-bottom-transition" v-model="dialog" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" v-bind="attrs" v-on="on">Datos&nbsp;OCULTOS</v-btn>
                </template>
                <template v-slot:default="dialog">
                    <v-card>
                        <v-form @submit.prevent="FormPassword" lazy-validation ref="form">
                            <v-toolbar style="border:5px solid red !important;width:100%;font-size:0.65vw" class="d-flex justify-center" color="primary" dark><h2><strong>DATOS OCULTOS</strong></h2></v-toolbar>
                            <v-card-text>
                                <div class="text-h2 text-center pa-12">
                                    <h6 class="text-center mb-10" style="font-size:15px">Ingrese la contraseña para mostrar los datos</h6>
                                    <v-text-field prepend-icon="mdi-lock-outline" v-model="password" type="password" :rules="Rules"></v-text-field>
                                    <v-btn class="" type="submit">Mostrar</v-btn>
                                <!--
                                        <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña">
                                -->
                                </div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                                <v-btn text @click="dialog.value = false">Close</v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </template>
            </v-dialog>
            <!-- SNACKBAR PARA MOSTRAR MENSAJESs -->
        <v-snackbar v-model="snackbar" timeout="2000">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
        </v-col>
    </div>
</template>
<style scoped>
</style>
<script>
import { mapGetters } from 'vuex'
import axios from "axios";

export default {
	name:'Oculto',
    data() {
        return {
            password:'',
            dialog:false,
            Rules:[
                v=>!!v || 'Porfavor llena este campo',
            ],
            snackbar:'',
            mensaje:'',
        }
    },
    computed:{
        ...mapGetters([
            'token',
            'username',
            'rol',
        ]),
    },
    methods:{
        async FormPassword(){
            if (this.$refs.form.validate()==true){
                let res = await axios.post('http://localhost:3000/passwordreq', {token:this.token,pass:this.password})
                this.snackbar = true
                if (res.data){
                    this.$store.commit('setAdmin',res.data)
                    this.mensaje = 'contraseña exitosa'
                    dialog=false
                }else {
                    this.mensaje = 'error - usuario o contraseña incorrecta'
                }
            }
            
        }
    }
}
</script>