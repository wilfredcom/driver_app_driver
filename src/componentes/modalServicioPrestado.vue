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
                        <img  v-if="destino.data.type_solicitud == 'taxi' " src="../../public/assets/icon/icons8-car.gif" />
                        <img  v-else  src="../../public/assets/icon/icons8-truck.gif" />
                    </div>
                        <div class="col-span-10  mt-2 ml-2">
                    <!-- 
                        <div class=" text-center  uppercase text-[#000] text-5xl font-bold align-middle mb-5 ">
                            <p v-if="destino.user.paquete.cantidad == null && destino.user.paquete.cantidad <= 0" >Servicio de taxi iniciado...</p>
                            <p v-else>Servicio de transporte iniciado...</p>
                        </div>
                        -->
                        <!-- <div class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <p>Inicio: {{ destino.user.inicio_ruta_address.substr(0, 20) }} </p>
                            <p>Destino: {{ destino.user.final_ruta_address.substr(0, 20) }} </p>
                            <p>Tiempo(Aprox): {{ destino.user.tiempo_aproximado_de_viaje.text }} </p>
                            <p>Km: {{ destino.user.distancia_servicio.text }} </p>
                            <p>Costo: {{ destino.user.costo }} </p>
                            <p>Metodo de pago: Efectivo </p>
                        </div>
                        <div v-if="destino.user.paquete.cantidad != null && destino.user.paquete.cantidad > 0" class=" text-left divide-y uppercase text-[#cecece] text-xs font-bold align-middle mb-2 ">
                            <p class="text-center">-----paquete-----</p>
                            <p>Alto: {{ destino.user.paquete.alto }} (cm) </p>
                            <p>Ancho: {{ destino.user.paquete.ancho }} (cm) </p>
                            <p>largo: {{ destino.user.paquete.largo }} (cm) </p>
                            <p>peso: {{ destino.user.paquete.peso }}(g)</p>
                            <p>cantidad: {{ destino.user.paquete.cantidad }}</p>
                            <p>descripción: {{ destino.user.paquete.descripcion }}</p>
                            <p>Costo.: {{ Intl.NumberFormat().format(destino.user.costo) }} </p>
                        </div> -->
                    </div>
                    <div class="col-span-12 text-center">
                        <ion-chip color="danger">
                            <ion-label>Ver Destino</ion-label>
                            <ion-icon name="close-circle"></ion-icon>
                        </ion-chip>
                        <ion-chip color="success">
                            <ion-label>Notiicar Llegada</ion-label>
                            <ion-icon name="checkmark-circle"></ion-icon>
                        </ion-chip>
                        <ion-chip color="success" @click="presentAlertConfirm">
                            <ion-label>Notiicar Llegada a Destino</ion-label>
                            <ion-icon name="checkmark-circle"></ion-icon>
                        </ion-chip>
                        <ion-chip>
                            <ion-label>Mensaje</ion-label>
                            <ion-icon name="paper-plane-outline"></ion-icon>
                        </ion-chip>
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
    // IonChip,
    // IonIcon,
    // IonLabel,
    alertController
} from '@ionic/vue';
import {
    defineComponent,
    // ref, 
    computed
} from 'vue';
import { useStore } from 'vuex'
// import axios from 'axios'


export default defineComponent({
    setup() {
        const store: any = useStore();


        const presentAlertConfirm = async () => {
            const alert = await alertController
                .create({
                    cssClass: 'my-custom-class',
                    header: 'Servicio Finalizado',
                    message: `<p class="text-3xl">Costo del Serivicio: $${new Intl.NumberFormat(['ban', 'id']).format(destino.value.user.costo)}</p>`,
                    buttons: [
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            id: 'cancel-button',
                            handler: blah => {
                                console.log('Confirm Cancel:', blah)
                            },
                        },
                        {
                            text: 'Okay',
                            id: 'confirm-button',
                            handler: () => {
                                console.log('Confirm Okay')
                            },
                        },
                    ],
                });
            return alert.present();
        };

        let destino: any = computed({
            get: () => { return store.getters.destino },
            set: (val: any) => { store.commit('setDestino', val) }
        });


        return {
            destino,
            presentAlertConfirm
        }
    },

    components: {
        IonContent,
        IonCard,
        IonCardHeader,
        IonCardSubtitle,
        IonCardTitle,
        IonCardContent,
        // IonChip,
        // IonIcon,
        // IonLabel
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