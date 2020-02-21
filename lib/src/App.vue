<template>
  <div id="app">
    <div class="align-center">
      <img src="./assets/logo.png" />
    </div>
    <!-- 插件列表 -->
    <div class="item-box">
      <el-button @click="layout.gantt = true">Gantt甘特图</el-button>
      <el-button @click="toExplorer">文件管理器网盘</el-button>
      <el-button @click="layout.bim = true">BIM浏览组件</el-button>
    </div>
    <div class="item-box">
      <el-button @click="layout.transfer = true">树形穿梭框</el-button>
      <el-button @click="layout.grid = true">树形表格</el-button>
      <el-button @click="layout.select = true">树形下拉框</el-button>
      <el-button @click="layout.address = true">省市县三级联动</el-button>
    </div>
    <!-- 插件展示区 -->
    <!-- 穿梭框 -->
    <el-dialog title="树形穿梭框" :visible.sync="layout.transfer">
      <p class="msg">支持arrayToTree，lazy，mode，filter</p>
      <!--lazy :lazy-fn="lazyFn"-->
      <h4>
        <label>请打开f12查看移动数据 &nbsp;&nbsp;</label>
        <el-button size="medium" type="info" @click="changeMode">当前模式：{{ mode }}</el-button>
      </h4>
      <div class="box">
        <!-- <tree-transfer :from_data='fromData' :to_data='toData' :defaultProps="{label:'label'}" @addBtn='add' @removeBtn='remove' :render-content="renderContent" lazy :lazy-fn="lazyFn"> -->
        <tree-transfer
          :title="title"
          :from_data="fromData"
          :to_data="toData"
          :defaultProps="{ label: 'name', children: 'children' }"
          :defaultCheckedKeys="defaultCheckedKeys"
          :mode="mode"
          height="540px"
          node_key="id"
          @addBtn="add"
          @removeBtn="remove"
          @left-check-change="leftCheckChange"
          @right-check-change="rightCheckChange"
          filter
        >
          <span slot="title-right" class="my-title-right" @click="handleTitleRight">自定义内容</span>
        </tree-transfer>
      </div>
    </el-dialog>
    <!-- 树表 -->
    <el-dialog title="树表" :visible.sync="layout.grid">
      <p class="msg">在vue-element-admin树表的基础上扩展父子联动功能</p>
      <treeTable
        :data="tree_table"
        :columns="columns"
        checkBox
        expandAll
        parentChild
        border
        :options="{ key: 'id', children: 'Children' }"
        @treeTableSelect="getTreeTableSelect"
      />
    </el-dialog>
    <!-- 下拉框 -->
    <el-dialog title="下拉框" :visible.sync="layout.select" fullscreen>
      <p class="msg">
        在el-select基础上扩展全选功能；另：树形下拉框模式
        <el-button size="medium" type="info" @click="changeSelectMode">当前模式：{{ select_mode }}</el-button>
      </p>
      <div class="align-center">
        <wlVueSelect
          v-show="select_mode == 'default'"
          class="wl-vue-select"
          v-model="select_value"
          :props="select_props"
          :data="select_data"
          multiple
          default-select
        ></wlVueSelect>
        <wlTreeSelect
          v-show="select_mode == 'tree'"
          class="wl-vue-select"
          checkbox
          width="240"
          :data="treeData"
          @change="hindleChanged"
          v-model="selected"
        ></wlTreeSelect>
      </div>
    </el-dialog>
    <!-- 地址 -->
    <el-dialog title="省市县地址联动" :visible.sync="layout.address" fullscreen>
      <p class="msg">
        模式：三个下拉框联动模式；一个下拉框级联模式；
        <el-button size="medium" type="info" @click="changeAddressMode">当前模式：{{ address_mode }}</el-button>
      </p>
      <div class="align-center">
        <wlAddress class="my-wl-address" :type="address_mode" :address.sync="address_data"></wlAddress>
      </div>
    </el-dialog>
    <!-- 甘特图 -->
    <el-dialog title="Gantt甘特图" :visible.sync="layout.gantt" fullscreen>
      <p class="msg">甘特图、任务管理器、project</p>
      <div class="align-center">
        <wlGantt :data="gantt_data" start-date="2019-9-02" end-date="2020-11-24" @timeChange="timeChange"></wlGantt>
      </div>
    </el-dialog>
    <!-- BIM浏览组件 -->
    <el-dialog title="BIM浏览组件" :visible.sync="layout.bim" fullscreen>
      <p class="msg">BIM浏览，cad文件转化浏览器可读文件</p>
      <div class="align-center">
        <wl-bim-viewer multiple :docs="bims" class="wl-viewer"></wl-bim-viewer>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTransfer from "el-tree-transfer";
