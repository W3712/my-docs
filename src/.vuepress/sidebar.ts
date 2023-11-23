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
    }

  ],
});