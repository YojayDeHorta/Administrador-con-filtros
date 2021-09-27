<template>
    <v-container fluid>
        <!-- ventana modal para crear/editar --> 
        <v-dialog v-model="dialog" max-width="1200px" fullscreen hide-overlay transition="dialog-bottom-transition">
      
        <v-card class="Marco_Editar">
            <v-form @submit.prevent="submitForm">
                <v-app-bar fixed dark color="primary" >

                <v-btn icon dark @click="$emit('dialogModal',false)"><v-icon>mdi-close</v-icon></v-btn>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items v-if="filtro"> <v-btn dark text   type="submit" > añadir filtros </v-btn></v-toolbar-items>
                <v-toolbar-items v-else> <v-btn dark text   type="submit" > Guardar </v-btn></v-toolbar-items>
 
                </v-app-bar>
                
                <v-card-text class="mt-14">
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="user.NUM_SOCIO" label="Numero de socio"></v-text-field>
                            </v-col>
                            <v-col cols="6" class="pt-0 mt-0">
                                <div>SOCIO:</div><!-- item-text="text" item-value="value" -->
                                <v-select :items="Socio"  v-model="user.SOCIO" label="Socio" solo></v-select>
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
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento:" v-model="user.FECHA_NACIMIENTO"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de nacimiento(hebreo):" v-model="user.FECHA_NACIMIENTO_HEBREO"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento:" v-model="user.FECHA_CASAMIENTO"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de casamiento(hebreo):" v-model="user.FECHA_CASAMIENTO_HEBREO"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción:" v-model="user.FECHA_DEFUNCION"></v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field type="date" label="Fecha de defunción(hebreo):" v-model="user.FECHA_DEFUNCION_HEBREO"></v-text-field>
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
                            <v-col cols="12"><!-- Observaciones -->
                                <v-text-field v-model="user.OBSERVACIONES" label="Observaciones"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <!-- cuotas -->
                            <v-col cols="4">
                                <v-row>
                                    <v-col cols="2" class="text-center">
                                        <h4>Cuotas:</h4>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-select :items="Cuotas" v-model="cuotaSelect.simbolo" :label="cuotaSelect.simbolo" solo></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaSelect.value" label="Digite una cuota">
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
                                        <v-select :items="CuotaLiceo" v-model="cuotaLiceoSelect.simbolo" :label="cuotaLiceoSelect.simbolo" solo></v-select>
                                    </v-col>
                                    <v-col cols="6" >
                                        <v-text-field v-model="cuotaLiceoSelect.value" label="Digite la Cuota liceo">
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
                                <v-select :items="FormaPago" v-model="user.FORMA_PAGO" label="Forma de pago" solo></v-select>
                            </v-col>
                            <!-- jessed -->
                            <v-col cols="2" >
                                <div>Jessed:</div>
                                <v-select :items="Jessed" v-model="user.JESED" label="Jessed" solo></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="user.OBSERVACIONES2" label="Observaciones 2"></v-text-field>
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
        }
    },
    props:{
        dialog:null,
        user:null,
        formTitle:null,
        filtro:null,
    },
    computed:{
        computedCuotaSimbol(){    
            if(this.dialog){
                this.resetCuota(this.cuotaSelect)
                this.resetCuota(this.cuotaLiceoSelect)
            }      
            if (this.user.CUOTAS!='') {
                this.cuotaSelect.simbolo=this.user.CUOTAS[0]
                this.cuotaSelect.value=this.user.CUOTAS.slice(1)
            }
            return this.cuotaSelect.simbolo
        },
        computedCuotaLiceoSimbol(){            
            if (this.user.CUOTA_LICEO!='') {
                this.cuotaLiceoSelect.simbolo=this.user.CUOTA_LICEO[0]
                this.cuotaLiceoSelect.value=this.user.CUOTA_LICEO.slice(1)
            }
            return this.cuotaLiceoSelect.simbolo
        }
    },
    methods:{
        resetCuota(cuota){
            cuota.simbolo='$'
            cuota.value=''
        },
        submitForm(){
            if (this.cuotaSelect.value!='') {
                this.user.CUOTAS=this.cuotaSelect.simbolo+this.cuotaSelect.value
            }
            if (this.cuotaLiceoSelect.value!='') {
                this.user.CUOTA_LICEO=this.cuotaLiceoSelect.simbolo+this.cuotaLiceoSelect.value
            }
            
            this.resetCuota(this.cuotaSelect)
            this.resetCuota(this.cuotaLiceoSelect)
            if (this.filtro) {
                this.$emit('agregarModal',this.user)
            }else{
                this.$emit('agregarModal',this.user)
            }
        },
        
    }
}
</script>
<style >
    .override-class  {
        display: inline-block;
        width: 100px;
    }
</style>