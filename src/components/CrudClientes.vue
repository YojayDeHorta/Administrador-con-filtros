<template>
    <v-container class="CRUD-P" fluid fill-height>
    <v-row class="OP text-center mt-5" cols="12">
        <v-col  class="OP-TABLAS" cols="2">
            <v-btn v-if="adminVerification" color="primary" @click="dialog=true;formTitle='Agregar usuario';resetUser()"><v-icon class="mr-2">mdi-account-plus</v-icon> añadir</v-btn>
        </v-col>
        <v-col  cols="5" class="OP-TABLAS mt-0 pt-0">
            <v-text-field v-model="search" append-icon="mdi-magnify" v-if="adminVerification" label="Buscar en la tabla" single-line hide-details></v-text-field>
        </v-col>
        <v-col  cols="2"  class="OP-TABLAS text-right">
            <v-btn color="teal darken-1"  @click="descargar()"><v-icon color="white">mdi-file-download</v-icon></v-btn>
            <v-btn color="secondary" class="ml-1"  outlined v-if="adminVerification" @click="chooseFiles()">
            
            <span v-if="file==null"><v-icon class="mr-1">mdi-upload</v-icon>subir archivo</span>
            <span v-else><v-icon class="mr-1">mdi-file-excel</v-icon> {{this.file.name}}</span>
            </v-btn>
            <input id="fileUpload" type="file" ref="file" @change="submitFile()" hidden>
        </v-col>
    </v-row>
    <v-row class="d-flex justify-center p-0" >
        <v-col v-if="!adminVerification" class="ml-5">
            <!-- <filtro :header="computedHeaders" :body="users" @filtro="funcionFiltro"/> -->
            <v-text-field label="nombre" v-model="nameValue" append-icon="mdi-text-box-search"></v-text-field>
            <v-text-field label="apellido" v-model="apellidoValue" append-icon="mdi-text-box-search"></v-text-field>
        </v-col>
        <v-col>
            <v-card width="100%">
            <!-- esto es la tabla -->
            <v-data-table :headers="computedHeaders" :loading="loading" :search="search" 
            :footer-props="{'items-per-page-text':'usuarios por pagina','items-per-page-options':[10, 50, 100, 200, -1]}"  :options="options"
            loading-text="Cargando...Porfavor espere" :items="computedBody" sort-by="descripcion" class="elevation-1 theme--light">
                <!-- botones editar y borrar -->
                <template v-slot:[`item.actions`]="{ item }" v-if="adminVerification" >
                    <v-btn color="green  white--text"  @click="prepareEdit(item)"><v-icon small class="mr-2" > mdi-pencil </v-icon> editar</v-btn>
                    <v-btn color="red white--text" class="ml-1"  @click="deleteUser(item.Id) "><v-icon small > mdi-delete </v-icon> eliminar</v-btn> 
                </template>

            </v-data-table>
            </v-card>
        </v-col>
        
    </v-row>
    <!-- ventana modal para crear/editar -->
    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
        <v-form  @submit.prevent="addAndEditUser" >
            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="user.Nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field  v-model="user.Apellido" label="Apellido" ></v-text-field>
                    </v-col>
                    
                </v-row>
                <v-row>
                    <v-col cols="6" >
                        <div>Tipo de cliente</div>
                        <v-select :items="Tipos" v-model="user.TipoCliente" label="Tipo de cliente" solo  ></v-select>
                    </v-col>
                    <v-col cols="6" >
                        <v-text-field  v-model="user.Direccion" label="Direccion" ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialog=false"> Cancelar </v-btn>
            <v-btn color="blue darken-1" type="submit" text > Guardar </v-btn>
            </v-card-actions>
        </v-form>
        
        <!-- <v-form v-else @submit.prevent="agregarProducto"> -->
        </v-card>
    </v-dialog>
    </v-container>
</template>
<script>
var url="http://localhost:3000/api/hojas/"
import axios from 'axios'
import filtro from "./Filtro.vue"

