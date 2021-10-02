<template>
    <v-container class="CRUD-P pb-0" fluid fill-height>
        <v-row class="Iconos_Descarga d-flex justify-space-between mt-10 mb-10">
            <v-col class="Tabs_Descarga d-flex justify-end">
                <div class="Div_Tabs_Descarga">
                    <v-expansion-panels v-if="adminVerification ||(countFilter!=0&&this.token=='adminToken')">
                        <v-expansion-panel>
                            <v-expansion-panel-header disable-icon-rotate>
                                <strong style="color:#424242" class="text-center">OPCIONES DE DESCARGA</strong>
                                <template v-slot:actions>
                                    <v-icon color="teal">
                                        mdi-cloud-download
                                    </v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content class="text-center">
                                <v-btn class="Btn_Descarga" style="color:#424242" color="orange lighten-1" @click="descargar()" v-if="adminVerification">
                                    <v-icon>mdi-file-lock</v-icon>&nbsp;encriptado
                                </v-btn>
                                <!--descarga normal-->
                                <v-btn class="Btn_Descarga" style="color:#424242" color="#26A69A" @click="descargarExcel()" v-if="this.token=='adminToken' &&adminVerification">
                                    <v-icon>mdi-file-excel</v-icon>&nbsp;Excel
                                </v-btn>
                                <!--descarga de excel filtrada, necesario para las descargas-->
                                <v-btn class="Btn_Descarga" style="color:#424242" color="#26A69A" v-if="this.token=='adminToken'&&countFilter!=0" @click="descargarFiltro()">
                                    <v-icon>mdi-download</v-icon>&nbsp;&nbsp;Datos Filtrados
                                </v-btn>
                                <!--descarga filtrada-->
                                <v-btn color="secondary" class="Btn_Descarga" outlined v-if="adminVerification" @click="chooseFiles()">
                                    <span >
                                        <v-icon class="mr-1">mdi-upload</v-icon>subir archivo
                                    </span>
                                    <!-- <span v-else>
                                        <v-icon class="mr-1">mdi-upload</v-icon>agregado
                                         <v-icon class="mr-1">mdi-file-excel</v-icon> {{this.file.name}} 
                                    </span> -->
                                </v-btn>
                                <input id="fileUpload" type="file" ref="file" @change="submitFile()" hidden>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </div>
            </v-col>
        </v-row>
        <v-row class="d-flex justify-center p-0 ">
            <v-col>
                <div class="mb-5 d-flex justify-center">
                    <div class="Div_Usuario">
                        <v-btn class="Btn_Usuario" v-if="adminVerification" color="primary" @click="dialog=true;formTitle='Agregar cliente';resetUser(user)">
                            <v-icon>mdi-account-plus</v-icon>&nbsp;Añadir Cliente
                        </v-btn>
                        <v-btn class="Btn_Usuario" color="#795548" @click="dialogFiltro=true">
                            <v-icon>mdi-clipboard-text-search</v-icon>&nbsp;añadir filtro
                        </v-btn>
                        <v-btn class="Btn_Usuario" v-if="countFilter!=0" color="red white--text" @click="borrarFilter()">
                            <v-icon>mdi-clipboard-remove</v-icon>&nbsp;borrar filtro
                        </v-btn>
                        <Oculto class="Btn_Oculto" style="display:inline-block" ></Oculto>
                    </div>
                </div>
                <div class="Tabla_Principal" :style="adminVerification ? '--radius: 280px;' : '--radius: 180px;'"><!-- IMPORTANTE; NO BORRAR-->
                    <!-- esto es la tabla  elevation-1 theme--light :cols="!adminVerification ? '8' : ''"-->
                    <v-data-table :headers="computedHeaders" :loading="loading" :search="search" height="65vh" fixed-header  @current-items="getFiltered" :footer-props="{
                        'items-per-page-text': 'usuarios por pagina',
                        'items-per-page-options': [10, 50, 100, 200, -1],
                        }" :options="options" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion" class="Tabla text--center ">
                        <!-- botones editar y borrar -->
                        <!--<template v-slot:[`item.actions`]="{ item }" v-if="adminVerification">
                            <v-btn color="green  white--text" @click="prepareEdit(item)">
                                <v-icon small class="mr-2"> mdi-pencil </v-icon> editar
                            </v-btn>
                            <v-btn color="red white--text" class="ml-1" @click="idDelete=item.ID;dialogDelete=true">
                                <v-icon small> mdi-delete </v-icon> eliminar
                            </v-btn>
                        </template>
                         <template v-slot:[`item.NOMBRE`]="{ item }" >
                            <div class="ma-0" :style="adminVerification ? 'background: grey;' : 'background: red;'">{{item.NOMBRE}}</div>
                        </template> -->
                        <template v-slot:item="{ item }">
                            <tr>  
                                <!-- botones -->
                                <td class="tablatd" :style="((users.indexOf(item) % 2) === 0) ? 'background: #ECEFF1;' : 'background: white;'" v-if="adminVerification">
                                    <v-btn color="green  white--text" @click="prepareEdit(item)">
                                        <v-icon small class="mr-2"> mdi-pencil </v-icon> editar
                                    </v-btn>
                                    <v-btn color="red white--text" class="ml-1" @click="idDelete=item.ID;nameDelete=item.NOMBRE;dialogDelete=true">
                                        <v-icon small> mdi-delete </v-icon> eliminar
                                    </v-btn>
                                </td>     
                                <!-- propiedades ordenadas -->
                                <td class="tablatd" :style="((users.indexOf(item) % 2) === 0) ? 'background: #ECEFF1;' : 'background: white;'">{{ item.NOMBRE }}</td>  <!-- que hp cambiar el color -->
                                <td class="tablatd" :style="((users.indexOf(item) % 2) === 0) ? 'background: #ECEFF1;' : 'background: white;'">{{ item.NUM_SOCIO }}</td>
                                <td class="tablatd">{{ item.SOCIO }}</td>
                                <td class="tablatd">{{ item.APELLIDO_1 }}</td>
                                <td class="tablatd">{{ item.APELLIDO_2 }}</td>
                                <td class="tablatd">{{ item.PARENTESCO }}</td>
                                <td class="tablatd">{{ item.DNI }}</td>
                                <td class="tablatd">{{ item.PD }}</td>
                                <td class="tablatd">{{ item.FECHA_NACIMIENTO }}</td>
                                <td class="tablatd">{{ item.FECHA_NACIMIENTO_HEBREO }}</td>
                                <td class="tablatd">{{ item.FECHA_CASAMIENTO }}</td>
                                <td class="tablatd">{{ item.FECHA_CASAMIENTO_HEBREO }}</td>
                                <td class="tablatd">{{ item.FECHA_DEFUNCION }}</td>
                                <td class="tablatd">{{ item.FECHA_DEFUNCION_HEBREO }}</td>
                                <td class="tablatd">{{ item.DIRECCION }}</td>
                                <td class="tablatd">{{ item.COD_POSTAL }}</td>
                                <td class="tablatd">{{ item.LOCALIDAD }}</td>
                                <td class="tablatd">{{ item.PROVINCIA }}</td>
                                <td class="tablatd">{{ item.PAIS }}</td>
                                <td class="tablatd">{{ item.MOVIL }}</td>
                                <td class="tablatd">{{ item.FIJO }}</td>
                                <td class="tablatd">{{ item.EMAIL }}</td>
                                <td class="tablatd">{{ item.EDAD }}</td>
                                <td class="tablatd">{{ item.SOLA }}</td>
                                <td class="tablatd">{{ item.MAYOR }}</td>
                                <td class="tablatd">{{ item.TEFILA }}</td>
                                <td class="tablatd">{{ item.OBSERVACIONES}}</td>
                                <td class="tablatd" v-if="token == 'adminToken'">{{ item.CUOTAS }}</td>
                                <td class="tablatd" v-if="token == 'adminToken'">{{ item.CUOTA_LICEO }}</td>
                                <td class="tablatd" v-if="token == 'adminToken'">{{ item.FORMA_PAGO }}</td>
                                <td class="tablatd" v-if="token == 'adminToken'">{{ item.OBSERVACIONES2 }}</td>
                                <td class="tablatd" v-if="token == 'adminToken'">{{ item.JESED }}</td>
                                <td class="tablatd ">{{ item.ID }}</td>
                            </tr>
                        </template>
                    </v-data-table>
                    
                </div>
            </v-col>
        </v-row>
        <!-- ventana modal para crear/editar -->
        <ventanaModal :dialog="dialog" :user="user" :formTitle="formTitle" :filtro="false" :isEditing="isEditing" @dialogModal="dialog = $event;isEditing=false" @agregarModal="agregarModal" />
        <!-- ventana modal para FILTROS -->
        <ventanaFiltro :dialog="dialogFiltro" :user="JSON.parse(JSON.stringify(userFiltro))" :formTitle="'Agregar Filtros'" :filtro="true" @dialogModal="dialogFiltro = $event" @agregarModal="agregarFilterModal" @simbolos="SimbolosSelect=$event" />
        <!-- SNACKBAR PARA MOSTRAR MENSAJES -->
        <v-snackbar v-model="snackbar" timeout="2000">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
        <!-- modal para borrar -->
        <v-dialog v-model="dialogDelete" max-width="500px" >
            <v-card>
                <v-toolbar color="red" dark>ELIMINAR REGISTRO</v-toolbar>
                <v-card-title class="d-flex justify-center mb-3" style="text-transform:uppercase;font-size:15px">¿ estas seguro de borrar a {{nameDelete}} con id: {{idDelete}} ?</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1 white--text" depressed @click="dialogDelete=false;idDelete=null">cancelar</v-btn>
                    <v-btn color="ml-5 error darken-1" depressed @click="deleteUser(idDelete)">Eliminar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  

