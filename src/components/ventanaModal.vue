<template>
    <v-container fluid>
        <!-- ventana modal para crear/editar -->
        <v-dialog v-model="dialog" max-width="1200px" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
            <v-card class="Marco_Editar">
                <br><br>
                <v-form class="mt-10" @submit.prevent="submitForm" v-model="valid" lazy-validation ref="form">
                    <v-stepper v-model="e1">
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                                Name of step 1
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step :complete="e1 > 2" step="2">
                                Name of step 2
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="3">
                                Name of step 3
                            </v-stepper-step>
                            <v-divider></v-divider>
                            <v-stepper-step step="4">
                                Name of step 4
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card class="step_cuadro mb-12" color="grey lighten-5" height="320px">
                                    <v-row>
                                        <v-col cols="6">
                                            <v-text-field v-model="user.NUM_SOCIO" label="Numero De Socio" :rules="numSocioRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="6" class="pt-0 mt-3">
                                            <!--<div>SOCIO:</div> item-text="text" item-value="value" -->
                                            <v-select :items="Socio" v-model="user.SOCIO" label="¿Es Socio?" :rules="selectRules" outlined></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.NOMBRE" label="Nombre" :rules="nameRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.APELLIDO_1" label="Apellido 1" :rules="nameRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.APELLIDO_2" label="Apellido 2" :rules="apellido2Rules"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <!--
                                <div>Parentesco:</div>
                            -->
                                            <v-select :items="Parentesco" v-model="user.PARENTESCO" label="¿Parentesco?" outlined>
                                            </v-select>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.DNI_O_PASAPORTE" label="DNI/Pasaporte" :rules="DNI_O_PASAPORTERules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <!--
                                <div>PD:</div>
                            -->
                                            <v-select :items="Pd" v-model="user.PD" label="¿PD?" outlined></v-select>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 2">
                                    Continue
                                </v-btn>
                                <v-btn text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="2">
                                <v-card class="step_cuadro mb-12" color="grey lighten-5" height="350px">
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field type="date" clearable label="Fecha De Nacimiento" v-model="user.FECHA_NACIMIENTO" :rules="FechaRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field clearable label="Fecha De Nacimiento (Hebreo)" v-model="user.FECHA_NACIMIENTO_HEBREO"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field type="date" clearable label="Fecha De Casamiento" v-model="user.FECHA_CASAMIENTO" :rules="FechaRules"></v-text-field>
                                        </v-col>
                                        <v-col class="mt-5" cols="4">
                                            <v-text-field clearable label="Fecha De Casamiento (Hebreo)" v-model="user.FECHA_CASAMIENTO_HEBREO"></v-text-field>
                                        </v-col>
                                        <v-col class="mt-5" cols="4">
                                            <v-text-field type="date" clearable label="Fecha De Defunción" v-model="user.FECHA_DEFUNCION" :rules="FechaRules"></v-text-field>
                                        </v-col>
                                        <v-col class="mt-5" cols="4">
                                            <v-text-field clearable label="Fecha De Defunción (Hebreo)" v-model="user.FECHA_DEFUNCION_HEBREO"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="10">
                                            <v-text-field v-model="user.DIRECCION" label="Dirección" :rules="direccionRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-text-field v-model="user.COD_POSTAL" label="Código Postal" :rules="codPostalRules"></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 3">
                                    Continue
                                </v-btn>
                                <v-btn text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="3">
                                <v-card class="step_cuadro mb-12" color="grey lighten-5" height="480px">
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.LOCALIDAD" label="Localidad" :rules="localidadRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.PROVINCIA" label="Provincia" :rules="provinciaRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.PAIS" label="Pais" :rules="paisRules"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.MOVIL" label="Móvil" :rules="telefonoRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.FIJO" label="Fijo" :rules="fijoRules"></v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field v-model="user.EMAIL" label="Email" :rules="emailRules"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="3">
                                            <!--
                                <div>Edad:</div>
                            -->
                                            <v-select :items="Edad" v-model="user.EDAD" label="Edad" outlined></v-select>
                                        </v-col>
                                        <v-col cols="3">
                                            <!--
                                <div>Sola:</div>
                            -->
                                            <v-select :items="Sola" v-model="user.SOLA" label="¿Sola?" outlined></v-select>
                                        </v-col>
                                        <v-col cols="3">
                                            <!--
                                <div>Mayor:</div>
                            -->
                                            <v-select :items="Mayor" v-model="user.MAYOR" label="¿Mayor?" outlined></v-select>
                                        </v-col>
                                        <v-col cols="3">
                                            <v-text-field v-model="user.TEFILA" label="Tefilá" :rules="tefilaRules"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12">
                                            <!-- Observaciones -->
                                            <v-textarea no-resize height="125" outlined v-model="user.OBSERVACIONES" label="Observaciones" :rules="observacionesRules"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 4">
                                    Continue
                                </v-btn>
                                <v-btn text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>
                            <v-stepper-content step="4">
                                <v-card class="step_cuadro mb-12" color="grey lighten-5" height="300px">
                                    <v-row v-if="token=='adminToken'||isEditing==false">
                                        <!-- cuotas -->
                                        <v-col cols="4">
                                            <v-row>
                                                <v-col cols="2" class=" mt-5 text-center">
                                                    <h3>Cuotas</h3>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-select :items="Cuotas" v-model="cuotaSelect.simbolo" label="Moneda" outlined></v-select>
                                                </v-col>
                                                <v-col cols="5">
                                                    <v-text-field v-model="cuotaSelect.value" :rules="cuotaRules" label="Digite Una Cuota">
                                                        <template slot="append">
                                                            <div class="font-weight-black">{{computedCuotaSimbol}}</div>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <!-- cuota liceo -->
                                        <v-col cols="6">
                                            <v-row>
                                                <v-col cols="2" class="mt-3 text-center">
                                                    <h3>Cuota Liceo</h3>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-select :items="CuotaLiceo" v-model="cuotaLiceoSelect.simbolo" label="Elegir Moneda" outlined></v-select>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field v-model="cuotaLiceoSelect.value" :rules="cuotaRules" label="Digite La Cuota Liceo">
                                                        <template slot="append">
                                                            <div class="font-weight-black">{{computedCuotaLiceoSimbol}}</div>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <!-- forma de pago -->
                                        <v-col cols="2">
                                            <!--
                                <div>Forma de pago:</div>
                            -->
                                            <v-select :items="FormaPago" v-model="user.FORMA_PAGO" label="Elegir Forma De Pago" outlined></v-select>
                                        </v-col>
                                        <!-- jessed -->
                                    </v-row>
                                    <v-row v-if="token=='adminToken'||isEditing==false">
                                        <v-col cols="10">
                                            <v-textarea no-resize height="125" outlined v-model="user.OBSERVACIONES2" label="Observaciones 2" :rules="observacionesRules"></v-textarea>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-select :items="Jessed" v-model="user.JESED" label="Elegir Jessed" outlined></v-select>
                                        </v-col>
                                    </v-row>
                                </v-card>
                                <v-btn color="primary" @click="e1 = 1">
                                    Continue
                                </v-btn>
                                <v-btn text>
                                    Cancel
                                </v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                    </v-stepper>
                    <v-app-bar fixed dark color="#37474F">
                        <v-btn icon dark @click="$emit('dialogModal',false);resetValidation()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title class="text-capitalize">{{ formTitle }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items v-if="filtro">
                            <v-btn dark text type="submit">
                                <h3>
                                    <v-icon class="mr-2">mdi-clipboard-text-search</v-icon>Buscar
                                </h3>
                            </v-btn>
                        </v-toolbar-items>
                        <v-toolbar-items v-else>
                            <v-btn dark text type="submit">
                                <v-icon class="mr-1">mdi-content-save</v-icon>Guardar
                            </v-btn>
                        </v-toolbar-items>
                    </v-app-bar>
                </v-form>
                <!-- <v-form v-else @submit.prevent="agregarProducto"> -->
            </v-card>
        </v-dialog>
        <v-snackbar v-model="snackbar" timeout="2000">
            {{ mensaje }}
            <v-btn color="error" class="ml-5" @click="snackbar = false">cerrar</v-btn>
        </v-snackbar>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ventanaModal',
    data() {
        return {
            //SNACKBAR para mensajes
            e1: 1,
            snackbar: false,
            mensaje: '',
            Socio: ['Si', 'No'],
            Parentesco: ['Cónyuge', 'Hijos', 'Padres', 'Socio', 'Otros'],
            Pd: ['Si', 'No'],
            Edad: ['Bebé', '3-18', '19-30', '31-50', '51-70', '+71'],
            Sola: ['Si', 'No'],
            Mayor: ['Si', 'No'],
            Cuotas: [{ text: 'Euro', value: '€' }, { text: 'Dolar', value: '$' }, { text: 'Shekel', value: '₪' }],
            CuotaLiceo: [{ text: 'Euro', value: '€' }, { text: 'Dolar', value: '$' }, { text: 'Shekel', value: '₪' }],
            cuotaSelect: { simbolo: '$', value: '' },
            cuotaLiceoSelect: { simbolo: '$', value: '' },
            FormaPago: ['Caja', 'Banco', 'Tarjeta', 'Paypal', 'Otros'],
            Jessed: ['Si', 'No'],
            //reglas del form
            valid: true,
            selectRules: [v => !!v || 'Por Favor, Elija Una Opción', ],
            numSocioRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => /^[A-Za-z0-9]+$/.test(v) || 'Solo Se Aceptan Caracteres Alfanuméricos Sin Espacios',
                v => /^\S*$/.test(v) || 'Solo Se Aceptan Caracteres Sin Espacios',
                v => ((v == null) || (v == '') || v && v.length <= 7) || 'Número De Socio Debe Ser Menor O Igual A 7 Caracteres'
            ],
            nameRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => /^[A-Za-z ]+$/.test(v) || 'Solo se aceptan caracteres alfabeticos',
                v => /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(v) || 'Solo Se Aceptan Caracteres Alfabéticos',
                // v => (v && v.length <= 45) || 'El Número De Caracteres Máximos Permitidos Es 45'
            ],
            apellido2Rules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => /^[A-Za-z ]+$/.test(v) || 'Solo se aceptan caracteres alfabeticos',
                v => ((v == null) || (v == '') || /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(v)) || 'Solo Se Aceptan Caracteres Alfabéticos',
                // v => (v && v.length <= 45) || 'El Número De Caracteres Máximos Permitidos Es 45'
            ],
            DNI_O_PASAPORTERules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => /^[0-9]{8,8}[A-Za-z]$/.test(v) || 'El Campo Debe Ser De Tipo DNI_O_PASAPORTE (8 Dígitos Y Una Letra)',
                v => /^[a-zA-Z0-9]*$/.test(v) || 'DNI o Pasaporte No Valido',
                v => (((v == null) || (v == '')) || v && v.length <= 10) || 'El Número De Caracteres Máximos Permitidos Es 10'
            ],
            FechaRules: [
                v => ((v == null) || (v == '') || !!v) || 'Elija Una Fecha Válida (Mes/Día/Año)',
                // v => (v && new Date(v).getTime() <= new Date(v).getTime('1950-01-01')) || 'la fecha que intentas añadir es muy antigua'
            ],
            direccionRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => (v && v.length <= 60) || 'El Número De Caracteres Máximos Permitidos Es 60'
            ],
            tefilaRules: [
                // v => ((v == null)||(v == '')||(v && v.length <= 50)) || 'El Número De Caracteres Máximos Permitidos Es 50'
            ],
            codPostalRules: [
                v => ((v == null) || (v == '') || /^[0-9]*$/.test(v)) || 'Escriba Un Código Postal Válido',
            ],
            localidadRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => (v && v.length <= 35) || 'El Número De Caracteres Máximos Permitidos Es 35'
            ],
            provinciaRules: [
                v => /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(v) || 'Valor No Válido',
                // v => ((v == null)||(v == '')||(v && v.length <= 35)) || 'El Número De Caracteres Máximos Permitidos Es 35'
            ],
            paisRules: [
                // v=>!!v || 'Este campo no puede estar vacio',
                v => /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(v) || 'Valor No Válido',
                // v => (v && v.length <= 35) || 'El Número De Caracteres Máximos Permitidos Es 35'
            ],
            telefonoRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                v => ((v == null) || (v == '') || /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v)) || 'Teléfono No Válido',
                // v => (v && v.length <= 20) || 'El Número De Caracteres Máximos Permitidos Es 20'
            ],
            fijoRules: [
                v => ((v == null) || (v == '') || /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v)) || 'Fijo No Válido',
                // v => ((v == null)||(v == '')||(v && v.length <= 20)) || 'El Número De Caracteres Máximos Permitidos Es 20'
            ],
            emailRules: [
                v => ((v == null) || (v == '') || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v)) || 'Digite Un Email Válido (Name@Mail.Com)',
                // v => ((v == null)||(v == '')||(v && v.length <= 80)) || 'El Número De Caracteres Máximos Permitidos Es 80'
            ],
            observacionesRules: [
                // v => ((v == null)||(v == '')||(v && v.length <= 280)) || 'El Número De Caracteres Máximos Permitidos Es 280'
            ],
            cuotaRules: [
                //v=>!!v || 'Este Campo No Puede Estar Vacío',
                // v => /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?/.test(v) || 'escriba un valor valido',
                // v => /^[0-9]*$/.test(v) || 'escriba un valor valido',
                v => /^[0-9.]*$/.test(v) || 'Escriba Un Valor Válido',
                // v => (v && v.length <= 20) || 'El Número De Caracteres Máximos Permitidos Es 20'
            ],

        }
    },
    props: {
        dialog: null,
        user: null,
        formTitle: null,
        filtro: null,
        isEditing: null
    },
    watch: {
        dialog: {
            handler(dial) {
                if (dial) {
                    this.resetCuota(this.cuotaSelect)
                    this.resetCuota(this.cuotaLiceoSelect)
                    if (this.user.CUOTAS != '') {
                        this.cuotaSelect.simbolo = this.user.CUOTAS[0]
                        this.cuotaSelect.value = this.user.CUOTAS.slice(1)
                    }
                    if (this.user.CUOTA_LICEO != '') {
                        this.cuotaLiceoSelect.simbolo = this.user.CUOTA_LICEO[0]
                        this.cuotaLiceoSelect.value = this.user.CUOTA_LICEO.slice(1)
                    }
                    if (this.formTitle == 'Agregar cliente' && this.dialog) this.$nextTick(() => this.$refs.form.resetValidation());

                }

            },
            deep: true,
            immediate: true,
        }
    },
    computed: {
        ...mapGetters([
            'token',
            'username'
        ]),
        computedCuotaSimbol() {
            return this.cuotaSelect.simbolo
        },
        computedCuotaLiceoSimbol() {
            return this.cuotaLiceoSelect.simbolo
        }
    },

    methods: {
        resetValidation() {
            this.$refs.form.resetValidation()
        },
        resetForm() {
            // this.$refs.form.reset()
            if (this.$refs[form]) {
                this.$refs.form.reset();
            }
        },
        resetCuota(cuota) {
            cuota.simbolo = '$'
            cuota.value = ''
        },
        submitForm() {
            if (this.$refs.form.validate() == true) {
                if (this.cuotaSelect.value != '') this.user.CUOTAS = this.cuotaSelect.simbolo + this.cuotaSelect.value
                if (this.cuotaLiceoSelect.value != '') this.user.CUOTA_LICEO = this.cuotaLiceoSelect.simbolo + this.cuotaLiceoSelect.value
                this.resetCuota(this.cuotaSelect)
                this.resetCuota(this.cuotaLiceoSelect)
                this.$emit('agregarModal', this.user)
            } else {
                this.snackbar = true
                this.mensaje = 'Por favor verifica los datos obligatorios'
            }
        },

    }
}
</script>
<style>
.Marco_Editar {
    border: 5px solid red;
}

.override-class {
    display: inline-block;
    width: 100px;
}

.step_cuadro{
    padding: 25px;
}
</style>