export default {
  name: "app",
  components: { treeTransfer },
  data() {
    return {
      layout: {
        transfer: false,
        grid: false,
        select: false,
        address: false,
        gantt: false,
        bim: false
      },
      mode: "transfer", // transfer addressList
      fromData: [
        {
          id: 1,
          pid: 0,
          name: "测试左侧",
          children: [
            {
              id: 2,
              pid: 1,
              name: "水电费是打发斯蒂芬斯蒂芬gas噶水电费噶地方死光光",
              // disabled: true,
              children: []
            },
            {
              id: 3,
              pid: 1,
              name: "11-3",
              children: []
            },
            {
              id: 4,
              pid: 1,
              name: "11-4",
              children: [
                {
                  id: 5,
                  pid: 4,
                  name: "11-5",
                  children: [
                    {
                      id: 111,
                      pid: 5,
                      name: "11-111"
                    }
                  ]
                },
                {
                  id: 6,
                  pid: 4,
                  name: "11-6",
                  children: []
                }
              ]
            }
          ]
        },
        {
          id: 7127,
          pid: 0,
          name: "debug",
          children: [
            {
              id: 71272,
              pid: 7127,
              name: "debug22",
              // disabled: true,
              children: []
            },
            {
              id: 71273,
              pid: 7127,
              name: "debug11",
              children: []
            }
          ]
        }
      ], // 穿梭框 - 源数据 - 树形
      toData: [], // 穿梭框 - 目标数据 - 树形
      fromArray: [
        {
          id: "1",
          name: "1",
          pid: "0"
        },
        {
          id: "2",
          name: "2",
          pid: "0"
        },
        {
          id: "1-1",
          name: "1-1",
          pid: "1"
        },
        {
          id: "1-2",
          name: "1-2",
          pid: "1"
        },
        {
          id: "1-1-1",
          name: "1-1-1",
          pid: "1-1"
        },
        {
          id: "1-1-1-1",
          name: "1-1-1-1",
          pid: "1-1-1"
        },
        {
          id: "2-1",
          name: "2-1",
          pid: "2"
        },
        {
          id: "2-2",
          name: "2-2",
          pid: "2"
        }
      ], // 一维数据源
      toArray: [], // 一维数据
      defaultCheckedKeys: [], // 左侧默认选中数据
      columns: [
        {
          value: "id",
          text: "值"
        },
        {
          value: "name",
          text: "名字"
        }
      ], // 树表表头
      tree_table: [
        {
          id: "1",
          name: "第1级",
          Children: [
            {
              id: "1-1",
              name: "第1-1级",
              Children: [
                {
                  id: "1-1-1",
                  name: "第1-1-1级"
                },
                {
                  id: "1-1-2",
                  name: "第1-1-2级",
                  Children: [
                    {
                      id: "1-1-2-1",
                      name: "第1-1-2-1级"
                    },
                    {
                      id: "1-1-2-2",
                      name: "第1-2-2-2级"
                    }
                  ]
                }
              ]
            },
            {
              id: "1-2",
              name: "第1-2级",
              Children: [
                {
                  id: "1-2-1",
                  name: "第1-2-1级"
                },
                {
                  id: "1-2-2",
                  name: "第1-2-2级"
                }
              ]
            }
          ]
        }
      ], // 树表数据
      select_mode: "default", // default普通 tree树形
      select_value: [], // 选中值
      select_data: [
        {
          id: 1,
          name: "海边"
        },
        {
          id: 2,
          name: "森林"
        },
        {
          id: 3,
          name: "草原"
        },
        {
          id: 4,
          name: "古城"
        }
      ], // 数据
      treeData: [
        {
          id: "love",
          name: "所有和你走过的风光",
          children: [
            {
              id: 1,
              name: "海边"
            },
            {
              id: 2,
              name: "森林"
            },
            {
              id: 3,
              name: "草原"
            },
            {
              id: 4,
              name: "古城"
            }
          ]
        }
      ],
      selected: ["1"], // 树下拉框选中数据
      select_props: {
        label: "name",
        value: "id"
      }, // 配置
      address_mode: "default", // default普通 cascader级联
      address_data: "", // 选中地址
      gantt_data:[
        {
          id: 1,
          pid: 0,
          name: "旅行",
          startDate: "2019-09-07",
          endDate: "2019-09-09",
          children: [
            {
              id: "1-1",
              pid: 1,
              name: "云台之间",
              pre: "1-1-1",
              startDate: "2019-09-01",
              endDate: "2019-09-09",
              children: [
                {
                  id: "1-1-1",
                  pid: "1-1",
                  name: "日落云巅",
                  startDate: "2019-09-01",
                  endDate: "2019-09-09"
                }
              ]
            },
            {
              id: "1-2",
              pid: 1,
              pre: "1-1-1",
              name: "天空之镜",
              startDate: "2019-09-08",
              endDate: "2019-10-02"
            },
            {
              id: "1-3",
              name: "蓬莱之岛",
              pid: 1,
              startDate: "2019-10-20",
              endDate: "2019-11-10"
            },
            {
              id: "1-4",
              pid: 1,
              name: "西塘之南",
              startDate: "2019-12-02",
              endDate: "2019-12-07"
            },
            {
              pid: 1,
              id: "1-5",
              name: "凤凰之缘",
              startDate: "2020-01-01",
              endDate: "2020-01-10"
            }
          ]
        },
        {
          id: 2,
          name: "租房子",
          startDate: "2019-09-20",
          endDate: "2019-12-31"
        }
      ],
      bims: [
        {
          name: "urn_model1",
          path: "bim/1/0.svf",
          modelObj: null
        },
        {
          name: "urn_model2",
          path: "bim/2/0.svf",
          modelObj: null
        },
        {
          name: "urn_model3",
          path: "bim/3/0.svf",
          modelObj: null
        },
        {
          name: "urn_model4",
          path: "bim/4/0.svf",
          modelObj: null
        },
        {
          name: "urn_model5",
          path: "bim/6/Sphere.svf",
          modelObj: null
        },
        {
          name: "urn_model6",
          path: "bim/6/Sphere.svf",
          modelObj: null
        }
      ]
    };
  },
  methods: {
    // 懒加载回调
    lazyFn(node, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 71272,
            pid: 7127,
            name: "debug22",
            // disabled: true,
            children: []
          },
          {
            id: 71273,
            pid: 7127,
            name: "debug11",
            children: []
          }
        ]);
      }, 500);
    },
    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode() {
      this.mode = this.mode == "transfer" ? "addressList" : "transfer";
    },
    // 添加按钮
    add(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 移除按钮
    remove(fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log("fromData:", fromData);
      console.log("toData:", toData);
      console.log("obj:", obj);
    },
    // 左侧源数据选中事件
    leftCheckChange(nodeObj, treeObj) {
      console.log(nodeObj);
      console.log(treeObj);
    },
    // 右侧目标数据选中事件
    rightCheckChange(nodeObj, treeObj) {
      console.log(nodeObj);
      console.log(treeObj);
    },
    // 自定义节点 仅树形结构支持
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    },
    // 标题自定义区点击事件
    handleTitleRight() {
      alert("标题自定义区点击事件");
    },
    // 树表选中
    getTreeTableSelect(val) {
      console.log(val);
    },
    // 切换下拉框模式
    changeSelectMode() {
      this.select_mode = this.select_mode == "default" ? "tree" : "default";
    },
    // 下拉框选中
    hindleChanged(val) {
      console.log(val, 2);
      console.log(this.selected);
    },
    // 切换地址组件模式
    changeAddressMode() {
      this.address_mode =
        this.address_mode == "default" ? "cascader" : "default";
    },
    toExplorer() {
      window.location.href = "./wl-explorer/index.html";
    },
    // 甘特图时间修改
    timeChange(row) {
      console.log(row);
    }
  },
  computed: {
    title() {
      if (this.mode == "transfer") {
        return ["源列表", "目标列表"];
      } else {
        return ["通讯录", "收件人", "抄送人", "密送人"];
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.el-dialog {
  min-height: 500px;
}

.align-center {
  text-align: center;
}

.item-box {
  display: flex;
  justify-content: space-between;
  width: 600px;
  margin: 100px auto;
}

.box {
  width: 600px;
  margin: 0 auto;
  text-align: left;
}
.btn {
  border: 1px solid #ebeef5;
  padding: 5px 10px;
  background-color: #f5f7fa;
  outline: none;
}
.my-title-right {
  float: right;
  font-size: 12px;
  cursor: pointer;
}

.el-checkbox {
  margin-right: 4px !important;
}

.msg {
  margin-top: -20px;
  color: #f56c6c;
  font-weight: 600;
}

.wl-vue-select {
  margin-top: 100px;
}

.my-wl-address {
  margin: 160px auto;
  width: 540px;
}

.wl-viewer{
  position: absolute;
  left: 5%;
  width: 90%;
  height: 80%;
}
</style>
