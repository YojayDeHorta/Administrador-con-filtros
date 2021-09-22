<template>
  <v-container>
    <!-- navbar para la app -->
    <v-app-bar app>
      <!-- <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon> -->
      <v-btn @click="$router.go(-1)" v-if="isNotLogin" exact text class="gray">
        <v-icon>mdi-arrow-left-circle</v-icon>
        <!-- <span>Volver</span> -->
      </v-btn>

      <v-toolbar-title class="text-uppercase grey--text">
          Prototipo
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn text class="success mr-5">ingreso</v-btn> -->
      <v-btn :to="{name: 'Options'}" exact text class="gray">
        <span>Home</span>
        <v-icon>mdi-home-outline</v-icon>
      </v-btn>
      <v-btn text @click="dialogAdmin=true" v-if="!adminVerification" class="gray">
        <span>Log in</span>
        <v-icon>mdi-login-variant </v-icon>
      </v-btn>
      <v-btn text @click="logout()" v-else class="gray">
        <span>Log out</span>
        <v-icon>mdi-home-export-outline </v-icon>
      </v-btn>
      
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" temporary >
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
        <v-list-item-group  active-class="deep-purple--text text--accent-4">

          <v-list-item :to="{name: 'Cruds'}">
            <v-list-item-icon>
              <v-icon>mdi-file-table</v-icon>
            </v-list-item-icon >
            <v-list-item-title >Crud</v-list-item-title>
          </v-list-item>


        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <!-- dialog administrador -->
    <v-dialog v-model="dialogAdmin"  max-width="500px">
        <v-card>
        <v-form  @submit.prevent="submitAdmin">
            <v-card-title><span class="text-h5">Iniciar sesion</span></v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field v-model="admin.user" label="Usuario"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" >
                        <v-text-field type="password"  v-model="admin.pass" label="Password" ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogAdmin=false"> Cancelar </v-btn>
            <v-btn color="blue darken-1" type="submit" text > Guardar </v-btn>
            </v-card-actions>
        </v-form>
        </v-card>
    </v-dialog>

  <!-- SNACKBAR PARA LOS MENSAJES -->
    <v-snackbar  v-model="snackbar" >
        {{ mensaje }}
        <v-btn color="error" class="ml-5"  @click="snackbar = false">cerrar</v-btn>
    </v-snackbar>
  </v-container>
    
</template>

<script>
import axios from 'axios'
var url="http://localhost:3000/api/admin"

export default {
    name:'Navbar',
    props:{
        adminVerification:null
    },
    data() {
      return {
        drawer:false,
        //dialog y datos para el admin
        dialogAdmin:false,
        admin:{
          user:'',
          pass:''
        }, 
        //codigo del snackbar para mensajes
        snackbar:false,
        mensaje:'',
      }
    },
    methods: {
     async submitAdmin(){
        let res= await axios.post(url,this.admin)
        if (res.data) {
          this.$emit('escuchar',true)
          sessionStorage.setItem("Admin", true);
          this.admin.user=''
          this.admin.pass=''
          this.dialogAdmin=false
          this.snackbar=true
          this.mensaje='login realizado correctamente'
        }else{
          this.snackbar=true,
          this.mensaje='error - usuario o contraseña incorrecta'
        }
      },
      logout(){
          this.$emit('escuchar',false)
          sessionStorage.removeItem('Admin')
          this.snackbar=true
          this.mensaje='cerrado de sesion realizado correctamente'
      },
      //para el volver

    },
    computed:{
      hasHistory() {
        this.historial=window.history.length
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
<style >
  .caminos{
      background: red;
  }
</style>