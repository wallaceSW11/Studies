<template>
 <div>
  <h1>Meus pedidos</h1>
  <li>Pedido 1</li>
  <li>Pedido 2</li>
  <li>Pedido 3</li>
  <li>Pedido 4</li>

  <v-btn
    color="primary"
    dark
    absolute
    bottom
    right
    fab
    class="mb-10"
    :to="{ name: 'Order'}"
  >
    <v-icon>mdi-plus</v-icon>
  </v-btn>
 </div>



</template>

<script>

  export default {
    name: 'OrdersView',

    // components: {
    //   HelloWorld,
    // },
  }
</script>
