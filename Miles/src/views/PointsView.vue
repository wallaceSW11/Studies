<template>
  <v-container class="d-flex flex-column">
    <v-flex xs12 class="d-flex flex-row flex-grow-0 ustify-space-between">
      <v-flex xs2>
        <h2>Points</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex flex-grow-0>
        <v-btn outlined color="primary" @click="addPoint"><v-icon>mdi-plus</v-icon>Add</v-btn>
      </v-flex>
      <v-flex flex-grow-0>
        <v-btn outlined color="secondary" @click="addTransfer" class="ml-4"><v-icon>mdi-swap-horizontal</v-icon>Transfer</v-btn>
      </v-flex>
    </v-flex>

    <v-flex mt-5>
      <v-data-table
        :headers="headers"
        :items="points"
        :items-per-page="10"
        height="400px"
        class="elevation-1"
      >
        <template v-slot:[`item.totalValue`]="{ item }">
          {{ item.totalValue | formatedMoney }}
        </template>

        <template v-slot:[`item.costEffective`]="{ item }">
          {{ item.costEffective() | formatedMoney }}
        </template>


        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editPoint(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <!-- <template v-slot:footer>
          <v-flex xs12 style="border: 1px solid orange">
            <span>Summary</span>
            <p>Total value: </p>
            <p>Total cost ffective: </p>
            <p>Average cost: </p>
          </v-flex>
        </template> -->

      </v-data-table>
    </v-flex>

    <v-dialog
      v-model="openDialog"
      persistent
      max-width="60%"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">Points</span>
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

              <v-flex xs4 px-4>
                <v-select
                  :items="typesOfEntries"
                  :item-text="i => i.title"
                  v-model="point.type"
                  label="Type"
                  prepend-inner-icon="mdi-swap-horizontal"
                  :rules="[rules.required]"
                ></v-select>
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

    <dialog-transfer :open="showDialogTransfer" />

    <v-footer>
      <v-flex xs12>
        <v-flex class="d-flex flex-column">
          <span><b>Summary</b></span>
          <span>Total points: {{ totalPoints }}</span>
          <span>Total value: {{ totalValue | formatedMoney }}</span>
          <span>Total cost effective: {{ totalCostEffective | formatedMoney }}</span>
          <span>Average cost: {{ averageCost | formatedMoney }}</span>
          <span>Average cost bonus: {{ averageCost / 2 | formatedMoney }}</span>
        </v-flex>
      </v-flex>

    </v-footer>
  </v-container>
</template>

<script>
import PointModel from '@/models/PointModel';
import { TYPES_OF_ENTRIES, HEADERS_POINTS } from '@/constants/point-constants'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import DialogTransfer from '@/components/DialogTransfer.vue';

  export default {
    components: {
      DatePicker,
      CurrencyField,
      DialogTransfer
    },

    data () {
      return {
        openDialog: false,
        showDialogTransfer: false,
        point: new PointModel(),
        typesOfEntries: TYPES_OF_ENTRIES,
        rules: {
          required: value => !!value || 'Required.'
        },
        valid: true,
        headers: HEADERS_POINTS,
        points: []
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

    beforeMount () {
      this.points.push(new PointModel({
        date: '31/05/2023',
        type: 'BUY',
        quantity: 9000,
        totalValue: 299.90
      }));

      this.points.push(new PointModel({
        date: '12/06/2023',
        type: 'BUY',
        quantity: 30000,
        totalValue: 1008
      }));

      this.points.push(new PointModel({
        date: '16/06/2023',
        type: 'BUY',
        quantity: 11000,
        totalValue: 346.50
      }));

      this.points.push(new PointModel({
        date: '30/06/2023',
        type: 'BUY',
        quantity: 10500,
        totalValue: 299.90
      }))
    },

    methods: {
      toggleSave(e) {
        e.preventDefault();

        if (!this.$refs.form.validate()) return;

        this.points.push(this.point);
        this.point = new PointModel();
        this.valid = true;
        this.openDialog = false;
        this.$refs.form.resetValidation();
      },

      addPoint() {
        this.openDialog = true;
      },

      editPoint(item) {
        console.log(item);
      },

      deleteItem(item) {
        console.log(item);
      },

      addTransfer() {
        this.showDialogTransfer = true
      }
    },

    computed: {
      totalPoints() {
        if (!this.points.length) return 0;

        return this.points.reduce((total, item) => total + item.quantity, 0);
      },

      totalValue() {
        if (!this.points.length) return 0;

        return this.points.reduce((total, item) => total + item.totalValue, 0);
      },

      totalCostEffective() {
        if (!this.points.length) return 0;

        return this.points.reduce((total, item) => total + item.costEffective(), 0);
      },

      averageCost() {
        if (!this.points.length) return 0;

        return Number(((this.totalValue / this.totalPoints)*1000).toFixed(2));
      }
    },

    
  }
</script>

<style scoped>
::v-deep .label-left .v-label {
  left: 0 !important;
  transform-origin: top left !important;
}
</style>
