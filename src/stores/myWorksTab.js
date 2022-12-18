import { ref } from "vue";
import { defineStore } from "pinia";

export const useMyWorks = defineStore("myWorksTab", () => {
  const title = ref("My Works");
  const posts = ref([
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "National Aeronautics and Space Administration",
      date: "10 March 2020",
      content: "TODO: FIND content LIBS",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Facebook Gaming",
      date: "CEO, Fall 2015 - May 2019",
      content: "TODO: FIND content LIBS",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "National Aeronautics and Space Administration",
      date: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      content: "TODO: FIND content LIBS",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Facebook Gaming",
      date: "CEO, Fall 2015 - May 2019",
      content: "TODO: FIND content LIBS",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "National Aeronautics and Space Administration",
      date: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      content: "TODO: FIND content LIBS",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Facebook Gaming",
      date: "CEO, Fall 2015 - May 2019",
      content: "TODO: FIND content LIBS",
    },
  ]);

  return { title, posts };
});
