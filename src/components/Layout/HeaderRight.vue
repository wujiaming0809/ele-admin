<template>
  <div class="tr">
    <el-row type="flex" align="middle">
      <el-col :span="1">
        <el-dropdown trigger="click">
          <el-badge :value="msgNum">
            <i class="el-icon-bell fz-18 cur-pointer"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <div style="padding: 0; width: 300px; color: rgba(0,0,0,.65);">
              <el-tabs v-model="activeName" class="msg-tabs">
                <el-tab-pane label="通知" name="first">
                  <template v-for="(item, index) in msg">
                    <div
                      :key="index"
                      v-if="item.type === 1"
                      class="bd-bottom p-t-20 p-b-20 p-l-20 p-r-20 d-flex align-items_center"
                    >
                      <el-avatar icon="el-icon-user-solid"></el-avatar>
                      <div class="flex-1">
                        <p class="fz-16 p-l-10 p-r-10">{{item.content}}</p>
                        <p class="fz-12 p-l-10 p-r-10 m-t-10">{{item.date}}</p>
                      </div>
                    </div>
                  </template>
                </el-tab-pane>
                <el-tab-pane label="消息" name="second">
                  <template v-for="(item, index) in msg">
                    <div
                      :key="index"
                      v-if="item.type === 2"
                      class="bd-bottom p-t-20 p-b-20 p-l-20 p-r-20 d-flex align-items_center"
                    >
                      <el-avatar icon="el-icon-user-solid"></el-avatar>
                      <div class="flex-1">
                        <p class="fz-16 p-l-10 p-r-10">{{item.user}} 评论了你</p>
                        <p class="fz-12 p-l-10 p-r-10 m-t-10">{{item.content}}</p>
                        <p class="fz-12 p-l-10 p-r-10">{{item.date}}</p>
                      </div>
                    </div>
                  </template>
                </el-tab-pane>
                <el-tab-pane label="待办" name="third"></el-tab-pane>
              </el-tabs>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <div class="d-flex align-items_center">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <span class="m-l-5 flex-1">三米</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'headerRight',
  data() {
    return {
      msgNum: 8,
      activeName: 'first',
      msg: [
        {
          type: 1,
          content: '你收到了 14 份新周报',
          date: '2年前',
        },
        {
          type: 1,
          content: '你收到了 14 份新周报',
          date: '2年前',
        },
        {
          type: 1,
          content: '你收到了 14 份新周报',
          date: '2年前',
        },
        {
          type: 1,
          content: '你收到了 14 份新周报',
          date: '2年前',
        },
        {
          type: 1,
          content: '你收到了 14 份新周报',
          date: '2年前',
        },
        {
          type: 2,
          user: '三米',
          content: '描述信息描述信息描述信息',
          date: '2年前',
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.bd-bottom:first-of-type {
  padding-top: 0 !important;
}
.bd-bottom:last-of-type {
  border-bottom: none !important;
}
</style>
<style lang="scss">
.msg-tabs {
  .el-tabs__content {
    min-height: 100px !important;
    overflow-y: auto !important;
  }
  .el-tabs__item {
    width: 100px !important;
    padding: 0 !important;
    text-align: center !important;
  }
}
</style>
