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
      text: "hh",
      icon: "lightbulb",
      collapsible: true,
      prefix: "lizi/",
      children: "structure",
    },

    {
      text: "kkk",
      icon: "lightbulb",
      collapsible: true,
      prefix: "kkk/",
      children: "structure",
    },

    {
      text: "常用注解",
      icon: "lightbulb",
      collapsible: true,
      prefix: "注解/",
      children: "structure",
    }

  ],
});