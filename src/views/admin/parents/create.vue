<template>
  <a-card title="THÊM MỚI PHỤ HUYNH" style="width: 100%">
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
        <div class="row mb-4">
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
        </div>
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
                <span>Hủy</span>
              </a-button>
            </router-link>
            <a-button type="primary" html-type="submit" @click="createParent">
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
</template>
<script setup>
import { watch, ref, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import createAuthService from "@/services/auth.service";
import message from "ant-design-vue/es/message";
import { SaveFilled } from "@ant-design/icons-vue";

useMenuAdmin().onSelectedKeys(["admin-parents"]);

const AuthService = createAuthService("/api");

const router = useRouter();
const parent = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  //   cofirmPassword: "",
  role: "parent",
});

const errors = ref({});

const createParent = async () => {
  try {
    const result = await AuthService.register(parent);
    console.log(result);
    if (result.success) {
      message.success("Thêm mới phụ huynh thành công");
      router.push({ name: "admin.parents" });
    }
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
};
</script>
