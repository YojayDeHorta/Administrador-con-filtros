<template>
    <v-container class="mt-15" >
        <v-row>
            <v-select return-object single-line :items="computedHeaders" v-model="select"  item-text="text" item-value="value" label="Buscar Categoria" ></v-select>
            <v-col >
                <v-btn v-if="select!=null" @click="addSelect()" class="btn-2" width="150" >Añadir Filtro</v-btn>
            </v-col>
        </v-row>
            <v-row v-if="headerFiltro[2].validador">
                <v-col cols="8" > 
                    <div>SOCIO:</div>
                    <v-select :items="Socio" v-model="filtros.socioValue" label="Socio" solo></v-select>
                </v-col>
                <v-col cols="4" >
                    <v-btn class="btn-3" @click="filtros.socioValue='';headerFiltro[2].validador=false" depressed color="error">Borrar Filtro</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="headerFiltro[3].validador" >
                <v-col cols="8" > 
                    <v-text-field label="nombre" v-model="filtros.nameValue" append-icon="mdi-text-box-search"></v-text-field>
                </v-col>
                <v-col cols="4" >
                    <v-btn class="btn-3" @click="filtros.nameValue='';headerFiltro[3].validador=false" depressed color="error">Borrar Filtro</v-btn>
                </v-col>
            </v-row>
            <v-row v-if="headerFiltro[4].validador">
                <v-col cols="8" > 
                    <v-text-field label="apellido 1" v-model="filtros.apellidoValue" append-icon="mdi-text-box-search"></v-text-field>
                </v-col>
                <v-col cols="4" >
                    <v-btn class="btn-3" @click="filtros.apellidoValue='';headerFiltro[4].validador=false" depressed color="error">Borrar Filtro</v-btn>
                </v-col>
            </v-row>
            
        
    </v-container>
</template>

<script>
export default {
    name:'filtro',
    data: () => ({
        select:null,
        headerFiltro:[],
        count:1,
        //aqui van los valores pa los select
        Socio:['','SI','NO'],
        Parentesco:['Conyuje','Hijos','Padres','Otros'],
        Pd:['SI','NO'],
        Edad:['BEBE','3-18','19-30','31-50','51-70','+71'],
        Sola:['SI','NO'],
        Mayor:['SI','NO'],
        //filtros
        filtros:{
            nameValue:'',
            apellidoValue:'',
            socioValue:'',  
        },
    }),
    watch:{
        filtros: {
            handler: function (val, oldVal) {
                this.$emit('filtro',this.filtros)
            },
            deep: true 
        }
    },props:{
        header:null
    },
    computed:{
        computedHeaders(){
            return this.headerFiltro.filter(function(filtro) {return !filtro.validador})
        }
    },
    methods: {
        addSelect(){
            this.headerFiltro[this.select.index].validador=true
            this.select=null
            
        }
    },created(){
        
        this.headerFiltro=this.header.map((header,index)=>{
            header.validador=false
            header.index=index
            return header
        })
        console.log(this.headerFiltro);
    }
    
}

</script>




