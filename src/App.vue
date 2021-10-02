<template>
  <v-app v-if="Montado">
    <Navbar :adminVerification="adminVerification" @escuchar="cambioAdmin"></Navbar>
  <v-main>
    <!-- <Crud :adminVerification="adminVerification" ></Crud> -->
    
      <router-view/>
      
  </v-main>
  </v-app>
  <v-app v-else >
    <div class="mt-16 pt-16 d-flex justify-center">
        <v-card class="login mt-2 mb-10" height="550px" style="width: 450px">
            <v-form class="login text-center" @submit.prevent="submitA" ref="form" lazy-validation>
                <v-card-title class="title d-flex justify-center " align="center">
                    <h2 style="width: 200px" class="Titulo text-center mt-5">
                        Verificación
                        <v-icon class="Filtrar mt-5" style="font-size:100px">mdi-lock</v-icon>
                    </h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña" v-model="pass" :rules="Rules">
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
  </v-app>
</template>

<script>
import axios from 'axios';

import Navbar from './components/Navbar';
export default {
  name: 'App',
  components: {
    Navbar,
    
  },mounted() {
    this.adminLocal()
  },
  data: () => ({
    Montado:false,
    drawer:false,
    adminVerification:false,
    pass:'',
    Rules: [
      v => !!v || 'Por Favor, Llena Este Campo',
    ],
    snackbar: false,
    mensaje: '',
  }),
  mounted(){
    this.veriifity()
  },
  methods: {
    cambioAdmin(value){
      console.log("valor del padre"+value);
      this.adminVerification=value;
      
    },
    adminLocal(){
      if (sessionStorage.getItem("Admin")!=null) {
          this.adminVerification=localStorage.getItem("Admin")
      }
    },
    async veriifity(){
      let datos=await axios.post('http://localhost:3000/validate', { token: 'a' })
      this.Montado=datos.data
    },
    async submitA() {
        if (this.$refs.form.validate() == true) {
            let res = await axios.post('http://localhost:3000/validatebee', {pass:this.pass})
            this.snackbar = true
            if (!res.data) this.mensaje = 'Error - Contraseña Incorrecta'
            else {
                
                this.mensaje = 'Contraseña Validada Correctamente, Redirigiendo...'
                setTimeout( () => {
                    this.Montado=true
                }, 2000);
            }
            this.pass = ''
        }

    }
  }
};
</script>
<style >
  .login {
    box-shadow: 0 0 2px 1px #37474F;
    height: 550px;
}
.Marco {
        position: relative;
        top: -1%;
    }
</style>