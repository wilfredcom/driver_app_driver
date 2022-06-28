<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="end">
                    <ion-menu-button color="primary" class="float-rigth"></ion-menu-button>
                </ion-buttons>
                <ion-title class=" font-bold text-4xl"> TE LLEVO DRIVER</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <!-- <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header> -->
            <div class="grid grid-cols-12 mb-2 ml-2 mr-2 shadow-2xl" v-for="(viaje, v ) in MisViajes" :key="v">
                <div class="col-span-2">
                    <img src="https://img.icons8.com/stickers/100/000000/car-theft.png"  v-if="viaje.user.type_solicitud == 'taxi'" />
                     <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/54/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png" v-else  class="ml-2"/>
                </div>
                <div class="col-span-10  mt-2 ml-2">
                    <div class=" text-center  uppercase text-[#000] text-2xl font-bold align-middle mb-5 ">
                        <p v-if="viaje.user.type_solicitud == 'taxi'" >Solicitud De taxi</p>
                        <p v-else class="text-sm" >Solicitud De Envio de paquete</p>
                    </div>
                    <div class=" text-left divide-y uppercase text-[#cecece] text-sm font-bold align-middle mb-2 " v-if="viaje.user.type_solicitud == 'taxi'">
                        <p>Solicitud Creada: {{ viaje.creado }} </p>
                        <p>Inicio: {{ viaje.user.inicio_ruta_address.substr(0,20)}} </p>
                        <p>Destino: {{viaje.user.final_ruta_address.substr(0,20)}} </p>
                        <p>Tiempo(Aprox): {{viaje.user.tiempo_aproximado_de_viaje.text}} </p>
                        <p>Km.: {{viaje.user.distancia_servicio.text}} </p>
                        <p>Costo.: {{viaje.user.costo}} </p>
                    </div>
                    <div class=" text-left divide-y uppercase text-[#cecece] text-sm font-bold align-middle mb-2 " v-else>
                        <p>Solicitud Creada: {{ viaje.creado}} </p>
                        <p>Inicio: {{ viaje.user.inicio_ruta_address.substr(0,20)}} </p>
                        <p>Destino: {{viaje.user.final_ruta_address.substr(0,20)}} </p>
                        <p>Tiempo(Aprox): {{viaje.user.tiempo_aproximado_de_viaje.text}} </p>
                        <p>Km.: {{viaje.user.distancia_servicio.text}} </p>
                        <p class="text-center">-----paquete-----</p>
                        <p>Alto: {{ viaje.user.paquete.alto}}  (cm)  </p>
                        <p>Ancho: {{ viaje.user.paquete.ancho}}  (cm)  </p>
                        <p>largo: {{ viaje.user.paquete.largo}}  (cm)  </p>
                        <p>peso: {{ viaje.user.paquete.peso}}(g)</p>
                        <p>cantidad: {{ viaje.user.paquete.cantidad}}</p>
                        <p>descripción: {{ viaje.user.paquete.descripcion}}</p>
                        <p>Costo.: {{ Intl.NumberFormat().format(viaje.user.costo)  }} </p>
                    </div>
                </div>
                <div class="col-span-6  text-[#000] align-middle text-center self-center font-bold ml-2">
                    <button class="mt-2 mb-2 w-full  bg-red-300 p-2 rounded-xl hover:bg-red-500  text-white font-semibold">
                        <p>RECHAZAR</p>
                    </button>
                </div>
                <div class="col-span-6  text-[#000] align-middle text-center self-center font-bold ml-2">
                    <button class="mt-2 mb-2 w-full  bg-green-300 p-2 rounded-xl hover:bg-green-500  text-white font-semibold" @click.prevent="AceptServicio(viaje)">
                        <p>ACEPTAR</p>
                    </button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    onIonViewWillEnter,
    modalController,
} from '@ionic/vue';
// import { App } from '@capacitor/app';
import { useStore } from 'vuex'
import axios from 'axios'
import Modal from '../componentes/modalBuscarDestino.vue'
import ModalSerPres from '../componentes/modalServicioPrestado.vue'

