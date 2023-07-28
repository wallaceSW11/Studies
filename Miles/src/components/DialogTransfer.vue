<template>
  <v-dialog
      v-model="open"
      persistent
      max-width="60%"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">Transfer points</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs4 pr-4>
                <date-picker
                  label="Date"
                  v-model="date"
                ></date-picker>
              </v-flex>

              <v-flex xs4 px-4>
                <number-field
                  label="Quantity"
                  v-model.number="quantity"
                  icon="mdi-numeric"
                ></number-field>
              </v-flex>

              <v-flex xs4 pl-4>
                <number-field
                  label="Bonus"
                  v-model.number="bonusPercent"
                  icon="mdi-percent"
                  :maxWidth="3"
                ></number-field>
              </v-flex>

              <v-flex xs4 pr-4>
                <title-value
                  title="Miles"
                  :value="miles"
                  :formatMoney="false"
                ></title-value>
              </v-flex>

              <v-flex xs4 px-4>
                <title-value
                  title="Average cost"
                  :value="averageCost"
                ></title-value>
              </v-flex>

              <v-flex xs4 px-4>
                <title-value
                  title="Bonus cost"
                  :value="bonusCost"
                ></title-value>
              </v-flex>

            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-flex class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-4" color="primary" @click="toggleSave">Save</v-btn>
            <v-btn outlined @click="toggleCancel">Cancel</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import PointModel from '@/models/PointModel'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import NumberField from './NumberField.vue';
import TitleValue from './TitleValue.vue';
import moment from 'moment';


export default {
  name: 'DialogTransfer',
  props: {
    open: { type: Boolean, default: false },
    totalPoints: { type: Number, required: true },
    averageCost: { type: Number, required: true }
  },
  model: {
    prop: 'open',
    event: 'onChange'
  },

  components: {
    DatePicker,
    CurrencyField,
    NumberField,
    TitleValue
},

  data() {
    return {
      valid: true,
      point: new PointModel(),
      date: undefined,
      quantity: 0,
      bonusPercent: 0,
      rules: {
          required: value => !!value || 'Required.'
        },
    }
  },

  filters: {
      formatedMoney(value) {
        return value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }) || 0;
      }
    }, 

  methods: {
    toggleSave(e) {
      e.preventDefault();

      if (!this.$refs.form.validate()) return;

      let transfer = {
        date: this.date,
        quantity: this.quantity*-1,
        totalValue: this.totalValuePoint
      }

      this.$emit('onChange', !open);
      this.$emit('transfer', transfer);
    },

    toggleCancel() {
      this.$emit('onChange', !open);
    }
  },

  computed: {
    miles() {
      if (!this.quantity || !this.bonusPercent) return 0;

      return Number((((this.bonusPercent / 100)*this.quantity) + this.quantity).toFixed(2));
      
    },

    bonusCost() {
      if (!this.averageCost || !this.bonusPercent) return 0;

      return Number((this.averageCost / ((100 + this.bonusPercent) / 100)).toFixed(2));
    },

    totalValuePoint() {
      if (!this.quantity || !this.averageCost) return 0;

      return Number((((this.quantity/1000)*this.averageCost)*-1).toFixed(2));
    }
  },

  watch: {
    open(newValue) {
      if (newValue) {
        this.$nextTick(() => this.date = moment().format('YYYY-MM-DD')) ;
      }
    }
  },

}
</script>

<style>

</style>