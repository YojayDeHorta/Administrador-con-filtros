<template>
    <v-container class="mt-15" >
        <v-row>
                <v-col >
                    <v-btn class="btn-2" width="150" v-if="count<headerFilter.length" @click="count++" depressed color="secondary">
                        Añadir Filtro
                    </v-btn>
                </v-col>
                <v-col >
                    <v-btn class="btn-3" v-if="count!=1"  @click="deleteFiltro()" depressed color="error">
                        Borrar ultimo Filtro
                    </v-btn>
                </v-col>
        </v-row>
        <div v-for="(item,index) in count" :key="index">
            <div>
            <v-row>
                <v-col cols="6" >
                    <v-select persistent-hint :hint="`se ha elegido  ${select[index].text}`" return-object single-line :items="computedHeader" v-model="select[index]" @change="addSelect(index)" item-text="text" item-value="value" label="Buscar Categoria" ></v-select>
                </v-col>
                 <v-col cols="6" > <!--@input="buscar(index,value)" -->
                    <v-text-field  v-if="select[index].isShow" v-model="propiedades[`${select[index].value}`]" :label="'Buscar en '+select[index].text"  append-icon="mdi-text-box-search"></v-text-field>
                    <div>{{select[index].value}}</div>
                    <div>{{index}}</div>
                    <div>{{item}}</div>
                </v-col>
            </v-row>
            </div>
        </div>
        
    </v-container>
</template>

<script>
import { json } from 'express';
export default {
    name:'filtro',
    data: () => ({
        select:[
           
        ],
        selectCopy: [],
        items: ['ID', 'NOMBRE', 'APELLIDO', 'TIPO CLIENTE', 'DIRECCION'],
        headerFilter:[],
        bodyFilter:[],
        count:1,
        //filtros
        nombre:'',
        propiedades:{Id:'',Nombre:'a'}
    })
    ,props:{
        header:null,
        body:null,
    }
    ,watch: {
        nombre: {
            handler(val){
                console.log(val);
                
            },
            deep: true
        },
        'propiedades.Nombre':{
            handler(val){
                console.log(val);
                this.bodyFilter=this.body.filter(function(user) {
                    return user.Nombre.toUpperCase().includes(val.toUpperCase());
                })
                this.$emit('filtro',this.bodyFilter)
            },
            deep: true
        },
        'propiedades.Id':{
            handler(val){
                console.log(val);
                if(val!=''){
                    console.log('dentro');
                    this.bodyFilter=this.body.filter(function(user) {
                        return val==user.Id
                    })
                }else{
                    this.bodyFilter=this.body
                }
                
                this.$emit('filtro',this.bodyFilter)
            },
            deep: true
        }
    },
    computed:{
        computedHeader(){
            
            let array=this.headerFilter.filter(function(filtro) {
                 return !filtro.isShow
            })
            return array
            
        }
    },
    methods: {
        deleteFiltro(){
            this.count--;
        },
        buscar(value,index){
            console.log(value,index);
        },
        addSelect(index){
            console.log(this.select[index]); 
            if (this.selectCopy[index].value==null) {
                this.select[index].isShow=true
                this.selectCopy[index]=this.select[index]
                // this.headerFilter[index].isShow=true
            }else{
                this.selectCopy[index].isShow=false
                this.select[index].isShow=true
                this.selectCopy[index]=this.select[index]
                console.log(`'hoa`);

            }
            
        }
    },
    created(){
        console.log(this.header);

        this.header.forEach(element => {
            let object = JSON.parse(JSON.stringify(element)) 
            object.isShow=false
            this.headerFilter.push(object)
            this.select.push({ text: 'ninguno', value: null ,class:'',tipo:'' ,isShow:false})
            this.selectCopy.push({ text: 'ninguno', value: null ,class:'',tipo:'' ,isShow:false})
        });
        console.log(this.select);
    }
}

</script>




