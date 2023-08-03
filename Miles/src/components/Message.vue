<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      max-width="40%"
    >
      <v-card class="d-flex flex-column">
        <v-card-title v-if="!!title">
          <v-icon color="primary" class="mr-2">{{ icon }} </v-icon> {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions class="d-flex flex-row-reverse">
          <v-btn v-if="!hideSecondaryBotton" outlined class="ml-3" @click="actionCancel">{{ descriptonSecondaryBotton }}</v-btn>
          <v-btn color="primary" @click="actionConfirm">{{ descriptonPrimaryBotton }}</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

    
  </div>  
</template>

<script>
export default {
  name: 'Message',
  model: {
    prop: 'show',
    event: 'onChange'
  },

  props: {
    title: { type: String },
    icon: { type: String, default: 'mdi-alert-outline' },
    message: { type: String, required: true },
    show: { type: Boolean, required: true, default: false },
    confirmCallback: { type: Function, required: false, default: () => {} },
    cancelCallback: { type: Function, required: false, default: () => {} },
    descriptonPrimaryBotton: { type: String, default: 'yes' },
    descriptonSecondaryBotton: { type: String, default: 'no' },
    hideSecondaryBotton: { type: Boolean, default: false }
  },

  methods: {
    closeModal() {
      this.$emit('onChange', false);
    },

    actionCancel() {
      this.cancelCallback(); 
      this.closeModal();
    },

    actionConfirm() {
      this.confirmCallback();
      this.closeModal();
    }
  },
}
</script>

<style>

</style>