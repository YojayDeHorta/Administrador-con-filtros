<template>
    <div class="mt-10">
        <!--v-if="estado[i]===true"-->
        <div v-for="i in counter" align="center" v-if="i<=6">
            <div class="Elementos" :id="[`Elemento_${i}`]" v-if="estado[i-1]==true">
            	{{i}}
                <section class="d-flex justify-content-center">
                    <v-col class="Etiqueta d-flex" cols="12" sm="6">
                        <v-select :items="items" label="Buscar Categoria" dense></v-select>
                    </v-col>
                    <v-col class="Buscar d-flex" cols="12" sm="6">
                        <v-text-field label="Buscar" append-icon="mdi-text-box-search"></v-text-field>
                    </v-col>
                </section>
                <br>
                <div class="d-flex">
                    <section class="Boton-Borde">
                        <v-btn class="btn-1" width="150" hi depressed color="primary">
                            Buscar
                        </v-btn>
                    </section>
                    <section class="Boton-Borde">
                        <v-btn class="btn-2" width="150" v-on:click="Agregar(estado,i)" depressed color="secondary">
                            Añadir Filtro
                        </v-btn>
                    </section>
                    <section class="Boton-Borde">
                        <v-btn class="btn-3" width="150" v-on:click="Borrar(estado,i,counter)" depressed color="error">
                            Borrar Filtro
                        </v-btn>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.Marco {
    border: 5px solid black;
}


#elemento {
    border: 5px solid grey;
    /**/

}

.filtro {
    border: 5px solid red;


}

.Elementos {
    display: inle;
    width: 115%;
    border: 5px solid yellow;
    padding: 10px;
    margin-bottom: 5px;
    margin-left: 10px;
}


.Buscar {
    padding: 5px;
    border: 5px solid black;
    margin-left: 25px;

}

.Etiqueta {
    border: 5px solid black;
}

.Boton-Borde {
    width: 25%;
    /* border: 5px solid red;*/
    margin-left: 25px
}
</style>
<script>
/*
$(function(){
	alert("ola mundo")
})*/


export default {

    data: () => ({
        counter: 1,
        i: 0,
        estado: [true, true, true, true, true],
        items: ['ID', 'NOMBRE', 'APELLIDO', 'TIPO CLIENTE', 'DIRECCION'],
    }),


    methods: {
        Agregar(estado, i) {
            this.counter += 1;

        },

        Borrar(estado, i, counter) {
           /* if (counter !== 1) {
                estado[i] = false;
                console.log("Borrar : " + i + "estado[i] : " + estado[i])
                counter -= 1;
            }
            if(counter==1){
            	for(i in estado){
            		estado[i]=true;
            	}
            }*/

            /*if (counter > 1) {
                estado[i]=false;
                counter -=1;
                console.log("Borrar : " + i + "estado[i] : " + estado[i])*/
        }


    }


}




/*if (limite <= 4 && estado[i] == true) {

            	template: '<button v-on:click="count++">Me ha pulsado {{ count }} veces.</button>'


                /*this.counter += 1;
                estado[i] = false;
                console.log("Limite : " + limite);
                console.log("i : " + i);
            }

        },

        }
        /*
        Borrar(estado, i, counter) {
            estado[i] = false;
            if (counter > 1) {
                this.counter -= 1;
            }
            if (counter == 1) {
                estado[i] = true;
            }
            console.log("Borrar : " + i + "estado[i] : " + estado[i])
        }*/
</script>