<script>
var url = "http://localhost:3000/api/hojas/";
import axios from "axios";
import ventanaFiltro from "./ventanaFiltro.vue";
import ventanaModal from "./ventanaModal.vue";
import Oculto from "./Datos_Ocultos.vue";
import { mapGetters } from 'vuex';

export default {
    name: 'CrudClientes',
    components: {
        ventanaFiltro,
        ventanaModal,
        Oculto,
        

    },
    data() {
        return {
            loading: false,
            users: [],
            columnas: [ //EDITAR INFORMACION
                { text: "ACCIONES", value: "actions", class: "Header_Tabla", align: 'center', sortable: false, width: "280px", show: true},
                { text: "NOMBRE", value: "NOMBRE", class: "Header_Tabla elevacionTabla pl-10 ", align: 'center', width: "180px", filter: this.nameFilter, show: true },
                { text: "NÚMERO DE SOCIO", value: "NUM_SOCIO", align: 'center', class: "Header_Tabla pl-10", width: "280px", filter: this.numSocioFilter, show: true},
                { text: "SOCIO", value: "SOCIO", class: "Header_Tabla elevacionTabla pl-5 pt-5", align: 'center', width: "90px", style: 'text-center', filter: this.socioFilter, show: true },
                { text: "APELLIDO 1", value: "APELLIDO_1", class: "Header_Tabla elevacionTabla pl-8", align: 'center', width: "150px", filter: this.apellido1Filter, show: true },
                { text: "APELLIDO 2", value: "APELLIDO_2", class: "Header_Tabla elevacionTabla pl-8", align: 'center', width: "150px", filter: this.apellido2Filter, show: true },
                { text: "PARENTESCO", value: "PARENTESCO", class: "Header_Tabla elevacionTabla pl-8", align: 'center', width: "150px", filter: this.parentescoFilter, show: true },
                { text: "DNI", value: "DNI", class: "Header_Tabla elevacionTabla pl-8", align: 'center', width: "150px", filter: this.dniFilter, show: true },
                { text: "PD", value: "PD", class: "Header_Tabla elevacionTabla pl-5 pt-5", align: 'center', width: "70px", filter: this.pdFilter, show: true },
                { text: "FECHA DE NACIMIENTO", value: "FECHA_NACIMIENTO", class: "Header_Tabla elevacionTabla pl-6 pt-5", align: 'center', width: "190px", filter: this.fechaNacimientoFilter, show: true },
                { text: "FECHA DE NACIMIENTO(HEBREO)", value: "FECHA_NACIMIENTO_HEBREO", class: "Header_Tabla elevacionTabla", align: 'center', width: "250px", filter: this.fechaNacimientoHebreoFilter, show: true },
                { text: "FECHA DE CASAMIENTO", value: "FECHA_CASAMIENTO", class: "Header_Tabla elevacionTabla pl-5 pt-5", align: 'center', width: "190px", filter: this.fechaCasamientoFilter, show: true },
                { text: "FECHA DE CASAMIENTO(HEBREO)", value: "FECHA_CASAMIENTO_HEBREO", class: "Header_Tabla elevacionTabla", align: 'center', width: "250px", filter: this.fechaCasamientoHebreoFilter, show: true },
                { text: "FECHA DE DEFUNCIÓN", value: "FECHA_DEFUNCION", class: "Header_Tabla elevacionTabla", align: 'center', width: "190px", filter: this.fechaDefuncionFilter, show: true },
                { text: "FECHA DE DEFUNCIÓN(HEBREO)", value: "FECHA_DEFUNCION_HEBREO", class: "Header_Tabla elevacionTabla", align: 'center', width: "250px", filter: this.fechaDefuncionHebreoFilter, show: true },
                { text: "DIRECCIÓN", value: "DIRECCION", class: "Header_Tabla elevacionTabla pl-5", align: 'center', width: "250px", filter: this.direccionFilter, show: true },
                { text: "CÓDIGO POSTAL", value: "COD_POSTAL", class: "Header_Tabla elevacionTabla pl-6 pt-5", align: 'center', width: "150px", filter: this.codigoPostalFilter, show: true },
                { text: "LOCALIDAD", value: "LOCALIDAD", class: "Header_Tabla elevacionTabla pl-6", align: 'center', width: "250px", filter: this.localidadFilter, show: true },
                { text: "PROVINCIA", value: "PROVINCIA", class: "Header_Tabla elevacionTabla pl-6", align: 'center', width: "250px", filter: this.provinciaFilter, show: true },
                { text: "PAÍS", value: "PAIS", class: "Header_Tabla elevacionTabla pl-5", align: 'center', width: "250px", filter: this.paisFilter, show: true },
                { text: "MÓVIL", value: "MOVIL", class: "Header_Tabla elevacionTabla pl-7", align: 'center', width: "250px", filter: this.movilFilter, show: true },
                { text: "FIJO", value: "FIJO", class: "Header_Tabla elevacionTabla pl-7", align: 'center', width: "250px", filter: this.fijoFilter, show: true },
                { text: "EMAIL", value: "EMAIL", class: "Header_Tabla elevacionTabla pl-10", align: 'center', width: "250px", filter: this.emailFilter, show: true },
                { text: "EDAD", value: "EDAD", class: "Header_Tabla elevacionTabla pl-8 pt-1", align: 'center', width: "100px", filter: this.edadFilter, show: true },
                { text: "SOLA", value: "SOLA", class: "Header_Tabla elevacionTabla pl-8 pt-1", align: 'center', width: "100px", filter: this.solaFilter, show: true },
                { text: "MAYOR", value: "MAYOR", class: "Header_Tabla elevacionTabla pl-5 pt-1", align: 'center', width: "100px", filter: this.mayorFilter, show: true },
                { text: "TEFILÁ", value: "TEFILA", class: "Header_Tabla elevacionTabla", align: 'center', width: "250px", filter: this.tefilaFilter, show: true },
                { text: "OBSERVACIONES", value: "OBSERVACIONES", align: 'center', class: "Header_Tabla elevacionTabla", width: "400px", filter: this.observacionesFilter, show: true },
                { text: "CUOTAS", value: "CUOTAS", class: "Header_Tabla elevacionTabla", align: 'center', width: "150px", filter: this.cuotasFilter, show: false, sortable: false },
                { text: "CUOTA LICEO", value: "CUOTA_LICEO", class: "Header_Tabla elevacionTabla", align: 'center', width: "150px", filter: this.cuotaLiceoFilter, show: false, sortable: false },
                { text: "FORMA DE PAGO", value: "FORMA_PAGO", class: "Header_Tabla elevacionTabla", align: 'center', width: "150px", filter: this.formaPagoFilter, show: false },
                { text: "OBSERVACIONES 2", value: "OBSERVACIONES2", class: "Header_Tabla elevacionTabla", align: 'center', width: "350px", filter: this.observaciones2Filter, show: false },
                { text: "JESED", value: "JESED", class: "Header_Tabla elevacionTabla", align: 'center', width: "100px", filter: this.jessedFilter, show: false },
                { text: "ID", value: "ID", class: "Header_Tabla  elevacionTabla", align: 'center', width: "70px", style: 'text-center', show: true },
            ],
            //aqui van los valores pa los select
            user: {
                NOMBRE: '',
                NUM_SOCIO: '',
                SOCIO: '',
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
                ID: '',
            },
            //variable para el filtro
            userFiltro: {
                NOMBRE: '',
                NUM_SOCIO: '',
                SOCIO: '',
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
                ID: '',
            },
            SimbolosSelect: {
                FECHA_NACIMIENTO: '',
                FECHA_NACIMIENTO_HEBREO: '',
                FECHA_CASAMIENTO: '',
                FECHA_CASAMIENTO_HEBREO: '',
                FECHA_DEFUNCION: '',
                FECHA_DEFUNCION_HEBREO: '',
            },
            countFilter: 0,
            search: '',
            idDelete: null,
            //dialog y modal
            dialog: false,
            dialogFiltro: false,
            dialogDelete: false,
            nameDelete:false,
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
            counter:0,

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
            'username',
            'rol',
        ]),
        computedHeaders() {
            let columnasMod = []
            if (this.token == 'adminToken') {
                columnasMod = this.columnas

            } else {
                columnasMod = this.columnas.filter(x => x.show)

            }
            if (!this.adminVerification) {
                // columnasMod.pop()
                columnasMod.shift()
            }
            return columnasMod
        },
        computedTrue(){

        }
    },
    methods: {
        async getUsers(id) {
            this.loading = true
            let datos = await axios.get('http://localhost:3000/api/hojas/gethoja')
            this.users = datos.data
            this.loading = false
        },
        agregarModal(e) {
            this.user = e
            this.addAndEditUser()
        },
        agregarFilterModal(e) {
            if (JSON.stringify(this.userFiltro) !== JSON.stringify(e)) {
                this.countFilter = 0
                if (this.adminVerification) this.countFilter = 1
                    
                
                for (let key in e) {
                    if (e[key] != '') {
                        this.columnas[this.countFilter].class = 'Header_Filter'
                    } else {
                        this.columnas[this.countFilter].class = 'Header_Tabla'
                    }
                    this.countFilter++
                }
                this.snackbar = true
                this.mensaje = 'Filtros Añadidos Exitosamente'
            }
            this.userFiltro = e
            this.dialogFiltro = false
        },
        borrarFilter() {
            this.countFilter = 0
            for (let i = 0; i < this.columnas.length; i++) {
                this.columnas[i].class = 'Header_Tabla';
            }
            this.resetUser(this.userFiltro)
        },
        prepareEdit(item) {
            this.isEditing = true
            this.formTitle = 'Edición Del Cliente : ' + item.NOMBRE
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
            }
            this.isEditing = false
            let datos = await axios.post(url + this.idHoja, this.users)
            this.snackbar = true
            if (datos.data == true) this.mensaje = 'Actualización Ejecutada Exitosamente'
            else this.mensaje = 'Error Del Sistema'
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
            if (datos.data == true) this.mensaje = 'Borrado Ejecutado Exitosamente'
            else this.mensaje = 'Error Del Sistema'
            this.dialogDelete = false
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
                this.snackbar = true
                this.mensaje = 'Error Al Descargar El Archivo'
            } else {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(new Blob([respuesta.data],{ type: 'text/plain' }));
                if (name.data) link.setAttribute('download', name.data)
                else link.setAttribute('download', `datos.encrypted`)
                document.body.appendChild(link)
                link.click()
            }
        },
        async descargarExcel() {
            let respuesta = await axios.get('http://localhost:3000/download/excel', { responseType: 'blob' })
            let name = await axios.get('http://localhost:3000/download/name')
            if (respuesta.data == false) {
                this.snackbar = true
                this.mensaje = 'Error Al Descargar El Archivo'
            } else {
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(new Blob([respuesta.data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                if (name.data) link.setAttribute('download', `${name.data.split('.')[0]}.xlsx`)
                else link.setAttribute('download', `datos.xlsx`)
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
                if (this.file.name.split('.').pop() == 'xlsx' && this.token != 'adminToken') {
                    this.snackbar = true
                    this.mensaje = 'Usted No Está Autorizado Para Subir Archivos De Excel'
                    this.file = null
                    this.$refs.file.value = null;
                } else {
                    let respuesta = await axios.post('http://localhost:3000/file', { 'name': this.file.name, 'file': this.file.path })
                    if (respuesta.data == true) {
                        this.getUsers(this.idHoja) //pa que cargue en la app
                        this.snackbar = true
                        this.mensaje = 'Archivo Cargado Exitosamente'
                        this.file = null
                        this.$refs.file.value = null;

                    } else {
                        this.snackbar = true
                        this.mensaje = 'Error Al Subir El Archivo - Formato No Válido'
                    }
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
                this.snackbar = true
                this.mensaje = 'Error Al Descargar El Archivo'
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
            if (this.SimbolosSelect.FECHA_NACIMIENTO == '') return true;
            if (this.SimbolosSelect.FECHA_NACIMIENTO == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_NACIMIENTO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_NACIMIENTO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_NACIMIENTO)
        },
        fechaNacimientoHebreoFilter(value) { //FECHA_NACIMIENTO_HEBREO
            if (!this.userFiltro.FECHA_NACIMIENTO_HEBREO) return true;
            if (this.SimbolosSelect.FECHA_NACIMIENTO_HEBREO == '') return true;
            if (this.SimbolosSelect.FECHA_NACIMIENTO_HEBREO == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_NACIMIENTO_HEBREO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO_HEBREO == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_NACIMIENTO_HEBREO)
            if (this.SimbolosSelect.FECHA_NACIMIENTO_HEBREO == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_NACIMIENTO_HEBREO)
        },
        fechaCasamientoFilter(value) { //FECHA_CASAMIENTO
            if (!this.userFiltro.FECHA_CASAMIENTO) return true;
            if (this.SimbolosSelect.FECHA_CASAMIENTO == '') return true;
            if (this.SimbolosSelect.FECHA_CASAMIENTO == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_CASAMIENTO)
            if (this.SimbolosSelect.FECHA_CASAMIENTO == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_CASAMIENTO)
            if (this.SimbolosSelect.FECHA_CASAMIENTO == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_CASAMIENTO)
        },
        fechaCasamientoHebreoFilter(value) { //FECHA_CASAMIENTO_HEBREO
            if (!this.userFiltro.FECHA_CASAMIENTO_HEBREO) return true;
            if (this.SimbolosSelect.FECHA_CASAMIENTO_HEBREO == '') return true;
            if (this.SimbolosSelect.FECHA_CASAMIENTO_HEBREO == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_CASAMIENTO_HEBREO)
            if (this.SimbolosSelect.FECHA_CASAMIENTO_HEBREO == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_CASAMIENTO_HEBREO)
            if (this.SimbolosSelect.FECHA_CASAMIENTO_HEBREO == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_CASAMIENTO_HEBREO)
        },
        fechaDefuncionFilter(value) { //FECHA_DEFUNCION
            if (!this.userFiltro.FECHA_DEFUNCION) return true;
            if (this.SimbolosSelect.FECHA_DEFUNCION == '') return true;
            if (this.SimbolosSelect.FECHA_DEFUNCION == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_DEFUNCION)
            if (this.SimbolosSelect.FECHA_DEFUNCION == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_DEFUNCION)
            if (this.SimbolosSelect.FECHA_DEFUNCION == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_DEFUNCION)
        },
        fechaDefuncionHebreoFilter(value) { //FECHA_DEFUNCION_HEBREO
            if (!this.userFiltro.FECHA_DEFUNCION_HEBREO) return true;
            if (this.SimbolosSelect.FECHA_DEFUNCION_HEBREO == '') return true;
            if (this.SimbolosSelect.FECHA_DEFUNCION_HEBREO == '>') return Date.parse(value) > Date.parse(this.userFiltro.FECHA_DEFUNCION_HEBREO)
            if (this.SimbolosSelect.FECHA_DEFUNCION_HEBREO == '<') return Date.parse(value) < Date.parse(this.userFiltro.FECHA_DEFUNCION_HEBREO)
            if (this.SimbolosSelect.FECHA_DEFUNCION_HEBREO == '=') return Date.parse(value) == Date.parse(this.userFiltro.FECHA_DEFUNCION_HEBREO)
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
        observacionesFilter(value) { //OBSERVACIONES
            if (!this.userFiltro.OBSERVACIONES) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.OBSERVACIONES.toString().toLowerCase());
        },
        cuotasFilter(value) { //CUOTAS
            if (!this.userFiltro.CUOTAS) return true;
            if (this.SimbolosSelect.CUOTAS == '') return true;
            let userFilter = Number(this.userFiltro.CUOTAS.slice(1))
            let valueFilter = Number(value.slice(1))
            if (this.SimbolosSelect.CUOTAS == '>') return this.userFiltro.CUOTAS[0] == value[0] && valueFilter > userFilter
            if (this.SimbolosSelect.CUOTAS == '<') return this.userFiltro.CUOTAS[0] == value[0] && valueFilter < userFilter
            if (this.SimbolosSelect.CUOTAS == '=') return this.userFiltro.CUOTAS[0] == value[0] && valueFilter == userFilter
        },
        cuotaLiceoFilter(value) { //CUOTA_LICEO
            if (!this.userFiltro.CUOTA_LICEO) return true;
            if (this.SimbolosSelect.CUOTA_LICEO == '') return true;
            let userFilter = Number(this.userFiltro.CUOTA_LICEO.slice(1))
            let valueFilter = Number(value.slice(1))
            if (this.SimbolosSelect.CUOTA_LICEO == '>') return this.userFiltro.CUOTA_LICEO[0] == value[0] && valueFilter > userFilter
            if (this.SimbolosSelect.CUOTA_LICEO == '<') return this.userFiltro.CUOTA_LICEO[0] == value[0] && valueFilter < userFilter
            if (this.SimbolosSelect.CUOTA_LICEO == '=') return this.userFiltro.CUOTA_LICEO[0] == value[0] && valueFilter == userFilter
        },
        formaPagoFilter(value) { //FORMA_PAGO
            if (!this.userFiltro.FORMA_PAGO) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.FORMA_PAGO.toString().toLowerCase());
        },
        observaciones2Filter(value) { //OBSERVACIONES2
            if (!this.userFiltro.OBSERVACIONES2) return true;
            return value.toString().toLowerCase().includes(this.userFiltro.OBSERVACIONES2.toString().toLowerCase());
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

.Tabla_Principal {
    height: 100%;
}

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
    text-align: center;
    border: 1px solid black !important;
    background-color: #78909C !important;
    color: black !important;
    margin: 0;
    padding: 0;

}

.Header_Filter {
    /* esta es pa cuando se agarra un filtro */
    border: 1px solid black !important;
    background-color: #5EC241 !important;
    color: black !important;
}

tbody tr:nth-of-type(odd) {
    background-color: #ECEFF1;
}

/**/
.Div_Tabs_Descarga {
    /* border: 5px solid black;*/
    width: 49% !important;
}

.Btn_Descarga {
    width: 24% !important;
    height: 37px !important;
    margin-left: 5px;
    color: white !important;
    font-size: 0.7vw !important;
}

.Div_Usuario {
   /* border: 5px solid red;*/
    display: flex;
    justify-content: start;

}

table tbody tr{
  text-align: center;
}


.Btn_Usuario {
    color: white !important;
    margin-left: 20px;
    margin-top: 13px;
  /*  border: 5px solid red;*/
}
/* pa que edites las tablas internas */
.tablatd {
    padding: auto;
    border: 0.2px solid black;
    padding: 15px;
    height: 80px !important;
}


    


/*vaina pal header pegado, ojo con esto*/
    /* 1 */
    table > tbody > tr > td:nth-child(1), 
    table > thead > tr > th:nth-child(1) {
      position: sticky !important; 
      position: -webkit-sticky !important; 
      left: 0; 
      z-index: 10;

    }
    table > thead > tr > th:nth-child(1) {
      z-index: 90!important;
    }
        /* 2 */
     table > tbody > tr > td:nth-child(2), 
    table > thead > tr > th:nth-child(2) {
      position: sticky !important; 
      position: -webkit-sticky !important; 
        left: var(--radius); 
      z-index: 10;

    }
    table > thead > tr > th:nth-child(2) {
      z-index: 90!important;
    }

    .ID{
        display: none;
    }

/** RESPONSIVE DESIGN  */


@media(max-width: 1290px) {

    .Div_Tabs_Descarga {
         /*border: 5px solid black !important;*/
        width: 100% !important;
    }

    .Btn_Descarga {
        width: 24% !important;
        height: 37px !important;
        margin-left: 5px;
        color: white !important;
        font-size: 14px !important;
    }

    .Div_Usuario {
        /*border: 5px solid black;*/
       
        /*display: flex;
        align-items: center;
        justify-content: center;*/
        text-align: center;

    }

    .Btn_Usuario {
        color: white !important;
        margin-left: 20px;
        margin-top: 12px;
    }


    .Btn_Oculto{
   
        width: 50% !important;
    }



}
</style>