export default {
    name:'CrudClientes',
    components:{
        filtro
    },
    data() {
        return {
            loading:false,
            users:[],
            columnas:[
                {text:'ID' ,value:'Id', class:'blue-grey darken-3 white--text', },
                {text:'NOMBRE' ,value:'Nombre', class:'blue-grey darken-3 white--text'},
                {text:'APELLIDO' ,value:'Apellido', class:'blue-grey darken-3 white--text'},
                {text:'TIPO DE CLIENTE' ,value:'TipoCliente', class:'blue-grey darken-3 white--text'},
                {text:'DIRECCION' ,value:'Direccion', class:'blue-grey darken-3 white--text'},
                { text: 'ACCIONES', value: 'actions', class:'blue-grey darken-3 white--text', sortable: false ,width: '300px' },
            ] ,
            Tipos: ['Accesorios', 'Ropa', 'Zapatos', 'Colmenas'],
            user: {
                Id:'',
                Nombre: '',
                Apellido: '',
                TipoCliente: '',
                Direccion:''
            },
            search: '',
            //dialog y modal
            dialog:false,
            formTitle:'',
            //edicion
            isEditing:false,
            //files
            file:null,
            //opciones de la data table
            options: {
                itemsPerPage: 100
            },
            //variable para el filtro
            bodyFilter:null,
            //otros filtro
            nameValue:'',
            apellidoValue:''
        }
    },
    props:{
        adminVerification:null,
        idHoja:null,
    },
    mounted() {
        this.getUsers(this.idHoja)
    },computed: {
        computedHeaders () {
            if(this.adminVerification){
                return this.columnas
            }else{
                let columnasMod=[
                    {text:'ID' ,value:'Id', class:'blue-grey darken-3 white--text', tipo:'number'},
                    {text:'NOMBRE' ,value:'Nombre', class:'blue-grey darken-3 white--text',tipo:'string',filter: this.nameFilter},
                    {text:'APELLIDO' ,value:'Apellido', class:'blue-grey darken-3 white--text',tipo:'string',filter: this.apellidoFilter},
                    {text:'TIPO DE CLIENTE' ,value:'TipoCliente', class:'blue-grey darken-3 white--text',tipo:'string'},
                    {text:'DIRECCION' ,value:'Direccion', class:'blue-grey darken-3 white--text',tipo:'string'},
                ] 
                return columnasMod
            }
        },
        computedBody(){
            console.log(this.bodyFilter);
            if (this.bodyFilter==null) {
                return this.users
            }else{
                return this.bodyFilter
            }
        }
    },
    methods: {
        async getUsers(id){
            this.loading=true
            let datos=await axios.get(url+id)
            this.users=datos.data
            this.loading=false
        },
        prepareEdit(item){
            this.isEditing=true
            this.formTitle='Edicion del usuario '+item.Nombre
            this.user.Id=item.Id
            this.user.Nombre=item.Nombre
            this.user.Apellido=item.Apellido
            this.user.TipoCliente=item.TipoCliente
            this.user.Direccion=item.Direccion
            this.dialog=true;
        },
        async addAndEditUser(){
            this.loading=true;
            this.dialog=false;
            if (!this.isEditing) {
                this.user.Id=Number(this.users[this.users.length-1].Id)+1
                this.users.push(JSON.parse(JSON.stringify(this.user)))
            }else{
                let index=this.users.map(function(x) {return x.Id; }).indexOf(this.user.Id)
                this.users[index].Nombre=this.user.Nombre
                this.users[index].Apellido=this.user.Apellido
                this.users[index].TipoCliente=this.user.TipoCliente
                this.users[index].Direccion=this.user.Direccion
                this.isEditing=false
            }
            let datos=await axios.post(url+this.idHoja,this.users)
            if (datos==true) console.log('actualizacion ejecutada exitosamente');
            else  console.log('error del sistema');
            this.resetUser()
            this.loading=false;
        },
        async deleteUser(Id){
            this.loading=true;
            this.users = this.users.filter(function( obj ) {
                return obj.Id !== Id;
            });
            
            let datos=await axios.post(url+this.idHoja,this.users)
            if (datos==true) console.log('borrado ejecutado exitosamente');
            else  console.log('error del sistema');
            this.loading=false;
        },
        resetUser(){
            this.user.Id=''
            this.user.Nombre=''
            this.user.Apellido=''
            this.user.TipoCliente=''
            this.user.Direccion=''
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
        },        
        chooseFiles() {
            document.getElementById("fileUpload").click()
        },
        async submitFile(){
            this.file = this.$refs.file.files[0];
            if (this.file!== null) {
              let respuesta= await axios.post('http://localhost:3000/file',{'name':this.file.name,'file':this.file.path})
              if (respuesta.data==true) {
                this.$router.go()
              }else{
                console.log('error al subir el archivo');
                }
            }
        },
        // filtros
        funcionFiltro(value){
            this.bodyFilter=value
        },
        nameFilter(value) {
            if (!this.nameValue) {
            return true;
            }
            return value.toLowerCase().includes(this.nameValue.toLowerCase());
        },
        apellidoFilter(value) {
            if (!this.apellidoValue) {
            return true;
            }
            return value.toLowerCase().includes(this.apellidoValue.toLowerCase());
        },
    }
}
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(13, 9, 243, 0.10);
}



.OP-TABLAS{
   /* border:5px solid red;*/
    height:60px;
    margin:auto;
   
}

</style>