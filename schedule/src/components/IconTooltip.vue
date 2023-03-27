<template>
  <v-tooltip bottom>
    <template v-slot:activator="{on}">
      <v-btn class="ma-0 pa-0" icon @click="$emit('clicked', true)">
        <v-icon class="ma-0 pa-0" v-on="on" color="primary"  :ripple="false">{{ icon }}</v-icon>      

      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>

</template>

<script>
export default {
  name: 'IconTooltip',
  props: {
    icon: { type: String, required: true },
    tooltip: { type: String, required: true }
  },

}
</script>

<style lang="scss" scoped>


</style>