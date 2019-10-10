<template>
    <v-container class="my-5 wrapp">
        <v-layout text-center>
            <v-flex>
                <v-card>
                    <v-card-title  class="justify-center">
                        <h3>Авторизация</h3>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="form"
                        >
                            <v-text-field
                                v-model="postBody.name"
                                :counter="10"
                                :rules="nameRules"
                                label="Логин"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="postBody.pass"
                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                :type="show ? 'text' : 'password'"
                                counter
                                :rules="passRules"
                                label="Пароль"
                                required
                                @click:append="show = !show"
                            ></v-text-field>
                            <v-btn class="mt-5 indigo accent-4 white--text" @click="submit">Отправить</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout mt-5>
            <v-flex>
                <v-banner v-show="authTrig" single-line transition="slide-y-transition" elevation="10">
                    Авторизация прошла успешно!
                    <template v-slot:actions="{ dismiss }">
                        <v-btn text color="deep-orange accent-3" @click="dismiss">OK</v-btn>
                    </template>
                </v-banner>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('form')

export default {
    data: () => ({
        v0: true,
        postBody: {
            name: '',
            pass: ''
        },
        show: false,
        nameRules: [
            v => !!v || 'Поле не может быть пустым',
            v => (v && v.length <= 10) || 'Логин должен быть не более 10 символов',
            v => /[A-Za-z]/.test(v) || 'Символы только латинского алфавита',
        ],
        passRules: [
            v => (v && v.length >= 3) || 'Пароль должен быть минимум 3 символа'
        ]
    }),
    mounted() {
        this.getAllUsers();
    },
    computed: {
        ...mapGetters(['authTrig'])
    },
    methods: {
        ...mapActions(['getAllUsers']),
        ...mapMutations(['checkUser']),
        submit () {
            this.checkUser({
                name: this.postBody.name,
                pass: this.postBody.pass
            });
            
        },
    }
}
</script>

<style scoped>
    .wrapp {
        max-width: 520px
    }
</style>