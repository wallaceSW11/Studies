<template>
  <v-container class="d-flex flex-column">
    <v-flex xs12 class="d-flex flex-row flex-grow-0 ustify-space-between">
      <v-flex xs2>
        <h2>Points</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex flex-grow-0>
        <v-btn outlined color="primary" @click="openDialog = !openDialog"><v-icon>mdi-plus</v-icon>Add</v-btn>
      </v-flex>
    </v-flex>

    <v-flex mt-5>
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
    </v-flex>  
    
    <v-dialog
      v-model="openDialog"
      persistent
      max-width="80%"
    >
      <v-card>
        <v-card-title>
          Points
        </v-card-title>

        <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="firstname"
                    :counter="10"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>
        
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="lastname"
                    :counter="10"
                    label="Last name"
                    required
                  ></v-text-field>
                </v-col>
        
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    v-model="email"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
          <v-flex>
            <v-btn color="primary" @click="openDialog = !openDialog">Save</v-btn>
            <v-btn outlined @click="openDialog = !openDialog">Cancel</v-btn>
          </v-flex>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {

    data () {
      return {
        openDialog: false,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        valid: undefined,

        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
      }
    },
  }
</script>

<style scoped>
.opa {
  background-color: red;
  display: flex;
  flex-direction: row;
}
</style>
