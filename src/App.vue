<template>
    <div class="Fondo_Mensaje" >
        <v-app >
          <Navbar :adminVerification="adminVerification" @escuchar="cambioAdmin"></Navbar>
            <v-main>
                <!-- <Crud :adminVerification="adminVerification" ></Crud> -->
                <router-view />
            </v-main>


            <v-dialog v-model="dialog" max-width="500" persistent>
                <v-card color="white"  >
                    <v-form class="login text-center" @submit.prevent="submitA" ref="form" lazy-validation>
                        <v-card-title class="title d-flex justify-center " align="center">
                            <h2 style="width: 200px;font-size:29px" class="Titulo text-center text-uppercase mt-5">
                                Verificación
                                <br>
                                <v-icon class="Filtrar mt-9" style="font-size:100px;color:black">mdi-lock</v-icon>
                            </h2>
                        </v-card-title>
                        <v-card-text class="mt-5">
                            <v-container>
                                <v-row>
                                    <v-col cols="12">
                                        <v-text-field type="password" color="black !important" prepend-icon="mdi-lock-outline" label="Contraseña" v-model="pass" :rules="Rules">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-center">
                            <v-btn type="submit" exact text style="border:1px solid black;color:black"><span>Verificar</span></v-btn>
                            <!-- <v-btn :to="{ name: 'Options' }" exact text class="primary"><span>Iniciar</span></v-btn> -->
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
            <!-- SNACKBAR PARA LOS MENSAJES -->
            <v-snackbar v-model="snackbar">
                {{ mensaje }}
                <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
            </v-snackbar>
        </v-app>
    </div>
</template>
<script>
import axios from 'axios';

import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar,
    
  },
  data: () => ({
    Montado:false,
    dialog:true,
    drawer:false,
    adminVerification:false,
    pass:'',
    Rules: [
      v => !!v || 'Por Favor, Escribe La contraseña Para Poder Desbloquear El programa',
    ],
    snackbar: false,
    mensaje: '',
  }),
  mounted(){
    this.veriifity()
  },

  methods: {
      cambioAdmin(value) {
          console.log("valor del padre" + value);
          this.adminVerification = value;

      },
      adminLocal() {
          if (sessionStorage.getItem("Admin") != null) {
              this.adminVerification = localStorage.getItem("Admin")
          }
      },
      async veriifity() {
          let datos = await axios.post('http://localhost:3000/validate', { token: 'a' })
          if (datos.data) this.dialog=false
          else this.dialog=true
      },
      async submitA() {
          if (this.$refs.form.validate() == true) {
              let res = await axios.post('http://localhost:3000/validatebee', { pass: this.pass })
              this.snackbar = true
              if (!res.data) this.mensaje = 'Error - Contraseña Incorrecta'
              else {                    
                  this.dialog=false
                  this.mensaje = 'Contraseña Valida, Bienvenido'
              }
              this.pass = ''
          }

      }
    }
};
</script>
<style>
.login {
    height: 430px;
    color: black !important;
}

.Marco {
    position: relative;
    top: -1%;
}

/*.Fondo_Mensaje{
     background-color: rgb(0, 0, 0, 0.7);

}*/

 
</style>