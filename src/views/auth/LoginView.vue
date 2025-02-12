<template>
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 450px"
      >
        <h1 class="text-center mb-2">Đăng nhập</h1>

        <a-card class="py-2">
          <div class="row mb-4">
            <div class="col-12 text-start">
              <label for="">
                <span class="text-danger">*</span>
                <span>Email:</span>
              </label>
            </div>
            <div class="col-12">
              <a-input />
              <div class="w-100"></div>
              <!-- <small v-if="errors.email" class="text-danger">
              {{ errors.email[0] }}
            </small> -->
            </div>
          </div>
          
          <div class="row mb-4">
            <div class="col-12 text-start">
              <label for="">
                <span class="text-danger">*</span>
                <span>Mật khẩu:</span>
              </label>
            </div>
            <div class="col-12">
              <a-input-password />
              <div class="w-100"></div>
              <!-- <small v-if="errors.password" class="text-danger">
              {{ errors.password[0] }}
            </small> -->
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-12 d-grid">
              <a-button type="primary" html-type="submit">
                <span>Đăng nhập</span>
              </a-button>
            </div>
          </div>

          <div class="text-center">
            <div class="my-1">Bạn chưa có tài khoản?</div>
            <div class="my-1">
              <a href="">
                Đăng ký tìm gia sư ngay
                <i class="fa fa-search"></i>
              </a>
            </div>
            <div class="my-1">
              <a href="">
                Đăng ký làm gia sư ngay
                <i class="fa fa-briefcase" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>
<script setup></script>
