<template>
  <div>
    <v-menu
      v-model="showCalendar"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="dateText"
          :label="label"
          prepend-inner-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="dateValue"
        no-title
        @input="showCalendar = false"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment/moment";

  export default {
    name: 'DatePricker',
   data() {
    return {
      showCalendar: false,
      dateValue: undefined
    }
   },

    model: {
      prop: 'date',
      event: "onChange"
    },

    props: {
      label: { type: String, required: true },
      date: { type: String }
    },

    watch: {
      dateValue() {
        this.$emit('onChange', this.dateValue);
      },

      date(value) {
        this.dateValue = value && moment(value).format('YYYY-MM-DD') || '';
      }
    },

    computed: {
      dateText() {
        return this.dateValue && moment(this.dateValue).format('DD/MM/YYYY') || '';
      }
    },

    
  }
</script>