<template>
    <v-app id="inspire">
        <v-app-bar app>
            <v-toolbar-title>WallVendas</v-toolbar-title>
            <v-spacer></v-spacer>
            <!-- <v-icon>mdi-home</v-icon> -->

            <DropDownNavBar titulo="Cadastros" :items="cadastros" />
            <v-btn
                outlined
                color="primary"
                @click="$router.push({ name: 'Venda' })"
                style="margin-right: 10px"
                >Venda</v-btn
            >
            <DropDownNavBar titulo="Relatórios" :items="relatorios" />
            <v-btn
                outlined
                color="primary"
                @click="$router.push({ name: 'Configuracao' })"
                >Configurações</v-btn
            >

            <v-spacer></v-spacer>
            <v-icon>mdi-account</v-icon>
        </v-app-bar>

        <v-main style="margin: 20px">
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import DropDownNavBar from "@/components/DropDownNavBar.vue";

export default {
    components: {
        DropDownNavBar,
    },
    data() {
        return {
            cadastros: [
                { title: "Cliente", page: "CadastroCliente" },
                { title: "Produto", page: "CadastroProduto" },
                { title: "Forma de pagamento", page: "CadastroFormaPagamento" },
            ],
            relatorios: [
                { title: "Clientes", page: "RelatorioCliente" },
                { title: "Vendas", page: "RelatorioVenda" },
            ],
        };
    },
};
</script>
