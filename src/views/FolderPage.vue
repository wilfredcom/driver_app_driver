<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-menu-button
            color="primary"
            class="float-rigth"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="font-bold text-4xl"> TE LLEVO DRIVER</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <!-- <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">{{ $route.params.id }}</ion-title>
                </ion-toolbar>
            </ion-header> -->
      <div
        class="grid grid-cols-12 mb-2 ml-2 mr-2 shadow-2xl"
        v-for="(viaje, v) in MisViajes"
        :key="v"
      >
        <div class="col-span-2">
          <img
            src="https://img.icons8.com/stickers/100/000000/car-theft.png"
            v-if="viaje.type_solicitud == 'taxi'"
          />
          <img
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/54/000000/external-delivery-tools-and-material-ecommerce-flaticons-lineal-color-flat-icons-2.png"
            v-else
            class="ml-2"
          />
        </div>
        <div class="col-span-10 mt-2 ml-2">
          <div
            class="text-center uppercase text-[#000] text-2xl font-bold align-middle mb-5"
          >
            <p v-if="viaje.type_solicitud == 'taxi'">Solicitud De taxi</p>
            <p v-else class="text-sm">Solicitud De Envio de paquete</p>
          </div>
          <div
            class="text-left divide-y uppercase text-[#cecece] text-sm font-bold align-middle mb-2"
            v-if="viaje.type_solicitud == 'taxi'"
          >
            <p>Solicitud Creada: {{ viaje.creado }}</p>
            <p>Inicio: {{ viaje.inicio_ruta_address.substr(0, 20) }}</p>
            <p>Destino: {{ viaje.final_ruta_address.substr(0, 20) }}</p>
            <p>Tiempo(Aprox): {{ viaje.tiempo_aproximado_de_viaje.text }}</p>
            <p>Km.: {{ viaje.distancia_servicio.text }}</p>
            <p>
              Costo.:
              {{ new Intl.NumberFormat(["ban", "id"]).format(viaje.costo) }}
            </p>
          </div>
          <div
            class="text-left divide-y uppercase text-[#cecece] text-sm font-bold align-middle mb-2"
            v-else
          >
            <!-- <p>Solicitud Creada: {{ viaje.creado }}</p> -->
            <!-- <p>Inicio: {{ viaje.inicio_ruta_address.substr(0, 20) }}</p>
            <p>Destino: {{ viaje.final_ruta_address.substr(0, 20) }}</p> -->
            <!-- <p>Tiempo(Aprox): {{ viaje.tiempo_aproximado_de_viaje.text }}</p>
            <p>Km.: {{ viaje.distancia_servicio.text }}</p>
            <p class="text-center">-----paquete-----</p>
            <p>Alto: {{ viaje.alto }} (cm)</p>
            <p>Ancho: {{ viaje.ancho }} (cm)</p>
            <p>largo: {{ viaje.largo }} (cm)</p>
            <p>peso: {{ viaje.peso }}(g)</p>
            <p>cantidad: {{ viaje.cantidad }}</p>
            <p>descripción: {{ viaje.descripcion }}</p>
            <p>
              Costo.:
              {{ new Intl.NumberFormat(["ban", "id"]).format(viaje.costo) }}
            </p> -->
          </div>
        </div>
        <div
          class="col-span-6 text-[#000] align-middle text-center self-center font-bold ml-2"
        >
          <button
          @click="RechazarServicio(viaje)"
            class="mt-2 mb-2 w-full bg-red-300 p-2 rounded-xl hover:bg-red-500 text-white font-semibold"
          >
            <p>RECHAZAR</p>
          </button>
        </div>
        <div
          class="col-span-6 text-[#000] align-middle text-center self-center font-bold ml-2"
        >
          <button
            class="mt-2 mb-2 w-full bg-green-300 p-2 rounded-xl hover:bg-green-500 text-white font-semibold"
            @click.prevent="AceptServicio(viaje)"
          >
            <p>ACEPTAR</p>
          </button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
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
} from "@ionic/vue";
import { useStore } from "vuex";
import axios from "axios";
import Modal from "../componentes/modalBuscarDestino.vue";
import { Storage } from "@capacitor/storage";

