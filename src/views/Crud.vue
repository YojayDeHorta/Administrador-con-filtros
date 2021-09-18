<template>
    <v-container>
    <v-row cols="12">
        <v-col  cols="4">
            <v-btn color="success" @click="dialog=true;formTitle='Agregar usuario'">Añadir usuario</v-btn>
        </v-col>
        <v-col cols="4">
            <v-file-input @change="clickFile" v-model="file" accept=".csv" type="file"  label="Subir archivo csv"></v-file-input>
        </v-col >
        <!-- <a href="/source.csv" download>descargar</a> -->
        <v-col cols="4">
            <v-btn color="primary" @click="descargar()">descargar csv</v-btn>
        </v-col>
        
    </v-row>
    <v-row class="d-flex justify-center" cols="12" md="12">
        
        <v-data-table :headers="columnas" :loading="loading" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion" class="elevation-19 theme--light">
            <template v-slot:[`item.actions`]="{ item }" >
                <v-icon small class="mr-2" @click="prepareEdit(item)"> mdi-pencil </v-icon>
                <v-icon small @click="deleteUser(item.Id)"> mdi-delete </v-icon>
            </template>
        </v-data-table>
    </v-row>
    <!-- ventana modal para crear/editar -->
    <v-dialog v-model="dialog" max-width="800px">
        <v-card>
        <v-form  @submit.prevent="addAndEditUser">
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
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field  v-model="user.Fecha" label="Fecha" ></v-text-field>
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

    <!-- dialog administrador -->
    <v-dialog v-model="dialogAdmin" max-width="800px">
        <v-card>
        <v-form  @submit.prevent="addAndEditUser">
            <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="admin.user" label="Usuario"></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6" md="4">
                        <v-text-field  v-model="admin.pass" label="Password" ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            </v-card-text>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogAdmin=false"> Cancelar </v-btn>
            <v-btn color="blue darken-1" type="submit" text > Guardar </v-btn>
            </v-card-actions>
        </v-form>
        <!-- <v-form v-else @submit.prevent="agregarProducto"> -->
        </v-card>
    </v-dialog>
    </v-container>
</template>
<script>
var url="http://localhost:3000/api/usuarios"
import axios from 'axios'
import { response } from 'express'
export default {
    data() {
        return {
            loading:true,
            users:[],
            columnas:[
                {text:'ID' ,value:'Id', class:'primary white--text'},
                {text:'NOMBRE' ,value:'Nombre', class:'primary white--text'},
                {text:'APELLIDO' ,value:'Apellido', class:'primary white--text'},
                {text:'FECHA' ,value:'Fecha', class:'primary white--text'},
                { text: 'ACCIONES', value: 'actions', class:'primary white--text', sortable: false },
            ] ,
            user: {
                Id:'',
                Nombre: '',
                Apellido: '',
                Fecha: '',
            },
            //login del admin
            admin:{
                user:'',
                pass:''
            },
            //dialog y modal
            dialog:false,
            formTitle:'',
            dialogAdmin:false,
            //edicion
            isEditing:false,
            //files
            file:null,
            urlFile:'',
        }
    },
    mounted() {
        this.getUsers()
    },
    methods: {
        async getUsers(){
            let datos=await axios.get(url)
            this.users=datos.data
            this.loading=false
        },
        prepareEdit(item){
            this.isEditing=true
            this.formTitle='Edicion del usuario '+item.Nombre
            this.user.Id=item.Id
            this.user.Nombre=item.Nombre
            this.user.Apellido=item.Apellido
            this.user.Fecha=item.Fecha
            this.dialog=true;
        },
        addAndEditUser(){
            this.loading=true;
            this.dialog=false;
            if (!this.isEditing) {
                this.user.Id=this.users[this.users.length-1].Id+1
                this.users.push(JSON.parse(JSON.stringify(this.user)))
            }else{
                let index=this.users.map(function(x) {return x.Id; }).indexOf(this.user.Id)
                this.users[index].Nombre=this.user.Nombre
                this.users[index].Apellido=this.user.Apellido
                this.users[index].Fecha=this.user.Fecha
                
                
                console.log(this.users);
                this.isEditing=false
            }
            this.resetUser()
            this.loading=false;
        },
        async deleteUser(Id){
            this.loading=true;
            // let index=users.map(function(x) {return x.Id; }).indexOf(item.Id)
            this.users = this.users.filter(function( obj ) {
                return obj.Id !== Id;
            });
            this.loading=false;
        },
        resetUser(){
            this.user.Id=''
            this.user.Nombre=''
            this.user.Apellido=''
            this.user.Fecha=''
        },
        async clickFile(){
           if (this.file!== null) {
              this.urlFile=URL.createObjectURL(this.file)
              console.log(this.file);
              let datos= await axios.post('http://localhost:3000/file',{'name':this.file.name,'file':this.file.path})
              if (datos.data==true) {
                this.getUsers()
              }else{
                  console.log(datos.data);
              }
              console.log(this.urlFile);
           } 
        },
        async descargar(){
            
            let datos=await axios.post(url,this.users)
            console.log(datos.data);
            if (datos.data) {
                const link = document.createElement('a')
                link.href = '/'+datos.data
                link.setAttribute('download', datos.data) //or any other extension
                document.body.appendChild(link)
                link.click()
            }
            
            
        }
    },
}
</script>
<style>
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05);
}
</style>