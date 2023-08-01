<template>
  <v-container class="d-flex flex-column">
    <v-flex xs12 class="d-flex flex-row flex-grow-0 ustify-space-between">
      <v-flex xs2>
        <h2>Miles</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="primary" small @click="addMile"><v-icon>mdi-plus</v-icon>Add</v-btn>
      </v-flex>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="secondary" small @click="addSell" class="ml-4"><v-icon>mdi-currency-usd</v-icon>Sell</v-btn>
      </v-flex>
    </v-flex>

    <v-flex mt-5>
      <v-data-table
        :headers="headers"
        :items="miles"
        :items-per-page="10"
        height="400px"
        class="elevation-1"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ item.dateISO() }}
        </template>

        <template v-slot:[`item.quantity`]="{ item }">
          {{ item.quantity | formatedThousand }}
        </template>

        <template v-slot:[`item.price`]="{ item }">
          {{ item.price | formatedMoney }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editMile(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
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
        <span style="color: #fb8c00">Miles</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs12 md4 pr-md-4>
                <date-picker
                  label="Date"
                  v-model="mile.date"
                ></date-picker>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <v-select
                  :items="typesOfTransaction"
                  :item-text="i => i.title"
                  v-model="mile.type"
                  label="Type"
                  prepend-inner-icon="mdi-swap-horizontal"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pl-md-4>
                <v-select
                  :items="airlines"
                  :item-text="i => i.title"
                  v-model="mile.airline"
                  label="Airline"
                  prepend-inner-icon="mdi-airplane"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pr-md-4>
                <number-field
                  label="Quantity"
                  v-model.number="mile.quantity"
                  icon="mdi-numeric"
                ></number-field>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <currency-field
                  label="Price"
                  v-model="mile.price"
                ></currency-field>
              </v-flex>

              <!-- <v-flex xs12 md6 pr-md-4 pt-md-4>
                <span>Cost Effective</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{mile.costPerThousand() | formatedMoney}}</b></p>
              </v-flex>

              <v-flex xs12 md6 pl-md-4 pt-md-4>
                <span>Bonus (100% transfer)</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{mile.costPerThousand() / 2 | formatedMoney}}</b></p>
              </v-flex> -->

              <!-- <v-flex class="d-flex" xs12>
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
                    v-model="mile.firstInstallment"
                  ></date-picker>
                </v-flex>

                <v-flex xs12 md4 px-md-4>
                  <v-text-field
                    v-model="mile.installmentNumber"
                    label="Number"
                    v-mask="'##'"
                    required
                    reverse
                    class="label-left"
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 md4 pl-md-4>
                  <span>Value</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{mile.installmentValue | formatedMoney}}</b></p>
                </v-flex>
              </v-flex> -->

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

    <!-- <dialog-transfer v-model="openDialogTransfer" :totalMiles="totalMiles" :averageCost="averageCostPerThousand" @transfer="applyTransfer" /> -->

    <confirm-message
      v-model="openConfirmMessage"
      title="Delete mile"
      message="Are you sure?"
      :confirm-callback="deleteItem"
      :cancel-callback="onCancelDelete"
    >

    </confirm-message>


    <!-- <v-footer fixed>
      <v-flex xs12 class="px-md-6">
        <v-flex class="d-flex flex-column">
          <span><b>Summary</b></span>
          <v-flex class="d-flex pl-md-4">
            <v-flex class="d-flex flex-column">
              <span>Total miles: {{ totalMiles | formatedThousand }}</span>
              <span>Total value: {{ totalPrice | formatedMoney }}</span>
            </v-flex>

            <v-flex class="d-flex flex-column">
              <span>Average cost per thousand: {{ averageCostPerThousand | formatedMoney }}</span>
              <span color="primary">Average cost per thousand (bonus): <span class="highlighted-text"> {{ averageCostPerThousandBonus | formatedMoney }}</span></span>
            </v-flex>
          </v-flex>

        </v-flex>
      </v-flex>

    </v-footer> -->
  </v-container>
</template>

<script>
import MileModel from '@/models/MileModel';
import { TYPE_OF_TRANSACTION, TYPES_OF_ENTRIES, HEADERS_MILES, POINTS_PROGRAM, STORAGE_DATA } from '@/constants/point-constants'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import DialogTransfer from '@/components/DialogTransfer.vue';
import NumberField from '@/components/NumberField.vue';
import ConfirmMessage from '@/components/ConfirmMessage.vue';
import storageAPI from '@/service/api/storageAPI'
import moment from 'moment';

