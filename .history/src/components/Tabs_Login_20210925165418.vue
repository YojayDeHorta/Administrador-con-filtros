<template>
    <div class="Marco text-center">
        <h1 class="Titulo text-center font-weight-bold text-h2 basil--text">
            BIENVENIDO<br>
            <v-icon class="Filtrar" style="font-size:100px">mdi-account-circle</v-icon>
        </h1>
        <section class="Marco-Login d-flex justify-center">
            <!--
            <v-card class="form-login" height="400px" style="width:400px">
            -->
            <v-form class="form-login text-center" @submit.prevent="submitAdmin">
                <v-card-title class="title d-flex justify-center" align="center">
                    <h2 style="width:200px" class="Titulo text-center mt-5">Iniciar Sesión</h2>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <br>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field prepend-icon="mdi-account" label="Usuario"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field type="password" prepend-icon="mdi-lock-outline" label="Contraseña">
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions class="d-flex justify-center">
                    <!--
                                         <v-btn x-large color="primary" type="submit"> Ingresar </v-btn>
                                    -->

                    <router-link to="/options">Ingresar</router-link>



                </v-card-actions>
            </v-form>
            <!--
            </v-card>
        -->
        </section>

    </div>
</template>
<style>
    .title-item.active {
        color: black;
    }

    .Titulo {
        /*border: 5px solid red;
        margin: auto;
        width: 100%;
    }

    .Marco {
        border: 5px solid black;
        width: 50%;
        margin: auto;
        /*background-color: grey;*/
    }

    .form-login {
        border: 5px solid red;
        width: 400px;
    }


    .Marco-Login {
        border: 4px solid yellow;
        margin: auto;
    }



    .Elemento-Tab {
        /*border: 5px solid yellow;*/
        margin: auto;
        width: 30%;
    }

    /*
.elemento{
    border: 5px solid red;
    margin: auto;
    width: 30%;
}

/*
.Elemento-Tab{
    border: 5px solid yellow;
}*/
</style>
<script>
    import Login from '../components/Login.vue';

    //import Sign from '../components/Registro.vue';
    export default {
        components: {
            Login,

        },
        data() {
            return {
                tab: null,
                num: 2,
                items: [
                    'Inicio Sesion', 'Registro'
                ]
            }
        }
    }
</script>