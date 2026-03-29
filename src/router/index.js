import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../Home.vue";
import Oprema from "../Oprema.vue";
import KorisnikRezervacije from "../KorisnikRezervacije.vue";
import AdminMasterPanel from "../AdminMasterPanel.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/oprema", name: "Oprema", component: Oprema },
  {
    path: "/rezervacije",
    name: "KorisnikRezervacije",
    component: KorisnikRezervacije,
  },
  { path: "/admin", name: "AdminMasterPanel", component: AdminMasterPanel },
];

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

export default router;
