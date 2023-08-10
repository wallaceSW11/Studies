<template>
  <v-container>
    <v-flex>
      <h2 class="primary-color">Dashboard</h2>
    </v-flex>

    <v-flex xs12 d-flex flex-column>
      <v-flex>
        <h3>Points</h3>
        <hr/>
      </v-flex>
      <v-flex class="d-flex justify-center flex-wrap">
        <summary-card
          v-for="program in pointsProgram"
          :key="program.title"
          :title="program.title"
          :value="points.filter(item => item.program == program.value && item.type != 'TRASNFER').reduce((total, point) => total + point.quantity, 0)"
          :image="program.image"
          icon="mdi-numeric-10-circle-outline"
        ></summary-card>
      </v-flex>
    </v-flex>

    <v-flex xs12 d-flex flex-column>
      <v-flex>
        <h3>Miles</h3>
        <hr/>
      </v-flex>
      <v-flex class="d-flex justify-center flex-wrap">
        <summary-card
          v-for="airline in airlines"
          :key="airline.title"
          :title="airline.title"
          :value="miles.filter(item => item.airline == airline.value).reduce((total, airline) => total + airline.quantity, 0)"
          :image="airline.image"
          icon="mdi-numeric-10-circle-outline"
        ></summary-card>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import SummaryCard from '@/components/SummaryCard.vue';
import { AIRLINES_PROGRAM, POINTS_PROGRAM, STORAGE_DATA } from '@/constants/global-constants';
import storageAPI from '@/service/api/storageAPI';
import PointModel from '@/models/PointModel';
import MileModel from '@/models/MileModel';

export default {
  name: 'DashboarView',
  components: {
    SummaryCard
  },

  data() {
    return {
      miles: [],
      points: [],
      pointsProgram: POINTS_PROGRAM,
      airlines: AIRLINES_PROGRAM
    }
  },

  mounted () {
    this.loadPoints();
    this.loadMiles();
  },

  methods: {
    loadPoints() {
        let pointsStorage = storageAPI.get(STORAGE_DATA.POINTS.key);

        if (!pointsStorage) return;

        pointsStorage.map(item => this.points.push(new PointModel(item)));
      },

      loadMiles() {
        let milesStorage = storageAPI.get(STORAGE_DATA.MILES.key);

        if (!milesStorage) return;

        milesStorage.map(item => this.miles.push(new MileModel(item)));
      }
  }
}
</script>

<style lang="scss" scoped>

</style>
