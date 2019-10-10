import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form.js'
import net from './modules/net.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        form,
        net
    }
})