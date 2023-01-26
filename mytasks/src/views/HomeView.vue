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
        <v-btn color="primary" @click="addToDo" block>Save</v-btn>
      </v-flex>
    </v-layout>
    <v-divider />
    <h4 class="text-center">What I have to do:</h4>
    <v-divider />

    <v-card v-for="todo in todos" :key="todo.title" class="my-3 pa-2">
      <v-layout>
        <v-flex xs3>
          <div class="caption">Title</div>
          <span>{{ todo.title }}</span>
        </v-flex>
        <v-flex xs6 mx-3>
          <div class="caption">Description</div>
          <span>{{ todo.description }}</span>
        </v-flex>
        <v-flex xs2 class="hidden-xs-only">
          <div class="caption">Created</div>
          <span>{{ todo.addAt }}</span>
        </v-flex>
        <v-flex xs1 class="d-flex justify-center align-center">
          <span>
            <v-icon v-if="todo.done" color="green">mdi-check</v-icon>
            <v-icon v-else color="red">mdi-clock-alert-outline</v-icon>
          </span>
        </v-flex>
      </v-layout>
    </v-card>

    <v-footer padless fixed>
    <v-flex class="d-flex justify-center white--text column" primary py-3>

        <v-icon>mdi-check</v-icon><span>To do:</span> 1
            <v-icon>mdi-clock-alert-outline</v-icon> <span>Done:</span> 2
    </v-flex>
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
      todos: [
        {
          title: "Create a new TO DO APP",
          description: "I need to study VueJS",
          done: true,
          addAt: "2023-01-24T20:22:00",
        },
        {
          title: "Clean the bathroon",
          description: "Visits are comming",
          done: false,
          addAt: "2023-01-24T20:22:00",
        },
        {
          title: "Do the dishes",
          description: "lets keeping clean",
          done: false,
          addAt: "2023-01-24T20:30:00",
        },
      ],
    };
  },
  methods: {
    addToDo() {
      this.todos.push({ title: this.title, description: this.description, done: false, addAt: Date.now() });
      this.title = "";
      this.description = "";
    },
  },
};
</script>
