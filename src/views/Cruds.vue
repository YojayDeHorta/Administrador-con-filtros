<template>
    <v-container>
        <Crud :adminVerification="true" ></Crud>
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