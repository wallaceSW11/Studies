<template>
  <v-container class="d-flex flex-column">
    <v-flex xs12 class="d-flex flex-row flex-grow-0 ustify-space-between">
      <v-flex xs2>
        <h2 class="primary-color">Points</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="primary" small @click="addPoint"><v-icon>mdi-plus</v-icon>Add</v-btn>
      </v-flex>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="secondary" small @click="addTransfer" class="ml-4"><v-icon>mdi-swap-horizontal</v-icon>Transfer</v-btn>
      </v-flex>
    </v-flex>

    <v-flex mt-5>
      <v-data-table
        :headers="headers"
        :items="points"
        :items-per-page="10"
        height="calc(100vh - 300px)"
        class="elevation-1"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ item.dateISO() }}
        </template>

        <template v-slot:[`item.type`]="{ item }">
          {{ typeOfTransaction[item.type].title }}
        </template>

        <template v-slot:[`item.quantity`]="{ item }">
          {{ item.quantity | formatedThousand }}
        </template>

        <template v-slot:[`item.totalValue`]="{ item }">
          {{ item.totalValue | formatedMoney }}
        </template>

        <template v-slot:[`item.costPerThousand`]="{ item }">
          {{ item.costPerThousand() | formatedMoney }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="primary"
            @click="editPoint(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            color="primary"
            @click="toggleDelete(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-flex>

    <v-dialog
      v-model="openDialogPoints"
      persistent
      :max-width="$vuetify.breakpoint.smAndDown ? '80%' : '60%'"
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
                <number-field
                  label="Quantity"
                  v-model.number="point.quantity"
                  icon="mdi-numeric"
                ></number-field>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <currency-field
                  label="Total value"
                  v-model="point.totalValue"
                ></currency-field>
              </v-flex>

              <v-flex xs12 md6 pr-md-4 pt-md-4>
                <span>Cost Effective</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costPerThousand() | formatedMoney}}</b></p>
              </v-flex>

              <v-flex xs12 md6 pl-md-4 pt-md-4>
                <span>Bonus (100% transfer)</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{point.costPerThousand() / 2 | formatedMoney}}</b></p>
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

              <v-flex v-if="!isEditing">
                <v-checkbox label="Keep adding" v-model="keepAddingPoint"></v-checkbox>
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

    <dialog-transfer 
      v-model="openDialogTransfer" 
      :totalPoints="totalPoints" 
      :averageCost="averageCostPerThousand" 
      @transfer="applyTransfer" 
    />

    <message
      v-model="openMessageDelete"
      title="Delete point"
      icon="mdi-help-circle-outline"
      message="Are you sure?"
      :confirm-callback="deleteItem"
      :cancel-callback="onCancelDelete"
    ></message>

    <message
      v-model="openMessageNotEnoughPoint"
      title="Ops, no points avaliable..."
      message="There are no points avaliable to transfer!"
      :confirm-callback="() => {}"
      descriptonPrimaryButton="ok"
      hideSecondaryButton
    ></message>

    <message
      v-model="openMessageDeleteTransfer"
      title="Sorry, you can't edit a transfer"
      message="Please, delete and create a new."
      :confirm-callback="() => {}"
      descriptonPrimaryButton="ok"
      hideSecondaryButton
    ></message>


    <v-footer fixed>
      <v-flex xs12 class="px-md-6">
        <v-flex class="d-flex flex-column">
          <span><b class="primary-color">Summary</b></span>
          <v-flex class="d-flex pl-md-4">
            <v-flex class="d-flex flex-column">
              <span>Total points: {{ totalPoints | formatedThousand }}</span>
              <span>Total value: {{ totalValue | formatedMoney }}</span>
            </v-flex>

            <v-flex class="d-flex flex-column">
              <span>Average cost per thousand: {{ averageCostPerThousand | formatedMoney }}</span>
              <span color="primary">Average cost per thousand (bonus): <span class="highlighted-text"> {{ averageCostPerThousandBonus | formatedMoney }}</span></span>
            </v-flex>
          </v-flex>

        </v-flex>
      </v-flex>

    </v-footer>
  </v-container>
</template>

<script>
import PointModel from '@/models/PointModel';
import { TYPE_OF_TRANSACTION, TYPES_OF_ENTRIES, HEADERS_POINTS, POINTS_PROGRAM, STORAGE_DATA } from '@/constants/point-constants'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import DialogTransfer from '@/components/DialogTransfer.vue';
import NumberField from '@/components/NumberField.vue';
import Message from '@/components/Message.vue';
import storageAPI from '@/service/api/storageAPI'
import moment from 'moment';
import MileModel from '@/models/MileModel';

