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
  </div>
</template>

<script>
export default {
  data() {
    return {
      due: null
    }
  },

  props: {
    minDate: { type: Date, default: () => {} },
  },

  computed: {
    actualDate() {
      let today = new Date();
      return today;
    }
  },

  watch: {
    due() {
      this.emitDate();
    }
  },

  methods: {
    emitDate() {
      this.$emit('data', this.due)
    }
  },

}
</script>

<style>

</style>