import { ref } from "vue";
import { defineStore } from "pinia";

export const useMyWorks = defineStore("myWorksTab", () => {
  const sectionTitle = ref("My Works");
  const posts = ref([]);

  function addPost(data) {
    posts.value.push(data);
  }

  const _initialValuePost = ref({
    imgLink: null,
    title: "",
    position: "",
    date: new Date(),
    content: "",
  });

  function editPost() {}

  return { sectionTitle, posts, addPost, editPost, _initialValuePost };
});
