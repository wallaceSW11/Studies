<template>
  <v-dialog
      v-model="open"
      persistent
      :max-width="$vuetify.breakpoint.smAndDown ? '80%' : '60%'"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">{{ text.POINTS_TRANSFER[lang] }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs12 sm4 pr-sm-4>
                <date-picker
                  :label="text.DATE[lang]"
                  v-model="date"
                ></date-picker>
              </v-flex>

              <v-flex xs12 sm4 px-sm-4>
                <number-field
                  :label="text.QUANTITY[lang]"
                  v-model.number="quantity"
                  icon="mdi-numeric"
                  autofocus
                ></number-field>
              </v-flex>

              <v-flex xs12 sm4 pl-sm-4>
                <v-text-field
                  :label="text.BONUS[lang]"
                  v-model.number="bonusPercent"
                  append-icon="mdi-percent"
                  v-mask="'###'"
                  reverse
                  class="label-left"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm4 pr-sm-4>
                <v-select
                  :items="airlinesProgram"
                  :item-text="i => i.title"
                  v-model="airlineProgram"
                  :label="text.AIRLINE[lang]"
                  prepend-inner-icon="mdi-airplane"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 flex-column flex-sm-row d-flex mt-4>
                <v-flex xs12 sm4 pr-sm-4>
                  <title-value
                    :title="text.MILES[lang]"
                    :value="miles"
                    :formatMoney="false"
                  ></title-value>
                </v-flex>
  
                <v-flex xs12 sm4 px-sm-4>
                  <title-value
                    :title="text.COST_PER_THOUSAND[lang]"
                    :value="averageCost"
                  ></title-value>
                </v-flex>
  
                <v-flex xs12 sm4 pl-sm-4>
                  <title-value
                    :title="text.BONUS_COST[lang]"
                    :value="bonusCost"
                  ></title-value>
                </v-flex>
              </v-flex>
            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-flex class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-4" color="primary" @click="toggleSave">{{ text.SAVE[lang] }}</v-btn>
            <v-btn outlined @click="toggleCancel">{{ text.CANCEL[lang] }}</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import NumberField from './NumberField.vue';
import TitleValue from './TitleValue.vue';
import moment from 'moment';
import { AIRLINES_PROGRAM } from '@/constants/global-constants';
import { TEXT } from '@/constants/text';
import language from '@/utils/language';


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
      date: undefined,
      quantity: 0,
      bonusPercent: 0,
      rules: {
        required: value => !!value || 'Required.'
      },
      airlineProgram: undefined,
      airlinesProgram: AIRLINES_PROGRAM,
      text: TEXT,
      lang: language()
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
        quantity: this.quantity,
        totalValue: this.totalValuePoint,
        bonusCost: this.bonusCost,
        airline: this.airlineProgram,
        miles: this.miles
      }

      this.$emit('onChange', !open);
      this.$emit('transfer', transfer);
      this.$refs.form.reset();
    },

    toggleCancel() {
      this.$emit('onChange', !open);
      this.$refs.form.reset();
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

      return Number(((this.quantity/1000)*this.averageCost).toFixed(2));
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