<template>
  <div>
    Produto x <br>
    Tamanho Y <br>
    Thema Z <br>
    Observação ... <br>


    <v-btn color="primary" :to="{name: 'Orders'}">
      Finalizar pedido
    </v-btn>

    <v-btn>
      Voltar
    </v-btn>

  </div>
</template>

<script>
export default {
  name: 'ResumeOrder'

}
</script>

<style>

</style>