<template>
  <div>
    <v-flex>
      Login
    </v-flex>
    <v-list flat>      
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          link
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.text}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'SideBarData',
  data: () => ({
      selectedItem: undefined,
      items: [
        { text: 'Account', icon: 'mdi-account', to: 'AccountView' },
        { text: 'New Order', icon: 'mdi-plus', to: 'Order' },
        { text: 'My Orders', icon: 'mdi-animation-outline', to: 'Orders' },
        { text: 'Settings', icon: 'mdi-cog', to: 'Settings' },
      ],
    }),

}
</script>

<style>

</style>