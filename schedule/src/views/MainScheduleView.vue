<template>
  <v-flex class="ma-3">
    <v-menu offset-x>
      <template v-slot:activator="{on}">
        <h1 v-on="on" style="color: #03a9f4; cursor: pointer">{{ selectedDateDescription }}</h1>
      </template>
      <v-date-picker
        v-model="selectedDateString"
        type="month"
        no-title
      ></v-date-picker>
    </v-menu>

    <v-tabs
      v-model="tab"
      show-arrows
      centered
      icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab
        v-for="day in daysMonth"
        :key="day.number"
        class="d-flex flex-column flex-grow-0 flex-shrink-0 ma-0 pa-0"
      >
        <h3 class="ma-0 pa-0">{{ day.number }}</h3><br>
        <span class="ma-0 pa-0" style="font-size: 8px">{{ day.day }}</span>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="num in daysMonth.length"
        :key="num"
      >
        <v-card
          xs12 class="d-flex flex-row align-center ma-2 pa-2" style="border-left: 3px solid blue"
          v-for="(item, index) in hours"
          :key="index"
          :class="{ 'blocked-schedule' : item.locked }"
        >
          <v-flex xs2>
            {{ item.time }}
          </v-flex>
          <v-flex xs6 v-if="item.doctorone" style="cursor: pointer" class="d-flex align-center">
            <v-icon>mdi-account-box-outline</v-icon> {{ item.doctorone }}
          </v-flex>
          <v-flex class="ml-0 pl-0" v-if="!item.doctorone">
            <icon-tooltip v-if="!item.locked" icon="mdi-plus-circle-outline" tooltip="Add schedule" @clicked="() => {}" />
            <icon-tooltip v-if="!item.locked" icon="mdi-lock-outline" tooltip="Lock schedule" @clicked="() => {}" />
            <icon-tooltip v-if="item.locked" icon="mdi-lock-open-outline" tooltip="Unlock schedule" @clicked="() => {}" />
          </v-flex>
          <v-flex xs2>
            <v-chip small :color="getColor(item.type)">
              <span>{{ item.type }}</span>
            </v-chip>
          </v-flex>
          <v-flex xs2>
            <v-icon small class="px-3">mdi-pencil</v-icon>
            <v-icon small>mdi-delete</v-icon>
          </v-flex>

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-flex>
</template>

<script>
/* eslint-disable */
import { day_one, day_two } from "@/service/api/localdata/db";
import moment from 'moment';
import IconTooltip from '@/components/IconTooltip.vue';

  export default {
    components: { IconTooltip },

    data () {
      return {
        tab: 0,
        isHovering: false,
        hours: [],
        selectedDate: undefined,
        selectedDateString: undefined,
      }
    },

    mounted () {
      this.selectedDate = new Date();
      this.selectedDateString = this.selectedDate.toJSON();
      this.setTab();
    },

    watch: {
      selectedDateString(newValue) {
        this.selectedDate = moment(newValue);
        this.setTab();
      },

      tab(newValue) {
        // get on API
        this.hours = newValue % 2 == 0 ? day_one : day_two;
      }
    },

    computed: {
      daysMonth() {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        var date = new Date(this.selectedDate);
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getUTCDate();
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getUTCDate();
        let days = [];

        for (let index = firstDay; index <= lastDay; index++) {
          days.push({
            number: index,
            day: weekday[new Date(`${date.getFullYear()}-${date.getMonth()}-${index}-`).getDay()]
          });
        }

        return days;
      },

      selectedDateDescription() {
        if (!this.selectedDate) return;
        return moment(this.selectedDate).format('MMMM-YYYY');
      }
    },

    methods: {
      setTab() {
        this.tab = (moment(this.selectedDate).format('MM') == moment().format('MM'))
        ? moment().format('DD')-1
        : 0;
      },

      getColor(type) {
        switch (type) {
          case "Revision":
            return 'yellow'
          case "Initial":
            return 'green'
          case "Check-up":
            return 'light-blue'
          default:
            return 'ligth-gray';
        }
      }
    },
  }
</script>

<style lang="scss" scoped>
.blocked-schedule {
  background-color: lightgrey;
}

</style>