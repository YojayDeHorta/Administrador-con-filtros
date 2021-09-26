<template>
    <div class="Marco">
        <v-card color="blue-grey lighten-5">
            <v-card-title class="Titulo text-center justify-center py-6">
                <h1 class="font-weight-bold text-h2 basil--text">
                    BIENVENIDO<br>
                    <v-icon class="Filtrar" style="font-size:100px">mdi-account-circle</v-icon>
                </h1>
            </v-card-title>
            <v-tabs class="Elemento-Tab" v-model="tab" background-color="transparent" grow>
                <v-tab class="elemento" v-for="item in items" :key="item">
                    <h1 class="title-item">{{ item }}</h1>
                </v-tab>
            </v-tabs>
            <v-tabs-items class="d-flex justify-center" v-model="tab">
                <br>
                <v-tab-item v-for="item in 1" :key="item">
                    <v-card class="mb-10" color="basil" flat>
                        <Login></Login>
                    </v-card>
                </v-tab-item>
                <v-tab-item v-for="num in 2">
                    <v-card class="mb-10" color="basil" flat>
                        <Sign></Sign>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<style>

.title-item.active{
    color: black;
}

.Titulo {
   /* border: 5px solid red;*/
    margin: auto;
    width: 50%;
}

.Marco{
   /* border: 5px solid black;*/
    width: 50%;
    margin: auto;
    /*background-color: grey;*/
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
import Sign from '../components/Registro.vue';
export default {
    components: {
        Login,
        Sign
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