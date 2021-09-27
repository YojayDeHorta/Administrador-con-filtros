<template>
    <v-container class="CRUD-P pb-0" fluid fill-height >
        <v-row class=" d-flex">
            <v-col  class="OP-TABLAS" cols="6">
                <v-btn v-if="adminVerification" color="primary"
                    @click="dialog=true;formTitle='Agregar cliente';resetUser(user)">
                    <v-icon class="mr-2">mdi-account-plus</v-icon> Añadir Cliente
                </v-btn>
            </v-col>
            <v-col  cols="6" class="OP-TABLAS text-right">
                <v-btn color="orange darken-1"  @click="descargar()" v-if="adminVerification"><v-icon color="white">mdi-archive-arrow-down</v-icon></v-btn> <!--descarga normal-->
            <v-btn color="teal darken-1"  @click="descargarExcel()" v-if="adminVerification"><v-icon color="white">mdi-file-download</v-icon></v-btn> <!--descarga de excel-->
            <v-btn color="teal darken-1 white--text"  v-if="!adminVerification" @click="descargarFiltro()"><v-icon color="white">mdi-file-download</v-icon>descargar tabla</v-btn> <!--descarga filtrada-->
            <v-btn color="secondary" class="ml-1"  outlined v-if="adminVerification" @click="chooseFiles()">
                <span v-if="file==null"><v-icon class="mr-1">mdi-upload</v-icon>subir archivo</span>
                <span v-else><v-icon class="mr-1">mdi-file-excel</v-icon> {{this.file.name}}</span>
            </v-btn>
            <input id="fileUpload" type="file" ref="file" @change="submitFile()" hidden>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="2">
                <v-btn @click="dialogFiltro=true">añadir filtro</v-btn>
            </v-col>
            <v-col cols="2">
                <v-btn color="red white--text" @click="resetUser(userFiltro)">borrar filtro</v-btn>
            </v-col>
            <v-col style="margin:auto" cols="5" class="OP-TABLAS  pt-0">
                <v-text-field v-model="search" append-icon="mdi-magnify" v-if="adminVerification"
                    label="Buscar en la tabla" single-line hide-details></v-text-field>
            </v-col>
        </v-row>    
        <v-row class="d-flex justify-center p-0 ">
            
            <v-col >
                <div class="Tabla_Principal ">
                    <!-- esto es la tabla  elevation-1 theme--light :cols="!adminVerification ? '8' : ''"-->
                    <v-data-table :headers="computedHeaders" :loading="loading" :search="search" height="65vh" fixed-header
                        @current-items="getFiltered" :footer-props="{
                        'items-per-page-text': 'usuarios por pagina',
                        'items-per-page-options': [10, 50, 100, 200, -1],
                        }" :options="options" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion"
                        class="Tabla text--center " >
                        <!-- botones editar y borrar -->
                        <template v-slot:[`item.actions`]="{ item }" v-if="adminVerification">
                            <v-btn color="green  white--text" @click="prepareEdit(item)">
                                <v-icon small class="mr-2"> mdi-pencil </v-icon> editar
                            </v-btn>
                            <v-btn color="red white--text" class="ml-1" @click="deleteUser(item.ID)">
                                <v-icon small> mdi-delete </v-icon> eliminar
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </v-col>
        </v-row>
        <!-- ventana modal para crear/editar -->
        <ventanaModal  :dialog="dialog" :user="user" :formTitle="formTitle" :filtro="false" @dialogModal="dialog = $event"  @agregarModal="agregarModal"/>
        <!-- ventana modal para FILTROS -->
        <ventanaModal  :dialog="dialogFiltro" :user="userFiltro" :formTitle="'Agregar Filtros'" :filtro="true" @dialogModal="dialogFiltro = $event"  @agregarModal="agregarFilterModal"/>
        <!-- SNACKBAR PARA MOSTRAR MENSAJES -->
        <v-snackbar v-model="snackbar">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
    var url = "http://localhost:3000/api/hojas/";
    import axios from "axios";
    import filtro from "./Filtro.vue";
    import ventanaModal from "./ventanaModal.vue";

