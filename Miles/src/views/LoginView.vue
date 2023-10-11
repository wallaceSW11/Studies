<template>
  <v-container>
    <v-flex d-flex justify-center xs12 sm6 style="border: 1px solid orange; background-color: #333; margin: auto">
      <v-flex d-flex flex-column justify-center align-center pb-5 xs12 sm10>
        <v-flex my-6>
          <logo style="font-size: 25px" />
        </v-flex>

        <v-flex d-flex flex-column px-5 px-sm-0 style="min-width: 100%;">
          <v-flex d-flex justify-center>
            <h4>{{ text.SIGN_IN_WITH[lang] }}</h4>
          </v-flex>

          <v-flex d-flex justify-center>
            <v-btn icon>
              <v-icon>mdi-google</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-apple</v-icon>
            </v-btn>
            <v-btn icon @click="signInEmail = !signInEmail">
              <v-icon>mdi-mail</v-icon>
            </v-btn>
          </v-flex>

          <v-expand-transition>
            <v-flex d-flex flex-column v-if="signInEmail">
              <v-flex d-flex flex-column>
                <v-text-field
                :label="text.EMAIL[lang]"
                v-model="email"
                prepend-icon="mdi-mail"
                width="100%"
              ></v-text-field>
        
              <v-text-field
                :label="text.PASSWORD[lang]"
                v-model="password"
                prepend-icon="mdi-lock"
                width="100%"
                type="password"
              ></v-text-field>
              </v-flex>
    
              <v-flex d-flex justify-center>
                <v-btn color="primary">
                  <v-icon class="mr-2">mdi-login</v-icon>
                  {{ text.LOG_IN[lang] }}
                </v-btn>
              </v-flex>
            </v-flex>
          </v-expand-transition>

          <v-flex d-flex justify-center mt-5 mb-2>
            <v-flex class="line"></v-flex>
            <v-flex d-flex flex-grow-0>{{ text.OR[lang] }}</v-flex>
            <v-flex class="line"></v-flex>
          </v-flex>

          <v-flex d-flex justify-center>
            <h5>{{ text.SIGN_UP_WITH[lang] }}</h5>
          </v-flex>

          <v-flex d-flex justify-center>
            <v-btn icon>
              <v-icon>mdi-google</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-apple</v-icon>
            </v-btn>
            <v-btn icon @click="signUpEmail = !signUpEmail">
              <v-icon>mdi-mail</v-icon>
            </v-btn>
          </v-flex>

          <v-expand-transition>
            <v-flex d-flex flex-column v-if="signUpEmail">
              <v-flex d-flex flex-column>
                <v-text-field
                  :label="text.EMAIL[lang]"
                  v-model="email"
                  prepend-icon="mdi-mail"
                  width="100%"
                ></v-text-field>
          
                <v-text-field
                  :label="text.PASSWORD[lang]"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  width="100%"
                  type="password"
                ></v-text-field>
    
                <v-text-field
                  :label="text.CONFIRM_PASSWORD[lang]"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  width="100%"
                  type="password"
                ></v-text-field>
              </v-flex>
  
              <v-flex d-flex justify-center>
                <v-btn color="primary">
                  <v-icon class="mr-2">mdi-login</v-icon>
                  {{ text.REGISTER[lang] }}
                </v-btn>
              </v-flex>
            </v-flex>
          </v-expand-transition>
        </v-flex>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
import { TEXT } from '@/constants/text';
import language from '@/utils/language';
import Logo from '@/components/Logo.vue';

export default {
  name: 'LoginView',
  components: {
    Logo,
  },
  data() {
    return {
      text: TEXT,
      lang: language(),
      email: undefined,
      password: undefined,
      signInEmail: false,
      signUpEmail: false
    }
  },

}
</script>

<style lang="scss" scoped>

.line {
  border-bottom: 1px solid #fff;
  margin: 0 5px;
  margin-bottom: 5px;
}


</style>