<template>
    <div class="Marco text-center">
                  <h1 class="text-center font-weight-bold text-h2 basil--text">
                    BIENVENIDO<br>
                    <v-icon class="Filtrar" style="font-size:100px">mdi-account-circle</v-icon>
                </h1>
          <Login></Login>
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
    border: 5px solid black;
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