<template>
  <v-container>
    <v-flex d-flex flex-row>
      
        <v-text-field
          label="Date"
        ></v-text-field>

        <v-select
          :items="operations"
          v-model="operations"
          label="Operation"
        ></v-select>
      
      
    </v-flex>

   
  </v-container>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      operations: ['Accumulation', 'Buy', 'Transfer'],
      operationSelected: undefined
    }
  },

}
</script>

<style>

</style>