<template>
    <v-container fluid>
        <!-- ventana modal para crear/editar --> 
        <v-dialog v-model="dialog" max-width="1200px" fullscreen hide-overlay transition="dialog-bottom-transition" persistent>
      
        <v-card class="Marco_Editar">
            <br><br>
            <v-form class="mt-10" style="border:5px solid red" @submit.prevent="submitForm" v-model="valid" lazy-validation ref="form" >
                <v-app-bar fixed dark color="#607D8B" >
                <v-btn icon dark @click="$emit('dialogModal',false);resetValidation()"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title class="text-capitalize">{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="filtro"> <v-btn dark text   type="submit" > <h3 class="text-capitalize"><v-icon class="mr-2">mdi-account-search</v-icon>Buscar </h3></v-btn></v-toolbar-items>
                <v-toolbar-items v-else> <v-btn dark text   type="submit" > Guardar </v-btn></v-toolbar-items>
 
                </v-app-bar>
                <v-card-text class="mt-10">
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="user.NUM_SOCIO" label="Filtrar por Numero de socio" ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pt-0 mt-0">
                                <div> Socio:</div><!-- item-text="text" item-value="value" -->
                                <v-select item-text="text" item-value="value" :items="Socio"  v-model="user.SOCIO" label="Elegir filtro"  outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.NOMBRE" label="Filtrar por Nombre" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.APELLIDO_1" label="Filtrar por Apellido 1" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.APELLIDO_2" label="Filtrar por Apellido 2" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div>Parentesco:</div>
                                <v-select item-text="text" item-value="value" :items="Parentesco" v-model="user.PARENTESCO" label="Elegir filtro"  outlined>
                                </v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.DNI" label="Filtrar por DNI" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <div>PD:</div>
                                <v-select item-text="text" item-value="value" :items="Pd" v-model="user.PD" label="Elegir filtro" outlined></v-select>
                            </v-col>
                        </v-row>
                        <!-- filtro de las fechas -->
                        <v-row>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_NACIMIENTO" label="filtro para el nacimiento" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="fecha de nacimiento" v-model="user.FECHA_NACIMIENTO" min="1900-01-01" ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_NACIMIENTO_HEBREO" label="filtro, nacimiento (hebreo)" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="Fecha de nacimiento(hebreo):" v-model="user.FECHA_NACIMIENTO_HEBREO" min="1900-01-01" ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_CASAMIENTO" label="filtro para el casamiento" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="Fecha de casamiento:" v-model="user.FECHA_CASAMIENTO" min="1900-01-01" > </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_CASAMIENTO_HEBREO" label="filtro, casamiento (hebreo)" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="Fecha de casamiento(hebreo):" v-model="user.FECHA_CASAMIENTO_HEBREO" min="1900-01-01" ></v-text-field>          
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_DEFUNCION" label="filtro para el defunción" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="Fecha de defunción:" v-model="user.FECHA_DEFUNCION" min="1900-01-01" ></v-text-field> 
                                    </v-col>
                                </v-row>
                            </v-col>
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="6" >
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.FECHA_DEFUNCION_HEBREO" label="filtro, defunción (hebreo)" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field type="date" label="Fecha de defunción(hebreo):" v-model="user.FECHA_DEFUNCION_HEBREO" min="1900-01-01" ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field v-model="user.DIRECCION" label="Filtrar por Direccion" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field v-model="user.COD_POSTAL" label="Filtrar por Codigo postal" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.LOCALIDAD" label="Filtrar por Localidad" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PROVINCIA" label="Filtrar por Provincia" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PAIS" label="Filtrar por Pais" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.MOVIL" type="number" label="Filtrar por Movil" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.FIJO" type="number" label="Filtrar por Fijo" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.EMAIL" label="Filtrar por Email" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <div>Edad:</div>
                                <v-select item-text="text" item-value="value" :items="Edad" v-model="user.EDAD" label="Elegir filtro"  outlined></v-select>
                            </v-col>
                            <v-col cols="2">
                                <div>Sola:</div>
                                <v-select item-text="text" item-value="value" :items="Sola" v-model="user.SOLA" label="Elegir filtro"  outlined></v-select>
                            </v-col>
                            <v-col cols="2">
                                <div>Mayor:</div>
                                <v-select item-text="text" item-value="value" :items="Mayor" v-model="user.MAYOR" label="Elegir filtro"  outlined></v-select>
                            </v-col>
                            
                            <v-col cols="6">
                                <v-text-field v-model="user.TEFILA" label="Filtrar por Tefilá" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12"><!-- Observaciones -->
                                <v-text-field v-model="user.OBSERVACIONES" label="Observaciones" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="token=='adminToken'">
                            <!-- cuotas -->
                            
                            <v-col cols="6">
                                <v-row>  
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuotas:</h4>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.CUOTAS" label="Elegir filtro, cuotas" outlined></v-select>
                                    </v-col>
                                    <v-col cols="3" >
                                        <v-select item-text="text" item-value="value" :items="Cuotas" v-model="cuotaSelect.simbolo" label="Elegir moneda"  outlined></v-select>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-text-field v-model="cuotaSelect.value"  label="Digite una cuota">
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
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuota liceo:</h4>
                                    </v-col>
                                    <v-col cols="3">
                                        <v-select :items="Simbolos"  item-text="text" item-value="value" v-model="SimbolosSelect.CUOTA_LICEO" label="Elegir filtro, cuota liceo" outlined></v-select>
                                    </v-col>
                                    <v-col cols="3" >
                                        <v-select item-text="text" item-value="value" :items="CuotaLiceo" v-model="cuotaLiceoSelect.simbolo" label="Elegir moneda"  outlined></v-select>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-text-field v-model="cuotaLiceoSelect.value"  label="Digite la Cuota liceo">
                                            <template slot="append">
                                                <div class="font-weight-black">{{computedCuotaLiceoSimbol}}</div>
                                            </template>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                            </v-col>
                            
                        </v-row>
                        <v-row v-if="token=='adminToken'">
                            <!-- jessed -->
                            <v-col cols="2" >
                                <div>Jessed:</div>
                                <v-select item-text="text" item-value="value" :items="Jessed" v-model="user.JESED" label=" Elegir filtro"  outlined></v-select>
                            </v-col>
                            <!-- forma de pago -->
                            <v-col cols="2">
                                <div>Forma de pago:</div>
                                <v-select item-text="text" item-value="value" :items="FormaPago" v-model="user.FORMA_PAGO" label="Elegir filtro"  outlined></v-select>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field v-model="user.OBSERVACIONES2" label="Observaciones 2" ></v-text-field>
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
            Socio:[{text:'ninguno', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Parentesco:[{text:'ninguno', value:''},{text:'Conyuje', value:'Conyuje'},{text:'Hijos', value:'Hijos'},{text:'Padres', value:'Padres'},{text:'Otros', value:'Otros'}],
            Pd:[{text:'ninguno', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Edad:[{text:'ninguno', value:''},{text:'BEBE', value:'BEBE'},{text:'3-18', value:'3-18'},{text:'19-30', value:'19-30'},{text:'31-50', value:'31-50'},{text:'51-70', value:'51-70'},{text:'+71', value:'+71'}],
            Sola:[{text:'ninguno', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Mayor:[{text:'ninguno', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            Cuotas:[{text:'Euro', value:'€'},{text:'Dolar', value:'$'},{text:'Shekel', value:'₪'}],
            CuotaLiceo:[{text:'Euro', value:'€'},{text:'Dolar', value:'$'},{text:'Shekel', value:'₪'}],
            cuotaSelect:{simbolo:'$', value:''},
            cuotaLiceoSelect:{simbolo:'$', value:''},
            FormaPago:[{text:'ninguno', value:''},{text:'CAJA', value:'CAJA'},{text:'BANCO', value:'BANCO'},{text:'TARJETA', value:'TARJETA'},{text:'PAYPAL', value:'PAYPAL'},{text:'OTROS', value:'OTROS'}],
            Jessed:[{text:'ninguno', value:''},{text:'SI', value:'SI'},{text:'NO', value:'NO'}],
            //simbolos
            Simbolos:[{text:'ninguno', value:''},{text:'mayores a', value:'>'},{text:'menores a', value:'<'},{text:'igual a', value:'='}],
            CuotaFiltro:[{text:'ninguno', value:''},{text:'mayores a', value:'>'},{text:'menores a', value:'<'},{text:'igual a', value:'='}],
            SimbolosSelect:{
                FECHA_NACIMIENTO: '',
                FECHA_NACIMIENTO_HEBREO: '',
                FECHA_CASAMIENTO: '',
                FECHA_CASAMIENTO_HEBREO: '',
                FECHA_DEFUNCION: '',
                FECHA_DEFUNCION_HEBREO: '',
                CUOTAS: '',
                CUOTA_LICEO: '',
            },
            //reglas del form
            valid: true,
            selectRules:[v=>!!v || 'Porfavor elija una opcion',],
            
            FechaRules:[
                v=>!!v || 'elija una Fecha valida',
                // v => (v && new Date(v).getTime() <= new Date(v).getTime('1900-01-01')) || 'la fecha que intentas añadir es muy antigua'
            ]

        }
    },
    props:{
        dialog:null,
        user:null,
        formTitle:null,
        filtro:null,
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
                    if (this.formTitle=='Agregar cliente') this.resetForm()   
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
            if (this.$refs[form]) {
                this.$refs.form.reset();
            }
            // this.$refs.form.reset()
        },
        resetCuota(cuota){
            cuota.simbolo='$'
            cuota.value=''
        },
        submitForm(){
            if (this.cuotaSelect.value!='') this.user.CUOTAS=this.cuotaSelect.simbolo+this.cuotaSelect.value
            if (this.cuotaLiceoSelect.value!='') this.user.CUOTA_LICEO=this.cuotaLiceoSelect.simbolo+this.cuotaLiceoSelect.value
            this.resetCuota(this.cuotaSelect)
            this.resetCuota(this.cuotaLiceoSelect)
            this.$emit('simbolos',this.SimbolosSelect)
            this.$emit('agregarModal',this.user)
            
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