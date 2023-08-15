<template>
  <v-container class="d-flex flex-column">
    <v-flex xs12 class="d-flex flex-row flex-grow-0 ustify-space-between">
      <v-flex xs2>
        <h2 class="primary-color">{{ text.MILES[lang] }}</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="primary" small @click="addMile"><v-icon>mdi-plus</v-icon>{{ text.ADD[lang] }}</v-btn>
      </v-flex>
      <v-flex flex-grow-0 class="d-flex align-center">
        <v-btn outlined color="secondary" small @click="addSell" class="ml-4"><v-icon>mdi-currency-usd</v-icon>{{ text.SELL[lang] }}</v-btn>
      </v-flex>
    </v-flex>

    <v-flex mt-5>
      <v-data-table
        :headers="headers"
        :items="miles"
        :items-per-page="10"
        height="calc(100vh - 300px)"
        class="elevation-1"
      >
        <template v-slot:[`item.date`]="{ item }">
          {{ item.dateISO() }}
        </template>

        <template v-slot:[`item.type`]="{ item }">
          {{ transactionType[item.type].title || item.title }}
        </template>

        <template v-slot:[`item.quantity`]="{ item }">
          {{ item.quantity | formatedThousand }}
        </template>

        <template v-slot:[`item.airline`]="{ item }">
          {{ airline[item.airline].title }}
        </template>

        <template v-slot:[`item.price`]="{ item }">
          {{ item.price | formatedMoney }}
        </template>

        <template v-slot:[`item.costPerThousand`]="{ item }">
          {{ item.costPerThousand() | formatedMoney }}
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            color="primary"
            @click="editMile(item)"
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
      v-model="openDialogMiles"
      persistent
      :max-width="$vuetify.breakpoint.smAndDown ? '80%' : '60%'"
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title>
        <span style="color: #fb8c00">{{ text.MILES[lang] }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="d-flex flex-wrap">
              <v-flex xs12 md4 pr-md-4>
                <date-picker
                  :label="text.DATE[lang]"
                  v-model="mile.date"
                ></date-picker>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <v-select
                  :items="transactionTypes"
                  :item-text="i => i.title"
                  v-model="mile.type"
                  :label="text.TRANSACTION[lang]"
                  prepend-inner-icon="mdi-swap-horizontal"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pl-md-4>
                <v-select
                  :items="airlines"
                  :item-text="i => i.title"
                  v-model="mile.airline"
                  :label="text.AIRLINE[lang]"
                  prepend-inner-icon="mdi-airplane"
                  :rules="[rules.required]"
                ></v-select>
              </v-flex>

              <v-flex xs12 md4 pr-md-4>
                <number-field
                  :label="text.QUANTITY[lang]"
                  v-model.number="mile.quantity"
                  icon="mdi-numeric"
                ></number-field>
              </v-flex>

              <v-flex xs12 md4 px-md-4>
                <currency-field
                  :label="text.PRICE[lang]"
                  v-model="mile.price"
                ></currency-field>
              </v-flex>

              <v-flex xs12 md4 pl-md-4>
                <span>{{ text.COST_PER_THOUSAND[lang] }}</span>
                <p class="text-right mr-2" style="font-size: 18px"> <b>{{ mile.costPerThousand() | formatedMoney }}</b></p>
              </v-flex>

              <v-flex v-if="!isEditing">
                <v-checkbox :label="text.KEEP_ADDING[lang]" v-model="keepAddingPoint"></v-checkbox>
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

    <message
      v-model="openMessage"
      :title="titleMessage"
      :message="descriptionMessage"
      :confirm-callback="actionConfirmMessage"
      :hide-secondary-button="hideSecondaryButton"
      :descripton-primary-button="descriptionPrimaryButton"
    ></message>

    <v-footer fixed>
      <v-flex xs12 class="px-md-6">
        <v-flex class="d-flex flex-column">
          <span><b class="primary-color">{{ text.SUMMARY[lang] }}</b></span>
          <v-flex class="d-flex pl-md-4">
            <v-flex class="d-flex flex-column">
              <span>{{ text.TOTAL_MILES[lang] + ':' }} {{ totalMiles | formatedThousand }}</span>
              <span>{{ text.TOTAL_VALUE[lang] + ':' }} {{ totalPrice | formatedMoney }}</span>
              <span>{{ text.AVERAGE_COST_PER_MILES[lang] + ':' }} {{ totalCostPerThousand | formatedMoney }}</span>
            </v-flex>
          </v-flex>
        </v-flex>
      </v-flex>

    </v-footer>
  </v-container>
</template>

<script>
import MileModel from '@/models/MileModel';
import { TRANSACTION_TYPE, TRANSACTION_TYPES, HEADERS_MILES, AIRLINES_PROGRAM, AIRLINE_PROGRAM } from '@/constants/global-constants'
import DatePicker from '@/components/DatePicker.vue';
import CurrencyField from '@/components/CurrencyField.vue';
import DialogTransfer from '@/components/DialogTransfer.vue';
import NumberField from '@/components/NumberField.vue';
import Message from '@/components/Message.vue';
import storageAPI from '@/service/api/storageAPI'
import moment from 'moment';
import { TEXT } from '@/constants/text';
import language from '@/utils/language';
import STORAGE_DATA from '@/constants/storage-constants';

export default {
  name: 'MilesView',
  components: {
    DatePicker,
    CurrencyField,
    DialogTransfer,
    NumberField,
    Message
},
  data () {
      return {
        openDialogMiles: false,
        openDialogTransfer: false,
        showInstallment: true,
        keepAddingPoint: true,
        isEditing: false,
        mile: new MileModel(),
        transactionTypes: TRANSACTION_TYPES,
        transactionType: TRANSACTION_TYPE,
        airlines: AIRLINES_PROGRAM,
        airline: AIRLINE_PROGRAM,
        rules: {
          required: value => !!value || 'Required.'
        },
        valid: true,
        headers: HEADERS_MILES,
        miles: [],
        titleMessage: undefined,
        descriptionMessage: undefined,
        openMessage: false,
        actionConfirmMessage: undefined,
        actionCancelMessage: undefined,
        hideSecondaryButton: false,
        descriptionPrimaryButton: undefined,
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
      },

      formatedThousand(value) {
        return value.toLocaleString({
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }) || 0;
      }
    },

    beforeMount() {
      let milesStorage = storageAPI.get(STORAGE_DATA.MILES.key);

      if (!milesStorage) return;

      milesStorage.map(item => this.miles.push(new MileModel(item)));
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
        this.openDialogMiles = !this.isEditing && this.keepAddingPoint;
        this.isEditing = false;
        this.resetValidation();
      },

      toggleCancel() {
        this.openDialogMiles = false;
        this.mile = new MileModel();
        this.isEditing = false;
        this.resetValidation();
      },

      toggleDelete(item) {
        if (item.type == TRANSACTION_TYPE.ENTRY_BY_TRANSFER.value) {
          this.titleMessage = this.text.CANT_DELETE_MILES_FROM_POINTS[this.lang];
          this.descriptionMessage = this.text.DELETE_BY_POINTS_PAGE[this.lang];
          this.hideSecondaryButton = true;
          this.descriptionPrimaryButton = 'OK';
          this.openMessage = true;
          this.actionConfirmMessage = this.clearMessage;
          return;
        }

        this.mile = new MileModel(item);
        this.titleMessage = this.text.DETELE_MILES[this.lang];
        this.descriptionMessage = this.text.ARE_YOU_SURE[this.lang];
        this.openMessage = true;
        this.actionConfirmMessage = this.deleteItem;
      },

      addMile() {
        this.openDialogMiles = true;
      },

      editMile(item) {
        if (item.type == TRANSACTION_TYPE.ENTRY_BY_TRANSFER.value) {
          this.titleMessage = this.text.CANT_EDIT_TRANSFER_FROM_POINTS[this.lang];
          this.descriptionMessage = this.text.DELETE_BY_POINTS_PAGE[this.lang];
          this.hideSecondaryButton = true;
          this.descriptionPrimaryButton = 'OK';
          this.openMessage = true;
          this.actionConfirmMessage = this.clearMessage;
          return;
        }

        this.openDialogMiles = true;
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
            type: TRANSACTION_TYPE.TRANSFER.value,
            quantity: transfer.quantity,
            totalPrice: transfer.totalPrice
          }));

          // adicionar no miles
      },

      clearMessage() {
        this.titleMessage = undefined;
        this.descriptionMessage = undefined;
        this.hideSecondaryButton = false;
        this.descriptionPrimaryButton = undefined;
      }
    },

    computed: {
      totalMiles() {
        if (!this.miles.length) return 0;

        return this.miles.reduce((total, item) => total + item.quantity, 0);
      },

      totalPrice() {
        if (!this.miles.length) return 0;

        return this.miles.reduce((total, item) => total + item.price, 0);
      },

      totalCostPerThousand() {
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
        storageAPI.save(STORAGE_DATA.MILES.key, this.miles);
      },

      'mile.installmentNumber'() {
        this.updateInstallmentValue();
      },

      'mile.totalPrice'() {
        this.updateInstallmentValue();
      },

      openDialogMiles(open) {
        if (open) {
          this.valid = true;
          this.keepAddingPoint = !!storageAPI.get(STORAGE_DATA.CONFIGURATIONS.KEEP_ADDING.MILES.key);
          this.$nextTick(() => this.mile.date = moment().format('YYYY-MM-DD') );
        }
      },

      keepAddingPoint(value) {
        storageAPI.save(STORAGE_DATA.CONFIGURATIONS.KEEP_ADDING.MILES.key, !!value);
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
