<template>
    <ion-content>
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle></ion-card-subtitle>
                <ion-card-title>John Doe</ion-card-title>
            </ion-card-header>
            <ion-card-content>
                <div class="grid grid-cols-12">
                    <div class="col-span-2">
                        <img v-if="destino.data.type_solicitud == 'taxi'" src="https://img.icons8.com/stickers/100/000000/car-theft.png" />
                        <img v-else  src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/54/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" />
                    </div>
                    <div class="col-span-10  mt-2 ml-2">
                        <div class=" text-center  uppercase text-[#000] text-5xl font-bold align-middle mb-5 ">
                            <p v-if="destino.data.type_solicitud == 'taxi'" >Solicitud De taxi</p>
                            <p v-else>Solicitud De transporte</p>
                        </div>
                        <div class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <p>Inicio: {{ destino.data.inicio_ruta_address }} </p>
                            <p>Destino: {{ destino.data.final_ruta_address}} </p>
                            <p>Tiempo(Aprox): {{ JSON.parse(destino.data.tiempo_aproximado_de_viaje).text }} </p>
                            <p>Km.: {{ JSON.parse(destino.data.distancia_servicio).text }} </p>
                            <p>Costo.: {{ new Intl.NumberFormat(['ban', 'id']).format(destino.data.costo) }} </p>
                            <p>Metodo de pago.: Efectivo </p>
                        </div>
                        <div v-if="destino.data.type_solicitud != 'taxi'" >
                            <p class="text-center">---------</p>
                            <p>Alto: {{ destino.data.alto }} (cm) </p>
                            <p>Ancho: {{ destino.data.ancho }} (cm) </p>
                            <p>largo: {{ destino.data.largo }} (cm) </p>
                            <p>peso: {{ destino.data.peso }}(g)</p>
                            <p>cantidad: {{ destino.data.cantidad }}</p>
                            <p>descripci??n: {{ destino.data.descripcion }}</p>
                            <p>Costo.: {{ new Intl.NumberFormat(['ban', 'id']).format(destino.data.costo) }} </p>
                        </div>
                    </div>
                    <div class="col-span-6  text-[#000] align-middle text-center self-center font-bold ml-2">
                        <button
                            class="mt-2 mb-2 w-full  bg-red-300 p-2 rounded-xl hover:bg-red-500  text-white font-semibold">
                            <p>RECHAZAR</p>
                        </button>
                    </div>
                    <div class="col-span-6  text-[#000] align-middle text-center self-center font-bold ml-2">
                        <button
                            class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold"
                            @click="aceptDrive">
                            <p>ACEPTAR</p>
                        </button>
                    </div>
                </div>
            </ion-card-content>
        </ion-card>
    </ion-content>
</template>
<script lang="ts">
import {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    // toastController,
    modalController
} from '@ionic/vue';
import {
    defineComponent,
    // ref, 
    computed
} from 'vue';
import { useStore } from 'vuex'
import axios from 'axios'
// import { useStore } from 'vuex'
// import { informationCircle } from 'ionicons/icons';

import ModalServPrestados from '../componentes/modalServicioPrestado.vue'


export default defineComponent({
    setup() {
        const store: any = useStore();

        let destino: any = computed({
            get: () => { return store.getters.destino },
            set: (val: any) => { store.commit('setDestino', val) }
        });

        let modalServicioPrestado: any = computed({
            get: () => { return store.getters.openModalServicioPrestado },
            set: (val: any) => { store.commit('setOpenModalServicioPrestado', val) }
        });

         let User: any = computed({
            get: () => { return store.getters.user },
            set: (val: any) => { store.commit('setUser', val) }
        });

        const openModalServicioPrestado = async () => {

            modalServicioPrestado.value = await modalController
                .create({
                    component: ModalServPrestados,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modalServicioPrestado.value.present();
        }


        const aceptDrive: any = async () => {
            await axios.post('http://localhost:8000/api/store-servicio-drive',
                {
                    id: destino.value.data.id,
                    drive: JSON.stringify({
                        name: 'jonh doe',
                        id: User.value.id,
                        carro: 'FIAT 1 color verde',
                        placa: 'MAO12F',
                        likes: 0,
                        mensajes: [],
                        comentarios: [],
                        count_drives: 0,
                        respuesta: 'servicio aceptado'
                    })
                });

            openModalServicioPrestado()
        }

        return {
            destino,
            aceptDrive
        }
    },

    components: {
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
    }
});
</script>
<style scoped>
.srch-bar {
    margin-bottom: 5px;
}

.tb-srch {
    padding: 20px;
}

ion-icon {
    color: blue;
}
</style>