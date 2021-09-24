<template>
    <v-container class="Marco">
        <v-row class="Tablas">
            <v-col cols="2" class="ml-4"> 
                <!-- select de las tablas -->
                <h5>Tablas:</h5>
                <v-select v-model="select" :hint="`se esta trabajando en:${select.crud} con id:${select.idHoja}`" :items="hojas"
                item-text="hoja"
                item-value="idHoja"
                label="Select"
                persistent-hint
                return-object
                single-line
                ></v-select>
            </v-col>

            
        </v-row>
        <!-- Crud -->
        <!-- <Crud :adminVerification="true" :column="columnas[select.idHoja]" :idHoja="select.idHoja" ></Crud> -->
        <component :is="select.crud" :adminVerification="true" :idHoja="select.idHoja"></component>
    </v-container>
</template>

<script>
import axios from 'axios'
import CrudClientes from "../components/CrudClientes.vue"
import CrudPersonal from "../components/CrudPersonal.vue"
export default {
    components:{
        'CrudClientes':CrudClientes,
        'CrudPersonal':CrudPersonal,
    },
    data() {
        return {
            select: { hoja: 'Clientes', idHoja: '0', crud:'CrudClientes' },
            hojas:[
                { hoja: 'Clientes', idHoja: '0',crud:'CrudClientes' },
                { hoja: 'Personal', idHoja: '1',crud:'CrudPersonal' },
            ],
            columnas:[
                [
                    {text:'ID' ,value:'Id', class:'primary white--text',propiedad:'number'},
                    {text:'NOMBRE' ,value:'Nombre', class:'primary white--text'},
                    {text:'APELLIDO' ,value:'Apellido', class:'primary white--text'},
                    {text:'TIPO DE CLIENTE' ,value:'TipoCliente', class:'primary white--text'},
                    {text:'DIRECCION' ,value:'Direccion', class:'primary white--text'},
                    { text: 'ACCIONES', value: 'actions', class:'primary white--text', sortable: false  },
                ],[
                    {text:'ID' ,value:'Id', class:'primary white--text'},
                    {text:'NOMBRE' ,value:'Nombre', class:'primary white--text'},
                    {text:'APELLIDO' ,value:'Apellido', class:'primary white--text'},
                    {text:'SUELDO DEL EMPLEADO' ,value:'Sueldo', class:'primary white--text'},
                    {text:'DIRECCION' ,value:'Direccion', class:'primary white--text'},
                    { text: 'ACCIONES', value: 'actions', class:'primary white--text', sortable: false  },
                ],
            ],
        }
    },
    mounted(){
        console.log(this.columnas);
    },
    methods: {

    },
}
</script>
<style scoped>
    .Marco{
        border:5px solid black;
        width:100%;
    }
    
</style>