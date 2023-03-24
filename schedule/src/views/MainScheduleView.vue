<template>
  <v-flex class="ma-3">
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
        v-for="num in 5"
        :key="num"
      >
        <v-card
          xs12 class="d-flex flex-row ma-2 pa-2" style="border-left: 3px solid blue"
          v-for="(item, index) in hours"
          :key="index"
          link
        >
          <v-flex xs2>
            {{ item.time }}
          </v-flex>
          <v-flex xs6 v-if="item.doctorone">{{ item.doctorone }}</v-flex>
          <v-flex class="ml-0 pl-0" v-if="!item.doctorone">
            <v-icon color="primary" @click="showDialogSchedule = true">mdi-plus-circle-outline</v-icon>
            <v-icon color="primary" @click="showDialogSchedule = true">mdi-lock-outline</v-icon>
            <v-icon color="primary" @click="showDialogSchedule = true">mdi-lock-open-outline</v-icon>
          </v-flex> 
          <v-flex xs2>
            <v-icon small class="px-3">mdi-pencil</v-icon>
            <v-icon small>mdi-delete</v-icon>
          </v-flex>
          <v-flex xs2></v-flex>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-flex>
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        isHovering: false,
        dates: [
          { number: '01', day: 'Sunday'},
          { number: '02', day: 'Monday'},
          { number: '03', day: 'Tuesday'},
          { number: '04', day: 'Wednesday'},
          { number: '05', day: 'Thursday'},
          { number: '06', day: 'Friday'},
          { number: '07', day: 'Saturday'},

        ],
        hours: [
          {
            time: '08:00',
            doctorone: 'Mr Rodrigues',
            doctortwo: ''
          },
          {
            time: '08:30',
            doctorone: '',
            doctortwo: 'Ms Mellis'
          },
          {
            time: '09:00',
            doctorone: '',
            doctortwo: ''
          },
          {
            time: '09:30',
            doctorone: 'Mr Robson',
            doctortwo: 'Ms Kelly'
          },
          {
            time: '10:00',
            doctorone: '',
            doctortwo: 'Mr Uncle'
          },
          {
            time: '10:30',
            doctorone: '',
            doctortwo: ''
          },
          {
            time: '11:00',
            doctorone: '',
            doctortwo: ''
          },
          {
            time: '11:30',
            doctorone: 'Mr Rodolf',
            doctortwo: ''
          },
          {
            time: '12:00',
            doctorone: 'Mr Paul',
            doctortwo: 'Mr Richard'
          }
        ]
      }
    },

    mounted () {
      // para parar no dia atual.
      // this.tab = Number(new Date().toJSON().substring(8, 10))-1;
    },

    computed: {
      daysMonth() {
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        var date = new Date();
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
      }
    },
  }
</script>

<style>

</style>