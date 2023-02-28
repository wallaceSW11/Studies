<template>
  <div>
    <v-card >
      <v-card-title class="d-flex justify-center" >
        {{ title }}
      </v-card-title>

      <v-card-text class="text-center" >
        <h1>{{ time }}</h1>
      </v-card-text>

      <v-card-actions class="d-flex justify-center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              color="primary"
              v-on="on"
              @click="() => {}"
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
              @click="() => {}"
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
              @click="() => {}"
              :disabled="time == '__:__'"
            >
              mdi-timer-remove-outline
            </v-icon>
          </template>
          <span>Remove</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </div>



  <!-- <div>
    <v-text-field
          id="field-begin"
          v-model="appointment.begin"
          label="Begin"
          :disabled="false"
        >
          <v-template class="d-flex flex-nowrap" slot="append-outer">
            <v-btn icon @click="() => {}"><v-icon color="primary" >mdi-clock-time-four-outline</v-icon></v-btn>

            <v-icon>mdi-pencil</v-icon>
            <v-icon>mdi-delete</v-icon>
          </v-template>
      </v-text-field>
  </div> -->
</template>

<script>
import Appointment from '@/models/Appointment'
export default {
  name: "MarkTime",
  props: {
    title: { type: String, required: true },
    time: { type: String, default: '__:__' }
  },
  data() {
    return {
      appointment: new Appointment()
    }
  },

}
</script>

<style>

</style>