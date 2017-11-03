<template>
  <div id="login-page">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <img src="../assets/NUS.svg" style="width: 450px; height: auto;"></img>
        <h4 class="ui center aligned header medium">
          Education and Research Analytics Cluster
        </h4>
        <h4 class="ui center aligned header huge">
          Faculty Data Repository
        </h4>
      </div>
    </div>
    <div id="divider"></div>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <form class="ui large form">
          <div class="field">
            <div class="ui left icon transparent input">
              <i class="user icon"></i>
              <input type="text" name="email" placeholder="E-mail address" v-model="email">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon transparent input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="ui grey submit basic button" @click="login" @keyup.enter="login">Login</div>
          <div class="ui error message"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      // this.$store.dispatch('loginWithPassword', {email: this.email, password: this.password, router: this.$router})
      this.$router.push('search')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-page {
  height: 100%;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

#divider {
  height: 80vh;
  border-left: 1px solid grey;
}

.column {
  margin: 48px;
  box-sizing: border-box;
}

.large.form {
  width: 450px;
}

.input {
  border-bottom: 1px solid grey;
  padding: 10px;
}
</style>
