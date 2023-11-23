import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "", 
    {
      text: "文档",
      icon: "lightbulb",
      collapsible: true,
      prefix: "demo/",
      children: "structure",
    }
  ],
});