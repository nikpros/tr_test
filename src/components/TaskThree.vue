<template>
    <v-container class="my-5 wrapp">
        <v-layout text-center>
            <v-flex>
                <v-card>
                    <v-card-title  class="justify-center">
                        <h3>Фильтр</h3>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-btn class="mt-5 indigo accent-4 white--text" elevation="10" @click="pullAllTraphic">Получить</v-btn>
                        <v-simple-table v-if="visible">
                            <template v-slot:default>
                                <thead>
                                <tr>
                                    <th class="text-center">ID</th>
                                    <th class="text-center">Трафик</th>
                                    <th class="text-center">% от общего трафика</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in getSet" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item['Трафик'] }}</td>
                                    <td>{{ item['%'] }}</td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        visible: false
    }),
    computed: {
        ...mapGetters('net', ['getAmount', 'getSet'])
    },
    methods: {
        ...mapActions('net', ['getAllItems']),
        pullAllTraphic() {
            this.getAllItems();
            this.visible = true;
        }
    }
}
</script>

<style scoped>
    tr:nth-child(even) {
        background-color: #E0E0E0
    }
</style>