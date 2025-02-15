<template>
  <nav
    class="navbar navbar-expand-lg navbar-light sticky-top px-4 px-lg-5 py-lg-0"
    style="background-color: #f3f3f3"
  >
    <a href="index.html" class="navbar-brand">
      <h3 class="m-0 text-primary" style="color: #fe5d37">Gia Sư Cần Thơ</h3>
    </a>
    <button
      type="button"
      class="navbar-toggler"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <div class="navbar-nav mx-auto text-uppercase">
        <a href="index.html" class="nav-item fw-semibold nav-link active"
          >Trang chủ</a
        >
        <a href="about.html" class="nav-item fw-semibold nav-link">Gia sư</a>
        <a href="classes.html" class="nav-item fw-semibold nav-link">Lớp mới</a>
        <div class="nav-item fw-semibold dropdown">
          <a
            href="#"
            class="nav-link dropdown-toggle fw-semibold"
            data-bs-toggle="dropdown"
            >Pages</a
          >
          <div
            class="dropdown-menu rounded-0 rounded-bottom border-0 shadow-sm m-0"
          >
            <a href="facility.html" class="dropdown-item">School Facilities</a>
            <a href="team.html" class="dropdown-item">Popular Teachers</a>
            <a href="call-to-action.html" class="dropdown-item"
              >Become A Teachers</a
            >
            <a href="appointment.html" class="dropdown-item"
              >Make Appointment</a
            >
            <a href="testimonial.html" class="dropdown-item">Testimonial</a>
            <a href="404.html" class="dropdown-item">404 Error</a>
          </div>
        </div>
        <a href="contact.html" class="nav-item fw-semibold nav-link"
          >Contact Us</a
        >
        <a
          href="login.html"
          class="nav-item fw-semibold nav-link btn btn-primary text-white px-3 mt-2 mt-lg-0 d-lg-none"
        >
          Đăng nhập <i class="fa fa-arrow-right ms-2"></i>
        </a>
      </div>
      <a
        href="login.html"
        class="btn btn-primary rounded-pill px-3 d-none d-lg-block fw-semibold"
        >Đăng nhập<i class="fa fa-arrow-right ms-3"></i
      ></a>
    </div>
  </nav>
</template>
<script setup></script>
