import Vue from "vue";
import App from "./App.vue";
import "./plugins/element.js";

import TreeTable from "wl-tree-table";
import wlAddress from "wl-address";
import wl from "wl-vue-select";
import "wl-address/lib/wl-address.css";
import "wl-vue-select/lib/wl-vue-select.css"
Vue.use(wl);
Vue.use(TreeTable);
Vue.use(wlAddress);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
