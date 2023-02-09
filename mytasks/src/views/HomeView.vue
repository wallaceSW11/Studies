<template>
  <v-container style="max-width: 1500px">
    <v-layout xs12 sm8 md6 class="d-flex column">
      <v-flex>
        <v-text-field
          label="I need to do..."
          v-model="title"
          prepend-icon="mdi-calendar-check"
          :error-messages="requidedField"
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
        <v-btn color="primary" @click="addToDo" block>{{ isEditing ? 'Save' : 'Add'}}</v-btn>
      </v-flex>
    </v-layout>
    <v-divider />
    <h4 class="text-center">What I have to do?</h4>
    <v-divider />

    <v-flex v-if="!todos.length" class="mt-4 d-flex justify-center">
      <img src="@/assets/nothing-to-do.gif" alt="nothing to do" srcset="">
    </v-flex>

    <v-card v-else v-for="todo in todos" :key="todo.id" :class="'my-3 pa-2 ' + (todo.done ? 'task-done' : 'task-todo')" >
      <v-layout>
        <v-flex xs8 sm4>
          <div class="caption">Title</div>
          <span class="text-truncate">{{ todo.title }}</span>
        </v-flex>
        <v-flex sm3 mx-3 class="hidden-xs-only">
          <div class="caption">Description</div>
          <span>{{ descriptionShort(todo.description) || '-' }}</span>
        </v-flex>
        <v-flex sm3 class="hidden-xs-only ">
          <v-flex class="d-flex flex-column">
            <div class="caption">Created</div>
            <span>{{ todo.createdAt.substring(0, 10) }}</span>
            <span>{{ todo.createdAt | timeFormated }}</span>
          </v-flex>
        </v-flex>
        <v-flex xs2 sm2 class="d-flex justify-center align-center">
          <span>
            <v-icon v-if="todo.done" color="green">mdi-check</v-icon>
            <v-icon v-else color="red">mdi-clock-alert-outline</v-icon>
          </span>
        </v-flex>
        <v-flex xs2 sm1 class="d-flex justify-center align-center">
          <v-menu
            top
            left
            offset-y
            transition="slide-x-transition"
          >

            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
                :disabled="isEditing"
              >
                <v-icon >mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-flex class="d-flex flex-row pa-2" style="background-color: rgba(188, 206, 251, 1); z-index: 99">
              <v-btn text @click="editTodo(todo)"> <v-icon>mdi-pencil</v-icon></v-btn>
              <v-btn text @click="setTodoDone(todo.id)" v-if="!todo.done"><v-icon>mdi-check</v-icon></v-btn>
              <v-btn text @click="setTodoUnDone(todo.id)" v-else><v-icon>mdi-clock-alert-outline</v-icon></v-btn>
              <v-btn text @click="confirmDelete(todo.id)"><v-icon>mdi-delete</v-icon></v-btn>
            </v-flex>

          </v-menu>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog
     v-model="showDeleteDialog"
     width="300px"
    >

    <v-card>
      <v-card-title>
        Delete todo
      </v-card-title>
      <v-card-text>
        Are you sure?
      </v-card-text>
      <v-card-actions>
        <v-flex class="d-flex justify-center py-3">
          <v-btn
            color="primary"
            @click="deleteTodo">
            <v-icon>mdi-check</v-icon> Yes
          </v-btn>
          <v-btn
            class="mx-3"
            outlined
            @click="cancelDelete"
          >
           <v-icon>mdi-cancel</v-icon>No
          </v-btn>
        </v-flex>
      </v-card-actions>
    </v-card>
    </v-dialog>



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
      id: undefined,
      title: undefined,
      description: undefined,
      createdAt: undefined,
      done: false,
      totalTasksDone: 0,
      totalTasksToDo: 0,
      openDialog: true,
      isEditing: false,
      todos: [],
      showDeleteDialog: false,
      requidedField: undefined
    };
  },

  watch: {
    title(newValue) {
      if (newValue) {
        this.requidedField = undefined;
      }
    }
  },
  created () {
    if (!localStorage.getItem('todos')) return;

    this.todos = JSON.parse(localStorage.getItem('todos'));
    this.calculateTodos();
  },

  filters: {
    timeFormated(date) {
      let today = new Date(date);
      return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    },
  },

  methods: {
    clearFields() {
      this.title = undefined;
      this.description = undefined;
      this.isEditing = false;
    },

    addToDo() {
      if (!this.title) {
        this.requidedField = 'Please, type the title.';
        return;
      }

      if (this.isEditing) {
        let index = this.todos.findIndex(t => t.id == this.id);
        this.todos[index] = { id: this.id, title: this.title, description: this.description, done: this.done, createdAt: this.createdAt };
        this.calculateTodos();
        this.clearFields();
        return;
      }

      this.todos.push({id: Math.random(12), title: this.title, description: this.description, done: false, createdAt: this.today() });
      this.calculateTodos();
      this.clearFields();

      localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    confirmDelete(id) {
      this.id = id;
      this.showDeleteDialog = true;
    },

    cancelDelete() {
      this.id = undefined;
      this.showDeleteDialog = false;
    },

    deleteTodo() {
      let index = this.todos.findIndex(t => t.id == this.id);
      this.todos.splice(index, 1);
      this.calculateTodos();
      this.showDeleteDialog = false;
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },

    setTodoUnDone(id) {
      let index = this.todos.findIndex(t => t.id == id);
      this.todos[index] = {...this.todos[index], done: false};
      this.calculateTodos();
    },

    setTodoDone(id) {
      let index = this.todos.findIndex(t => t.id == id);
      this.todos[index] = {...this.todos[index], done: true};
      this.calculateTodos();
    },

    today() {
      const today = new Date();
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

    },

    editTodo(item) {
      this.isEditing = true;
      this.id = item.id;
      this.title = item.title;
      this.description = item.description;
      this.createdAt = item.createdAt;
      this.done = item.done;
    },

    descriptionShort(description) {
      if (!description) return;

      if (description.length > 20) {
        return description.substring(0, 20) + '...';
      }

      return description;
    }
  },
};
</script>

<style scoped>
.task-done {
  border-left: 5px solid green;
}
.task-todo {
  border-left: 5px solid red;
}
</style>
