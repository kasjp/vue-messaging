import Vue from "vue";
import Router from "vue-router";
import Home from "~/Pages/Messaging.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/en/my-messages/*",
      name: "Home-English",
      component: Home
    },
    {
      path:"/mijn-berichten/*",
      name:"Home-Dutch",
      component:Home
    }
  ]
});
