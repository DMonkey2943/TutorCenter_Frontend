<template>
  <form @submit.prevent="updateParent()">
    <a-card title="CẬP NHẬT THÔNG TIN PHỤ HUYNH" style="width: 100%">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <div class="row mb-4">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Họ tên:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <a-input v-model:value="parent.name" />
              <div class="w-100"></div>
              <small v-if="errors.name" class="text-danger">
                {{ errors.name[0] }}
              </small>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>Email:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <a-input v-model:value="parent.email" />
              <div class="w-100"></div>
              <small v-if="errors.email" class="text-danger">
                {{ errors.email[0] }}
              </small>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12 col-sm-3 text-start text-sm-end">
              <label for="">
                <span class="text-danger">*</span>
                <span>SĐT:</span>
              </label>
            </div>
            <div class="col-12 col-sm-9">
              <a-input v-model:value="parent.phone" />
              <div class="w-100"></div>
              <small v-if="errors.phone" class="text-danger">
                {{ errors.phone[0] }}
              </small>
            </div>
          </div>
          <!-- <div class="row mb-4">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Mật khẩu:</span>
            </label>
          </div>
          <div class="col-12 col-sm-9">
            <a-input-password v-model:value="parent.password" />
            <div class="w-100"></div>
            <small v-if="errors.password" class="text-danger">
              {{ errors.password[0] }}
            </small>
          </div>
        </div> -->
          <!-- <div class="row mb-4">
          <div class="col-12 col-sm-3 text-start text-sm-end">
            <label for="">
              <span class="text-danger">*</span>
              <span>Nhập lại mật khẩu:</span>
            </label>
          </div>
          <div class="col-12 col-sm-9">
            <a-input-password v-model:value="parent.cofirmPassword" />
          </div>
        </div> -->
          <div class="row mt-1">
            <div class="col-12 d-grid d-sm-flex justify-content-sm-end mx-auto">
              <router-link :to="{ name: 'admin.parents' }">
                <a-button class="me-sm-2 mb-2">
                  <span>Trở về</span>
                </a-button>
              </router-link>
              <a-button type="primary" html-type="submit">
                <span class="button-with-icon">
                  <SaveFilled class="me-1" />
                  Lưu
                </span>
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </a-card>
  </form>
</template>
<script setup>
import { watch, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import UserService from "@/services/user.service";
import ParentService from "@/services/parent.service";
import message from "ant-design-vue/es/message";
import { SaveFilled } from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-parents"]);

const router = useRouter();
const route = useRoute();
const parent = reactive({
  name: "",
  email: "",
  phone: "",
  // password: "",
  //   cofirmPassword: "",
  role: "parent",
});
const userId = ref(0);

const errors = ref({});

const getUser = async () => {
  try {
    const id = route.params.id;
    const result = await ParentService.show(id);

    const dataUser = result.data.user;
    parent.email = dataUser.email;
    parent.name = dataUser.name;
    parent.phone = dataUser.phone;
    userId.value = dataUser.id;
  } catch (error) {
    console.log(error);
    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
    router.push({
      name: "notfound",
      params: {
        pathMatch: route.path.split("/").slice(1),
      },
      query: route.query,
      hash: route.hash,
    });
  }
};

getUser();

const updateParent = async () => {
  try {
    const result = await UserService.update(userId.value, parent);
    console.log(result);
    if (result.success) {
      message.success("Cập nhật thông tin phụ huynh thành công");
      router.push({ name: "admin.parents" });
    }
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
