<template>
    <div>
        <v-card color="basil">
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab v-for="item in items" :key="item">
                    {{ item }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item class="tabs" v-for="item in 1" :key="item">
                    	<elegir_tabla></elegir_tabla>
                </v-tab-item>
                <v-tab-item class="tabs"  v-for="item in 2" :key="item">
                        <v-card-text>DOS</v-card-text>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
    </div>
</template>
<style scoped>
.basil {
    background-color: white !important;
}

.basil--text {
    color: #356859 !important;
}

.tabs{
	margin: auto;
	margin-top: 20px;
}

</style>
<script>
import elegir_tabla from "../components/Elegir_Tabla.vue"

export default {
    name: 'tabs_usuario',
    data() {
        return {
            tab: null,
            items: [
                'Agregar Una Tabla', 'Descargar Tabla'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    components:{
    	elegir_tabla
    }

}
</script>