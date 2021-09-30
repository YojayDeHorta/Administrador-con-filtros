<template>
    <div class="Cols_Oculto">
        <v-col cols="auto" v-if="rol=='secretariaRol'">
            <v-btn style="color:white" color="#757575"  v-if="rol=='secretariaRol' && token!='adminToken'" @click="dialog=true">
            <v-icon>mdi-file-lock</v-icon>&nbsp;
            MOSTRAR DATOS OCULTOS</v-btn> <!-- puse el boton aca pa poder trabajar abajo -->
            <v-btn  color="red white--text" v-if="rol=='secretariaRol' && token=='adminToken'" @click="getSecretaria"><v-icon>mdi-key-remove</v-icon> quitar &nbsp;PERMISOS </v-btn> <!-- puse el boton aca pa poder trabajar abajo -->
            <v-dialog transition="dialog-bottom-transition" v-model="dialog" max-width="500" >
                    <v-card style=";height:430px">
                        <v-form style="height:400px" @submit.prevent="FormPassword" lazy-validation ref="form">
                            <v-toolbar class="d-flex justify-center" color="#607D8B" dark><h2>MOSTRAR&nbsp;&nbsp;DATOS&nbsp;&nbsp;OCULTOS</h2></v-toolbar>
                            <v-card-text>
                                <div class="text-h2 text-center pa-12">
                                    <h6 class="text-center mb-10" style="font-size:15px">INGRESE&nbsp;&nbsp;LA&nbsp;&nbsp;CONTRASEÑA</h6>
                                    <v-text-field prepend-icon="mdi-lock-outline" v-model="password" type="password" :rules="Rules"></v-text-field>
                                    <v-btn class="mt-7" type="submit">Mostrar</v-btn>
                                <!--
                                        <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña">
                                -->
                                </div>
                            </v-card-text>
                        </v-form>
                    </v-card>
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

@media (min-width: 768px) and (max-width: 1209px) {


.Cols_Oculto{
   /* border: 5px solid red;*/
    width: 27%;
    text-align: right;
}



}


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
                let res = await axios.post('http://localhost:3000/password/admin', {token:this.token,pass:this.password})
                this.snackbar = true
                if (res.data){
                    this.$store.commit('setAdmin',res.data)
                    this.mensaje = 'contraseña exitosa, ya puedes ver los datos ocultos!'
                    this.password=''
                    this.dialog=false
                }else {
                    this.mensaje = 'error - usuario o contraseña incorrecta'
                }
            }
        },
        async getSecretaria(){
            let res = await axios.post('http://localhost:3000/password/secretaria', {rol:this.rol})
            this.snackbar = true
            if (res.data){
                this.$store.commit('setAdmin',res.data)
                this.mensaje = 'permisos quitados exitosamente'
            }else {
                this.mensaje = 'error - usuario o contraseña incorrecta'
            }
            
        }
    }
}
</script>