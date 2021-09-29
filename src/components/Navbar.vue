<template>
    <v-container>
        <!-- navbar para la app -->
        <v-app-bar app>
            <!-- <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon> -->
            <!--<v-btn @click="$router.go(-1)" v-if="isNotLogin" exact text class="gray">
                <v-icon>mdi-arrow-left-circle</v-icon>
                 <span>Volver</span>
            </v-btn> -->
            <v-toolbar-title class="text-uppercase grey--text">
                Prototipo 
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-btn text class="success mr-5">ingreso</v-btn> -->
            
            <!-- roles -->
            <v-btn  exact text class="gray" v-if="token">
                <span>{{username}}</span>
                <v-icon v-if="token=='adminToken'">mdi-account-tie</v-icon><!-- admin -->
                <v-icon v-if="token=='secretariaToken'">mdi-account-edit</v-icon><!-- secretaria -->
                <v-icon v-if="token=='conserjeToken'">mdi-account-eye</v-icon><!-- conserje -->
            </v-btn>
            <!-- menu -->
            <v-btn :to="{name: 'Options'}" v-if="token" exact text class="gray">
                <span>Opciones</span>
                <v-icon>mdi-equal-box</v-icon>
            </v-btn>
            <!-- login -->
            <v-btn text @click="logout()" v-if="token" class="gray">
                <span>Log out</span>
                <v-icon>mdi-home-export-outline </v-icon>
            </v-btn>
            <v-btn text :to="{name: 'Login'}" v-else class="gray" exact>
                <span>Log in</span>
                <v-icon>mdi-login-variant </v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app v-model="drawer" temporary>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        vuetify
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        prueba de modulos con vue
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list nav dense>
                <v-list-item-group active-class="deep-purple--text text--accent-4">
                    <v-list-item :to="{name: 'Cruds'}">
                        <v-list-item-icon>
                            <v-icon>mdi-file-table</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Crud</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        
        <!-- SNACKBAR PARA LOS MENSAJES -->
        <v-snackbar v-model="snackbar">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
    name: 'Navbar',
    props: {
        adminVerification: null
    },
    data() {
        return {
            drawer: false,
            //dialog y datos para el admin
            dialogAdmin: false,
            login: {
                user: '',
                pass: ''
            },
            //codigo del snackbar para mensajes
            snackbar: false,
            mensaje: '',
        }
    },
    updated() {
        if(sessionStorage.getItem("token")){
            console.log(sessionStorage.getItem("nombre"));
        }
    },
    methods: {
        async submitAdmin() {
            let res = await axios.post(url, this.admin)
            if (res.data) {
                this.$emit('escuchar', true)
                sessionStorage.setItem("Admin", true);
                this.admin.user = ''
                this.admin.pass = ''
                this.dialogAdmin = false
                this.snackbar = true
                this.mensaje = 'login realizado correctamente'
            } else {
                this.snackbar = true,
                    this.mensaje = 'error - usuario o contraseña incorrecta'
            }
        },
        logout() {
            this.$store.commit('resetLogin')
            this.$router.push('/')
            this.snackbar = true
            this.mensaje = 'cerrado de sesion realizado correctamente'
        },
        //para el volver

    },
    computed: {
        ...mapGetters([
            'token',
            'username'
        ]),
        hasHistory() {
            this.historial = window.history.length
            console.log(this.historial);

            if (this.historial > 2) {
                return this.historial
            }
            return this.historial
        },
        isNotLogin() {
            return this.$route.name !== 'Login'
        }
    }
}
</script>
<style>
.caminos {
    background: red;
}
</style>