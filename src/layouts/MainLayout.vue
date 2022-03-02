<template>
    <q-layout view="hHh LpR fff">
        <!-- Navbar -->
        <q-header bordered class="text-white" style="max-height: 60px">
            <q-toolbar>

                <q-btn dense flat round icon="menu" class="" @click="drawerMain = !drawerMain" />

                <!-- Navbar title/brand name -->
                <q-toolbar-title class="text-center q-mr-lg">
                    <router-link to="/" style="text-decoration: none; color: inherit; display: block">
                        <span class="logoColor logofont q-mr-lg">{{
                  title
                }}</span></router-link>
                </q-toolbar-title>

            </q-toolbar>
        </q-header>

        <!-- Drawer -->
        <q-drawer v-model="drawerMain" side="left" show-if-above :mini="miniState" :width="300" :breakpoint="500" bordered class="bg-dark text-white" @mouseover="miniState = false" @mouseout="miniState = true">
            <!-- drawer content -->
            <drawerMain />
        </q-drawer>

        <!-- content -->
        <q-page-container>
            <router-view class="m-page-container" />
        </q-page-container>

        <!-- Footer -->
        <Footer :title="title" :contact-email="contactEmail" :contact-email-text="contactEmailText"></Footer>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import drawerMain from 'components/main/DrawerMain'
import Footer from 'components/main/Footer'

export default defineComponent({
    name: 'MainLayout',

    components: {
        drawerMain,
        Footer,

    },

    setup() {
        const miniState = ref(true)
        const drawerMain = ref(false)
        const title = process.env.VUE_APP_TITLE
        const contactEmail = process.env.VUE_APP_CONTACT_EMAIL ? 'mailto:' + ' process.env.VUE_APP_CONTACT_EMAIL' : 'email@email.com'
        const contactEmailText = process.env.VUE_APP_CONTACT_EMAIL

        return {
            miniState,
            drawerMain,
            title,
            contactEmail,
            contactEmailText
        }
    },
})
</script>

<style scoped lang="sass">
.m-page-container
  min-height: 100vh !important
</style>
