<template>
  <div>
    <h1 class="mb-4">Tổng quan hệ thống</h1>

    <a-row :gutter="16" class="mb-4">
      <a-col :xs="24" :sm="12" :md="6" class="mb-3">
        <a-card>
          <template #title> <UserOutlined /> Phụ huynh </template>
          <h2 class="text-center mb-0">{{ stats.totalParents }}</h2>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="6" class="mb-3">
        <a-card>
          <template #title> <TeamOutlined /> Gia sư </template>
          <h2 class="text-center mb-0">{{ stats.totalTutors }}</h2>
          <p class="text-center text-muted mb-0">
            <small>{{ stats.pendingTutors }} chờ duyệt</small>
          </p>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="6" class="mb-3">
        <a-card>
          <template #title> <ReadOutlined /> Lớp học </template>
          <h2 class="text-center mb-0">{{ stats.totalClasses }}</h2>
          <p class="text-center text-muted mb-0">
            <small>{{ stats.pendingClasses }} chưa giao</small>
          </p>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :md="6" class="mb-3">
        <a-card>
          <template #title> <CheckCircleOutlined /> Tỷ lệ ghép lớp </template>
          <h2 class="text-center mb-0">{{ stats.matchingRate }}%</h2>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" class="mb-4">
      <a-col :span="24" :lg="14" class="mb-3">
        <a-card title="Thống kê đăng ký theo tháng">
          <div ref="chartContainer" style="height: 300px"></div>
        </a-card>
      </a-col>

      <a-col :span="24" :lg="10" class="mb-3">
        <a-card title="Phân bố lớp học theo trạng thái">
          <div ref="pieChartContainer" style="height: 300px"></div>
          <!-- <div class="mt-2">
            <div class="d-flex justify-content-between">
              <span><span class="status-dot cancelled"></span> Đã hủy</span>
              <strong>{{ stats.classesByStatus["-1"] || 0 }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span><span class="status-dot pending"></span> Chưa giao</span>
              <strong>{{ stats.classesByStatus["0"] || 0 }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span><span class="status-dot assigned"></span> Đã giao</span>
              <strong>{{ stats.classesByStatus["1"] || 0 }}</strong>
            </div>
            <div class="d-flex justify-content-between">
              <span
                ><span class="status-dot completed"></span> Đã kết thúc</span
              >
              <strong>{{ stats.classesByStatus["2"] || 0 }}</strong>
            </div>
          </div> -->
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="24" :lg="12" class="mb-3">
        <a-card title="Lớp học chưa giao mới nhất">
          <a-list
            size="small"
            bordered
            :dataSource="stats.recentPendingClasses"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <router-link
                    :to="{
                      name: 'admin.classes.detail',
                      params: { id: item.id },
                    }"
                  >
                    Mã số lớp học: {{ item.id || "N/A" }}
                    <!-- {{ item.parent?.name || "N/A" }} -->
                  </router-link>
                  <div class="text-muted">
                    <small>{{ formatDate(item.created_at) }}</small>
                  </div>
                </div>
              </a-list-item>
            </template>
            <template #footer>
              <div class="text-end">
                <router-link
                  :to="{ name: 'admin.classes', query: { status: 'pending' } }"
                >
                  Xem tất cả <ArrowRightOutlined />
                </router-link>
              </div>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <a-col :span="24" :lg="12" class="mb-3">
        <a-card title="Gia sư chờ duyệt hồ sơ mới nhất">
          <a-list size="small" bordered :dataSource="stats.recentPendingTutors">
            <template #renderItem="{ item }">
              <a-list-item>
                <div>
                  <router-link
                    :to="{
                      name: 'admin.tutors.profile.detail',
                      params: { id: item.id },
                    }"
                  >
                    #{{ item.id }}: {{ item.user.name }}
                  </router-link>
                  <div class="text-muted">
                    <small>{{ formatDate(item.updated_at) }}</small>
                  </div>
                </div>
              </a-list-item>
            </template>
            <template #footer>
              <div class="text-end">
                <router-link
                  :to="{
                    name: 'admin.tutors.profile',
                    query: { status: 'pending' },
                  }"
                >
                  Xem tất cả <ArrowRightOutlined />
                </router-link>
              </div>
            </template>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="16" class="mb-4">
      <a-col :span="24" :lg="16" class="mb-3">
        <a-card title="Công việc cần làm">
          <a-list size="small" bordered>
            <a-list-item>
              <CheckOutlined /> Duyệt {{ stats.pendingTutors }} hồ sơ gia sư
              <router-link
                :to="{
                  name: 'admin.tutors.profile',
                  query: { status: 'pending' },
                }"
                class="ms-2"
                >Xem</router-link
              >
            </a-list-item>
            <a-list-item>
              <CheckOutlined /> Xử lý {{ stats.pendingReports }} báo cáo lớp học
              của gia sư
              <router-link
                :to="{ name: 'admin.reports', query: { status: 'pending' } }"
                class="ms-2"
                >Xem</router-link
              >
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useMenuAdmin } from "@/stores/use-menu-admin";
import {
  UserOutlined,
  TeamOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  CheckOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import * as echarts from "echarts";
import adminService from "@/services/admin.service";

useMenuAdmin().onSelectedKeys(["admin-dashboard"]);

const chartContainer = ref(null);
const pieChartContainer = ref(null); // Thêm biến mới này
let chart = null;
let pieChart = null; // Thêm biến mới này

const stats = ref({
  totalParents: 0,
  totalTutors: 0,
  totalClasses: 0,
  matchingRate: 0,
  pendingTutors: 0,
  pendingClasses: 0,
  pendingReports: 0,
  monthlyRegistrations: {
    parents: {},
    tutors: {},
    classes: {},
  },
  classesByStatus: {
    "-1": 0, // Đã hủy
    0: 0, // Chưa giao (pending)
    1: 0, // Đã giao
    2: 0, // Đã kết thúc
  },
  recentPendingClasses: [],
  recentPendingTutors: [],
});

onMounted(async () => {
  await fetchDashboardStats();
  nextTick(() => {
    initChart();
    initPieChart(); // Thêm khởi tạo biểu đồ tròn
  });
});

const fetchDashboardStats = async () => {
  try {
    const response = await adminService.getStats();
    console.log(response.data);
    stats.value = response.data;
    console.log(stats.value);
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    message.error("Không thể tải dữ liệu dashboard");
  }
};

const initChart = () => {
  if (!chartContainer.value) return;

  chart = echarts.init(chartContainer.value);

  const months = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];
  const parentData = months.map(
    (_, idx) => stats.value.monthlyRegistrations.parents[idx + 1] || 0
  );
  const tutorData = months.map(
    (_, idx) => stats.value.monthlyRegistrations.tutors[idx + 1] || 0
  );
  const classData = months.map(
    (_, idx) => stats.value.monthlyRegistrations.classes[idx + 1] || 0
  );

  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Phụ huynh", "Gia sư", "Lớp học"],
    },
    xAxis: {
      type: "category",
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Phụ huynh",
        type: "line",
        data: parentData,
      },
      {
        name: "Gia sư",
        type: "line",
        data: tutorData,
      },
      {
        name: "Lớp học",
        type: "line",
        data: classData,
      },
    ],
  };

  chart.setOption(option);

  window.addEventListener("resize", () => {
    if (chart) {
      chart.resize();
    }
  });
};

