<template>
    <v-container fluid>  
       
        <v-row>
            <v-col cols="4">
                 <h1>aqui van los filtros</h1>
                    <!-- este es el espacio pa que no toque con el admin xd -->

            </v-col>
            <v-col cols="8">
                <CrudClientes :adminVerification="false" :idHoja="0"></CrudClientes>
            </v-col>
        </v-row>
        

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