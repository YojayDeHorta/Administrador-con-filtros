<template>
    <v-container class="Marco " fluid >
        
        <!-- Crud -->
        <!-- <Crud :adminVerification="true" :column="columnas[select.idHoja]" :idHoja="select.idHoja" ></Crud> -->
        <component  :is="select.crud" :adminVerification="true" :idHoja="select.idHoja"></component>
    </v-container>
</template>

<script>
import axios from 'axios'
import CrudClientes from "../components/CrudClientes.vue"
export default {
    components:{
        'CrudClientes':CrudClientes,
    },
    data() {
        return {
            select: { hoja: 'Clientes', idHoja: '0', crud:'CrudClientes' },
            hojas:[
                { hoja: 'Clientes', idHoja: '0',crud:'CrudClientes' },
                { hoja: 'Personal', idHoja: '1',crud:'CrudPersonal' },
            ],
            
        }
    },
    mounted(){
    },
    methods: {

    },
}
</script>
<style scoped>
    .Marco{
        border:5px solid black;
        width:140%;
    }

    .primary{
        text-align:center;
    }
    
</style>