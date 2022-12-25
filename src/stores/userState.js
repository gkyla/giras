import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserState = defineStore("userState", () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);
  const isFirstTime = ref(true);

  return { user, isAuthenticated, isFirstTime };
});
