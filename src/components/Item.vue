<template>
    <v-card>
        <v-card-text class="mt-3">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="obj.key"
                        label="ключ"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field
                        v-model="obj.value"
                        label="значение"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        obj: {
            key: '',
            value: ''
        }
    }),
    props: [
        'trig'
    ],
    watch: {
        trig(newTrig, oldTrig) {
            if (newTrig && this.obj.key) {
                this.$emit('empty-key', this.obj)
                
            }
        }
    }
}
</script>