import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAboutMe = defineStore("aboutmeTab", () => {
  const title = ref("About me");
  const imgLink = ref(null);
  const content = ref(
    "<ul><li>wewewewewewqq</li><li>Dua</li><li><br></li></ul>"
  );
  const id = ref(null);

  function edit(currentData) {
    title.value = currentData.title;
    imgLink.value = currentData.imgLink;
    content.value = currentData.content;
    id.value = currentData.id;
  }

  const getAll = computed(() => {
    return {
      title,
      imgLink,
      content,
    };
  });

  return { imgLink, content, title, getAll, id, edit };
});
