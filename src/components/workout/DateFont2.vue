<template>
 <div class="doc-card-title  ">
     <div class="flex  q-py-sm ">
<div class="m-calendar-font date full-width  ">{{ date_format_day(props.date) }}</div>
<div class="m-calendar-font weekday full-width" >{{ date_format_weekday(props.date) }}</div>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { format } from 'date-fns'
const props = defineProps({
    date: String
})


const date_format_day = (value) => {
    if (value) {
        return format(new Date(value),'dd')
    }
}
const date_format_weekday = (value) => {
    if (value) {
        return format(new Date(value),'EE')
    }
}
const date_format_year = (value) => {
    if (value) {
        return format(String(value),'YYY')
    }
}
</script>
<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css?family=Cousine')
.doc-card-title
    background: inherit
    padding-left: 20px
    border-radius: 3px 5px 5px 0
    color: #616161
    margin-left: -28px
    position: relative
    width: 70px




.m-calendar-font
  font-family: Cousine
  font-style: normal
  font-weight: 700
  text-align: center

.date
    font-size: 18px
    line-height: 1.2

.weekday
    font-size: 20px
    line-height: 1.2

</style>
