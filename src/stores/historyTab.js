import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useHistoryTab = defineStore("history", () => {
  const headline = ref("My Amazing History");
  const headlineDescription = ref("<p>Initial</p>");
  const posts = ref([
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "National Aeronautics and Space Administration",
      event: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      historyContent: "<h1>Hello</h1>",
    },
    {
      imgLink:
        "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
      title: "Facebook Gaming",
      event: "CEO, Fall 2015 - May 2019",
      historyContent: "<h1>Hello bro</h1>",
    },
  ]);
  const _initialValuePost = ref({
    imgLink: "",
    title: "",
    event: "",
    historyContent: "",
  });

  function addPost(post) {
    posts.value.push(post);
  }

  return { headline, posts, headlineDescription, _initialValuePost, addPost };
});
