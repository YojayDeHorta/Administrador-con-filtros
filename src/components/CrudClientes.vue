<template>
    <v-container class="CRUD-P pb-0" fluid fill-height>
        <v-row class="Iconos_Descarga d-flex justify-space-between mt-10 mb-10" style="border:5px solid red">
            <v-col style="border:5px solid black">
                <v-btn style="width:25%;font-size:0.8vw" v-if="adminVerification" color="primary" @click="dialog=true;formTitle='Agregar cliente';resetUser(user)">
                    <v-icon class="mr-2">mdi-account-plus</v-icon> Añadir Cliente
                </v-btn>&nbsp;&nbsp;&nbsp;
                <v-btn style="width:25%;font-size:0.8vw"  @click="dialogFiltro=true">
                    <v-icon class="mr-2">mdi-clipboard-text-search</v-icon>añadir filtro
                </v-btn>&nbsp;&nbsp;&nbsp;
                <v-btn style="width:25%;font-size:0.8vw"  color="red white--text" @click="resetUser(userFiltro)">
                    <v-icon class="mr-2">mdi-clipboard-remove</v-icon>borrar filtro
                </v-btn>&nbsp;&nbsp;&nbsp;
            </v-col>
            <v-col class="text-right" style="border:5px solid black">
               <Oculto></Oculto>
            <!--
                <v-btn class="mr-5" style="width:19%;font-size:10px"></v-btn>
            -->
                <v-btn style="color:white !important;width:27%;font-size:0.65vw" color="orange darken-1" @click="descargar()" v-if="adminVerification">
                    <v-icon color="white">mdi-download-lock</v-icon>&nbsp;&nbsp;documento encriptado
                </v-btn>
                <!--descarga normal-->
                <v-btn   style="color:white !important;width:25%;font-size:0.8vw " class="btn-text ml-2" color="teal darken-1" @click="descargarExcel()" v-if="this.token=='adminToken'">
                    <v-icon color="white">mdi-download</v-icon>&nbsp;&nbsp;documento Excel
                </v-btn>
                <!--descarga de excel-->
                <v-btn  style="color:white!important;width:25%;" color="teal darken-1 white--text" v-if="!adminVerification" @click="descargarFiltro()">
                    <v-icon color="white">mdi-download</v-icon>&nbsp;&nbsp;tabla filtrada
                </v-btn>
                <!--descarga filtrada-->
                <v-btn color="secondary" class="ml-1" outlined v-if="adminVerification" @click="chooseFiles()">
                    <span v-if="file==null">
                        <v-icon class="mr-1">mdi-upload</v-icon>subir archivo
                    </span>
                    <span v-else>
                        <v-icon class="mr-1">mdi-file-excel</v-icon> {{this.file.name}}
                    </span>
                </v-btn>
                <input id="fileUpload" type="file" ref="file" @change="submitFile()" hidden>
            </v-col>
        </v-row>
        <!--
        <v-row cols="5" class="Añadir_Quitar d-flex justify-center mt-7 mb-1">
            <v-col cols="5" class="Buscar_Tabla  pt-0">
                <v-text-field style="" class="pl-5" v-model="search" append-icon="mdi-magnify" label="Buscar en la tabla" single-line hide-details></v-text-field>
            </v-col>
        </v-row>
    -->
        <v-row class="d-flex justify-center p-0 ">
            <v-col>
                <div class="Tabla_Principal ">
                    <!-- esto es la tabla  elevation-1 theme--light :cols="!adminVerification ? '8' : ''"-->
                    <v-data-table :headers="computedHeaders" :loading="loading" :search="search" height="65vh" fixed-header @current-items="getFiltered" :footer-props="{
                        'items-per-page-text': 'usuarios por pagina',
                        'items-per-page-options': [10, 50, 100, 200, -1],
                        }" :options="options" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion" class="Tabla text--center ">
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
        <ventanaModal :dialog="dialog" :user="user" :formTitle="formTitle" :filtro="false" :isEditing="isEditing" @dialogModal="dialog = $event" @agregarModal="agregarModal" />
        <!-- ventana modal para FILTROS -->
        <ventanaFiltro :dialog="dialogFiltro" :user="userFiltro" :formTitle="'Agregar Filtros'" :filtro="true" @dialogModal="dialogFiltro = $event" @agregarModal="agregarFilterModal" @simbolos="SimbolosSelect=$event" />
        <!-- SNACKBAR PARA MOSTRAR MENSAJES -->
        <v-snackbar v-model="snackbar" timeout="2000">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
