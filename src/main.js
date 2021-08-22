import { createApp } from "vue";
import App from "./App.vue";
// 如果要使用.scss样式文件，则需要引入base.scss文件
import "element-plus/packages/theme-chalk/src/base.scss";
import {
  ElSwitch,
  ElInput,
  ElButton,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
} from "element-plus";

const components = [
  ElSwitch,
  ElInput,
  ElButton,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
];

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