export default defineComponent({
  name: "FolderPage",
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const store: any = useStore();
    const loader: any = computed({
      get: () => {
        return store.getters.loader;
      },
      set: (val) => {
        store.commit("setLoader", val);
      },
    });
    let google: any = computed({
      get: () => {
        return store.getters.google;
      },
      set: (val: any) => {
        store.commit("setGoogle", val);
      },
    });
    let pusher: any = computed({
      get: () => {
        return store.getters.pusher;
      },
      set: (val: any) => {
        store.commit("setPusher", val);
      },
    });
    let MisViajes: any = computed({
      get: () => {
        return store.getters.mis_viajes;
      },
      set: (val: any) => {
        store.commit("setMisViajes", val);
      },
    });
    const modalPrincipal: any = computed({
      get: () => {
        return store.getters.openModal;
      },
      set: (val: any) => {
        store.commit("setOpenModal", val);
      },
    });
    let destino: any = computed({
      get: () => {
        return store.getters.destino;
      },
      set: (val: any) => {
        store.commit("setDestino", val);
      },
    });

    const initMap = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async () => {
          google.value = await loader.value.load();
        });
      } catch (error) {
        // openToast(error)
        console.log({ error });
      }
    };

    const linstenChanels = async () => {
      const pos: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      google.value = await loader.value.load();
      var channel: any = pusher.value.subscribe("channel-services");
      channel.bind("services-event", async (data: any) => {
        const service = new google.value.maps.DistanceMatrixService();
        const destinationA = data.message.inicio_ruta_address;
        const destinationB = data.message.final_ruta_address;
        const origin1 = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        const origin2 = JSON.parse(data.message.final_ruta_coords);
        const request = {
          origins: [origin1, origin2],
          destinations: [destinationA, destinationB],
          travelMode: google.value.maps.TravelMode.DRIVING,
          unitSystem: google.value.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        };

        await service.getDistanceMatrix(request).then((response: any) => {
          var distancia = response.rows[0].elements[0].distance.value;
          if (distancia < 30000) {
            console.log({ data });
            MisViajes.value.push(data);
          }
        });
      });
    };

    const AceptServicio: any = async (serv: any) => {
      try {
        console.log({ serv });
        destino.value.user = serv.user;
        destino.value.data = serv;
        openModal();
        // ListenAnswere()
      } catch (e) {
        console.log(e);
      }
    };
    const RechazarServicio: any = async (serv: any) => {
      try {
        const GetUserlogin: any = await Storage.get({ key: "user_login" });
        var parseUserLogin = JSON.parse(GetUserlogin.value);
        var model = {
          rechazar: false,
          user_id: parseUserLogin.user.id,
           estado: 'Servicio cancelado por conductor',
        }
        await axios.post(`http://localhost:8000/api/rechazar-servicio/${serv.id}`, model )
        getSolicitudes()
        // openModal();
        // ListenAnswere()
      } catch (e) {
        console.log(e);
      }
    };
    const getSolicitudes: any = async () => {
      try {
        MisViajes.value = [];
        let { data }: any = await axios(
          "http://localhost:8000/api/get-servicios-driver"
        );
        const pos: any = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        for (var j = 0; j < data.length; j++) {
          var element = data[j];
          const service = new google.value.maps.DistanceMatrixService();
          const origin1 = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          const origin2 = " ";
          const destinationA = JSON.parse(element.inicio_ruta_coords);
          const destinationB = element.inicio_ruta_address;
          const request = {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: google.value.maps.TravelMode.DRIVING,
            unitSystem: google.value.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
          };
          await service.getDistanceMatrix(request).then((response: any) => {
            var distancia = response.rows[0].elements[0].distance.value;
            if (distancia < 30000) {
              MisViajes.value.push(element);
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    const openModal = async () => {
      modalPrincipal.value = await modalController.create({
        component: Modal,
        initialBreakpoint: 0.7,
        breakpoints: [0, 0.5, 1],
      });
      return modalPrincipal.value.present();
    };

    onMounted(() => {
      initMap();
      getSolicitudes();
      linstenChanels();
    });
    onIonViewWillEnter(() => {
      initMap();
    });
    return {
      MisViajes,
      AceptServicio,
      RechazarServicio
    };
  },
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
