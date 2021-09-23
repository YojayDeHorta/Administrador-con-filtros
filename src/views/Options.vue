<template>
    <v-container>
        <h1 class="Titulo text-center">Opciones</h1>
        <h2 class="barra"></h2>
        <br> <br> <br>
        <section class="Opciones text-center d-flex justify-center">
            <router-link class="Editar" to="/Cruds">
                <v-icon class="ico-editar">mdi-clipboard-edit</v-icon>
                <p class="text-center">Editar</p>
            </router-link>
            <router-link class="Buscar" to="/Filter">
                <v-icon class="ico-buscar">mdi-clipboard-search</v-icon>
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

.Titulo{
    /*border:5px solid red;*/
    font-size:90px;

}

.barra{
    border:5px solid #B0BEC5;
    margin:auto;
    width:10%;
}

.Opciones {
    /*border: 8px solid red;*/
}

.ico-buscar,.ico-editar{
   /* border:5px solid yellow;*/
     font-size:350px;
}

.Opciones .Buscar,
.Opciones .Editar {
    width: 38%;
   /* border: 5px solid red;*/
    font-size:80px;
    margin-right:50px;
    text-decoration:none;
    color:black;
}


.Editar:hover,
.Buscar:hover {
    border:2px solid grey;
}



</style>