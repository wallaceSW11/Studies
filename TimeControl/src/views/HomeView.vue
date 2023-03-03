<template>
  <v-container >
    <header class="d-flex justify-space-around mb-3">
      <v-flex xs3 px-3>
        <mark-time title="Start of work"
        time="08:00"
        ></mark-time>
      </v-flex>

      <v-flex xs3 px-3>
        <mark-time title="Lunch break"
        ></mark-time>
      </v-flex>

      <v-flex xs3 px-3>
        <mark-time title="Lunch return"
        ></mark-time>
      </v-flex>

      <v-flex xs3 px-3>
        <mark-time title="End of day"
        ></mark-time>
      </v-flex>

    </header>

    {{ appointment }} <br>
    {{ appointment.morning() }} <br>
    {{ appointment.afternoon() }} <br>
    {{ appointment.balance() }} <br>



    <v-flex xs12>
      <v-flex xs12 class="d-flex justify-end">

        <v-flex class="field-width mr-3">
          <v-text-field
            label="From"
            v-model="startDate"
            append-icon="mdi-calendar-range"
          ></v-text-field>
        </v-flex>

        <v-flex class="field-width">
          <v-text-field
            label="to"
            v-model="endDate"
            class="xs4"
            append-icon="mdi-calendar-range"
          ></v-text-field>
        </v-flex>




      </v-flex>


      <v-flex>
        <v-data-table
          :headers="headers"
          :items="timeList"
          :items-per-page="5"
          class="elevation-1"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          item-key="id"
          show-expand
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <span>Delay: {{ item.delay }}</span> <br>
              <span>extraHour: {{ item.extraHour }}</span>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-flex>





  </v-container>
</template>

<script>

import Appointment from "@/models/Appointment"
import MarkTime from '@/components/MarkTime.vue';

  export default {
  components: { MarkTime },
    name: 'HomeView',
    data() {
      return {
        startDate: '2022-02-01',
        endDate: '2022-02-28',
        expanded: [],
        singleExpand: false,
        appointment: new Appointment(),
        typeOfTime: [
          {
            id: 0,
            name: 'begin',
            description: 'Begin'
          },
          {
            id: 1,
            name: 'lunch',
            description: 'Lunch'
          },
          {
            id: 2,
            name: 'returnLunch',
            description: 'Return lunch'
          },
          {
            id: 3,
            name: 'theEnd',
            description: 'The End'
          },
          {
            id: 4,
            name: 'startBreak',
            description: 'Start of break'
          },
          {
            id: 5,
            name: 'endBreak',
            description: 'End od break'
          },
        ],
        typeTimeToMark: 0,
        startOfBreak: true,
        timeList: [
          {
            id: 0,
            date: '2023-02-15',
            begin: '09:30',
            lunch: '12:00',
            return: '13:00',
            end: '18:00',
            extraHour: '00:00',
            delay: '00:30',
            totalBreaks: '00:00',
            balance: '- 00:30'
          },
          {
            id: 1,
            date: '2023-02-16',
            begin: '09:05',
            lunch: '12:30',
            return: '13:00',
            end: '18:10',
            extraHour: '00:35',
            delay: '00:00',
            totalBreaks: '00:00',
            balance: '+ 00:35'
          }
        ],
        headers: [
          {
            text: '',
            value: 'data-table-expand'
          },
          {
            text: 'Date',
            align: 'start',
            sortable: false,
            value: 'date',
          },
          {
            text: 'Begin',
            value: 'begin',
            sortable: false
          },
          {
            text: 'Lunch',
            value: 'lunch',
            sortable: false
          },
          {
            text: 'Return',
            value: 'return',
            sortable: false
          },
          {
            text: 'End',
            value: 'end',
            sortable: false
          },
          {
            text: 'Balance',
            value: 'balance',
            sortable: false
          }
        ]
      }
    },

    created () {
      this.appointment.begin = '08:00';
      this.appointment.lunch = '12:30';
      this.appointment.return = '13:30';
      this.appointment.end = '15:30';
    },

    methods: {
      markTime() {
        if  (this.typeTimeToMark < 3) {
          this.typeTimeToMark++;
        }
      },

      markBreak() {
        //
      }
    },
  }
</script>

<style scoped>
.field-width {
  max-width: 120px;
}
</style>