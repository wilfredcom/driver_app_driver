import { createStore } from 'vuex'
import { Loader } from "@googlemaps/js-api-loader"
import { modalController } from '@ionic/vue';
import Modal from '../componentes/modalBuscarDestino.vue'
import ModalServicioPrestado from '../componentes/modalServicioPrestado.vue'
import Pusher from 'pusher-js'
import State from 'pusher-js/types/src/core/http/state';

export default createStore({
    state: {
        pusher: new Pusher('477e95c37e4ada200aac', {
            cluster: 'us2'
        }),
        loader: new Loader({
            apiKey: "AIzaSyDjc7g2sDf0u4tc_JiUzA1brt0V3PcDSrk",
            version: "weekly",
        }),
        google: {},

        Map: [],
        markertInitPosition: {},
        mis_viajes: [],

        openModal: async () => {

            const modal = await modalController
                .create({
                    component: Modal,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modal.present();
        },
        openModalServicioPrestado: async () => {

            const modal = await modalController
                .create({
                    component: ModalServicioPrestado,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modal.present();
        },
        destino: {
            user: null,
            data: null,
        },

        user: {},
    },
    getters: {
        pusher: state => state.pusher,
        user: state => state.user,
        loader: state => state.loader,
        google: state => state.google,
        Map: state => state.Map,
        markertInitPosition: state => state.markertInitPosition,
        mis_viajes: state => state.mis_viajes,
        openModal: state => state.openModal,
        openModalServicioPrestado: state => state.openModalServicioPrestado,
        destino: state => state.destino
    },
    mutations: {
        setPusher(state, data){
            state.pusher = data
        },
        setUser(state, data) {
            state.user = data
        },
        setDestino(state, data) {
            state.destino = data
        },
        setOpenModal(state, data) {
            state.openModal = data
        },

        setOpenModalServicioPrestado(state, data) {
            state.openModalServicioPrestado = data
        },
        setMisViajes(state, data) {
            state.mis_viajes = data
        },
        setLoader(state, data) {
            state.loader = data
        },
        setGoogle(state, data) {
            state.google = data
        },
        setMap(state, data) {
            state.Map = data
        },
        setMarkerInitPosition(state, data) {
            state.markertInitPosition = data
        },

    },
    actions: {},
    modules: {}
})