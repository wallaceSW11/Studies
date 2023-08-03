<template lang="">
  <div>
    <v-text-field
      ref="myinput"
      id="field-number"
      v-model.lazy="internnumber"
      :label="label"
      v-money="{
        decimal: '',
        thousands: '.',
        precision: 0
      }"
      class="label-left"
      reverse
      type="tel"
      :append-icon="icon"
      @change="updateValue"
      autocomplete="off"
      :autofocus="autofocus"
    >

    </v-text-field>
  </div>
</template>
<script>
export default {
  name: 'NumberField',
  model: {
    prop: 'number',
    event: 'onChange'
  },

  props: {
    number: { type: Number, required: true },
    label: { type: String, required: true },
    icon: { type: String, required: true },
    maxWidth: { type: Number, default: 10 },
    autofocus: { type: Boolean, default: false }
  },

  data() {
    return {
      internnumber: undefined
    }
  },

  watch: {
    number(value) {
      this.$refs.myinput.$el.getElementsByTagName('input')[0].value = value;
      this.internnumber = value;
    }
  },

  methods: {
    updateValue(value) {
      value = Number(value && String(value).replace('.', '').replace(',', '.')) || 0
      this.$emit('onChange', value);
    }
  },
}
</script>
<style lang="scss">


</style>