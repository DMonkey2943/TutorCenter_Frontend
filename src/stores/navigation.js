// stores/navigation.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

export const useNavigationStore = defineStore("navigation", () => {
  const route = useRoute();

  // State để lưu active route được đặt từ bên ngoài
  const activeRouteName = ref(null);

  // Xác định route hiện tại dựa trên Vue Router
  const currentRouteName = computed(() => route.name);

  // Đặt active route thủ công
  const setActiveRoute = (routeName) => {
    activeRouteName.value = routeName;
  };

  // Reset về chế độ auto (dựa vào route thực tế)
  const resetActiveRoute = () => {
    activeRouteName.value = null;
  };

  // Kiểm tra active route - ưu tiên route được đặt thủ công
  const isActiveRoute = (routeName) => {
    // Nếu có route được đặt thủ công thì ưu tiên sử dụng nó
    if (activeRouteName.value) {
      return activeRouteName.value === routeName;
    }

    // Nếu không có route được đặt thủ công, sử dụng route hiện tại
    if (typeof routeName === "string") {
      // Kiểm tra route chính xác
      if (currentRouteName.value === routeName) {
        return true;
      }

      // Kiểm tra route con (nested routes)
      if (currentRouteName.value?.startsWith(routeName + ".")) {
        return true;
      }
    }

    return false;
  };

  return {
    currentRouteName,
    activeRouteName,
    setActiveRoute,
    resetActiveRoute,
    isActiveRoute,
  };
});
