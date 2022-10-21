import CadastroCliente from "@/views/cadastro/ClienteView.vue";
import CadastroProduto from "@/views/cadastro/ProdutoView.vue";
import CadastroFormaPagamento from "@/views/cadastro/FormaPagamentoView.vue";
import RelatorioCliente from "@/views/relatorio/RelatorioClienteView.vue";
import Venda from "@/views/venda/VendaView.vue";
import Configuracao from "@/views/Configuracao/ConfiguracaoView.vue";
import Home from "@/views/HomeView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/cadastro/cliente",
        name: "CadastroCliente",
        component: CadastroCliente,
    },
    {
        path: "/cadastro/produto",
        name: "CadastroProduto",
        component: CadastroProduto,
    },
    {
        path: "/cadastro/forma-pagamento",
        name: "CadastroFormaPagamento",
        component: CadastroFormaPagamento,
    },
    {
        path: "/venda",
        name: "Venda",
        component: Venda,
    },
    {
        path: "/configuracao",
        name: "Configuracao",
        component: Configuracao,
    },
    {
        path: "/relatorio/cliente",
        name: "RelatorioCliente",
        component: RelatorioCliente,
    },
];

export default routes;