export default {
  name: 'PointsView',
  components: {
    DatePicker,
    CurrencyField,
    DialogTransfer,
    NumberField,
    Message
},
  data () {
      return {
        openDialogPoints: false,
        openDialogTransfer: false,
        openMessageNotEnoughPoint: false,
        openMessageDeleteTransfer: false,
        showInstallment: true,
        keepAddingPoint: true,
        isEditing: false,
        openMessageDelete: false,
        point: new PointModel(),
        typesOfTransaction: TYPES_OF_ENTRIES,
        typeOfTransaction: TYPE_OF_TRANSACTION,
        pointsProgram: POINTS_PROGRAM,
        rules: {
          required: value => !!value || 'Required.'
        },
        valid: true,
        headers: HEADERS_POINTS,
        points: [],
        miles: [],
        
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
      },

      formatedThousand(value) {
        return value.toLocaleString({
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) || 0;
      }
    },

    beforeMount() {
      this.loadPoints();
      this.loadMiles();
    },

    methods: {
      loadPoints() {
        let pointsStorage = storageAPI.get(STORAGE_DATA.POINTS.key);

        if (!pointsStorage) return;

        pointsStorage.map(item => this.points.push(new PointModel(item)));
      },

      loadMiles() {
        let milesStorage = storageAPI.get(STORAGE_DATA.MILES.key);

        if (!milesStorage) return;

        milesStorage.map(item => this.miles.push(new MileModel(item)));
      },

      toggleSave(e) {
        e.preventDefault();

        if (!this.$refs.form.validate()) return;

        if (this.isEditing) {
          let index = this.points.findIndex(item => item.id == this.point.id);
          this.points.splice(index, 1, this.point);

        } else {
          this.points.push(this.point);
        }

        this.point = new PointModel();
        this.openDialogPoints = !this.isEditing && this.keepAddingPoint;
        this.isEditing = false;
        this.resetValidation();
      },

      toggleCancel() {
        this.openDialogPoints = false;
        this.point = new PointModel();
        this.isEditing = false;
        this.resetValidation();
      },

      toggleDelete(item) {
        this.point = new PointModel(item);
        this.openMessageDelete = true;
      },

      addPoint() {
        this.point = new PointModel();
        this.openDialogPoints = true;
      },

      editPoint(item) {
        if (item.type == TYPE_OF_TRANSACTION.TRANSFER.value) {
          this.openMessageDeleteTransfer = true;
          return;
        }

        this.openDialogPoints = true;
        this.isEditing = true;
        this.$nextTick(() => this.point = new PointModel(item));
      },

      deleteItem() {
        let pointIndex = this.points.findIndex(item => item.id == this.point.id);

        if (pointIndex > -1) {
          this.points.splice(pointIndex, 1);
        }

        let mileIndex = this.miles.findIndex(item => item.pointId == this.point.id);

        if (mileIndex > -1) {
          this.miles.splice(mileIndex, 1);
        }
        
        storageAPI.save(STORAGE_DATA.MILES.key, this.miles);
        this.point = new PointModel();
      },

      onCancelDelete() {
        this.point = new PointModel();
      },

      addTransfer() {
        if (this.totalPoints == 0) {
          this.openMessageNotEnoughPoint = true;
          return;
        }

        this.openDialogTransfer = true
      },

      updateInstallmentValue() {
        if (this.point.totalValue == 0 || this.point.installmentNumber == 0) {
          this.point.installmentValue = 0;
          return;
        }

        this.point.installmentValue = Number((this.point.totalValue / this.point.installmentNumber).toFixed(2));
      },

      resetValidation() {
        this.valid = true;
        this.$refs.form.resetValidation();
      },

      applyTransfer(transfer) {
        let newPoint = new PointModel(
          {
            date: transfer.date,
            type: TYPE_OF_TRANSACTION.TRANSFER.value,
            quantity: transfer.quantity*-1,
            totalValue: (this.totalPoints == transfer.quantity) ? this.totalValue*-1 : transfer.totalValue*-1
          });

        this.points.push(newPoint);

        this.miles.push(new MileModel(
          {
            pointId: newPoint.id,
            date: transfer.date,
            type: TYPE_OF_TRANSACTION.ENTRY_POINTS.value,
            quantity: transfer.miles,
            airline: transfer.airline,
            price: transfer.totalValue
          }
        ));

        storageAPI.save(STORAGE_DATA.MILES.key, this.miles);

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

      totalcostPerThousand() {
        if (!this.points.length) return 0;

        return this.points.reduce((total, item) => total + item.costPerThousand(), 0);
      },

      averageCostPerThousand() {
        if (!this.points.length) return 0;

        let average = Number(((this.totalValue / this.totalPoints)*1000).toFixed(2));
        return isFinite(average) ? average : 0;
      },

      averageCostPerThousandBonus() {
        return Number((this.averageCostPerThousand / 2).toFixed(2));
      },

      tableHeight() {
        return '500px';
      }
    },

    watch: {
      points() {
        storageAPI.save(STORAGE_DATA.POINTS.key, this.points);
      },

      'point.installmentNumber'() {
        this.updateInstallmentValue();
      },

      'point.totalValue'() {
        this.updateInstallmentValue();
      },

      openDialogPoints(open) {
        if (open) {
          this.valid = true;
          this.keepAddingPoint = !!storageAPI.get(STORAGE_DATA.KEEP_ADDING.POINTS.key);
          this.$nextTick(() => this.point.date = moment().format('YYYY-MM-DD') );
        }
      },

      keepAddingPoint(value) {
        storageAPI.save(STORAGE_DATA.KEEP_ADDING.POINTS.key, !!value);
      }
    },


  }
</script>

<style lang="scss" scoped>
::v-deep .label-left .v-label {
  left: 0 !important;
  transform-origin: top left !important;
}

::v-deep .v-btn:focus::before {
  opacity: 0 !important;
}
::v-deep .v-list-item--active:focus::before {
  opacity: 0 !important;
}

.highlighted-text {
  color: #fb8c00;
  text-decoration: underline;
}

</style>