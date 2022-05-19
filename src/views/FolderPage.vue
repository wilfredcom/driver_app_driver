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
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header>
            <div id="container" style=" width: 100%; height: 100%; z-index: 1">
                <div id="map" class="map"></div>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  onIonViewWillEnter,  
  modalController, } from '@ionic/vue';
// import { App } from '@capacitor/app';
import { useStore } from 'vuex'
import axios from 'axios'
import Modal from '../componentes/modalBuscarDestino.vue'

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

        const loader: any = computed({
            get: () => { return store.getters.loader },
            set: (val) => { store.commit('setLoader', val) }
        });

        let google: any = computed({
            get: () => { return store.getters.google },
            set: (val: any) => { store.commit('setGoogle', val) }
        });

        const map: any = computed({
            get: () => { return store.getters.Map },
            set: (val) => { store.commit('setMap', val) }
        });

        let markertInitPosition: any = computed({
            get: () => { return store.getters.markertInitPosition },
            set: (val: any) => { store.commit('setMarkerInitPosition', val) }
        });

        let MisViajes: any = computed({
            get: () => { return store.getters.mis_viajes },
            set: (val: any) => { store.commit('setMisViajes', val) }
        });

        let modalPrincipal: any = computed({
            get: () => { return store.getters.openModal },
            set: (val: any) => { store.commit('setOpenModal', val) }
        });

         let destino: any = computed({
            get: () => { return store.getters.destino },
            set: (val: any) => { store.commit('setDestino', val) }
        });


        const initMap = (): void => {
            try {
                navigator.geolocation.getCurrentPosition(async (data: any) => {
                    google.value = await loader.value.load();
                    const geocoder = new google.value.maps.Geocoder();
                    // const infowindow = new google.value.maps.InfoWindow();
                    map.value = new google.value.maps.Map(document.getElementById("map") as HTMLElement, {
                        center: { lat: data.coords.latitude, lng: data.coords.longitude },
                        zoom: 18,
                        zoomControl: false,
                        mapTypeControl: false,
                        scaleControl: false,
                        streetViewControl: false,
                        rotateControl: false,
                        fullscreenControl: false
                    });

                    geocoder.geocode({ location: { lat: data.coords.latitude, lng: data.coords.longitude } })
                        .then((response: any) => {
                            if (response.results[0]) {
                                map.value.setZoom(18);
                                markertInitPosition.value = new google.value.maps.Marker({
                                    position: { lat: data.coords.latitude, lng: data.coords.longitude },
                                    map: map.value,
                                });
                                // infowindow.setContent(`${response.results[0].formatted_address}`);
                                // searchAddressPI.value.name = response.results[0].formatted_address
                                // searchAddressPI.value.coords = response.results[0].geometry.location.toJSON()
                                // infowindow.open(map.value, markertInitPosition.value);
                            } else {
                                window.alert("No results found");
                            }
                        })
                        .catch((e: any) => window.alert("Geocoder failed due to: " + e));

                })
            } catch (error) {
                // openToast(error)
                console.log({ error })
            }
        }

        const getSolicitudes: any  = async () => {
            try {
                let { data }: any = await axios('https://ftrack.upwaresoft.com/api/get-solicitudes');
                 MisViajes.value = [];
                for (var i = 0; i < data.length; i++) {
                    destino.value.user = JSON.parse(data[i].user)
                    destino.value.data = data[i]
                    
                    MisViajes.value.push({user:JSON.parse(data[i].user), data:data[i] , creado: data[i].created_at})
                }
                    openModal()

            } catch(e) {
                
                console.log(e);
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

        onMounted(() => {
            initMap()
            getSolicitudes()
            // App.addListener('appStateChange', ({ isActive }) => {
            //     a.value.push({ value: isActive })
            //     console.log('App state changed. Is active?', isActive, App);
            // })
        })
        onIonViewWillEnter(() => {
                initMap()
        })
        return {}

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