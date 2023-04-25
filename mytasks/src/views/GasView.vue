<template>
  <v-container>
    <v-flex>
      <v-flex xs12>
        <v-flex>
          <v-text-field
            label="Old Km"
            type="tel"
            v-model="oldkm"
            append-icon="mdi-refresh"
            prepend-icon="mdi-road"
            @click:append="recoveryLastKM"
          >
          </v-text-field>

        </v-flex>
        <v-flex>
          <v-text-field
            label="Current Km"
            type="tel"
            v-model="currentkm"
            prepend-icon="mdi-road-variant"
          >
          </v-text-field>

        </v-flex>
        <v-flex>
          <v-text-field
            label="Gas in liters"
            type="tel"
            v-model="gasInLiters"
            prepend-icon="mdi-gas-station"
          >
          </v-text-field>
        </v-flex>

        <v-flex class="mb-3">
          <v-btn
            width="100%"
            outlined
            color="primary"
            @click="calculate()"
          >
            <v-icon>mdi-calculator</v-icon>
            calculate
          </v-btn>
        </v-flex>

        <v-flex v-if="average">
          <p>Spending average: <strong>{{average}}</strong> km per liter</p>
        </v-flex>

        <v-flex v-if="average">
          <v-btn
            width="100%"
            outlined
            color="primary"
            @click="register()"
          >
            <v-icon>mdi-plus</v-icon>
            Register
          </v-btn>
        </v-flex>

        <v-flex class="mt-3">
          <v-card
            v-for="(item, index) in history"
            :key="index"
            style="border-left: 3px solid blue;"
            class="pa-2 my-3 d-flex flex-row"
          >
            <v-flex class="d-flex flex-column text-right">
              <strong>Old km</strong>
              <span>{{item.oldkm}}</span>
            </v-flex>
            <v-flex class="d-flex flex-column text-right">
              <strong>Current km</strong>
              <span>{{item.currentkm}}</span>
            </v-flex>
            <v-flex class="d-flex flex-column text-center">
              <strong>Gas in liters</strong>
              <span>{{item.gasInLiters}}</span>
            </v-flex>
            <v-flex class="d-flex flex-column text-center">
              <strong>Average</strong>
              <span>{{item.average}}</span>
            </v-flex>

          </v-card>
        </v-flex>

      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      oldkm: undefined,
      currentkm: undefined,
      gasInLiters: undefined,
      average: undefined,
      history: []
      // history: [
      //   { oldkm: 86489, currentkm: 86826, gasInLiters: 42, average: 8.72}
      // ]
    }
  },

  watch: {
    history() {
      localStorage.setItem('historyGas', JSON.stringify(this.history));
    }
  },

  created () {
    let history = JSON.parse(localStorage.getItem('historyGas'));

    if (history) {
      this.history = history;
    }
  },

  methods: {
    calculate() {
      this.average = ((this.currentkm - this.oldkm) / this.gasInLiters).toFixed(2);
    },

    register(){
      this.history.push({
        oldkm: this.oldkm,
        currentkm: this.currentkm,
        gasInLiters: this.gasInLiters,
        average: this.average
      });
      this.clearFields();
    },

    clearFields(){
      this.oldkm = undefined,
      this.currentkm = undefined,
      this.gasInLiters = undefined,
      this.average = undefined
    },

    recoveryLastKM() {
      this.oldkm = this.history[this.history.length-1].currentkm;
    }
  },

}
</script>

<style>

</style>