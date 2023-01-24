<template>
    <v-container>
        <v-layout xs12 >
            <v-text-field
            label="I need to do..."
            append-icon="mdi-plus"
            v-model="text"
            @click:append="addToDo"
          ></v-text-field>
        </v-layout>

        <v-card>
            <v-layout>
                <v-flex>
                    aopa
                </v-flex>
            </v-layout>
        </v-card>

        <!-- <v-layout>
            <v-flex xs12 sm12 md6>
                <v-card>
                    <h2>opa</h2>

                </v-card>
            </v-flex>

        </v-layout> -->





    </v-container>
</template>

<script>

export default {
    name: "HomeView",
    data() {
        return {
            text: undefined,
            toDoList: [
                { todo: 'Create a new TO DO APP', done: true, addAt: '2023-01-24T20:22:00'},
                { todo: 'Clean the bathroon', done: false, addAt: '2023-01-24T20:22:00'},
                { todo: 'Finish the dishes', done: false, addAt: '2023-01-24T20:30:00'},
            ]
        }
    },
    methods: {
        addToDo() {
            this.text = '';
            console.log(this.text);

            this.toDoList.push({todo: this.text, done: false, addAt: Date.now()})
        }
    },


}

</script>
