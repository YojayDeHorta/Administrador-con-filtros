<template>
    <v-container>  
        <h1>aqui van los filtros</h1>
        
        <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>

    </v-container>
</template>
<script>
import CrudClientes from "../components/CrudClientes.vue"

export default {
    components:{
        CrudClientes
    }
}
</script>