<template>
  <div id="app">
    <div class="form">
      <w-input
        v-model="value"
        placeholder="Input"
        @appendClick="appendClick"
        @prependClick="prependClick"
        @change="change"
        @search="search"
      >
        <template #prepend>
          <w-icon size="20"> http </w-icon>
        </template>
        <template #append>
          <w-icon> search </w-icon>
        </template>
      </w-input>

      <div class="btn">
        <w-btn> 123456 </w-btn>
        <w-btn type="primary" size="large"> 123456 </w-btn>
        <w-btn type="warn" size="small"> 123456 </w-btn>
        <w-btn type="danger" size="mini"> 123456 </w-btn>
        <w-btn type="danger" round> 123456 </w-btn>
        <w-btn type="danger" disabled @click="search"> disabled </w-btn>
        <w-btn type="danger" block> 123456 </w-btn>
        <w-btn color="#eee" icon @click="search">
          <w-icon> search </w-icon>
          搜索
        </w-btn>
      </div>
      <div class="btn">
        <w-btn link> 123456 </w-btn>
        <w-btn type="primary" size="large" link> 123456 </w-btn>
        <w-btn type="warn" size="small" round link> 123456 </w-btn>
        <w-btn type="danger" size="mini" block link> 123456 </w-btn>
        <w-btn icon link @click="search">
          <w-icon> search </w-icon>
          搜索
        </w-btn>
      </div>

      <div class="checkbox">
        <w-checkbox v-model="checkbox" @change="checkboxChange">
          checkbox
        </w-checkbox>
      </div>

      <div class="collapse">
        <w-collapse-group v-model="collapse" @change="changeCollapse">
          <w-collapse-panel
            collapseKey="1"
            header="我是折叠面板"
            expandIconPosition="right"
            bordered
          >
            <p>我是内容</p>
            <p>我是内容</p>
          </w-collapse-panel>
          <w-collapse-panel
            collapseKey="2"
            header="我是折叠面板 我被禁用额"
            disabled
            :showArrow="false"
          >
            <p>我是内容</p>
          </w-collapse-panel>
        </w-collapse-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      value: "",
      checkbox: false,
      collapse: ["1"],
    };
  },
  methods: {
    change(e) {
      console.log(e, this.value, 9527);
    },
    search(e) {
      console.log("search", e);
    },
    appendClick() {
      console.log("appendClick");
    },
    prependClick() {
      console.log("prependClick");
    },
    checkboxChange(e) {
      console.log(e);
    },

    changeCollapse(value) {
      console.log(value, 123);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form {
  width: 1200px;
  margin: 0 auto;
}
.btn {
  margin-top: 12px;
}
.btn > * {
  margin-top: 12px;
}
.checkbox {
  margin-top: 12px;
}
</style>
