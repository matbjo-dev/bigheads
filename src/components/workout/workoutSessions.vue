<template>
     <q-list bordered class="m-list">
             <q-item-label header>Sessions</q-item-label>
    <template v-for="(item, index) in result" :key="'result-'+item.id">
            <q-item v-if="isNewMonth(item.date, index)" class="month-font justify-center"> {{ isNewMonth(item.date, index) }}</q-item>
                <q-separator  v-if="isNewMonth(item.date, index)" />
            <q-item v-ripple class="q-py-md" clickable @click="goToSession(item.id)">


                     <date-font
                     :date="item.date"
                     ></date-font>
                <q-item-section class="q-pl-lg q-pl-sm-sm q-pl-xs-sm">
                    <q-item-label lines="1">{{ item.title ?? "Workout" }}</q-item-label>
                    <q-item-label v-if="strip(item.description) !== 'null'" caption lines="2">{{ strip(item.description) }}</q-item-label>
                </q-item-section>

            </q-item>
            <q-separator  />
    </template>
   </q-list>


</template>
<script setup>
import {ref, onMounted, reactive, computed} from 'vue'
import {useQuasar} from 'quasar'
import {useRouter, useRoute} from 'vue-router'
import {api} from 'src/services/axios.js'
import useNotify from 'src/composables/notify'
import DateFont from 'src/components/workout/DateFont'
import { format } from 'date-fns'

const $q = useQuasar()
const $router = useRouter()

const result = reactive({})
const month = ref('')

onMounted(() => {
    getResults()
})

const getResults = async () => {
    try {
    const response = await api.get('workout/session/?ordering=-date')
    Object.assign(result, response.data)
    } catch (error) {
    console.log(error)
    }
}
const goToSession = (item) => {
    $router.push({ name: 'sessions_view', params: { id: item }})
}
const strip = (html) => {
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}
const isNewMonth = (date, index) => {
    if (month.value != date_format_month(date)) {
        month.value = date_format_month(date)
        return month.value
    }
    if (index == 0) return month.value
    if (month.value == date_format_month(date)) return false
}
const date_format_month = (value) => {
    if (value) {
        return String(format(new Date(value),'MMMM'))
    }
}
</script>


<style lang="sass" scoped>
.m-list
    width: 40%

.month-font
    font-size: 20px
    font-weight: 500
    color: #616161

@media (max-width: $breakpoint-md-min)
    .m-list
        width: 100%


</style>
