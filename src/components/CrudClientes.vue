<template>
    <v-container>
    
    <v-row class="d-flex justify-center" cols="12">
        <v-col  cols="2">
            <v-btn v-if="adminVerification" color="primary" @click="dialog=true;formTitle='Agregar usuario';resetUser()"><v-icon>mdi-account-plus</v-icon> </v-btn>
        </v-col>
        <v-col cols="4">
            <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar en la tabla" single-line hide-details></v-text-field>
        </v-col>
        <v-col cols="4">
            <v-btn color="teal darken-1"  @click="descargar()"><v-icon color="white">mdi-file-download</v-icon></v-btn>
        </v-col>
        <!-- <a href="/source.csv" download>descargar</a> -->
    </v-row>
    <v-row class="d-flex justify-center p-0" cols="12" md="12">
        <v-data-table :headers="computedHeaders" :loading="loading" :search="search" :footer-props="{'items-per-page-text':'usuarios por pagina'}" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion" class="elevation-3 theme--light">
            <template v-slot:[`item.actions`]="{ item }" v-if="adminVerification" >
                <v-icon small class="mr-2" @click="prepareEdit(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteUser(item.Id)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
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
export default {
    name:'CrudClientes',
    data() {
        return {
            loading:false,
            users:[],
            columnas:[
                {text:'ID' ,value:'Id', class:'primary white--text'},
                {text:'NOMBRE' ,value:'Nombre', class:'primary white--text'},
                {text:'APELLIDO' ,value:'Apellido', class:'primary white--text'},
                {text:'TIPO DE CLIENTE' ,value:'TipoCliente', class:'primary white--text'},
                {text:'DIRECCION' ,value:'Direccion', class:'primary white--text'},
                { text: 'ACCIONES', value: 'actions', class:'primary white--text', sortable: false  },
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
                    {text:'ID' ,value:'Id', class:'primary white--text'},
                    {text:'NOMBRE' ,value:'Nombre', class:'primary white--text'},
                    {text:'APELLIDO' ,value:'Apellido', class:'primary white--text'},
                    {text:'TIPO DE CLIENTE' ,value:'TipoCliente', class:'primary white--text'},
                    {text:'DIRECCION' ,value:'Direccion', class:'primary white--text'},
                ] 
                return columnasMod
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
        }
    }
}
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(13, 9, 243, 0.10);
}
</style>