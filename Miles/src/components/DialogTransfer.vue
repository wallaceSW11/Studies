<template>
  <v-dialog
      v-model="openDialog"
      persistent
      max-width="60%"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">Transfer</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs4 pr-4>
                <date-picker
                  label="Date"
                  v-model="point.date"
                ></date-picker>
              </v-flex>

              <v-flex xs4 pl-4>
                <v-text-field
                  v-model="point.quantity"
                  label="Quantity"
                  append-icon="mdi-numeric"
                  required
                  reverse
                  v-mask="'#######'"
                  class="label-left"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>

              <v-flex xs4 pr-4>
                <currency-field
                  label="Total value"
                  v-model="point.totalValue"
                ></currency-field>
              </v-flex>

              <v-flex xs4 pl-4>
                <span>Cost Effective:</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costEffective() | formatedMoney}}</b></p>
              </v-flex>

              <v-flex xs4 pl-4>
                <span>Bonus (100% transfer)</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costEffective() / 2 | formatedMoney}}</b></p>
              </v-flex>

              <!-- TODO: Transform into component -->
              <v-flex class="d-flex" xs12>
                <v-flex class="d-flex flex-grow-0">
                  <h3 style="color: #fb8c00">Installment</h3>
                </v-flex>
                <v-flex>
                  <div style="border-bottom: 1px solid #fb8c00; height: 18px; margin-left: 4px" ></div>
                </v-flex>
              </v-flex>

              <v-flex xs6 pr-4 mt-4>
                <v-text-field
                  v-model="point.installmentNumber"
                  label="Installment number"
                  v-mask="'##'"
                  required
                  reverse
                  class="label-left"
                ></v-text-field>
              </v-flex>

              <v-flex xs6 pl-4 mt-4>
                <date-picker
                  label="First installment"
                  v-model="point.firstInstallment"
                ></date-picker>
              </v-flex>

            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-flex class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-4" color="primary" @click="toggleSave">Save</v-btn>
            <v-btn outlined @click="openDialog = !openDialog">Cancel</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import PointModel from '@/models/PointModel'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';

export default {
  props: {
    open: { type: Boolean, default: false },
  },

  components: {
    DatePicker,
    CurrencyField
  },

  data() {
    return {
      openDialog: false,
      valid: true,
      point: new PointModel(),
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

  watch: {
    open(value) {
      this.openDialog = value
    }
  },

  methods: {
    toggleSave() {
      this.openDialog = false;
    }
  },

}
</script>

<style>

</style>