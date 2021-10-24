<template>
    <div class="Principal">
        <v-card class="Tarjeta" outlined
  shaped>
            <v-row class="Marco_Principal" cols="12">
                <v-col class="section" cols="6">
                    <h5 class="text-capitalize mt-3 mb-3">Ingresa el nombre de la tabla</h5>
                    <v-text-field v-model="firstname" :rules="nameRules" :counter="10" label="First name" auto-select-first chips clearable deletable-chips multiple small-chips solo required>
                    </v-text-field>
                </v-col>
                <v-col class="section" cols="6">
                    <v-container fluid>
                        <br>
                        <v-combobox class="mt-2" v-model="model" :filter="filter" :hide-no-data="!search" :items="items" :search-input.sync="search" hide-selected label="Elegi el nombre de las columnas" multiple small-chips solo>
                            <template v-slot:no-data>
                                <v-list-item>
                                    <span class="subheading">Create</span>
                                    <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
                                        {{ search }}
                                    </v-chip>
                                </v-list-item>
                            </template>
                            <template v-slot:selection="{ attrs, item, parent, selected }">
                                <v-chip v-if="item === Object(item)" v-bind="attrs" :color="`${item.color} lighten-3`" :input-value="selected" label small>
                                    <span class="pr-2">
                                        {{ item.text }}
                                    </span>
                                    <v-icon small @click="parent.selectItem(item)">
                                        $delete
                                    </v-icon>
                                </v-chip>
                            </template>
                            <template v-slot:item="{ index, item }">
                                <v-text-field v-if="editing === item" v-model="editing.text" autofocus flat background-color="transparent" hide-details solo @keyup.enter="edit(index, item)"></v-text-field>
                                <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
                                    {{ item.text }}
                                </v-chip>
                                <v-spacer></v-spacer>
                                <v-list-item-action @click.stop>
                                    <v-btn icon @click.stop.prevent="edit(index, item)">
                                        <v-icon>{{ editing !== item ? 'mdi-pencil' : 'mdi-check' }}</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </template>
                        </v-combobox>
                    </v-container>
                </v-col>
                <v-col class="section">
                    <v-btn block color="primary" elevation="2">Guardar</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<style scoped>
.Principal {
    /*  border: 5px solid red;*/
}


.Principal .section {
    /*  border: 6px solid black;*/
    width: 50%;
    padding: 10px;
}

.Tarjeta{
    border: 2px solid black;
    padding: 20px;
}


</style>
<script>
export default {
    data: () => ({
        activator: null,
        attach: null,
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        editing: null,
        editingIndex: -1,
        items: [
            { header: 'Elegi el nombre de las columnas' },
            {
                text: 'NUM SOCIO',
            },
            {
                text: 'SOCIO',
            },
            {
                text: 'NUM SOCIO',
            },
            {
                text: 'NOMBRE',
            },
            {
                text: 'APELLIDO 1',
            },
            {
                text: 'APELLIDO 2',
            },
            {
                text: 'PARENTESCO',
            },
            {
                text: 'DNI',
            },
            {
                text: 'PD',
            },
            {
                text: 'DIRECCION',
            },
            {
                text: 'COD POSTAL',
            },
            {
                text: 'LOCALIDAD',
            },
            {
                text: 'PROVINCIA',
            },
            {
                text: 'PAIS',
            },
            {
                text: 'MOVIL',
            },
            {
                text: 'FIJO',
            },
            {
                text: 'EMAIL',
            },
            {
                text: 'EDAD',
            },
            {
                text: 'SOLA',
            },
            {
                text: 'MAYOR',
            },
            {
                text: 'TEFILÁ',
            },
            {
                text: 'OBSERVACIONES',
            },
            {
                text: 'OBSERVACIONES',
            },
            {
                text: 'CERRADO - CUOTAS',
            },
            {
                text: 'CERRADO - CUOTAS',
            },
            {
                text: 'CERRADO - FORMA PAGO',
            },
            {
                text: 'CERRADO - OBSERVACIONES 2',
            },
            {
                text: 'CERRADO - JESED',
            },
        ],
        nonce: 1,
        menu: false,
        /* model: [{
             text: 'Elegi el nombre de las columnas',
             color: 'blue',
         }, ],*/
        x: 0,
        search: null,
        y: 0,
    }),

    watch: {
        model(val, prev) {
            if (val.length === prev.length) return

            this.model = val.map(v => {
                if (typeof v === 'string') {
                    v = {
                        text: v,
                        color: this.colors[this.nonce - 1],
                    }

                    this.items.push(v)

                    this.nonce++
                }

                return v
            })
        },
    },

    methods: {
        edit(index, item) {
            if (!this.editing) {
                this.editing = item
                this.editingIndex = index
            } else {
                this.editing = null
                this.editingIndex = -1
            }
        },
        filter(item, queryText, itemText) {
            if (item.header) return false

            const hasValue = val => val != null ? val : ''

            const text = hasValue(itemText)
            const query = hasValue(queryText)

            return text.toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
        },
    },
}
</script>