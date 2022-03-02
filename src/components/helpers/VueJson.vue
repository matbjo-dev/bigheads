
<template>
  <div>
    <vue-json-pretty  :data="data"> </vue-json-pretty>
  </div>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

export default {
  components: {
    VueJsonPretty,
  },
  props: {
    data: {}
  },
};
</script>
