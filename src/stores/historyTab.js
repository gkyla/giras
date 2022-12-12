import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useHistoryTab = defineStore("history", () => {
  const headline = ref("My Amazing History");
  const headlineDescription = ref("<p>Initial</p>");
  const posts = ref([
    {
      imgLink: "temp",
      title: "National Aeronautics and Space Administration",
      event: "Software Engineer Tech Lead, Fall 2015 - May 2019",
      historyContent: "<h1>Hello</h1>",
    },
    {
      imgLink: "temp",
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
