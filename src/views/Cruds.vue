<template>
    <v-container>
        <v-row >
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
            <v-col cols="3" class="pb-0">
                <!-- subida de archivo temporal-->
                <v-file-input @change="clickFile" v-model="file" accept=".xlsx" type="file"  label="Subir archivo xlsx"></v-file-input> 
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
            //files
            file:null,
            urlFile:'',
        }
    },
    mounted(){
        console.log(this.columnas);
    },
    methods: {
        async clickFile(){
           if (this.file!== null) {
              this.urlFile=URL.createObjectURL(this.file)
              let respuesta= await axios.post('http://localhost:3000/file',{'name':this.file.name,'file':this.file.path})
              if (respuesta.data==true) {
                this.$router.go()
              }else{
                console.log('error al subir el archivo');
              }
           } 
        },
        async descargar(){
            let respuesta=await axios.get('http://localhost:3000/download')
            if (respuesta.data==false) {
                console.log('error al descargar el archivo');
            }else{
                const link = document.createElement('a')
                link.href = '/'+respuesta.data
                link.setAttribute('download', respuesta.data) //or any other extension
                document.body.appendChild(link)
                link.click()
            }
        }
    },
}
</script>