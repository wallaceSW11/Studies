<template>
  <div>
    <v-card >
      <v-card-title class="d-flex justify-center" >
        <span style="color: #1976d2">{{ title }}</span>
      </v-card-title>

      <v-card-text class="text-center" >
        <h1 style="color: #113b64" >{{ time }}</h1>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              color="primary"
              v-on="on"
              @click="markDown"
              :disabled="time !== '__:__'"
            >
              mdi-timer-play-outline
            </v-icon>
          </template>
          <span>Start</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mx-3"
              color="primary"
              v-on="on"
              @click="() => showDialog = true"
              :disabled="time == '__:__'"
            >
              mdi-timer-edit-outline
            </v-icon>
          </template>
          <span>Edit</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              color="primary"
              v-on="on"
              @click="removeMark"
              :disabled="time == '__:__'"
            >
              mdi-timer-remove-outline
            </v-icon>
          </template>
          <span>Remove</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>


    <v-dialog
      v-model="showDialog"
      max-width="250px"
    >
      <v-card>
        <v-card-title>
          <h2>Start to work</h2>
        </v-card-title>

        <v-card-text class="d-flex justify-center" >
          <v-text-field
            style="max-width: 50px"
            class="text-center"
            height="20px"
            v-model="time"
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="d-flex justify-center">
          <v-btn
            @click="() => showDialog = !showDialog"
          > OK
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
// import Appointment from '@/models/Appointment'

const EMPTY_TIME = '__:__';
export default {
  name: "MarkTime",
  props: {
    title: { type: String, required: true },
    // time: { type: String, default: '__:__' }
  },
  data() {
    return {
      time: EMPTY_TIME,
      showDialog: false
    }
  },

  methods: {
    markDown() {
      let timeNow = new Date();
      this.time = `${timeNow.getHours()}:${timeNow.getMinutes()}`;
    },

    editMark() {
      //
    },

    removeMark() {
      this.time = EMPTY_TIME
    }



  },

}
</script>

<style>

</style>