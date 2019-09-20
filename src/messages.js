// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import KamernetMessaging from "./Apps/Messaging.vue";
import router from "./router";

/* eslint-disable no-new */
const vm = new Vue({
  el: "#messagesApp",
  router,
  components: { KamernetMessaging },
  template: "<KamernetMessaging/>"
});
