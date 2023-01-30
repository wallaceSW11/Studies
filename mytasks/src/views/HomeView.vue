<template>
  <v-container style="max-width: 1500px">
    <v-layout xs12 sm8 md6 class="d-flex column">
      <v-flex>
        <v-text-field
          label="I need to do..."
          v-model="title"
          prepend-icon="mdi-calendar-check"
        ></v-text-field>
      </v-flex>
      <v-flex>
        <v-textarea
          label="Tell more about this (optional)..."
          v-model="description"
          rows="2"
          prepend-icon="mdi-comment"
          @click:append="addToDo"
        ></v-textarea>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex mb-4>
        <v-btn color="primary" @click="addToDo" block>Add</v-btn>
      </v-flex>
    </v-layout>
    <v-divider />
    <h4 class="text-center">What I have to do:</h4>
    <v-divider />

    <v-card v-for="todo in todos" :key="todo.title" class="my-3 pa-2">
      <v-layout>
        <v-flex xs10 sm4>
          <div class="caption">Title</div>
          <span>{{ todo.title }}</span>
        </v-flex>
        <v-flex sm4 mx-3 class="hidden-xs-only">
          <div class="caption">Description</div>
          <span>{{ todo.description }}</span>
        </v-flex>
        <v-flex sm3 class="hidden-xs-only">
          <div class="caption">Created</div>
          <span>{{ todo.createdAt }}</span>
        </v-flex>
        <v-flex xs1 sm2 class="d-flex justify-center align-center">
          <span>
            <v-icon v-if="todo.done" color="green">mdi-check</v-icon>
            <v-icon v-else color="red">mdi-clock-alert-outline</v-icon>
          </span>
        </v-flex>
      </v-layout>
    </v-card>

    <v-footer
      padless
      fixed
    >
      <v-card
        flat
        tile
        width="100%"
        class="primary lighten-1 text-center"
      >

        <v-card-text class="white--text py-2">

          <v-flex class="d-flex justify-center align-center">
            <v-icon color="white" class="mr-2">mdi-clock-alert-outline</v-icon>
            <span>TO</span>
            <span class="font-weight-light">DO: {{ totalTasksToDo }}</span>
          </v-flex>

        <v-flex class="d-flex justify-center align-center">
          <v-icon color="white" class="mr-3">mdi-check</v-icon>
          <span style="font-size: .8rem"><s>DONE</s>: {{ totalTasksDone }}</span>
        </v-flex>

        </v-card-text>
      </v-card>
    </v-footer>

  </v-container>
</template>

<script>

export default {
  name: "HomeView",
  data() {
    return {
      title: undefined,
      description: undefined,
      totalTasksDone: 0,
      totalTasksToDo: 0,
      todos: [
        {
          title: "Create a new TO DO APP",
          description: "I need to study VueJS",
          done: true,
          createdAt: "2023-01-24T20:22:00",
        },
        {
          title: "Clean the bathroon",
          description: "Visits are comming",
          done: false,
          createdAt: "2023-01-24T20:22:00",
        },
        {
          title: "Do the dishes",
          description: "lets keeping clean",
          done: false,
          createdAt: "2023-01-24T20:30:00",
        },
      ],
    };
  },

  created () {
    this.calculateTodos();
  },

  methods: {
    addToDo() {
      this.todos.push({ title: this.title, description: this.description, done: false, createdAt: this.today() });
      this.calculateTodos();
      this.title = "";
      this.description = "";
    },

    today() {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      return today.toISOString();
    },

    tamanhoTela(){
      return `${window.screen.width} x ${window.screen.height}`;
    },

    tamanhoDisponivel(){
      return `${window.innerWidth} x ${window.innerHeight}`
    },

    calculateTodos() {
      this.totalTasksToDo = 0;
      this.totalTasksDone = 0;

      for(var i = 0; i < this.todos.length; i++){
        if (this.todos[i].done) {
          this.totalTasksDone += 1;
        } else {
          this.totalTasksToDo += 1;
        }
      }

    }
  },
};
</script>

<style scoped>

</style>
