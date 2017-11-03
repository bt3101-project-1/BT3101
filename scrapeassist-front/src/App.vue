<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view"></router-view>
    </transition>
    <msgmodal v-bind="$store.state.msgModalProps"></msgmodal>
  </div>
</template>

<script>
import msgmodal from '@/components/message-modal'
export default {
  name: 'app',
  components: {
    msgmodal: msgmodal
  },
  data: function () {
    return {
      transitionName: 'slide-right'
    }
  },
  watch: {
    '$route': function (to, from) {
      switch (from.name + '->' + to.name) {
        case 'search->crawlmonitor':
        case 'crawlmonitor->manualcrawl':
        case 'search->crawlrequest':
        case 'crawlrequest->crawlmonitor':
          this.transitionName = 'slide-left'
          break
        case 'search->database':
        case 'main->search':
          this.transitionName = 'slide-up'
          break
        case 'database->search':
        case 'search->main':
          this.transitionName = 'slide-down'
          break
        default:
          this.transitionName = 'slide-right'
          break
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow-y: hidden;
}

.slide-left-enter-active, .slide-left-leave-active {
  transition: transform .5s;
  position: absolute;
  background-color: white;
}

.slide-left-leave-active {
  z-index: 10;
  box-shadow: 0 10px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
}

.slide-left-leave-to {
  transform: translateX(-100vw)
}

.slide-right-enter-active, .slide-right-leave-active {
  transition: all .5s;
  position: absolute;
  background-color: white;
}

.slide-right-enter-active {
  z-index: 100;
  box-shadow: 0 10px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  background-color: white;
}

.slide-right-enter {
  transform: translateX(-100vw)
}

.slide-right-leave-to {
  opacity: 0;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform .5s;
  position: absolute;
  background-color: white;
}

.slide-up-leave-active {
  z-index: 10;
  box-shadow: 0 10px 10px rgba(0,0,0,0.03), 0 3px 0px rgba(0,0,0,0.23);
}

.slide-up-leave-to {
  transform: translateY(-110vh)
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all .5s;
  position: absolute;
  background-color: white;
}

.slide-down-enter-active {
  z-index: 10;
  box-shadow: 0 10px 10px rgba(0,0,0,0.03), 0 3px 0px rgba(0,0,0,0.23);
  background-color: white;
}

.slide-down-enter {
  transform: translateY(-100vh)
}

.slide-down-leave-to {
  opacity: 0;
}
</style>
