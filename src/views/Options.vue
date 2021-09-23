<template>
    <v-container>
        <h1 class="text-center">Opciones</h1>
        <br> <br> <br>
        <section class="Opciones d-flex justify-content-center mt-10">
            <router-link class="Editar" to="/Cruds">
                <v-icon class="Filtrar">mdi-clipboard-edit</v-icon>
                <p class="text-center">Editar</p>
            </router-link>
            <router-link class="Buscar" to="/Filter">
                <v-icon class="Filtrar">mdi-clipboard-search</v-icon>
                <p class="text-center">Filtrar</p>
            </router-link>
        </section>
    </v-container>
</template>
<script>
export default {

}
</script>
<style scoped>
p {
    font-size: 100px;
}

.Filtrar {
    display:flex;
    align-content:center;
    font-size: 250px;
    color: black;
}


.filtrar {
    border: 5px solid black;

}


h1 {
    font-size: 100px
}

.Opciones router-link {
    /* border: 5px solid red;*/

}


.Editar,
.Buscar {
    margin-left: 50px;
    color: black;
    text-decoration: none;
    /*border: 5px solid red;*/
    width: 38%;
    height:420px;
    padding: 20px;
}

.Editar:hover,
.Buscar:hover {
    border:2px solid grey;
}
</style>