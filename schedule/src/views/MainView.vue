<template>
  <v-container>
    <title-page title="Schedule"></title-page>

    <v-main class="ma-0 pa-0 mt-3">
      <v-data-table
        :headers="headers"
        :items="hours"
        :items-per-page="10"
        class="elevation-1"
      >
       <template v-slot:[`item.doctorone`]="{ item }">
        <v-flex d-flex align-center v-if="item.doctorone">
          <v-icon>mdi-account</v-icon>
          {{ item.doctorone }}
          <v-icon small class="px-3">mdi-pencil</v-icon>
          <v-icon small>mdi-delete</v-icon>
        </v-flex>
        <v-flex v-if="!item.doctorone">
          <v-btn
            icon
            outlined
          >
          <v-icon>mdi-plus</v-icon>

          </v-btn>
        </v-flex>
       </template>


    </v-data-table>

    </v-main>


  </v-container>
</template>

<script>
import TitlePage from '@/components/TitlePage.vue';

export default {
  name: 'MainView',
  components: {
    TitlePage,
  },

  data () {
      return {
        headers: [
          {
            text: 'Time',
            align: 'start',
            sortable: false,
            value: 'time',
          },
          { text: 'Doctor Paul', sortable: false, value: 'doctorone' },
          { text: 'Doctor Curl', sortable: false, value: 'doctortwo' }
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
        ],
      }
    },
 
}
</script>

<style lang="scss" scoped>
::v-deep tr {
  cursor: pointer;
}

</style>