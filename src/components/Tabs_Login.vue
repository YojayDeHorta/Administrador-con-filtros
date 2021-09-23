<template>
    <div>
        <v-card color="basil">
            <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold text-h2 basil--text">
                  BIENVENIDO<br>
                    <v-icon class="Filtrar" style="font-size:100px">mdi-account-circle</v-icon>
                </h1>
            </v-card-title>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items class="d-flex justify-center" v-model="tab">
                <br>
                 <v-tab-item v-for="item in 1" :key="item">
                    <v-card color="basil" flat>
                       <Login></Login>
                    </v-card>
                </v-tab-item>
                          <v-tab-item v-for="num in 2">
                    <v-card color="basil" flat>
                       <Sign></Sign>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        </v-card>
    </div>
</template>
<style>
/* Helper classes */
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
<script>
import Login from '../components/Login.vue';
import Sign from '../components/Registro.vue';
export default {
     components: {
      Login,Sign
    },
    data () {
      return {
        tab: null,
        num:2,
        items: [
          'Inicio Sesion', 'Registro'
        ]
    }
  }
   }
</script>
