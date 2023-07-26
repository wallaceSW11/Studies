<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      max-width="40%"
    >
      <v-card class="d-flex flex-column">
        <v-card-title v-if="!!title">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions class="d-flex flex-row-reverse">
          <v-btn outlined class="ml-3" @click="() => {cancelCallback(); $emit('onChange', false)}"> no</v-btn>
          <v-btn color="primary" @click="() => {confirmCallback(); $emit('onChange', false)}"> yes</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

    
  </div>  
</template>

<script>
export default {
  name: 'ConfirmMessage',
  model: {
    prop: 'show',
    event: 'onChange'
  },

  props: {
    title: { type: String },
    message: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    confirmCallback: { type: Function, required: false, default: () => {} },
    cancelCallback: { type: Function, required: false, default: () => {} }
  },

  // data() {
  //   return {
  //     openMessage: true
  //   }
  // },

  // watch: {
  //   show(value) {
  //     this.openMessage = value
  //   }
  // },

}
</script>

<style>

</style>