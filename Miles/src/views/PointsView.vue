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
      </v-data-table>
    </v-flex>

    <v-dialog
      v-model="openDialogPoints"
      persistent
      max-width="60%"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">Points</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs12 md4 pr-md-4>
                <date-picker
                  label="Date"
                  v-model="point.date"
                ></date-picker>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <v-select
                  :items="typesOfTransaction"
                  :item-text="i => i.title"
                  v-model="point.type"
                  label="Type"
                  prepend-inner-icon="mdi-swap-horizontal"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pl-md-4>
                <v-select
                  :items="pointsProgram"
                  :item-text="i => i.title"
                  v-model="point.program"
                  label="Program"
                  prepend-inner-icon="mdi-star-four-points"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pr-md-4>
                <v-text-field
                  v-model.number="point.quantity"
                  label="Quantity"
                  append-icon="mdi-numeric"
                  required
                  reverse
                  v-mask="'#######'"
                  class="label-left"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <currency-field
                  label="Total value"
                  v-model="point.totalValue"
                ></currency-field>
              </v-flex>

              <v-flex xs12 md6 pr-md-4 pt-md-4>
                <span>Cost Effective</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costEffective() | formatedMoney}}</b></p>
              </v-flex>

              <v-flex xs12 md6 pl-md-4 pt-md-4>
                <span>Bonus (100% transfer)</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costEffective() / 2 | formatedMoney}}</b></p>
              </v-flex>

              <v-flex class="d-flex" xs12>
                <v-flex class="d-flex flex-grow-0">
                  <h3 style="color: #fb8c00">Installment</h3>
                </v-flex>
                <v-flex>
                  <div style="border-bottom: 1px solid #fb8c00; height: 18px; margin-left: 4px" ></div>
                </v-flex>
                <v-flex class="d-flex flex-grow-0">
                  <v-btn icon @click="showInstallment = !showInstallment"><v-icon color="primary">{{ showInstallment ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline'}}</v-icon></v-btn>
                </v-flex>
              </v-flex>

              <v-flex xs12 v-if="showInstallment" class="d-flex flex-wrap mt-4">
                <v-flex xs12 md4 pr-md-4>
                  <date-picker
                    label="First installment"
                    v-model="point.firstInstallment"
                  ></date-picker>
                </v-flex>

                <v-flex xs12 md4 px-md-4>
                  <v-text-field
                    v-model="point.installmentNumber"
                    label="Number"
                    v-mask="'##'"
                    required
                    reverse
                    class="label-left"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 pl-md-4>
                  <span>Value</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.installmentValue | formatedMoney}}</b></p>
                </v-flex>
              </v-flex>


            </v-container>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-flex class="d-flex">
            <v-spacer></v-spacer>
            <v-btn class="mr-4" color="primary" @click="toggleSave">Save</v-btn>
            <v-btn outlined @click="openDialogPoints = !openDialogPoints">Cancel</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <dialog-transfer :open="openDialogTransfer" />

    <v-footer fixed>
      <v-flex xs12 class="px-md-6">
        <v-flex class="d-flex flex-column">
          <span><b>Summary</b></span>
          <v-flex class="d-flex flex-column pl-md-4">
            <span>Total points: {{ totalPoints }}</span>
            <span>Total value: {{ totalValue | formatedMoney }}</span>
            <span>Total cost effective: {{ totalCostEffective | formatedMoney }}</span>
            <span>Average cost: {{ averageCost | formatedMoney }}</span>
            <span>Average cost bonus: {{ averageCost / 2 | formatedMoney }}</span>
          </v-flex>

        </v-flex>
      </v-flex>

    </v-footer>
  </v-container>
</template>

<script>
import PointModel from '@/models/PointModel';
import { TYPES_OF_ENTRIES, HEADERS_POINTS, POINTS_PROGRAM } from '@/constants/point-constants'
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
        openDialogPoints: false,
        openDialogTransfer: false,
        showInstallment: true,
        point: new PointModel(),
        typesOfTransaction: TYPES_OF_ENTRIES,
        pointsProgram: POINTS_PROGRAM,
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
        this.openDialogPoints = false;
        this.$refs.form.resetValidation();
      },

      addPoint() {
        this.openDialogPoints = true;
      },

      editPoint(item) {
        console.log(item);
      },

      deleteItem(item) {
        console.log(item);
      },

      addTransfer() {
        this.openDialogTransfer = true
      },

      updateInstallmentValue() {
        if (this.point.totalValue == 0 || this.point.installmentNumber == 0) {
          this.point.installmentValue = 0;
          return;
        }

        this.point.installmentValue = Number((this.point.totalValue / this.point.installmentNumber).toFixed(2));
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

    watch: {
      'point.installmentNumber'() {
        this.updateInstallmentValue();
      },

      'point.totalValue'() {
        this.updateInstallmentValue();
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