export default {
  name: 'MilesView',
  components: {
    DatePicker,
    CurrencyField,
    DialogTransfer,
    NumberField,
    ConfirmMessage
},
  data () {
      return {
        openDialogPoints: false,
        openDialogTransfer: false,
        showInstallment: true,
        keepAddingPoint: true,
        isEditing: false,
        openConfirmMessage: false,
        mile: new MileModel(),
        typesOfTransaction: TYPES_OF_ENTRIES,
        airlines: POINTS_PROGRAM,
        rules: {
          required: value => !!value || 'Required.'
        },
        valid: true,
        headers: HEADERS_MILES,
        miles: []
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
      let pointsStorage = storageAPI.get(STORAGE_DATA.MILES.key);

      if (!pointsStorage) return;

      pointsStorage.map(item => this.miles.push(new MileModel(item)));
    },

    methods: {
      toggleSave(e) {
        e.preventDefault();

        if (!this.$refs.form.validate()) return;

        if (this.isEditing) {
          let index = this.miles.findIndex(item => item.id == this.mile.id);
          this.miles.splice(index, 1, this.mile);

        } else {
          this.mile.id = this.miles.length;
          this.miles.push(this.mile);
        }

        this.mile = new MileModel();
        this.openDialogPoints = !this.isEditing && this.keepAddingPoint;
        this.isEditing = false;
        this.resetValidation();
      },

      toggleCancel() {
        this.openDialogPoints = false;
        this.mile = new MileModel();
        this.isEditing = false;
        this.resetValidation();
      },

      toggleDelete(item) {
        this.mile = new MileModel(item);
        this.openConfirmMessage = true;
      },

      addMile() {
        this.openDialogPoints = true;
      },

      editMile(item) {
        this.openDialogPoints = true;
        this.isEditing = true;
        this.$nextTick(() => this.mile = new MileModel(item));
      },

      deleteItem() {
        this.miles = this.miles.filter(item => item.id !== this.mile.id);
        this.mile = new MileModel();
      },

      onCancelDelete() {
        this.mile = new MileModel();
      },

      addSell() {
        this.openDialogTransfer = true
      },

      updateInstallmentValue() {
        if (this.mile.totalPrice == 0 || this.mile.installmentNumber == 0) {
          this.mile.installmentValue = 0;
          return;
        }

        this.mile.installmentValue = Number((this.mile.totalPrice / this.mile.installmentNumber).toFixed(2));
      },

      resetValidation() {
        this.valid = true;
        this.$refs.form.resetValidation();
      },

      applyTransfer(transfer) {
        this.miles.push(new MileModel(
          {
            id: this.miles.length,
            date: transfer.date,
            type: TYPE_OF_TRANSACTION.TRANSFER.value,
            quantity: transfer.quantity,
            totalPrice: transfer.totalPrice
          }));

          // adicionar no miles
      }
    },

    computed: {
      totalMiles() {
        if (!this.miles.length) return 0;

        return this.miles.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice() {
        if (!this.miles.length) return 0;

        return this.miles.reduce((total, item) => total + item.totalPrice, 0);
      },

      totalcostPerThousand() {
        if (!this.miles.length) return 0;

        return this.miles.reduce((total, item) => total + item.costPerThousand(), 0);
      },

      averageCostPerThousand() {
        if (!this.miles.length) return 0;

        return Number(((this.totalPrice / this.totalMiles)*1000).toFixed(2));
      },

      averageCostPerThousandBonus() {
        return this.averageCostPerThousand / 2;
      }
    },

    watch: {
      miles() {
        storageAPI.save(STORAGE_DATA.POINTS.key, this.miles);
      },

      'mile.installmentNumber'() {
        this.updateInstallmentValue();
      },

      'mile.totalPrice'() {
        this.updateInstallmentValue();
      },

      openDialogPoints(open) {
        if (open) {
          this.valid = true;
          this.keepAddingPoint = !!storageAPI.get(STORAGE_DATA.KEEP_ADDING.key);
          this.$nextTick(() => this.mile.date = moment().format('YYYY-MM-DD') );
        }
      },

      keepAddingPoint(value) {
        storageAPI.save(STORAGE_DATA.KEEP_ADDING.key, !!value);
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