export default {
    name:'CrudClientes',
    components:{
        filtro,
        ventanaModal
    },
    data() {
        return {
            loading:false,
            users:[],
            columnas: [ //EDITAR INFORMACION
                {text: "ID", value: "ID", class: "Header_Tabla",align: 'center', width: "80px", style:'text-center'},
                {text: "NUMERO DE SOCIO", value: "NUM_SOCIO",align: 'center', class: "Header_Tabla ", width: "180px", style:'text-center' },
                {text: "SOCIO", value: "SOCIO", class: "Header_Tabla",align: 'center', width: "90px", style:'text-center' , filter: this.socioFilter},
                {text: "NOMBRE", value: "NOMBRE", class: " Header_Tabla",align: 'center', width: "150px", filter: this.nameFilter},
                {text: "APELLIDO 1", value: "APELLIDO_1", class: "Header_Tabla p-0",align: 'center', width: "150px", filter: this.apellido1Filter},
                {text: "APELLIDO 2", value: "APELLIDO_2", class: "Header_Tabla p-0",align: 'center', width: "150px",},
                {text: "PARENTESCO", value: "PARENTESCO", class: "Header_Tabla p-0",align: 'center', width: "150px",},
                {text: "DNI", value: "DNI", class: "Header_Tabla p-0",align: 'center', width: "150px",},
                {text: "PD", value: "PD", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE NACIMIENTO(ESPAÑOL)", value: "FECHA_NACIMIENTO", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE NACIMIENTO(HEBREO)", value: "FECHA_NACIMIENTO_HEBREO", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE CASAMIENTO(ESPAÑOL)", value: "FECHA_CASAMIENTO", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE CASAMIENTO(HEBREO)", value: "FECHA_CASAMIENTO_HEBREO", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE DEFUNCIÓN(ESPAÑOL)", value: "FECHA_DEFUNCION", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "FECHA DE DEFUNCIÓN(HEBREO)", value: "FECHA_DEFUNCION_HEBREO", class: "Header_Tabla p-0",align: 'center', width: "150px"},
                {text: "DIRECCION", value: "DIRECCION", class: "Header_Tabla p-0",align: 'center', width: "150px",},
                {text: "CODIGO POSTAL", value: "COD_POSTAL", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "LOCALIDAD", value: "LOCALIDAD", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "PROVINCIA", value: "PROVINCIA", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "PAIS", value: "PAIS", class: "Header_Tabla",align: 'center', width: "150px"},
                {text: "MOVIL", value: "MOVIL", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "FIJO", value: "FIJO", class: "Header_Tabla",align: 'center', width: "150px"},
                {text: "EMAIL", value: "EMAIL", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "EDAD", value: "EDAD", class: "Header_Tabla",align: 'center', width: "150px"},
                {text: "SOLA", value: "SOLA", class: "Header_Tabla",align: 'center', width: "150px"},
                {text: "MAYOR", value: "MAYOR", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "TEFILÁ", value: "TEFILA", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "OBSERVACIONES", value: "OBSERVACIONES",align: 'center', class: "Header_Tabla", width: "300px",},
                {text: "CUOTAS", value: "CUOTAS", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "CUOTA LICEO", value: "CUOTA_LICEO", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "FORMA DE PAGO", value: "FORMA_PAGO", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "OBSERVACIONES 2", value: "OBSERVACIONES2", class: "Header_Tabla",align: 'center',  width: "300px"},
                {text: "JESED", value: "JESED", class: "Header_Tabla",align: 'center', width: "150px",},
                {text: "ACCIONES", value: "actions", class: "Header_Tabla",align: 'center', sortable: false, width: "300px",},
                ],
            //aqui van los valores pa los select
            Socio:[{text:'elegir socio', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Parentesco:['Conyuje','Hijos','Padres','Otros'],
            Pd:['SI','NO'],
            Edad:['BEBE','3-18','19-30','31-50','51-70','+71'],
            Sola:['SI','NO'],
            Mayor:['SI','NO'],
            user: {
                ID:'',
                NUM_SOCIO: '',
                SOCIO: '',
                NOMBRE: '',
                APELLIDO_1:'',
                APELLIDO_2:'',
                PARENTESCO:'',
                DNI:'',
                PD:'',
                FECHA_NACIMIENTO:'',
                FECHA_NACIMIENTO_HEBREO:'',
                FECHA_CASAMIENTO:'',
                FECHA_CASAMIENTO_HEBREO:'',
                FECHA_DEFUNCION:'',
                FECHA_DEFUNCION_HEBREO:'',
                DIRECCION:'',
                COD_POSTAL:'',
                LOCALIDAD:'',
                PROVINCIA:'',
                PAIS:'',
                MOVIL:'',
                FIJO:'',
                EMAIL:'',
                EDAD:'',
                SOLA:'',
                MAYOR:'',
                TEFILA:'',
                OBSERVACIONES:'',
                CUOTAS:'',
                CUOTA_LICEO:'',
                FORMA_PAGO:'',
                OBSERVACIONES2:'',
                JESED:'',
            },
            //variable para el filtro
            userFiltro:{
                ID:'',
                NUM_SOCIO: '',
                SOCIO: '',
                NOMBRE: '',
                APELLIDO_1:'',
                APELLIDO_2:'',
                PARENTESCO:'',
                DNI:'',
                PD:'',
                FECHA_NACIMIENTO:'',
                FECHA_NACIMIENTO_HEBREO:'',
                FECHA_CASAMIENTO:'',
                FECHA_CASAMIENTO_HEBREO:'',
                FECHA_DEFUNCION:'',
                FECHA_DEFUNCION_HEBREO:'',
                DIRECCION:'',
                COD_POSTAL:'',
                LOCALIDAD:'',
                PROVINCIA:'',
                PAIS:'',
                MOVIL:'',
                FIJO:'',
                EMAIL:'',
                EDAD:'',
                SOLA:'',
                MAYOR:'',
                TEFILA:'',
                OBSERVACIONES:'',
                CUOTAS:'',
                CUOTA_LICEO:'',
                FORMA_PAGO:'',
                OBSERVACIONES2:'',
                JESED:'',
            },
            search: '',
            //dialog y modal
            dialog:false,
            dialogFiltro:false,
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
            tablaFiltrada:[],
            //SNACKBAR para mensajes
            snackbar:false,
            mensaje:'',
            //date
            date:new Date().toISOString().substr(0, 10),

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
                let columnasMod= this.columnas
                columnasMod.pop()
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
        agregarModal(e){
            this.user=e
            this.addAndEditUser()
        },
        agregarFilterModal(e){
            this.userFiltro=e
            this.dialogFiltro=false
            // this.addAndEditUser()
        },
        prepareEdit(item){
            this.isEditing=true
            this.formTitle='Edicion del cliente: '+item.NOMBRE
            this.user=JSON.parse(JSON.stringify(item))
            this.dialog=true;
        },
        async addAndEditUser(){
            this.loading=true;
            this.dialog=false;
            if (!this.isEditing) {
                this.user.ID=Number(this.users[this.users.length-1].ID)+1
                this.users.push(JSON.parse(JSON.stringify(this.user)))
            }else{
                let index=this.users.map(function(x) {return x.ID; }).indexOf(this.user.ID)
                this.users[index]=JSON.parse(JSON.stringify(this.user))
                this.isEditing=false
            }
            let datos=await axios.post(url+this.idHoja,this.users)
            this.snackbar=true
            if (datos.data==true) this.mensaje='actualizacion ejecutada exitosamente'
            else this.mensaje='error del sistema'
            this.resetUser(this.user)
            this.getUsers(this.idHoja)//pa que cargue en la app
            this.loading=false;
        },
        async deleteUser(ID){
            this.loading=true;
            this.users = this.users.filter(function( obj ) {
                return obj.ID !== ID;
            });
            let datos=await axios.post(url+this.idHoja,this.users)
            this.snackbar=true
            if (datos.data==true) this.mensaje='Borrado ejecutado exitosamente'
            else this.mensaje='error del sistema'
            this.loading=false;
        },
        resetUser(usuario){
            usuario.ID=''
            usuario.NUM_SOCIO=''
            usuario.SOCIO=''
            usuario.NOMBRE=''
            usuario.APELLIDO_1=''
            usuario.APELLIDO_2=''
            usuario.PARENTESCO=''
            usuario.DNI=''
            usuario.PD=''
            usuario.FECHA_NACIMIENTO=''
            usuario.FECHA_NACIMIENTO_HEBREO=''
            usuario.FECHA_CASAMIENTO=''
            usuario.FECHA_CASAMIENTO_HEBREO=''
            usuario.FECHA_DEFUNCION=''
            usuario.FECHA_DEFUNCION_HEBREO=''
            usuario.DIRECCION=''
            usuario.COD_POSTAL=''
            usuario.LOCALIDAD=''
            usuario.PROVINCIA=''
            usuario.PAIS=''
            usuario.MOVIL=''
            usuario.FIJO=''
            usuario.EMAIL=''
            usuario.EDAD=''
            usuario.SOLA=''
            usuario.MAYOR=''
            usuario.TEFILA=''
            usuario.OBSERVACIONES=''
            usuario.CUOTAS=''
            usuario.CUOTA_LICEO=''
            usuario.FORMA_PAGO=''
            usuario.OBSERVACIONES2=''
            usuario.JESED=''
        },
        async descargar(){
            let respuesta=await axios.get('http://localhost:3000/download', { responseType: 'blob' })
            let name=await axios.get('http://localhost:3000/download/name')
            if (respuesta.data==false) {
                console.log('error al descargar el archivo');
            }else{
                const link = document.createElement('a')
                link.href=window.URL.createObjectURL(new Blob([respuesta.data]));
                console.log(new Blob([respuesta.data]));
                link.setAttribute('download', name.data)
                document.body.appendChild(link)
                link.click()
            }
        },
        async descargarExcel(){
            let respuesta=await axios.get('http://localhost:3000/download/excel', { responseType: 'blob' })
            if (respuesta.data==false) {
                console.log('error al descargar el archivo');
            }else{
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(new Blob([respuesta.data]));
                link.setAttribute('download', 'datos.xlsx') 
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
                    this.getUsers(this.idHoja)//pa que cargue en la app
              }else{
                console.log('error al subir el archivo');
                }
            }
        },
        //descarga de filtros
        getFiltered(e){
            this.tablaFiltrada=e
        },
        async descargarFiltro(){
            let respuesta= await axios.post('http://localhost:3000/filter',this.tablaFiltrada, { responseType: 'blob' })
            if (respuesta.data==false) {
                console.log('error al descargar el archivo');
            }else{
                const link = document.createElement('a')
                link.href=window.URL.createObjectURL(new Blob([respuesta.data]));
                link.setAttribute('download', 'filtrado.xlsx')
                document.body.appendChild(link)
                link.click()
            }
        },
        // filtros
        nameFilter(value) {
            if (!this.userFiltro.NOMBRE) return true;
            return value.toLowerCase().includes(this.userFiltro.NOMBRE.toLowerCase());
        },
        apellido1Filter(value) {
            if (!this.userFiltro.APELLIDO_1)return true;
            return value.toLowerCase().includes(this.userFiltro.APELLIDO_1.toLowerCase());
        },
        socioFilter(value) {
            if (!this.userFiltro.SOCIO) return true;
            return value.toLowerCase().includes(this.userFiltro.SOCIO.toLowerCase());
        },
    }
        
};
</script>
<style>

    .Marco_Editar{
        border:5px solid red;
    }

    .Tabla_Principal {
        border: 5px solid blue;
        
          text-align: center;
         vertical-align: middle;
    }

    .Op-Iconos {
        width: 1000%;
        border: 5px solid red;
        margin: auto;
    }

    .Op-Editar {
        border: 5px solid red;
    }

    .Op-Editar .Op {
        border: 5px solid yellow;
        height: 50px;
    }

    .Header_Tabla {
        border: 1px solid black !important;
        background-color: #616161 !important;
        color: white !important;
        text-align: none;

    }

    tbody tr:nth-of-type(odd) {
        background-color: rgba(112, 128, 144, 0.3);
    }

    tbody td {
        padding: auto;
        border: 0.2px solid black;
        padding: 15px;
        width: 50%;
    }



</style>