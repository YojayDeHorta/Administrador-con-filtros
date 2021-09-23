<template>
    <v-container class="mt-10">
        <div class="Elementos">
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
                    <v-btn class="btn-2" width="150" depressed color="secondary">
                        Añadir Filtro
                    </v-btn>
                </section>
                <section class="Boton-Borde">
                    <v-btn class="btn-3" width="150"  depressed color="error">
                        Borrar Filtro
                    </v-btn>
                </section>
            </div>
        </div> 
    </v-container>
</template>

<script>
export default {
    name:'filtros',
    data: () => ({
        estado: [true, true, true, true, true],
        items: ['ID', 'NOMBRE', 'APELLIDO', 'TIPO CLIENTE', 'DIRECCION'],
    }),

    methods: {

    }
}

</script>

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