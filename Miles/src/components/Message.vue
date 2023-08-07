<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      width="40%"
    >
      <v-flex d-flex flex-column>
        <v-flex xs12 class="d-flex py-3 px-2">
          <v-flex class="d-flex flex-grow-0">
            <v-icon color="primary" class="mr-2">{{ icon }} </v-icon>
          </v-flex>
          <v-flex class="d-flex">
            <span class="title-message"> {{ title }}</span>
          </v-flex>
        </v-flex>

        <v-flex d-flex px-4 py-2>
          {{ message }}
        </v-flex>

        <v-flex class="d-flex flex-row-reverse pa-2">
          <v-btn v-if="!hideSecondaryButton" outlined class="ml-3" @click="actionCancel">{{ descriptonSecondaryButton }}</v-btn>
          <v-btn color="primary" @click="actionConfirm">{{ descriptonPrimaryButton }}</v-btn>
        </v-flex>
      </v-flex>
      <!-- <v-card class="d-flex flex-column">
        <v-card-title v-if="!!title" >
          <v-flex class="d-flex flex-nowrap">
            <v-flex class="d-flex flex-grow-0">
              <v-icon color="primary" class="mr-2">{{ icon }} </v-icon>
            </v-flex>
            <v-flex>
              <span> {{ title }}</span>
            </v-flex>
          </v-flex>
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions class="d-flex flex-row-reverse">
          <v-btn v-if="!hideSecondaryButton" outlined class="ml-3" @click="actionCancel">{{ descriptonSecondaryButton }}</v-btn>
          <v-btn color="primary" @click="actionConfirm">{{ descriptonPrimaryButton }}</v-btn>
        </v-card-actions>
      </v-card> -->
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
    message: { type: String, required: true, default: '' },
    show: { type: Boolean, required: true, default: false },
    confirmCallback: { type: Function, required: false, default: () => {} },
    cancelCallback: { type: Function, required: false, default: () => {} },
    descriptonPrimaryButton: { type: String, default: 'yes' },
    descriptonSecondaryButton: { type: String, default: 'no' },
    hideSecondaryButton: { type: Boolean, default: false }
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

<style lang="scss" scoped>
.title-message {
  font-weight: bold;
}

</style>