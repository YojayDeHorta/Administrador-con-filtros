<template>
    <v-container>
        <h1>esta es la pagina del login</h1>
        <Tabs></Tabs>
        <v-btn :to="{name: 'Options'}" exact text class="primary"><span>Iniciar sesion</span></v-btn>
    </v-container>
</template>
<script>
import Tabs from '../components/Tabs_Login.vue';
export default {
    name: 'Home',

    components: {
      Tabs
    },
}
</script>