export default defineComponent({
    name: 'FolderPage',
    components: {
        IonButtons,
        IonContent,
        IonHeader,
        IonMenuButton,
        IonPage,
        IonTitle,
        IonToolbar
    },
    setup() {

        const store: any = useStore();
        const servicios: any = ref([]);

        const loader: any = computed({
            get: () => { return store.getters.loader },
            set: (val) => { store.commit('setLoader', val) }
        });

        let google: any = computed({
            get: () => { return store.getters.google },
            set: (val: any) => { store.commit('setGoogle', val) }
        });
        let DataStatusAnswere: any = ref('');

        // const map: any = computed({
        //     get: () => { return store.getters.Map },
        //     set: (val) => { store.commit('setMap', val) }
        // });

        // let markertInitPosition: any = computed({
        //     get: () => { return store.getters.markertInitPosition },
        //     set: (val: any) => { store.commit('setMarkerInitPosition', val) }
        // });

        let MisViajes: any = computed({
            get: () => { return store.getters.mis_viajes },
            set: (val: any) => { store.commit('setMisViajes', val) }
        });

        const modalPrincipal: any = computed({
            get: () => { return store.getters.openModal },
            set: (val: any) => { store.commit('setOpenModal', val) }
        });
        let modalServicioPrestado: any = computed({
            get: () => { return store.getters.openModalServicioPrestado },
            set: (val: any) => { store.commit('setOpenModalServicioPrestado', val) }
        });

        let destino: any = computed({
            get: () => { return store.getters.destino },
            set: (val: any) => { store.commit('setDestino', val) }
        });


        const initMap = async () => {
            try {
                // navigator.geolocation.getCurrentPosition(async (data: any) => {
                google.value = await loader.value.load();
                // const geocoder = new google.value.maps.Geocoder();
                // // const infowindow = new google.value.maps.InfoWindow();
                // map.value = new google.value.maps.Map(document.getElementById("map") as HTMLElement, {
                //     center: { lat: data.coords.latitude, lng: data.coords.longitude },
                //     zoom: 18,
                //     zoomControl: false,
                //     mapTypeControl: false,
                //     scaleControl: false,
                //     streetViewControl: false,
                //     rotateControl: false,
                //     fullscreenControl: false
                // });

                // geocoder.geocode({ location: { lat: data.coords.latitude, lng: data.coords.longitude } })
                //     .then((response: any) => {
                //         if (response.results[0]) {
                //             map.value.setZoom(18);
                //             markertInitPosition.value = new google.value.maps.Marker({
                //                 position: { lat: data.coords.latitude, lng: data.coords.longitude },
                //                 map: map.value,
                //             });
                //             // infowindow.setContent(`${response.results[0].formatted_address}`);
                //             // searchAddressPI.value.name = response.results[0].formatted_address
                //             // searchAddressPI.value.coords = response.results[0].geometry.location.toJSON()
                //             // infowindow.open(map.value, markertInitPosition.value);
                //         } else {
                //             window.alert("No results found");
                //         }
                //     })
                //     .catch((e: any) => window.alert("Geocoder failed due to: " + e));

                // })
            } catch (error) {
                // openToast(error)
                console.log({ error })
            }
        }

        const AceptServicio: any = async  (serv: any) => {
            try {
                destino.value.user = serv.user
                destino.value.data = serv
                openModal()
                if(DataStatusAnswere.value == null){
                    setInterval(() => ListenAnswere(), 2500);
                }else{
                    openModalSerPrestado()
                }
                  
            } catch(e) {
                // statements
                console.log(e);
            }
        }
        const getSolicitudes: any = async () => {
            try {

                let { data }: any = await axios('https://ftrack.upwaresoft.com/api/get-solicitudes');

                MisViajes.value = [];
                servicios.value = [];

                for (var i = 0; i < data.length; i++) {
                    
                    servicios.value.push({ user: JSON.parse(data[i].user), data: data[i], creado: data[i].created_at })

                }


                const pos: any = await new Promise((resolve, reject) => {
                  navigator.geolocation.getCurrentPosition(resolve, reject);
                });
                    


                for (var j = 0; j < servicios.value.length; j++) {
                    var element = servicios.value[j];


                        const service = new google.value.maps.DistanceMatrixService();
                        const origin1 =  { lat: pos.coords.latitude, lng: pos.coords.longitude };
                        const origin2 = " " ;
                        const destinationA = element.user.inicio_ruta_coords;
                        const destinationB = element.user.inicio_ruta_address;

                        const request = {
                            origins: [origin1, origin2],
                            destinations: [destinationA, destinationB],
                            travelMode: google.value.maps.TravelMode.DRIVING,
                            unitSystem: google.value.maps.UnitSystem.METRIC,
                            avoidHighways: false,
                            avoidTolls: false,
                        };


                    await service.getDistanceMatrix(request).then((response: any) => {

                        var distancia  = response.rows[0].elements[0].distance.value; 
                        if(distancia < 3000){
                            MisViajes.value.push(element)
                        }
                        
                    })
                   

                }

            } catch (e) {

                console.log(e);
            }
        }

        const ListenAnswere: any = async () => {
            try{
                 let { data } = await axios.post('https://ftrack.upwaresoft.com/api/get-solicitud-user', { id: destino.value.data.data.id })
                 DataStatusAnswere.value = data.driver
                 openModalSerPrestado()
                
            }catch(e){
                console.log({ e })
            }
        }

        const openModal = async () => {

            modalPrincipal.value = await modalController
                .create({
                    component: Modal,
                    initialBreakpoint: 0.7,
                    breakpoints: [0, 0.5, 1]
                })
            return modalPrincipal.value.present();
        }
        const openModalSerPrestado = async () => {

            modalServicioPrestado.value = await modalController
                .create({
                    component: ModalSerPres,
                    initialBreakpoint: 1,
                    breakpoints: [1, 1, 1]
                })
            return modalServicioPrestado.value.present();
        }

        onMounted(() => {
            initMap()
            getSolicitudes()
           
        })
        onIonViewWillEnter(() => {
            initMap()
        })
        return {
            MisViajes,
            AceptServicio
        }

    }
});
</script>
<style scoped>
.map {
    width: 100%;
    height: 100%;
    z-index: 1;
}

#container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
}

#container a {
    text-decoration: none;
}

.float-div-mapper {
    width: 95%;
    height: 10%;
    z-index: 2;
    position: absolute;
    /* float: left; */
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, 0%);
    border-radius: 10px 10px 10px 10px;
}
</style>