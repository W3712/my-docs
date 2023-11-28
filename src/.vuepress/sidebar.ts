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
    },
    {
      text: "常用注解",
      icon: "lightbulb",
      collapsible: true,
      prefix: "常用注解/",
      children: "structure",
    },
    {
      text: "随心记",
      icon: "lightbulb",
      collapsible: true,
      prefix: "随心记/",
      children: "structure",
    }

  ],
});