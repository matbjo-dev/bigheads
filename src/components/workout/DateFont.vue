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
    background: #e0e0e0  
    border-radius: 3px 5px 5px 0  
    color: #616161  
    margin-left: -28px  
    position: relative  
    width: 70px


.doc-card-title:after 
    border: 0 solid #0000  
    border-top-color: #bebebe  
    border-width: 9px 0 0 11px  
    content: ""  
    height: 0  
    left: 0  
    position: absolute  
    top: 100%  
    width: 0  

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

@media (max-width: $breakpoint-md-min)
    .doc-card-title 
        background: inherit
        padding-left: 20px
</style>