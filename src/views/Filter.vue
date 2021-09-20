<template>
    <v-container>  
        <h1>aqui van los filtros</h1>
        
        <Crud :adminVerification="false" ></Crud>

    </v-container>
</template>
<script>
import Crud from "../components/Crud.vue"

export default {
    components:{
        Crud
    }
}
</script>