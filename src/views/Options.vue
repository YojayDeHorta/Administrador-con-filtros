<template>
    <v-container>
        <h1 class="text-center">Opciones</h1>
        <br> <br> <br>
        <section class="Opciones d-flex justify-content-center mt-10">
            <router-link class="Editar" to="/Cruds">
                <h1 class="text-center">
                    <i class="far fa-edit"></i>
                    <p>Editar</p>
                </h1>
            </router-link>
            <router-link class="Buscar" to="/Filter">
                <h1 class="text-center">
                    <i class="fas fa-search"></i>
                    <p>Filtrar</p>
                </h1>
            </router-link>
        </section>
    </v-container>
</template>
<script>
export default {

}
</script>
<style scoped>
h1 {
    font-size: 100px
}

.Opciones router-link {
   /* border: 5px solid red;*/

}


.Editar,.Buscar {
    margin-left: 50px;
    color: black;
    text-decoration: none;
    /*border: 5px solid red;*/
    width: 30%;
    padding: 20px;
}

.Editar:hover,
.Buscar:hover {
   border:2px solid black;
}




</style>