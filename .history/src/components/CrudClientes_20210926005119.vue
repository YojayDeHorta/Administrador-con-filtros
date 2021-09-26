<template>
    <v-container class="CRUD-P" fluid fill-height>
        <v-row class="Op-Editartext-center mt-5 d-flex">
            <div class=" ">
                <v-col class="Op-Iconos" >
                    <v-btn style="margin:auto" v-if="adminVerification" color="primary" @click="dialog = true; formTitle = 'Agregar usuario';
                  resetUser();
                ">
                        <v-icon class="mr-2">mdi-account-plus</v-icon> añadir
                    </v-btn>

                    <v-btn color="teal darken-1" @click="descargar()" v-if="adminVerification">
                        <v-icon color="white">mdi-cloud-download</v-icon>
                        &nbsp;&nbsp;Descargar Archivo
                    </v-btn>
                    <!--descarga normal-->
                    <v-btn color="teal darken-1 white--text" v-if="!adminVerification" @click="descargarFiltro()">
                        <v-icon color="white">mdi-file-download</v-icon>descargar
                        tabla
                    </v-btn>
                    <!--descarga filtrada-->
                    <v-btn color="secondary" class="ml-1" outlined v-if="adminVerification" @click="chooseFiles()">
                        <span v-if="file == null">
                            <v-icon class="mr-1">mdi-upload</v-icon>subir archivo
                        </span>
                        <span v-else>
                            <v-icon class="mr-1">mdi-file-excel</v-icon>
                            {{ this.file.name }}
                        </span>
                    </v-btn>
                    <input id="fileUpload" type="file" ref="file" @change="submitFile()" hidden />
                </v-col>
                <v-col class="Op mt-10 pt-0" style="border:5px solid yellow; width: 50%;">
                    <v-text-field v-model="search" append-icon="mdi-magnify" v-if="adminVerification"
                        label="Buscar en la tabla" single-line hide-details></v-text-field>
                </v-col>

            </div>
        </v-row>
        <v-row class="d-flex justify-center p-0">
            <v-col v-if="!adminVerification" class="ml-5">
                <filtro :header="computedHeaders" @filtro="funcionFiltro" />
                <!-- estos son los filtros -->
                <!-- <v-text-field label="nombre" v-model="nameValue" append-icon="mdi-text-box-search"></v-text-field>
            <v-text-field label="apellido" v-model="apellidoValue" append-icon="mdi-text-box-search"></v-text-field>
            <div>SOCIO:</div>
            <v-select :items="Socio" v-model="socioValue" label="Socio" solo></v-select> height="70vh" fixed-header-->
            </v-col>
            <v-col :cols="!adminVerification ? '8' : ''">
                <v-card width="100%">
                    <div class="Tabla_Principal">
                        <!-- esto es la tabla  elevation-1 theme--light -->
                        <v-data-table :headers="computedHeaders" :loading="loading" :search="search"
                            @current-items="getFiltered" :footer-props="{
              'items-per-page-text': 'usuarios por pagina',
              'items-per-page-options': [10, 50, 100, 200, -1],
            }" :options="options" loading-text="Cargando...Porfavor espere" :items="users" sort-by="descripcion"
                            class="Tabla text-center">
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
                </v-card>
            </v-col>
        </v-row>
        <!-- ventana modal para crear/editar -->
        <v-dialog v-model="dialog" max-width="1200px">
            <v-card>
                <v-form @submit.prevent="addAndEditUser">
                    <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field v-model="user.NUM_SOCIO" label="Numero de socio"></v-text-field>
                                </v-col>
                                <v-col cols="6" class="pt-0 mt-0">
                                    <div>SOCIO:</div>
                                    <v-select :items="Socio" v-model="user.SOCIO" label="Socio" solo></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field v-model="user.NOMBRE" label="Nombre"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.APELLIDO_1" label="Apellido 1"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.APELLIDO_2" label="Apellido 2"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <div>Parentesco:</div>
                                    <v-select :items="Parentesco" v-model="user.PARENTESCO" label="Parentesco" solo>
                                    </v-select>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.DNI" label="DNI"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <div>PD:</div>
                                    <v-select :items="Pd" v-model="user.PD" label="PD" solo></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="10">
                                    <v-text-field v-model="user.DIRECCION" label="Direccion"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field v-model="user.COD_POSTAL" label="Codigo postal"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field v-model="user.LOCALIDAD" label="Localidad"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.PROVINCIA" label="Provincia"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.PAIS" label="Pais"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field v-model="user.MOVIL" type="number" label="Movil"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.FIJO" type="number" label="Fijo"></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field v-model="user.EMAIL" label="Email"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">
                                    <div>Edad:</div>
                                    <v-select :items="Edad" v-model="user.EDAD" label="Edad" solo></v-select>
                                </v-col>
                                <v-col cols="3">
                                    <div>Sola:</div>
                                    <v-select :items="Sola" v-model="user.SOLA" label="Sola" solo></v-select>
                                </v-col>
                                <v-col cols="3">
                                    <div>Mayor:</div>
                                    <v-select :items="Mayor" v-model="user.MAYOR" label="Mayor" solo></v-select>
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field v-model="user.TEFILA" label="Tefilá"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="user.OBSERVACIONES" label="Observaciones"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="dialog = false">
                            Cancelar
                        </v-btn>
                        <v-btn color="blue darken-1" type="submit" text> Guardar </v-btn>
                    </v-card-actions>
                </v-form>

                <!-- <v-form v-else @submit.prevent="agregarProducto"> -->
            </v-card>
        </v-dialog>
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

    export default {
        name: "CrudClientes",
        components: {
            filtro,
        },
        data() {
            return {
                loading: false,
                users: [],
                columnas: [
                    //EDITAR INFORMACION
                    {
                        text: "ID",
                        value: "ID",
                        class: "Header_Tabla",
                        width: "50px"
                    },
                    {
                        text: "NUMERO DE SOCIO",
                        value: "NUM_SOCIO",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "SOCIO",
                        value: "SOCIO",
                        class: "Header_Tabla",
                        filter: this.socioFilter,
                        width: "70px",
                    },
                    {
                        text: "NOMBRE",
                        value: "NOMBRE",
                        class: "Header_Tabla p-0",
                        filter: this.nameFilter,
                        width: "150px",
                    },
                    {
                        text: "APELLIDO 1",
                        value: "APELLIDO_1",
                        class: "Header_Tabla p-0",
                        filter: this.apellidoFilter,
                        width: "150px",
                    },
                    {
                        text: "APELLIDO 2",
                        value: "APELLIDO_2",
                        class: "Header_Tabla p-0",
                        width: "150px",
                    },
                    {
                        text: "PARENTESCO",
                        value: "PARENTESCO",
                        class: "Header_Tabla p-0",
                        width: "150px",
                    },
                    {
                        text: "DNI",
                        value: "DNI",
                        class: "Header_Tabla p-0",
                        width: "150px",
                    },
                    {
                        text: "PD",
                        value: "PD",
                        class: "Header_Tabla p-0",
                        width: "150px"
                    },
                    {
                        text: "DIRECCION",
                        value: "DIRECCION",
                        class: "Header_Tabla p-0",
                        width: "150px",
                    },
                    {
                        text: "CODIGO POSTAL",
                        value: "COD_POSTAL",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "LOCALIDAD",
                        value: "LOCALIDAD",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "PROVINCIA",
                        value: "PROVINCIA",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "PAIS",
                        value: "PAIS",
                        class: "Header_Tabla",
                        width: "150px"
                    },
                    {
                        text: "MOVIL",
                        value: "MOVIL",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "FIJO",
                        value: "FIJO",
                        class: "Header_Tabla",
                        width: "150px"
                    },
                    {
                        text: "EMAIL",
                        value: "EMAIL",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "EDAD",
                        value: "EDAD",
                        class: "Header_Tabla",
                        width: "150px"
                    },
                    {
                        text: "SOLA",
                        value: "SOLA",
                        class: "Header_Tabla",
                        width: "150px"
                    },
                    {
                        text: "MAYOR",
                        value: "MAYOR",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "TEFILÁ",
                        value: "TEFILA",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "OBSERVACIONES",
                        value: "OBSERVACIONES",
                        class: "Header_Tabla",
                        width: "150px",
                    },
                    {
                        text: "ACCIONES",
                        value: "actions",
                        class: "Header_Tabla",
                        sortable: false,
                        width: "300px",
                    },
                ],
                //aqui van los valores pa los select
                Socio: ["SI", "NO"],
                Parentesco: ["Conyuje", "Hijos", "Padres", "Otros"],
                Pd: ["SI", "NO"],
                Edad: ["BEBE", "3-18", "19-30", "31-50", "51-70", "+71"],
                Sola: ["SI", "NO"],
                Mayor: ["SI", "NO"],
                user: {
                    ID: "",
                    NUM_SOCIO: "",
                    SOCIO: "",
                    NOMBRE: "",
                    APELLIDO_1: "",
                    APELLIDO_2: "",
                    PARENTESCO: "",
                    DNI: "",
                    PD: "",
                    DIRECCION: "",
                    COD_POSTAL: "",
                    LOCALIDAD: "",
                    PROVINCIA: "",
                    PAIS: "",
                    MOVIL: "",
                    FIJO: "",
                    EMAIL: "",
                    EDAD: "",
                    SOLA: "",
                    MAYOR: "",
                    TEFILA: "",
                    OBSERVACIONES: "",
                },
                search: "",
                //dialog y modal
                dialog: false,
                formTitle: "",
                //edicion
                isEditing: false,
                //files
                file: null,
                //opciones de la data table
                options: {
                    itemsPerPage: 100,
                },
                //variable para el filtro
                filtros: {
                    nameValue: "",
                    apellidoValue: "",
                    socioValue: "",
                },
                tablaFiltrada: [],
                //otros filtro
                nameValue: "",
                apellidoValue: "",
                socioValue: "",
                //SNACKBAR para mensajes
                snackbar: false,
                mensaje: "",
            };
        },
        props: {
            adminVerification: null,
            idHoja: null,
        },
        mounted() {
            this.getUsers(this.idHoja);
        },
        computed: {
            computedHeaders() {
                if (this.adminVerification) {
                    return this.columnas;
                    //blue-grey darken-3 white--text
                } else {
                    //filtrar Informacion
                    let columnasMod = [{
                            text: "ID",
                            value: "ID",
                            class: "Header_Tabla",
                            width: "50px"
                        },
                        {
                            text: "NUMERO DE SOCIO",
                            value: "NUM_SOCIO",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "SOCIO",
                            value: "SOCIO",
                            class: "Header_Tabla",
                            filter: this.socioFilter,
                            width: "70px",
                        },
                        {
                            text: "NOMBRE",
                            value: "NOMBRE",
                            class: "Header_Tabla p-0",
                            filter: this.nameFilter,
                            width: "150px",
                        },
                        {
                            text: "APELLIDO 1",
                            value: "APELLIDO_1",
                            class: "Header_Tabla p-0",
                            filter: this.apellidoFilter,
                            width: "150px",
                        },
                        {
                            text: "APELLIDO 2",
                            value: "APELLIDO_2",
                            class: "Header_Tabla p-0",
                            width: "150px",
                        },
                        {
                            text: "PARENTESCO",
                            value: "PARENTESCO",
                            class: "Header_Tabla p-0",
                            width: "150px",
                        },
                        {
                            text: "DNI",
                            value: "DNI",
                            class: "Header_Tabla p-0",
                            width: "150px",
                        },
                        {
                            text: "PD",
                            value: "PD",
                            class: "Header_Tabla p-0",
                            width: "150px",
                        },
                        {
                            text: "DIRECCION",
                            value: "DIRECCION",
                            class: "Header_Tabla p-0",
                            width: "150px",
                        },
                        {
                            text: "CODIGO POSTAL",
                            value: "COD_POSTAL",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "LOCALIDAD",
                            value: "LOCALIDAD",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "PROVINCIA",
                            value: "PROVINCIA",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "PAIS",
                            value: "PAIS",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "MOVIL",
                            value: "MOVIL",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "FIJO",
                            value: "FIJO",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "EMAIL",
                            value: "EMAIL",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "EDAD",
                            value: "EDAD",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "SOLA",
                            value: "SOLA",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "MAYOR",
                            value: "MAYOR",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "TEFILÁ",
                            value: "TEFILA",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                        {
                            text: "OBSERVACIONES",
                            value: "OBSERVACIONES",
                            class: "Header_Tabla",
                            width: "150px",
                        },
                    ];
                    return columnasMod;
                }
            },
        },
        methods: {
            async getUsers(id) {
                this.loading = true;
                let datos = await axios.get(url + id);
                this.users = datos.data;
                this.loading = false;
            },
            prepareEdit(item) {
                this.isEditing = true;
                this.formTitle = "Edicion del usuario " + item.Nombre;
                this.user = JSON.parse(JSON.stringify(item));
                this.dialog = true;
            },
            async addAndEditUser() {
                this.loading = true;
                this.dialog = false;
                if (!this.isEditing) {
                    this.user.ID = Number(this.users[this.users.length - 1].ID) + 1;
                    this.users.push(JSON.parse(JSON.stringify(this.user)));
                } else {
                    let index = this.users
                        .map(function (x) {
                            return x.ID;
                        })
                        .indexOf(this.user.ID);
                    this.users[index] = JSON.parse(JSON.stringify(this.user));
                    this.isEditing = false;
                }
                let datos = await axios.post(url + this.idHoja, this.users);
                this.snackbar = true;
                if (datos.data == true)
                    this.mensaje = "actualizacion ejecutada exitosamente";
                else this.mensaje = "error del sistema";
                this.resetUser();
                this.getUsers(this.idHoja); //pa que cargue en la app
                this.loading = false;
            },
            async deleteUser(ID) {
                this.loading = true;
                this.users = this.users.filter(function (obj) {
                    return obj.ID !== ID;
                });
                let datos = await axios.post(url + this.idHoja, this.users);
                this.snackbar = true;
                if (datos.data == true) this.mensaje = "Borrado ejecutado exitosamente";
                else this.mensaje = "error del sistema";
                this.loading = false;
            },
            resetUser() {
                this.user.ID = "";
                this.user.NUM_SOCIO = "";
                this.user.SOCIO = "";
                this.user.NOMBRE = "";
                this.user.APELLIDO_1 = "";
                this.user.APELLIDO_2 = "";
                this.user.PARENTESCO = "";
                this.user.DNI = "";
                this.user.PD = "";
                this.user.DIRECCION = "";
                this.user.COD_POSTAL = "";
                this.user.LOCALIDAD = "";
                this.user.PROVINCIA = "";
                this.user.PAIS = "";
                this.user.MOVIL = "";
                this.user.FIJO = "";
                this.user.EMAIL = "";
                this.user.EDAD = "";
                this.user.SOLA = "";
                this.user.MAYOR = "";
                this.user.TEFILA = "";
                this.user.OBSERVACIONES = "";
            },
            async descargar() {
                let respuesta = await axios.get("http://localhost:3000/download");
                if (respuesta.data == false) {
                    console.log("error al descargar el archivo");
                } else {
                    const link = document.createElement("a");
                    link.href = "/" + respuesta.data;
                    link.setAttribute("download", respuesta.data); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }
            },
            chooseFiles() {
                document.getElementById("fileUpload").click();
            },
            async submitFile() {
                this.file = this.$refs.file.files[0];
                if (this.file !== null) {
                    let respuesta = await axios.post("http://localhost:3000/file", {
                        name: this.file.name,
                        file: this.file.path,
                    });
                    if (respuesta.data == true) {
                        this.getUsers(this.idHoja); //pa que cargue en la app
                    } else {
                        console.log("error al subir el archivo");
                    }
                }
            },
            //descarga de filtros
            getFiltered(e) {
                this.tablaFiltrada = e;
            },
            async descargarFiltro() {
                let respuesta = await axios.post(
                    "http://localhost:3000/filter",
                    this.tablaFiltrada
                );
                if (respuesta.data == false) {
                    console.log("error al descargar el archivo");
                } else {
                    const link = document.createElement("a");
                    link.href = "/" + respuesta.data;
                    link.setAttribute("download", respuesta.data); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }
            },
            // filtros
            funcionFiltro(value) {
                this.filtros = value;
            },
            nameFilter(value) {
                if (!this.filtros.nameValue) return true;
                return value.toLowerCase().includes(this.filtros.nameValue.toLowerCase());
            },
            apellidoFilter(value) {
                if (!this.filtros.apellidoValue) return true;
                return value
                    .toLowerCase()
                    .includes(this.filtros.apellidoValue.toLowerCase());
            },
            socioFilter(value) {
                if (!this.filtros.socioValue) return true;
                return value
                    .toLowerCase()
                    .includes(this.filtros.socioValue.toLowerCase());
            },
        },
    };
</script>
<style>
    .Tabla_Principal {
        border: 5px solid red;
        min-width: 70%;
    }

    .Op-Iconos{
        width: 1750px;
        border:5px solid red;
        margin:auto;
    }

    .Op-Editar {
        border: 5px solid red;
    }

    .Op-Editar .Op {
        border: 5px solid yellow;
        height: 50px;
    }

    .Header_Tabla {
        vertical-align: middle;
        border: 1px solid black;
        background-color: #616161;
        color: white !important;
    }

    tbody tr:nth-of-type(odd) {
        background-color: rgba(112, 128, 144, 0.1);
    }

    tbody td {
        padding: auto;
        border: 0.2px solid black;
        padding: 15px;
        width: 50%;
        vertical-align: middle;
    }

    @media (max-width: 600px) {

        .Op-Editar {
            border: 5px solid yellow;
        }
    }
</style>