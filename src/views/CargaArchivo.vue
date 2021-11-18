<template>
    <div>
        <v-card>
            <v-card-title class="text-center justify-center py-6">
                <h1 class="font-weight-bold text-h5 basil--text">
                    <strong> PUEDES DESCARGAR / CARGAR UN DOCUMENTO EXCEL</strong>
                </h1>
            </v-card-title>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item1 in 1" :key="item1">
                    <v-card class='Tarjeta' color="grey lighten-5" flat>
                     <h4>Puedes Descargar el Archivo Excel</h4>    <br>
                        <v-icon color="teal">
                            mdi-cloud-download
                        </v-icon>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-for="item2 in 1" :key="item2">
                    <v-card class='Tarjeta' color="grey lighten-5" flat>
                        <h4>Sube Tu Archivo</h4>
                        <v-file-input class='input_tarjeta' hide-input truncate-length="10"></v-file-input>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<script>
    export default {
    data () {
      return {
        tab: null,
        items: [
          'Descargar Excel', 'Subir Excel',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
  }
</script>
<style type="text/css" scoped>
/* Helper classes */
.basil {
    background-color: #FFFBE6 !important;
}

.basil--text {
    color: #356859 !important;
}

.Tarjeta {
    /*  border: 5px solid red;*/
    margin: auto;
    width: 50%;
    text-align: center;
    border: 2px solid grey;

}

.input_tarjeta {
    position: relative;
    /* border: 5px solid black;*/
    margin: auto;
    width: 5%;
}
</style>