var url = "http://localhost:3000/api/hojas/";
import axios from "axios";
import ventanaFiltro from "./ventanaFiltro.vue";
import ventanaModal from "./ventanaModal.vue";
import Oculto from "./Datos_Ocultos.vue";


import { mapGetters } from 'vuex'

export default {
    name: 'CrudClientes',
    components: {
        ventanaFiltro,
        ventanaModal,Oculto
    },
    data() {
        return {
            loading: false,
            users: [],
            columnas: [ //EDITAR INFORMACION
                { text: "ID", value: "ID", class: "Header_Tabla", align: 'center', width: "80px", style: 'text-center', show: true },
                { text: "NUMERO DE SOCIO", value: "NUM_SOCIO", align: 'center', class: "Header_Tabla ", width: "180px", style: 'text-center', filter: this.numSocioFilter, show: true },
                { text: "SOCIO", value: "SOCIO", class: "Header_Tabla", align: 'center', width: "90px", style: 'text-center', filter: this.socioFilter, show: true },
                { text: "NOMBRE", value: "NOMBRE", class: " Header_Tabla", align: 'center', width: "150px", filter: this.nameFilter, show: true },
                { text: "APELLIDO 1", value: "APELLIDO_1", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.apellido1Filter, show: true },
                { text: "APELLIDO 2", value: "APELLIDO_2", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.apellido2Filter, show: true },
                { text: "PARENTESCO", value: "PARENTESCO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.parentescoFilter, show: true },
                { text: "DNI", value: "DNI", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.dniFilter, show: true },
                { text: "PD", value: "PD", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.pdFilter, show: true },
                { text: "FECHA DE NACIMIENTO(ESPAÑOL)", value: "FECHA_NACIMIENTO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaNacimientoFilter, show: true },
                { text: "FECHA DE NACIMIENTO(HEBREO)", value: "FECHA_NACIMIENTO_HEBREO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaNacimientoHebreoFilter, show: true },
                { text: "FECHA DE CASAMIENTO(ESPAÑOL)", value: "FECHA_CASAMIENTO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaCasamientoFilter, show: true },
                { text: "FECHA DE CASAMIENTO(HEBREO)", value: "FECHA_CASAMIENTO_HEBREO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaCasamientoHebreoFilter, show: true },
                { text: "FECHA DE DEFUNCIÓN(ESPAÑOL)", value: "FECHA_DEFUNCION", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaDefuncionFilter, show: true },
                { text: "FECHA DE DEFUNCIÓN(HEBREO)", value: "FECHA_DEFUNCION_HEBREO", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.fechaDefuncionHebreoFilter, show: true },
                { text: "DIRECCION", value: "DIRECCION", class: "Header_Tabla p-0", align: 'center', width: "150px", filter: this.direccionFilter, show: true },
                { text: "CODIGO POSTAL", value: "COD_POSTAL", class: "Header_Tabla", align: 'center', width: "150px", filter: this.codigoPostalFilter, show: true },
                { text: "LOCALIDAD", value: "LOCALIDAD", class: "Header_Tabla", align: 'center', width: "150px", filter: this.localidadFilter, show: true },
                { text: "PROVINCIA", value: "PROVINCIA", class: "Header_Tabla", align: 'center', width: "150px", filter: this.provinciaFilter, show: true },
                { text: "PAIS", value: "PAIS", class: "Header_Tabla", align: 'center', width: "150px", filter: this.paisFilter, show: true },
                { text: "MOVIL", value: "MOVIL", class: "Header_Tabla", align: 'center', width: "150px", filter: this.movilFilter, show: true },
                { text: "FIJO", value: "FIJO", class: "Header_Tabla", align: 'center', width: "150px", filter: this.fijoFilter, show: true },
                { text: "EMAIL", value: "EMAIL", class: "Header_Tabla", align: 'center', width: "150px", filter: this.emailFilter, show: true },
                { text: "EDAD", value: "EDAD", class: "Header_Tabla", align: 'center', width: "150px", filter: this.edadFilter, show: true },
                { text: "SOLA", value: "SOLA", class: "Header_Tabla", align: 'center', width: "150px", filter: this.solaFilter, show: true },
                { text: "MAYOR", value: "MAYOR", class: "Header_Tabla", align: 'center', width: "150px", filter: this.mayorFilter, show: true },
                { text: "TEFILÁ", value: "TEFILA", class: "Header_Tabla", align: 'center', width: "150px", filter: this.tefilaFilter, show: true },
                { text: "OBSERVACIONES", value: "OBSERVACIONES", align: 'center', class: "Header_Tabla", width: "300px", show: true },
                { text: "CUOTAS", value: "CUOTAS", class: "Header_Tabla", align: 'center', width: "150px", filter: this.cuotasFilter, show: false },
                { text: "CUOTA LICEO", value: "CUOTA_LICEO", class: "Header_Tabla", align: 'center', width: "150px", filter: this.cuotaLiceoFilter, show: false },
                { text: "FORMA DE PAGO", value: "FORMA_PAGO", class: "Header_Tabla", align: 'center', width: "150px", filter: this.formaPagoFilter, show: false },
                { text: "OBSERVACIONES 2", value: "OBSERVACIONES2", class: "Header_Tabla", align: 'center', width: "300px", show: false },
                { text: "JESED", value: "JESED", class: "Header_Tabla", align: 'center', width: "150px", filter: this.jessedFilter, show: false },
                { text: "ACCIONES", value: "actions", class: "Header_Tabla", align: 'center', sortable: false, width: "300px", show: true },
            ],
            //aqui van los valores pa los select
            user: {
                ID: '',
                NUM_SOCIO: '',
                SOCIO: '',
                NOMBRE: '',
                APELLIDO_1: '',
                APELLIDO_2: '',
                PARENTESCO: '',
                DNI: '',
                PD: '',
                FECHA_NACIMIENTO: '',
                FECHA_NACIMIENTO_HEBREO: '',
                FECHA_CASAMIENTO: '',
                FECHA_CASAMIENTO_HEBREO: '',
                FECHA_DEFUNCION: '',
                FECHA_DEFUNCION_HEBREO: '',
                DIRECCION: '',
                COD_POSTAL: '',
                LOCALIDAD: '',
                PROVINCIA: '',
                PAIS: '',
                MOVIL: '',
                FIJO: '',
                EMAIL: '',
                EDAD: '',
                SOLA: '',
                MAYOR: '',
                TEFILA: '',
                OBSERVACIONES: '',
                CUOTAS: '',
                CUOTA_LICEO: '',
                FORMA_PAGO: '',
                OBSERVACIONES2: '',
                JESED: '',
            },
            //variable para el filtro
            userFiltro: {
                ID: '',
                NUM_SOCIO: '',
                SOCIO: '',
                NOMBRE: '',
                APELLIDO_1: '',
                APELLIDO_2: '',
                PARENTESCO: '',
                DNI: '',
                PD: '',
                FECHA_NACIMIENTO: '',
                FECHA_NACIMIENTO_HEBREO: '',
                FECHA_CASAMIENTO: '',
                FECHA_CASAMIENTO_HEBREO: '',
                FECHA_DEFUNCION: '',
                FECHA_DEFUNCION_HEBREO: '',
                DIRECCION: '',
                COD_POSTAL: '',
                LOCALIDAD: '',
                PROVINCIA: '',
                PAIS: '',
                MOVIL: '',
                FIJO: '',
                EMAIL: '',
                EDAD: '',
                SOLA: '',
                MAYOR: '',
                TEFILA: '',
                OBSERVACIONES: '',
                CUOTAS: '',
                CUOTA_LICEO: '',
                FORMA_PAGO: '',
                OBSERVACIONES2: '',
                JESED: '',
            },
            SimbolosSelect:{
                FECHA_NACIMIENTO: '',
                FECHA_NACIMIENTO_HEBREO: '',
                FECHA_CASAMIENTO: '',
                FECHA_CASAMIENTO_HEBREO: '',
                FECHA_DEFUNCION: '',
                FECHA_DEFUNCION_HEBREO: '',
            },
            search: '',
            //dialog y modal
            dialog: false,
            dialogFiltro: false,
            formTitle: '',
            //edicion
            isEditing: false,
            //files
            file: null,
            //opciones de la data table
            options: {
                itemsPerPage: 100
            },
            //variable para el filtro
            tablaFiltrada: [],
            //SNACKBAR para mensajes
            snackbar: false,
            mensaje: '',
            //date
            date: new Date().toISOString().substr(0, 10),

        }
    },
    props: {
        adminVerification: null,
        idHoja: null,
    },
    mounted() {
        if (this.token) {
            this.getUsers(this.idHoja)
        } else {
            this.$router.push('/')
        }


    },
    computed: {
        ...mapGetters([
            'token',
            'username'
        ]),
        computedHeaders() {
            if (this.token == 'adminToken') {
                return this.columnas
            } else {
                let columnasMod = this.columnas.filter(x => x.show)
                if (!this.adminVerification) {
                    columnasMod.pop()
                }
                return columnasMod
            }
        }
    },
    methods: {
        async getUsers(id) {
            this.loading = true
            let datos = await axios.get(url + id)
            this.users = datos.data
            this.loading = false
        },
        agregarModal(e) {
            this.user = e
            this.addAndEditUser()
        },
        agregarFilterModal(e) {
            console.log(e);
            this.userFiltro = e
            this.dialogFiltro = false
            // this.addAndEditUser()
        },
        prepareEdit(item) {
            this.isEditing = true
            this.formTitle = 'Edicion del cliente: ' + item.NOMBRE
            this.user = JSON.parse(JSON.stringify(item))
            this.dialog = true;
        },
        async addAndEditUser() {
            this.loading = true;
            this.dialog = false;
            if (!this.isEditing) {
                this.user.ID = Number(this.users[this.users.length - 1].ID) + 1
                this.users.push(JSON.parse(JSON.stringify(this.user)))
            } else {
                let index = this.users.map(function(x) { return x.ID; }).indexOf(this.user.ID)
                this.users[index] = JSON.parse(JSON.stringify(this.user))
                this.isEditing = false
            }
            let datos = await axios.post(url + this.idHoja, this.users)
            this.snackbar = true
            if (datos.data == true) this.mensaje = 'actualizacion ejecutada exitosamente'
            else this.mensaje = 'error del sistema'
            this.resetUser(this.user)
            this.getUsers(this.idHoja) //pa que cargue en la app
            this.loading = false;
        },
        async deleteUser(ID) {
            this.loading = true;
            this.users = this.users.filter(function(obj) {
                return obj.ID !== ID;
            });
            let datos = await axios.post(url + this.idHoja, this.users)
            this.snackbar = true
            if (datos.data == true) this.mensaje = 'Borrado ejecutado exitosamente'
            else this.mensaje = 'error del sistema'
            this.loading = false;
        },
        resetUser(usuario) {
            usuario.ID = ''
            usuario.NUM_SOCIO = ''
            usuario.SOCIO = ''
            usuario.NOMBRE = ''
            usuario.APELLIDO_1 = ''
            usuario.APELLIDO_2 = ''
            usuario.PARENTESCO = ''
            usuario.DNI = ''
            usuario.PD = ''
            usuario.FECHA_NACIMIENTO = ''
            usuario.FECHA_NACIMIENTO_HEBREO = ''
            usuario.FECHA_CASAMIENTO = ''
            usuario.FECHA_CASAMIENTO_HEBREO = ''
            usuario.FECHA_DEFUNCION = ''
            usuario.FECHA_DEFUNCION_HEBREO = ''
            usuario.DIRECCION = ''
            usuario.COD_POSTAL = ''
            usuario.LOCALIDAD = ''
            usuario.PROVINCIA = ''
            usuario.PAIS = ''
            usuario.MOVIL = ''
            usuario.FIJO = ''
            usuario.EMAIL = ''
            usuario.EDAD = ''
            usuario.SOLA = ''
            usuario.MAYOR = ''
            usuario.TEFILA = ''
            usuario.OBSERVACIONES = ''
            usuario.CUOTAS = ''
            usuario.CUOTA_LICEO = ''
            usuario.FORMA_PAGO = ''
            usuario.OBSERVACIONES2 = ''
            usuario.JESED = ''
        },
        async descargar() {
            let respuesta = await axios.get('http://localhost:3000/download', { responseType: 'blob' })
            let name = await axios.get('http://localhost:3000/download/name')
            if (respuesta.data == false) {
                console.log('error al descargar el archivo');
            } else {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(new Blob([respuesta.data]));
                console.log(new Blob([respuesta.data]));
                link.setAttribute('download', name.data)
                document.body.appendChild(link)
                link.click()
            }
        },
        async descargarExcel() {
            let respuesta = await axios.get('http://localhost:3000/download/excel', { responseType: 'blob' })
            if (respuesta.data == false) {
                console.log('error al descargar el archivo');
            } else {
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
        async submitFile() {
            this.file = this.$refs.file.files[0];
            if (this.file !== null) {
                let respuesta = await axios.post('http://localhost:3000/file', { 'name': this.file.name, 'file': this.file.path })
                if (respuesta.data == true) {
                    this.getUsers(this.idHoja) //pa que cargue en la app
                } else {
                    console.log('error al subir el archivo');
                }
            }
        },
        //descarga de filtros
        getFiltered(e) {
            this.tablaFiltrada = e
        },
        async descargarFiltro() {
            let respuesta = await axios.post('http://localhost:3000/filter', this.tablaFiltrada, { responseType: 'blob' })
            if (respuesta.data == false) {
                console.log('error al descargar el archivo');
            } else {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(new Blob([respuesta.data]));
                link.setAttribute('download', 'filtrado.xlsx')
                document.body.appendChild(link)
                link.click()
            }
        },
        // filtros
        numSocioFilter(value) { //numero de socio
            if (!this.userFiltro.NUM_SOCIO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.NUM_SOCIO.toString().toLowerCase());
        },
        socioFilter(value) { //socio
            if (!this.userFiltro.SOCIO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.SOCIO.toString().toLowerCase());
        },
        nameFilter(value) { //nombre
            if (!this.userFiltro.NOMBRE) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.NOMBRE.toString().toLowerCase());
        },
        apellido1Filter(value) { //apellido 1
            if (!this.userFiltro.APELLIDO_1) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.APELLIDO_1.toString().toLowerCase());
        },
        apellido2Filter(value) { //apellido 2
            if (!this.userFiltro.APELLIDO_2) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.APELLIDO_2.toString().toLowerCase());
        },
        parentescoFilter(value) { //PARENTESCO
            if (!this.userFiltro.PARENTESCO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.PARENTESCO.toString().toLowerCase());
        },
        dniFilter(value) { //DNI
            if (!this.userFiltro.DNI) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.DNI.toString().toLowerCase());
        },
        pdFilter(value) { //PD
            if (!this.userFiltro.PD) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.PD.toString().toLowerCase());
        },
        fechaNacimientoFilter(value) { //FECHA_NACIMIENTO
            if (!this.userFiltro.FECHA_NACIMIENTO) return true;
            if (this.SimbolosSelect.FECHA_NACIMIENTO=='>') return Date.parse(value)>Date.parse(this.userFiltro.FECHA_NACIMIENTO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO=='<') return Date.parse(value)<Date.parse(this.userFiltro.FECHA_NACIMIENTO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO=='=') return Date.parse(value)==Date.parse(this.userFiltro.FECHA_NACIMIENTO)
        },
        fechaNacimientoHebreoFilter(value) { //FECHA_NACIMIENTO_HEBREO
            if (!this.userFiltro.FECHA_NACIMIENTO_HEBREO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FECHA_NACIMIENTO_HEBREO.toString().toLowerCase());
        },
        fechaCasamientoFilter(value) { //FECHA_CASAMIENTO
            if (!this.userFiltro.FECHA_CASAMIENTO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FECHA_CASAMIENTO.toString().toLowerCase());
        },
        fechaCasamientoHebreoFilter(value) { //FECHA_CASAMIENTO_HEBREO
            if (!this.userFiltro.FECHA_CASAMIENTO_HEBREO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FECHA_CASAMIENTO_HEBREO.toString().toLowerCase());
        },
        fechaDefuncionFilter(value) { //FECHA_DEFUNCION
            if (!this.userFiltro.FECHA_DEFUNCION) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FECHA_DEFUNCION.toString().toLowerCase());
        },
        fechaDefuncionHebreoFilter(value) { //FECHA_DEFUNCION_HEBREO
            if (!this.userFiltro.FECHA_DEFUNCION_HEBREO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FECHA_DEFUNCION_HEBREO.toString().toLowerCase());
        },
        direccionFilter(value) { //DIRECCION
            if (!this.userFiltro.DIRECCION) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.DIRECCION.toString().toLowerCase());
        },
        codigoPostalFilter(value) { //COD_POSTAL
            if (!this.userFiltro.COD_POSTAL) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.COD_POSTAL.toString().toLowerCase());
        },
        localidadFilter(value) { //LOCALIDAD
            if (!this.userFiltro.LOCALIDAD) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.LOCALIDAD.toString().toLowerCase());
        },
        provinciaFilter(value) { //PROVINCIA
            if (!this.userFiltro.PROVINCIA) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.PROVINCIA.toString().toLowerCase());
        },
        paisFilter(value) { //PAIS
            if (!this.userFiltro.PAIS) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.PAIS.toString().toLowerCase());
        },
        movilFilter(value) { //MOVIL
            if (!this.userFiltro.MOVIL) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.MOVIL.toString().toLowerCase());
        },
        fijoFilter(value) { //FIJO
            if (!this.userFiltro.FIJO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FIJO.toString().toLowerCase());
        },
        emailFilter(value) { //EMAIL
            if (!this.userFiltro.EMAIL) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.EMAIL.toString().toLowerCase());
        },
        edadFilter(value) { //EDAD
            if (!this.userFiltro.EDAD) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.EDAD.toString().toLowerCase());
        },
        solaFilter(value) { //SOLA
            if (!this.userFiltro.SOLA) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.SOLA.toString().toLowerCase());
        },
        mayorFilter(value) { //MAYOR
            if (!this.userFiltro.MAYOR) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.MAYOR.toString().toLowerCase());
        },
        tefilaFilter(value) { //TEFILA
            if (!this.userFiltro.TEFILA) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.TEFILA.toString().toLowerCase());
        },
        cuotasFilter(value) { //CUOTAS
            if (!this.userFiltro.CUOTAS) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.CUOTAS.toString().toLowerCase());
        },
        cuotaLiceoFilter(value) { //CUOTA_LICEO
            if (!this.userFiltro.CUOTA_LICEO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.CUOTA_LICEO.toString().toLowerCase());
        },
        formaPagoFilter(value) { //FORMA_PAGO
            if (!this.userFiltro.FORMA_PAGO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FORMA_PAGO.toString().toLowerCase());
        },
        jessedFilter(value) { //JESED
            if (!this.userFiltro.JESED) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.JESED.toString().toLowerCase());
        },

    }

};
</script>
<style>
.Buscar_Tabla {
    /* border: 5px solid purple !important;*/
    text-align: center;
}

.Iconos_Descarga {
    /* border: 5px solid red;*/
    padding-left: 25px;
}

/*
.Buscar_Text {
     border: 5px solid black;

}
.Añadir_Quitar {
     border: 5px solid purple !important;
     padding-left: 10px;
}

.Marco_Editar {
     border: 5px solid red;
}

.Tabla_Principal {
    border: 5px solid blue;

    text-align: center;
    vertical-align: middle;
}*/

.Op-Iconos {
    width: 1000%;
    /* border: 5px solid red;*/
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
    background-color: #CFD8DC !important;
    color: black !important;

}

tbody tr:nth-of-type(odd) {
    background-color: #FAFAFA;
}

tbody td {
    padding: auto;
    border: 0.2px solid black;
    padding: 15px;
    width: 50%;
}
</style>