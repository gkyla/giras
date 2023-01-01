import { ref } from "vue";
import { defineStore } from "pinia";

export const useMyWorks = defineStore("myWorksTab", () => {
  const sectionTitle = ref("My Works");
  const posts = ref([
    // {
    //   imgLink:
    //     "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //   title: "National Aeronautics and Space Administration",
    //   date: new Date("10 March 2020"),
    //   content: "TODO: FIND content LIBS",
    // },
    // {
    //   imgLink:
    //     "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //   title: "Facebook Gaming",
    //   date: new Date("12 March 2020"),
    //   content: "TODO: FIND content LIBS",
    // },
    // {
    //   imgLink:
    //     "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //   title: "National Aeronautics and Space Administration",
    //   date: new Date("13 March 2020"),
    //   content: "TODO: FIND content LIBS",
    // },
    // {
    //   imgLink:
    //     "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    //   title: "Facebook Gaming",
    //   date: new Date("15 March 2020"),
    //   content: "TODO: FIND content LIBS",
    // },
  ]);

  function addPost(data) {
    posts.value.push(data);
  }

  function editPost() {}

  return { sectionTitle, posts, addPost, editPost };
});
