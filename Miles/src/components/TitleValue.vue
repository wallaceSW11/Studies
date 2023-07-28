<template>
  <div>
    <span>{{ title }}</span>
    <p class="text-right mr-2" style="font-size: 18px"><b>{{ valueText }}</b></p>
  </div>  
</template>

<script>
export default {
  name: 'TitleValue',
  props: {
    title: { type: String, required: true },
    value: { type: Number, required: true },
    formatMoney: { type: Boolean, default: true }
  },

  methods: {
    formatedMoney(value) {
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) || 0;
    },

    formatedThousand(value) {
        return value.toLocaleString({
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) || 0;
      }
  },

  computed: {
    valueText() {
      return this.formatMoney ? this.formatedMoney(this.value) : this.formatedThousand(this.value);
    }
  },
}
</script>

<style>

</style>