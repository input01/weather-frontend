<template>
  <el-autocomplete
    clearable
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="Please input"
    @select="handleSelect"
    :trigger-on-focus="false"
  />
  <el-button type="primary" @click="search()" plain>搜索</el-button>
  <el-table :data="tableData" stripe style="width: 100%" border>
    <el-table-column prop="country" label="国家/地区" />
    <el-table-column prop="province" label="省/直辖市" />
    <el-table-column prop="city" label="城市" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="text" label="天气" />
    <el-table-column prop="temp" label="温度" />
    <el-table-column prop="rh" label="湿度" />
    <el-table-column prop="wind_dir" label="风向" />
    <el-table-column prop="wind_class" label="风速" />
    <el-table-column prop="uptime" label="更新时间" />
  </el-table>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";

const state = ref("");
let tableData = ref([]);

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const url = `/api/weather/suggest/` + queryString;
  axios(url)
    .then((res) => {
      cb(res.data.result);
    })
    .catch(function (error) {
      // 请求失败处理
      ElNotification({
        title: "出错了",
        message: error,
        type: "error",
      });
      console.log(error);
    });
};

const handleSelect = (item: Record<string, any>) => {
  tableData.value = [];
  const url = `/api/weather/info/` + item.city_geocode;
  axios(url)
    .then((res) => {
      tableData.value.push({
        ...res.data.result.location,
        ...res.data.result.now,
      });
    })
    .catch(function (error) {
      // 请求失败处理
      ElNotification({
        title: "出错了",
        message: error,
        type: "error",
      });
      console.log(error);
    });
};

function search() {
  console.log(state.value);
  tableData.value = [];
  const url = `/api/weather/info/byname/` + state.value;
  axios(url)
    .then((res) => {
      if (res.data.status == 0){
      tableData.value.push({
        ...res.data.result.location,
        ...res.data.result.now,
      });
    }
    })
    .catch(function (error) {
      // 请求失败处理
      ElNotification({
        title: "出错了",
        message: error,
        type: "error",
      });
      console.log(error);
    });
}
</script>
