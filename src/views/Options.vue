<template>
    <v-container>
        <h1>opciones</h1>
        <v-btn :to="{name: 'Cruds'}" exact text class="primary ma-5"><span>Editar</span></v-btn>
        <v-btn :to="{name: 'Filter'}" exact text class="primary ma-5"><span>Filtrar</span></v-btn>

    </v-container>
</template>

<script>
export default {
    
}
</script>