// Thêm hàm initPieChart vào bên dưới hàm initChart
const initPieChart = () => {
  if (!pieChartContainer.value) return;

  pieChart = echarts.init(pieChartContainer.value);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      orient: "horizontal",
      bottom: 10,
      data: ["Đã hủy", "Chưa giao", "Đã giao", "Đã kết thúc"],
    },
    series: [
      {
        name: "Trạng thái lớp học",
        type: "pie",
        radius: ["40%", "70%"], // Tạo dạng donut
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "18",
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: stats.value.classesByStatus["-1"] || 0,
            name: "Đã hủy",
            itemStyle: { color: "#ff4d4f" }, // Màu đỏ
          },
          {
            value: stats.value.classesByStatus["0"] || 0,
            name: "Chưa giao",
            itemStyle: { color: "#faad14" }, // Màu vàng
          },
          {
            value: stats.value.classesByStatus["1"] || 0,
            name: "Đã giao",
            itemStyle: { color: "#1890ff" }, // Màu xanh dương
          },
          {
            value: stats.value.classesByStatus["2"] || 0,
            name: "Đã kết thúc",
            itemStyle: { color: "#52c41a" }, // Màu xanh lá
          },
        ],
      },
    ],
  };

  pieChart.setOption(option);
  window.addEventListener("resize", () => {
    if (pieChart) {
      pieChart.resize();
    }
  });
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<style scoped>
/* Thêm CSS cho điểm status */
.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.status-dot.cancelled {
  background-color: #ff4d4f;
}

.status-dot.pending {
  background-color: #faad14;
}

.status-dot.assigned {
  background-color: #1890ff;
}

.status-dot.completed {
  background-color: #52c41a;
}
</style>
