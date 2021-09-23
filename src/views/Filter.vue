<template>
    <v-container fluid>
        <div class="d-flex justify-content-center">
            
            <v-col cols="12">
                
                    <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>
                
            </v-col>
        </div>
    </v-container>
</template>
<script>
import CrudClientes from "../components/CrudClientes.vue"

export default {
    components: {
        CrudClientes,
        
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