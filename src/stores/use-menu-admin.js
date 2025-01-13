import { defineStore } from "pinia";

export const useMenuAdmin = defineStore("menuAdminId", {
  state: () => ({
    selectedKeys: [],
    openKeys: [],
  }),

  actions: {
    onSelectedKeys(data) {
      //data phải là mảng
      this.selectedKeys = data;
    },
    onOpenKeys(data) {
      //data phải là mảng
      this.openKeys = data;
    },
  },
});
