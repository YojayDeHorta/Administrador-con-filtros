<template>
    <div class="Marco">
        <!--
        <h1 class="Titulo text-center font-weight-bold text-h2 basil--text mt-5">
            BIENVENIDO<br>
        </h1>
        -->
        <div class="Marco_Login d-flex justify-center">
            <v-card class="login mt-2 mb-10" height="550px" style="width: 450px">
                <v-form class="login text-center"  @submit.prevent="submitAdmin" ref="form" lazy-validation >
                    <v-card-title class="title d-flex justify-center" align="center">
                        <h2 style="width: 200px" class="Titulo text-center mt-5">
                            Iniciar Sesión
                             <v-icon class="Filtrar mt-5" style="font-size:100px">mdi-account-circle</v-icon>
                        </h2>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row class="mt-5">
                                <v-col cols="12">
                                    <v-text-field prepend-icon="mdi-account" label="Usuario" v-model="login.user" :rules="Rules"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña" v-model="login.pass" :rules="Rules">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-center">
                        <v-btn type="submit" exact text class="primary"><span>Iniciar</span></v-btn>
                        <!-- <v-btn :to="{ name: 'Options' }" exact text class="primary"><span>Iniciar</span></v-btn> -->
                    </v-card-actions>
                </v-form>
            </v-card>
        </div>
     <!-- SNACKBAR PARA LOS MENSAJES -->
        <v-snackbar v-model="snackbar">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
        
    </div>
</template>
<script>
import axios from "axios";
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
export default {
    name: "Home",
    data() {
        return {
            login: {
                user: '',
                pass: ''
            },
            //codigo del snackbar para mensajes
            snackbar: false,
            mensaje: '',
            //reglas
            Rules:[
                v=>!!v || 'Porfavor llena este campo',
            ],
        }
    },computed:{
        ...mapGetters([
            'token',
            'username',
            'rol',
        ]),
    },
    methods: {
        ...mapActions([
            'getLogin',
        ]),
        async submitAdmin() {
            if (this.$refs.form.validate()==true) {
                let res = await axios.post('http://localhost:3000/login/users', this.login)
                this.snackbar = true
                if (!res.data)this.mensaje = 'error - usuario o contraseña incorrecta'
                else {
                    if (res.data.token=='admin') sessionStorage.setItem("token",res.data.token);
                    else if(res.data.token=='secretaria')sessionStorage.setItem("token",res.data.token);
                    else if (res.data.token=='conserje')sessionStorage.setItem("token",res.data.token);
                    sessionStorage.setItem("nombre",res.data.user);
                    this.login.user = ''
                    this.login.pass = ''
                    this.getLogin({username:res.data.user,token:res.data.token,rol:res.data.rol})
                    this.mensaje = 'login realizado correctamente'
                    this.$router.push('/options')
                }
                this.login.pass = ''
            }
            
        },
    }
};
</script>
<style scoped>
    .Marco_Login {
       /* border: 5px solid red;*/

    }

    .login{
        box-shadow: 0 0 2px 2px black;
        height: 550px;
    }

</style>