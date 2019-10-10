<template>
  <v-app>
    <v-tabs
      background-color="deep-purple accent-4"
      class="elevation-2"
      dark
      centered
      grow
      >
    <v-tabs-slider></v-tabs-slider>
    <v-tab
      v-for="i in 3"
      :key="i"
      :href="`#tab-${i}`"
      >
      Задание {{ i }}
    </v-tab>
      <v-tab-item
          v-for="i in 3"
          :key="i"
          :value="'tab-' + i"
        >
        <v-card
          flat
          tile
        >
          <v-card-text>
            <v-content>
              <component :is="currentTask[i-1]"></component>
            </v-content>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>

import TaskOne from './components/TaskOne.vue'
import TaskTwo from './components/TaskTwo.vue'
import TaskThree from './components/TaskThree.vue';

export default {
  name: 'App',
  components: {
    TaskOne,
    TaskTwo,
    TaskThree
  },
  data: () => ({
    currentTask: ['TaskOne', 'TaskTwo', 'TaskThree']
  }),
};
</script>
