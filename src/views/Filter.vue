<template>
    <v-container fluid>
        <div class="d-flex justify-content-center">
            <v-col cols="4">
                <h1 class="text-center mt-10"><i class="fas fa-filter"></i>&nbsp;Filtros</h1>
                <section>
                    <Filtros></Filtros>
                </section>
            </v-col>
            <v-col cols="8">
                <section class="Hoja-Cliente">
                    <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>
                </section>
            </v-col>
        </div>
    </v-container>
</template>
<script>
import CrudClientes from "../components/CrudClientes.vue"
import Filtros from "../components/Filtros.vue"

export default {
    components: {
        CrudClientes,
        Filtros
    }
}
</script>
<style scoped>
.Hoja-Cliente {
    border: 5px solid red;
    width: 90%;
    margin-left:110px;
}
</style>