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
                                <v-text-field v-model="user.NUM_SOCIO" label="Numero de socio" ></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pt-0 mt-0">
                                <div>SOCIO:</div><!-- item-text="text" item-value="value" -->
                                <v-select :items="Socio"  v-model="user.SOCIO" label="elija si es o no socio"  outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.NOMBRE" label="Nombre" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.APELLIDO_1" label="Apellido 1" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.APELLIDO_2" label="Apellido 2" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div>Parentesco:</div>
                                <v-select :items="Parentesco" v-model="user.PARENTESCO" label="Elegir parentesco"  outlined>
                                </v-select>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.DNI" label="DNI" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <div>PD:</div>
                                <v-select :items="Pd" v-model="user.PD" label="Elegir PD" outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento:" v-model="user.FECHA_NACIMIENTO" min="1950-01-01" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento(hebreo):" v-model="user.FECHA_NACIMIENTO_HEBREO" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento:" v-model="user.FECHA_CASAMIENTO" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento(hebreo):" v-model="user.FECHA_CASAMIENTO_HEBREO" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción:" v-model="user.FECHA_DEFUNCION" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción(hebreo):" v-model="user.FECHA_DEFUNCION_HEBREO" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field v-model="user.DIRECCION" label="Direccion" ></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field v-model="user.COD_POSTAL" label="Codigo postal" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.LOCALIDAD" label="Localidad" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PROVINCIA" label="Provincia" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.PAIS" label="Pais" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="user.MOVIL" type="number" label="Movil" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.FIJO" type="number" label="Fijo" ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field v-model="user.EMAIL" label="Email" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">
                                <div>Edad:</div>
                                <v-select :items="Edad" v-model="user.EDAD" label="Elegir Edad"  outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <div>Sola:</div>
                                <v-select :items="Sola" v-model="user.SOLA" label="Elegir Sola"  outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <div>Mayor:</div>
                                <v-select :items="Mayor" v-model="user.MAYOR" label="Elegir Mayor"  outlined></v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field v-model="user.TEFILA" label="Tefilá" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12"><!-- Observaciones -->
                                <v-text-field v-model="user.OBSERVACIONES" label="Observaciones" ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row v-if="token=='adminToken'">
                            <!-- cuotas -->
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuotas:</h4>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-select :items="Cuotas" v-model="cuotaSelect.simbolo" :label="cuotaSelect.simbolo" outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaSelect.value"  label="Digite una cuota">
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
                                        <v-select :items="CuotaLiceo" v-model="cuotaLiceoSelect.simbolo" :label="cuotaLiceoSelect.simbolo"  outlined></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaLiceoSelect.value"  label="Digite la Cuota liceo">
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
                                <v-select :items="FormaPago" v-model="user.FORMA_PAGO" label="Elegir Forma de pago"  outlined></v-select>
                            </v-col>
                            <!-- jessed -->
                            <v-col cols="2" >
                                <div>Jessed:</div>
                                <v-select :items="Jessed" v-model="user.JESED" label=" Jessed"  outlined></v-select>
                            </v-col>
                        </v-row>
                        <v-row v-if="token=='adminToken'">
                            <v-col cols="12">
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
            
            FechaRules:[
                v=>!!v || 'elija una Fecha valida',
                // v => (v && new Date(v).getTime() <= new Date(v).getTime('1950-01-01')) || 'la fecha que intentas añadir es muy antigua'
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
                    console.log('dialog');
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
            this.$refs.form.reset()
        },
        resetCuota(cuota){
            console.log('reset');
            cuota.simbolo='$'
            cuota.value=''
        },
        submitForm(){
            
            /*if (this.$refs.form.validate()==true) {
                

            }*/
            if (this.cuotaSelect.value!='') this.user.CUOTAS=this.cuotaSelect.simbolo+this.cuotaSelect.value
            if (this.cuotaLiceoSelect.value!='') this.user.CUOTA_LICEO=this.cuotaLiceoSelect.simbolo+this.cuotaLiceoSelect.value
            this.resetCuota(this.cuotaSelect)
            this.resetCuota(this.cuotaLiceoSelect)
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