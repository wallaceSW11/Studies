<template>
    <div class="text-center">
        <v-menu open-on-hover botton offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="margin-right"
                    outlined
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                >
                    {{ titulo }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    link
                    @click="goToPage(item.page)"
                >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: "DropDownNavBar",
    props: ["titulo", "items"],
    methods: {
        goToPage(page) {
            if (this.$route.name == page) return;

            this.$router.push({ name: page });
        },
    },
};
</script>

<style scoped>
.margin-right {
    margin-right: 10px;
}
</style>
