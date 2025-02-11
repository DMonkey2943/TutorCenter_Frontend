<template>
  <!-- <div class="container-xxl bg-white p-0"> -->
  <!-- Spinner Start -->
  <div
    id="spinner"
    class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
  >
    <div
      class="spinner-border text-primary"
      style="width: 3rem; height: 3rem"
      role="status"
    >
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <!-- Spinner End -->

  <!-- Carousel Start -->
  <div class="container-fluid p-0 mb-2">
    <div
      id="carouselExampleCaptions"
      class="carousel slide"
      data-bs-ride="false"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../assets/img/carousel-1.png"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-block">
            <h2 class="text-white">Dành cho phụ huynh - học sinh</h2>
            <!-- <p>Some representative placeholder content for the first slide.</p> -->
            <a
              href=""
              class="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft"
              >Đăng ký tìm gia sư
              <i class="fa fa-search ms-1" aria-hidden="true"></i
            ></a>
          </div>
        </div>
        <div class="carousel-item">
          <img
            src="../assets/img/carousel-2.jpg"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-block">
            <h2 class="text-white">Dành cho giáo viên - sinh viên</h2>
            <!-- <p>Some representative placeholder content for the first slide.</p> -->
            <a
              href=""
              class="btn btn-primary rounded-pill py-sm-3 px-sm-5 me-3 animated slideInLeft"
              >Đăng ký làm gia sư
              <i class="fa fa-briefcase ms-1" aria-hidden="true"></i
            ></a>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  <!-- Carousel End -->

  <!-- About Start -->
  <div class="container-xxl py-5">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <h1 class="text-center mb-1">Trung Tâm Gia Sư Cần Thơ</h1>
          <h4 class="text-center mb-4">Uy tín - Chuyên nghiệp - Hiệu quả</h4>
          <p style="text-align: justify">
            Với 10 năm kinh nghiệm trong lĩnh vực gia sư dạy kèm tại nhà,
            <span class="fw-semibold">Trung tâm gia sư Cần Thơ</span> bảo đảm sẽ
            gửi tới quý phụ huynh và học sinh những gia sư tốt đã được chọn lọc
            kỹ càng và phù hợp với yêu cầu riêng biệt của từng học viên.
          </p>
          <p class="mb-4" style="text-align: justify">
            Hỗ trợ việc làm thêm uy tín cho giáo viên, sinh viên đã tốt nghiệp,
            sinh viên theo học đại học, cao đẳng trên địa bàn Thành phố Cần Thơ.
            Trung tâm thường xuyên cập nhật nhiều lớp dạy kèm mới mỗi ngày.
          </p>
        </div>
        <div class="col-lg-6 about-img wow fadeInUp" data-wow-delay="0.5s">
          <div class="row">
            <div class="col-12 text-center">
              <img
                class="img-fluid w-75 rounded-circle bg-light p-3"
                src="../assets/img/about-1.jpg"
                alt=""
              />
            </div>
            <div class="col-6 text-start" style="margin-top: -150px">
              <img
                class="img-fluid w-100 rounded-circle bg-light p-3"
                src="../assets/img/about-2.jpg"
                alt=""
              />
            </div>
            <div class="col-6 text-end" style="margin-top: -150px">
              <img
                class="img-fluid w-100 rounded-circle bg-light p-3"
                src="../assets/img/about-3.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- About End -->

  <!-- Start - Đăng ký tìm GS-->
  <div class="container-xxl py-5">
    <div class="container">
      <div class="bg-light rounded">
        <div class="row g-0">
          <div
            class="col-lg-6 wow fadeIn"
            data-wow-delay="0.1s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100 rounded"
                src="../assets/img/carousel-1.png"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div class="h-100 d-flex flex-column justify-content-center p-5">
              <h1 class="mb-4">Đăng ký tìm gia sư</h1>
              <p class="mb-2">
                PHHS có thể yêu cầu gia sư là sinh viên hoặc giáo viên, nam hay
                nữ, yêu cầu về chuyên ngành, thế mạnh gia sư. Gia sư có thể tới
                nhà, thư viện, trường học hoặc địa điểm theo yêu cầu của học
                viên. Gia sư dạy theo khung giờ học viên đưa ra. Học phí trả
                theo tháng hoặc nửa tháng /lần tùy thỏa thuận.
              </p>
              <p class="mb-4">
                Phụ huynh có nhu
                cầu đăng ký lớp dạy kèm để tìm gia sư vui lòng đăng ký tài
                khoản/đăng nhập.
              </p>
              <a class="btn btn-primary py-3 px-5" href=""
                >Đăng ký tìm gia sư ngay<i class="fa fa-search ms-2"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End -->

  <!-- Start - Đăng ký làm GS -->
  <div class="container-xxl pb-5">
    <div class="container">
      <div class="bg-light rounded">
        <div class="row g-0">
          <div
            class="col-lg-6 wow fadeIn"
            data-wow-delay="0.1s"
            style="min-height: 400px"
          >
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100 rounded"
                src="../assets/img/carousel-2.jpg"
                style="object-fit: cover"
              />
            </div>
          </div>
          <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <div class="h-100 d-flex flex-column justify-content-center p-5">
              <h1 class="mb-4">Đăng ký làm gia sư</h1>
              <p class="mb-2">
                Trung tâm gia sư Cần Thơ thường xuyên cập nhật nhiều lớp dạy kèm
                mới mỗi ngày.
              </p>
              <p class="mb-4">
                Gia sư có nhu cầu nhận lớp vui lòng đăng ký tài
                khoản/đăng nhập.
              </p>
              <a class="btn btn-primary py-3 px-5" href=""
                >Đăng ký làm gia sư ngay<i class="fa fa-briefcase ms-2"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End -->

  <!-- Classes Start -->
  <div class="container-xxl py-5">
    <div class="container">
      <div
        class="text-center mx-auto mb-5 wow fadeInUp"
        data-wow-delay="0.1s"
        style="max-width: 600px"
      >
        <h1 class="mb-2">Lớp mới</h1>
        <!-- <p>
          Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore
          lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero
          dolor duo.
        </p> -->
      </div>
      <div class="row g-4">
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div class="card">
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <h5 class="mb-0">MS: 5</h5>
              <p class="p-2 m-0 bg-danger text-white rounded">Chưa giao</p>
            </div>
            <div class="card-body">
              <div>
                <span class="fw-semibold">Môn dạy: </span>
                <span class="text-primary">Toán, Tiếng Việt, Tiếng Anh</span>
              </div>
              <div>
                <span class="fw-semibold">Khối lớp: </span>
                <span class="text-primary">Lớp 4</span>
              </div>
              <div>
                <span class="fw-semibold">Địa chỉ: </span>
                Phường Xuân Khánh, Quận Ninh Kiều
              </div>
              <div>
                <span class="fw-semibold">Mức lương/buổi: </span>
                120.000đ
              </div>
              <div>
                <span class="fw-semibold">Thời gian dạy: </span>
                Thứ 3 (17:00 - 18:30); Thứ 7 (19:00 - 20:30)
              </div>
              <div>
                <span class="fw-semibold">Yêu cầu: </span>
                Sinh viên Đại học + Nam
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mx-auto mt-4 wow fadeInUp" data-wow-delay="0.1s">
        <a href="" class="btn btn-primary"
          >Xem tất cả <i class="fa fa-arrow-right ms-2"></i
        ></a>
      </div>
    </div>
  </div>
  <!-- Classes End -->
</template>

<script setup></script>

<style>
.carousel-inner {
  height: 600px; /* Giới hạn chiều cao carousel */
}

.carousel-item {
  position: relative;
  height: 100%;
}

.carousel-item img {
  height: 100%;
  width: 100%;
  object-fit: cover; /* Cắt ảnh theo chiều ngang mà không làm méo */
}

.carousel-caption {
  position: absolute;
  bottom: 20px; /* Đưa caption xuống sát cuối ảnh */
  left: 50% !important;
  transform: translateX(-50%) !important;
  text-align: center;
  width: 80%; /* Đảm bảo caption không quá rộng */
  background: rgba(0, 0, 0, 0.5); /* Nền đen mờ giúp dễ đọc */
  padding: 15px;
  border-radius: 10px;
}
</style>
