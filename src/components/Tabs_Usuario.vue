<template>
    <div>
         <elegir_tabla class="tabla mt-5"></elegir_tabla>
    </div>
</template>
<style scoped>
.tabla {
   /* border: 5px solid red;*/
}

.basil {
    background-color: #78909C !important;
}

.basil--text {
    color: #356859 !important;
}

.tabs {
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
}


.info_card {}

.input_archivo {
    position: relative;
    left: 45%;
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
                'Agregar Una Tabla', 'Subir Tabla'
            ],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
    components: {
        elegir_tabla
    }

}
</script>