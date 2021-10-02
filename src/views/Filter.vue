<template>
    <v-container fluid>
        <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>
    </v-container>
</template>
<script>
import CrudClientes from "../components/CrudClientes.vue"

export default {
    components: {
        CrudClientes,

    },

}
</script>
<style scoped>
.Hoja-Cliente {
    width: 90%;
    margin-left: 110px;
}
</style>