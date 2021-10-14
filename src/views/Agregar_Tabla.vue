<template>
    <div class="Principal text-center">
        <tabs class="tabla"></tabs> 
        <section class="Icon">
            <v-icon class="icon_mas mb-5">mdi-file-plus
            </v-icon>
            <br>
        </section>
    </div>
</template>
<style scoped>
.Principal {
    border: 5px solid red;
    width: 100%;
    height: 600px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
}

.tabla{
    border: 5px solid black;
    width: 40%;
}

.icon_mas {
    font-size: 250px;
    /*border: 5px solid black !important;*/
}
</style>
<script>

import tabs from "../components/Tabs_Usuario.vue"


export default {
    components: {
        tabs
    }
}
</script>