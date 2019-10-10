<template>
    <v-container class="my-5 wrapp">
        <v-layout text-center>
            <v-flex>
                <v-card>
                    <v-card-title  class="justify-center">
                        <h3>Создание объекта</h3>
                    </v-card-title>
                    <v-card-text class="mt-5">
                        <v-layout class="mt-5">
                            <v-flex>
                                <v-btn class="mt-5 indigo accent-4 white--text" elevation="10" @click="timeOutTrig">Отправить</v-btn>
                            </v-flex>
                        </v-layout>
                        <v-content v-for="i in count" :key="i">
                            <item v-bind:trig="trigToPush" @empty-key="counterEmptyObj"></item>
                        </v-content>
                        <v-layout class="mt-5">
                            <v-flex v-if="count > 3">
                                <v-btn class="mx-2" fab dark color="indigo" @click="deleteItem">
                                    <v-icon dark>mdi-minus</v-icon>
                                </v-btn>
                            </v-flex>
                            <v-flex>
                                <v-btn class="mx-2" fab dark color="indigo accent-2" @click="addItem">
                                    <v-icon dark>mdi-plus</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import axios from 'axios'
import Item from './Item.vue'

export default {
    data: () => ({
        obj: [],
        count: 3,
        trigToPush: false
    }),
    components: {
        Item
    },
    methods: {
        addItem() {
            this.count++
        },
        deleteItem() {
            if (this.count > 3) this.count--
        },
        counterEmptyObj(pair) {
            this.obj.push(pair);
            if (this.obj.length === this.count) {
                console.table(this.obj);
                axios
                    .post('https://my-json-server.typicode.com/typicode/demo/posts', JSON.stringify(this.obj))
                    .then(res => console.log(`Данные успешно отправлены на демо-сервер`))
                    .catch(() => console.error('В данный момент демо-сервер не доступен!!'));
            }
        },
        timeOutTrig() {
            this.trigToPush = true;
            setTimeout(() => {
                this.trigToPush = false
            }, 1000)
        }
    }
}
</script>

<style scoped>
    .wrapp {
        max-width: 520px
    }
</style>