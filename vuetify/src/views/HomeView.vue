<template>
    <v-data-table
        :headers="headers"
        :items="empresas"
        class="elevation-1"
    ></v-data-table>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            headers: [
                {
                    text: "Empresas",
                    align: "start",
                    value: "name",
                },
                { text: "Cidade", value: "cidade" },
                { text: "Estado", value: "uf" },
            ],
            empresas: [
                {
                    name: "The Best Enterprise",
                    cidade: "Terê",
                    uf: "RJ",
                },
                {
                    name: "FullPower Black edition",
                    cidade: "Floripa",
                    uf: "RJ",
                },
            ],
        };
    },
};
</script>
