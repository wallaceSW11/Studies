<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      width="40%"
    >
      <v-flex d-flex flex-column class="background">
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
  </v-dialog>

    
  </div>  
</template>

<script>
import { TEXT } from '@/constants/text';
import language from '@/utils/language';

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
    descriptonPrimaryButton: { type: String, default: TEXT.YES[language()] },
    descriptonSecondaryButton: { type: String, default: TEXT.NO[language()] },
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

.background {
  background-color: $background-color;
}

</style>