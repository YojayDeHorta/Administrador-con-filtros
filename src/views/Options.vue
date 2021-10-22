<template>
    <v-container>
        <h4 class="Titulo text-center">Opciones</h4>
        <br> 
        <div class="Opciones" v-if="$store.getters.token">
            <v-row>
                <v-col class="Opcion_1" cols="6">
                    <router-link  style="text-decoration: none; color: inherit;" class="opciones" id="agregar" to="/agregar_tabla" v-if="$store.getters.token!='conserjeToken'">
                        <p class="Letra text-center">Agregar Tabla</p>
                        <v-icon class="ico-editar">mdi-clipboard-plus</v-icon>
                    </router-link>
                </v-col>
                <v-col class="Opcion_2" cols="6">
                    <router-link  style="text-decoration: none; color: inherit;" class="opciones" id="filtrar" to="/filtrar_tabla">
                        <p class="Letra text-center">Filtrar Datos</p>
                        <v-icon class="ico-buscar">mdi-clipboard-search</v-icon>
                    </router-link>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="Opcion_3" cols="6">
                    <router-link  style="text-decoration: none; color: inherit;" class="opciones" id="editar" to="editar_tabla" v-if="$store.getters.token!='conserjeToken'">
                        <p class="Letra text-center">Editar Tabla</p>
                        <v-icon class="ico-editar">mdi-clipboard-edit</v-icon>
                    </router-link>
                </v-col>
                <v-col class="Opcion_4"  cols="6">
                    <router-link  style="text-decoration: none; color: inherit;" class="opciones" id="descargar" to="/descargar_tabla">
                        <p class="Letra text-center">Descargar Tabla</p>
                        <v-icon class="ico-buscar">mdi-clipboard-flow</v-icon>
                    </router-link>
                </v-col>
            </v-row>
        </div>
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
    text-decoration: none;

}


.Opciones {
    margin:auto;
    width: 70%;
    overflow: hidden;
}



.Opciones .Buscar,
.Opciones .Editar,
.Opciones .filtrar,
.Opciones .descargar {
    textDecoration: none;
    margin: 0;
    padding: 0;

}

.Opcion_1,.Opcion_2,.Opcion_3,.Opcion_4{
    margin-top:30px;
}



.ico-buscar,
.ico-editar {
    color: #424242;
    width: 100%;
    padding: 0;
    margin: 0;
    font-size: 14vw;

}

.Letra {
    font-size: 2vw;
    margin: 0;
    padding: 0;
    color: #616161;

}

.section_1 {}

.fila {
    margin: auto;
    border: 5px solid red !important;
    text-decoration: none !important;
}
</style>