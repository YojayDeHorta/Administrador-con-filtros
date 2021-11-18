<template>
    <v-container>
        <h2 class="Titulo text-center">Opciones</h2>
        <h2 class="barra"></h2>
        <br>
        <section class="Opciones text-center d-flex justify-center flex-wrap" v-if="$store.getters.token">
            <router-link class="Enlace" to="/Cruds" v-if="$store.getters.token!='conserjeToken'">
                <v-icon class="ico-editar">mdi-clipboard-edit</v-icon>
                <p class="Letra text-center">Editar</p>
            </router-link>
            <router-link class="Enlace" to="/Filter">
                <v-icon class="ico-buscar">mdi-clipboard-search</v-icon>
                <p class="Letra text-center">Filtrar</p>
            </router-link>
            <router-link class="Enlace" to="/argregararchivo" v-if="$store.getters.token!='conserjeToken'">
                <v-icon class="ico-agregar">mdi-clipboard-plus</v-icon>
                <p class="Letra text-center">Agregar Tabla</p>
            </router-link>
            <router-link class="Enlace" to="/cargaarchivo">
                <v-icon class="ico-cargar">mdi-clipboard-flow</v-icon>
                <p class="Letra text-center">Descargar / Cargar Tabla</p>
            </router-link>
        </section>
    </v-container>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    mounted() {
        if (!this.token) {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapGetters([
            'token',
            'username',
            'rol',
        ]),
    }
}
</script>
<style scoped>
.Titulo {
    color: #424242 !important;
    overflow: hidden;
    text-transform: uppercase;
    font-size: calc(1rem + 2vw);

}

/*
.barra {
    border: 5px solid #B0BEC5;
    margin: auto;
    width: 20%;
}*/

.Opciones {
    border: 5px solid red;
    width: 100%;
    overflow: hidden;
}


.Opciones .Enlace {
    text-decoration: none;
    width: 38%;
    margin: auto;
}


.ico-buscar,
.ico-editar,.ico-agregar,.ico-cargar {
    border: 5px solid red;
    color: #424242;
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 15vw;

}

.Letra {
    font-size: 1.5vw;
    margin: 0;
    padding: 0;
    color: #616161;
}
</style>