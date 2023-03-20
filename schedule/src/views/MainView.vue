<template>
  <v-container xs12 class="mx-6 my-3 pa-0">
    <title-page title="Schedule"></title-page>

    <v-flex>
      <v-flex xs12 class="ma-0 pa-0 mt-3 d-flex flex-row flex-grow-0">
        <v-flex xs2>
          <date-picker
            :date="selectedDate"
          >
          </date-picker>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs3 class="d-flex align-center">
          <v-btn
            text
            outlined
            color="primary"
            width="100%"
            @click="showDialogSchedule = true"
          ><v-icon class="mr-2">mdi-clock-plus-outline</v-icon>Add schedule
          </v-btn>
        </v-flex>
        <v-flex xs3 class="d-flex align-center mx-3">
          <v-btn
            text
            outlined
            color="primary"
            width="100%"
          ><v-icon class="mr-2">mdi-account-multiple-plus</v-icon>Add Patient
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="hours"
          :items-per-page="10"
          class="elevation-1"
        >
          <template v-slot:[`item.doctorone`]="{ item }">
            <v-menu top offset-y open-on-hover>
              <template v-slot:activator="{on}">
                <v-flex v-on="on" d-flex align-center v-if="item.doctorone">
                  <v-icon>mdi-account-box-outline</v-icon>
                  {{ item.doctorone }}
                </v-flex>
                <v-flex class="ml-0 pl-0" v-if="!item.doctorone">
                  <v-icon color="primary" @click="showDialogSchedule = true">mdi-plus-circle-outline</v-icon>
                  <v-icon color="primary" @click="showDialogSchedule = true">mdi-lock-outline</v-icon>
                  <v-icon color="primary" @click="showDialogSchedule = true">mdi-lock-open-outline</v-icon>
                </v-flex> 

              </template>
              <v-card>
                <v-card-title>
                  Schedule
                </v-card-title>
        
                <v-card-text>
                  <v-flex>
                    Name: {{ item.doctorone }}
                  </v-flex>
                  <v-flex>
                    
                  </v-flex>
        
                  <v-flex>
                    At: {{ item.time }}
                  </v-flex>
        
                  <v-flex>
                    <v-icon small class="px-3">mdi-pencil</v-icon>
                  <v-icon small>mdi-delete</v-icon>
                  </v-flex>
                </v-card-text>
        
                <v-card-actions>
                  <v-btn @click="showPatientCard = false">
                    close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </template>
        </v-data-table>
      </v-flex>
    </v-flex>

    <v-dialog
      style="color: white"
      v-model="showPatientCard"
      max-width="500px"
    >
      <v-card>
        <v-card-title>
          Mr Robson Thombson
        </v-card-title>

        <v-card-text>
          <v-flex>
            Name:
          </v-flex>
          <v-flex>
            
          </v-flex>

          <v-flex>
            At: 09:30
          </v-flex>

          <v-flex>
            <v-icon small class="px-3">mdi-pencil</v-icon>
            <v-icon small>mdi-delete</v-icon>
          </v-flex>
        </v-card-text>

        <v-card-actions>
          <v-btn @click="showPatientCard = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
    v-model="showDialogSchedule"
    persistent
    max-width="600px"
  >    
    <v-card>
      <v-card-title>
        <span class="text-h5">User Profile</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Legal first name*"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Legal middle name"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-text-field
                label="Legal last name*"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Age*"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              sm="6"
            >
              <v-autocomplete
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              ></v-autocomplete>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="showDialogSchedule = false"
          >
          Save
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="showDialogSchedule = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  </v-container>
</template>

<script>
import TitlePage from '@/components/TitlePage.vue';
import DatePicker from '@/components/DatePicker.vue';

export default {
  name: 'MainView',
  components: {
    TitlePage,
    DatePicker
  },

  data () {
      return {
        showPatientCard: false,
        showDialogSchedule: false,
        selectedDate: '2023-03-17',
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