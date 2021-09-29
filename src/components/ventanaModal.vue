<template>
    <v-container fluid>
        <!-- ventana modal para crear/editar --> 
        <v-dialog v-model="dialog" max-width="1200px" fullscreen hide-overlay transition="dialog-bottom-transition">
      
        <v-card class="Marco_Editar">
            <br><br>
            <v-form class="mt-10" style="border:5px solid red" @submit.prevent="submitForm" v-model="valid" lazy-validation ref="form">
                <v-app-bar fixed dark color="#607D8B" >
                <v-btn icon dark @click="$emit('dialogModal',false);resetValidation()"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="filtro"> <v-btn dark text   type="submit" > <h3><v-icon class="mr-2">mdi-clipboard-text-search</v-icon>Buscar </h3></v-btn></v-toolbar-items>
                <v-toolbar-items v-else> <v-btn dark text   type="submit" > Guardar </v-btn></v-toolbar-items>
 
                </v-app-bar>
                <v-card-text class="mt-10">
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="user.NUM_SOCIO" label="Numero de socio" :rules="numSocioRules"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pt-0 mt-0">
                                <div>SOCIO:</div><!-- item-text="text" item-value="value" -->
                                <v-select :items="Socio"  v-model="user.SOCIO" label="elija si es o no socio" :rules="selectRules" outlined></v-select>
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
                                <v-text-field v-model="user.APELLIDO_2" label="Apellido 2" :rules="nameRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div>Parentesco:</div>
                                <v-select :items="Parentesco" v-model="user.PARENTESCO" label="Elegir parentesco" :rules="selectRules" outlined>
                                </v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.DNI" label="DNI" :rules="dniRules"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <div>PD:</div>
                                <v-select :items="Pd" v-model="user.PD" label="Elegir PD" :rules="selectRules" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento:" v-model="user.FECHA_NACIMIENTO" min="1950-01-01" :rules="FechaRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento(hebreo):" v-model="user.FECHA_NACIMIENTO_HEBREO" :rules="FechaRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento:" v-model="user.FECHA_CASAMIENTO" :rules="FechaRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento(hebreo):" v-model="user.FECHA_CASAMIENTO_HEBREO" :rules="FechaRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción:" v-model="user.FECHA_DEFUNCION" :rules="FechaRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción(hebreo):" v-model="user.FECHA_DEFUNCION_HEBREO" :rules="FechaRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field v-model="user.DIRECCION" label="Direccion" :rules="direccionRules"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field v-model="user.COD_POSTAL" label="Codigo postal" :rules="codPostalRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.LOCALIDAD" label="Localidad" :rules="localidadRules"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PROVINCIA" label="Provincia" :rules="provinciaRules"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PAIS" label="Pais" :rules="provinciaRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.MOVIL" type="number" label="Movil" :rules="telefonoRules"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.FIJO" type="number" label="Fijo" :rules="telefonoRules"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.EMAIL" label="Email" :rules="emailRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <div>Edad:</div>
                                <v-select :items="Edad" v-model="user.EDAD" label="Elegir Edad" :rules="selectRules" outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <div>Sola:</div>
                                <v-select :items="Sola" v-model="user.SOLA" label="Elegir Sola" :rules="selectRules" outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <div>Mayor:</div>
                                <v-select :items="Mayor" v-model="user.MAYOR" label="Elegir Mayor" :rules="selectRules" outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="user.TEFILA" label="Tefilá" :rules="direccionRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12"><!-- Observaciones -->
                                <v-text-field v-model="user.OBSERVACIONES" label="Observaciones" :rules="observacionesRules"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="token=='adminToken'||isEditing==false">
                            <!-- cuotas -->
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuotas:</h4>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-select :items="Cuotas" v-model="cuotaSelect.simbolo" label="Elegir moneda" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaSelect.value" :rules="cuotaRules" label="Digite una cuota">
                                            <template slot="append">
                                                <div class="font-weight-black">{{computedCuotaSimbol}}</div>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <!-- cuota liceo -->
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuota liceo:</h4>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-select :items="CuotaLiceo" v-model="cuotaLiceoSelect.simbolo" label="Elegir moneda"  outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaLiceoSelect.value" :rules="cuotaRules" label="Digite la Cuota liceo">
                                            <template slot="append">
                                                <div class="font-weight-black">{{computedCuotaLiceoSimbol}}</div>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <!-- forma de pago -->
                            <v-col cols="2">
                                <div>Forma de pago:</div>
                                <v-select :items="FormaPago" v-model="user.FORMA_PAGO" label="Elegir Forma de pago" :rules="selectRules" outlined></v-select>
                            </v-col>
                            <!-- jessed -->
                            <v-col cols="2" >
                                <div>Jessed:</div>
                                <v-select :items="Jessed" v-model="user.JESED" label=" Jessed" :rules="selectRules" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row v-if="token=='adminToken'||isEditing==false">
                            <v-col cols="12">
                                <v-text-field v-model="user.OBSERVACIONES2" label="Observaciones 2" :rules="observacionesRules"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

            </v-form>

            <!-- <v-form v-else @submit.prevent="agregarProducto"> -->
        </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name:'ventanaModal',
    data() {
        return {
            Socio:['SI','NO'],
            //Socio:[{text:'elegir', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Parentesco:['Conyuje','Hijos','Padres','Otros'],
            Pd:['SI','NO'],
            Edad:['BEBE','3-18','19-30','31-50','51-70','+71'],
            Sola:['SI','NO'],
            Mayor:['SI','NO'],
            Cuotas:[{text:'Euro', value:'€'},{text:'Dolar', value:'$'},{text:'Shekel', value:'₪'}],
            CuotaLiceo:[{text:'Euro', value:'€'},{text:'Dolar', value:'$'},{text:'Shekel', value:'₪'}],
            cuotaSelect:{simbolo:'$', value:''},
            cuotaLiceoSelect:{simbolo:'$', value:''},
            FormaPago:['CAJA','BANCO','TARJETA','PAYPAL','OTROS'],
            Jessed:['SI','NO'],
            //reglas del form
            valid: true,
            selectRules:[v=>!!v || 'Porfavor elija una opcion',],
            numSocioRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^[A-Za-z0-9]+$/.test(v) || 'Solo se aceptan caracteres alfanumericos sin espacios',
                v => (v && v.length <= 6) || 'numero de socio debe ser menor o igual a 6 caracteres'
            ],
            nameRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                // v => /^[A-Za-z ]+$/.test(v) || 'Solo se aceptan caracteres alfabeticos',
                v => /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/.test(v) || 'Solo se aceptan caracteres alfabeticos',
                v => (v && v.length <= 45) || 'el numero de caracteres maximos permitidos es 45'
            ],
            dniRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^[0-9]{8,8}[A-Za-z]$/.test(v) || 'el campo debe ser de tipo dni(8 dígitos y una letra)',
                v => (v && v.length <= 45) || 'el numero de caracteres maximos permitidos es 45'
            ],
            FechaRules:[
                v=>!!v || 'elija una Fecha valida (mes/dia/año)',
                // v => (v && new Date(v).getTime() <= new Date(v).getTime('1950-01-01')) || 'la fecha que intentas añadir es muy antigua'
            ],
            direccionRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => (v && v.length <= 90) || 'el numero de caracteres maximos permitidos es 90'
            ],
            codPostalRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /\b\d{5}\b/.test(v) || 'escriba un codigo postal valido(5 numeros)',
            ],
            localidadRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => (v && v.length <= 35) || 'el numero de caracteres maximos permitidos es 35'
            ],
            provinciaRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/.test(v) || 'valor no valido',
                v => (v && v.length <= 35) || 'el numero de caracteres maximos permitidos es 35'
            ],
            telefonoRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'telefono no valido',
                v => (v && v.length <= 20) || 'el numero de caracteres maximos permitidos es 20'
            ],
            emailRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'digite un email valido (name@mail.com)',
                v => (v && v.length <= 80) || 'el numero de caracteres maximos permitidos es 80'
            ],
            observacionesRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => (v && v.length <= 280) || 'el numero de caracteres maximos permitidos es 280'
            ],
            cuotaRules:[
                v=>!!v || 'Este campo no puede estar vacio',
                v => /^[0-9]*$/.test(v) || 'escriba un valor valido',
                v => (v && v.length <= 30) || 'el numero de caracteres maximos permitidos es 30'
            ],

        }
    },
    props:{
        dialog:null,
        user:null,
        formTitle:null,
        filtro:null,
        isEditing:null
    },
    watch: {
        dialog: {
            handler(dial) {
                if (dial) {
                    this.resetCuota(this.cuotaSelect)
                    this.resetCuota(this.cuotaLiceoSelect)
                    if (this.user.CUOTAS!='') {
                        this.cuotaSelect.simbolo=this.user.CUOTAS[0]
                        this.cuotaSelect.value=this.user.CUOTAS.slice(1)
                    }
                    if (this.user.CUOTA_LICEO!='') {
                        this.cuotaLiceoSelect.simbolo=this.user.CUOTA_LICEO[0]
                        this.cuotaLiceoSelect.value=this.user.CUOTA_LICEO.slice(1)
                    }
                     if (this.formTitle=='Agregar cliente' && this.dialog)  this.$nextTick(() => this.$refs.form.reset());
                      
                }
                
            },
            deep: true,
            immediate: true,
        }
    },
    computed:{
        ...mapGetters([
            'token',
            'username'
        ]),
        computedCuotaSimbol(){   
            return this.cuotaSelect.simbolo
        },
        computedCuotaLiceoSimbol(){            
            return this.cuotaLiceoSelect.simbolo
        }
    },

    methods:{
        resetValidation () {
            this.$refs.form.resetValidation()
        },
        resetForm () {
            // this.$refs.form.reset()
            if (this.$refs[form]) {
                this.$refs.form.reset();
            }
        },
        resetCuota(cuota){
            cuota.simbolo='$'
            cuota.value=''
        },
        submitForm(){
            if (this.$refs.form.validate()==true) {
                if (this.cuotaSelect.value!='') this.user.CUOTAS=this.cuotaSelect.simbolo+this.cuotaSelect.value
                if (this.cuotaLiceoSelect.value!='') this.user.CUOTA_LICEO=this.cuotaLiceoSelect.simbolo+this.cuotaLiceoSelect.value
                this.resetCuota(this.cuotaSelect)
                this.resetCuota(this.cuotaLiceoSelect)
                this.$emit('agregarModal',this.user)
            }else{
                
            }
        },
        
    }
}
</script>
<style >
    
    .Marco_Editar{
        border:5px solid red;
    }

    .override-class  {
        display: inline-block;
        width: 100px;
    }
</style>