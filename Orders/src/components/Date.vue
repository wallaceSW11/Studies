<template>
  <div>
    <v-menu top offset-x>
      <template v-slot:activator="{on}">
        <v-text-field
          prepend-inner-icon="mdi-calendar"
          label="Date"
          v-on="on"
          v-model="due"
        ></v-text-field>
      </template>
      <v-date-picker
        no-title
        scrollable
        v-model="due"
        :min-date="minDate"
      >

      </v-date-picker>
    </v-menu>


    <v-flex d-flex flex-row>
      <v-btn 
        color="primary"
        @click="$emit('selected', true)"
      >
        Select
      </v-btn>
      <v-btn
        @click="$emit('detailed', product.id)"
      >
        Details
      </v-btn>
      </v-flex>
  </div>
</template>

<script>
export default {
  name: 'DateOrder',
  data() {
    return {
      due: null,
      minDate: null
    }
  },
}
</script>

<style>

</style>