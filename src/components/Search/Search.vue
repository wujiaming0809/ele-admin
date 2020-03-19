<!-- Created by wujiaming on 2020/3/16 -->
<template>
  <div class="search">
    <el-card :shadow="shadow">
      <div :slot="collapse ? 'header' : ''" class="search-header d-flex align-items_center">
        <i class="search-left-icon"></i>
        <span class="search-left-title">{{title}}</span>
        <template v-for="(item, index) in message">
          <div :key="item.key" class="search-box flex-1 d-flex align-items_center">
            <div
              :style="{
                width: item.labelWidth ? `${item.labelWidth}px` : '90px',
                textAlign: 'right',
                paddingRight: '10px'
              }"
            >
              {{item.label}}
            </div>
            <!--文本控件-->
            <el-input
              v-if="item.type === 1"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :clearable="item.clearable || true"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size ||''"
              :placeholder="item.placeholder || ''"
              :icon="item.icon"
            >
              <i v-if="item.slotIcon" :slot="item.slotIcon" :class="item.slotClass"></i>
              <span
                v-if="item.iconType"
                :slot="item.iconType"
                style="cursor: pointer"
                @click="() => { item.iconClick ? item.iconClick(item) : '' }"
                :style="typeof item.iconStyle === 'function' ? item.iconStyle(item) : item.iconStyle ? item.iconStyle : ''"
                v-html="typeof item.iconFormatter === 'function' ? item.iconFormatter(item) : ''"
              />
            </el-input>

            <!--下拉框控件-->
            <el-select
              v-if="item.type === 2"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              :ref="`customValue${index}`"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :multiple="item.multiple || false"
              :filterable="item.filterable && !item.multiple ? item.filterable : false"
              @change="(val) => { handleChange(val, item, index) }"
              v-model="item.value"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :placeholder="item.placeholder || ''"
            >
              <template v-if="typeof item.options !== 'function' && Object.prototype.toString.call(item.options).indexOf('Array')">
                <el-option
                  v-for="(val, index) in item.options"
                  :key="index"
                  :label="val.label"
                  :value="val.value"
                  :disabled="typeof val.disabled === 'function' ? val.disabled(item, val) : val.disabled ? val.disabled : false"
                >
                </el-option>
              </template>
              <template v-if="typeof item.options === 'function' && Object.prototype.toString.call(item.options()).indexOf('Array')">
                <el-option
                  v-for="(val, index) in item.options()"
                  :key="index"
                  :label="val.label"
                  :value="val.value"
                >
                </el-option>
              </template>
            </el-select>

            <!--日期控件-->
            <el-date-picker
              v-if="item.type === 3"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :type="item.dateType || 'date'"
              :format="item.format"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :placeholder="item.placeholder || ''"
              :picker-options="useShortcuts(item)"
              :editable="item.editable || false"
            >
            </el-date-picker>

            <!--日期范围控件-->
            <el-date-picker
              v-if="item.type === 4"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :type="item.dateType || 'daterange'"
              :format="item.format"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder ="item.endPlaceholder || '结束日期'"
              :range-separator="item.separator || '-'"
              :unlink-panels="item.unlinkPanels || false"
              :picker-options="useShortcuts(item)"
            >
            </el-date-picker>

            <!-- 时间控件 -->
            <el-time-picker
              v-if="item.type === 5"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :placeholder="item.placeholder || ''"
              :arrow-control="item.arrowControl || false"
              :picker-options="item.pickerOptions || {}"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
            >
            </el-time-picker>

            <!-- 时间范围控件选择 -->
            <el-time-picker
              v-if="item.type === 6"
              is-range
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :start-placeholder="item.startPlaceholder || ''"
              :end-placeholder="item.endPlaceholder || ''"
              :range-separator="item.separator || '-'"
              :picker-options="item.pickerOptions || {}"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
            >
            </el-time-picker>

            <!-- 级联选择控件 -->
            <el-cascader
              v-if="item.type === 7"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px', display: 'inline-block' }"
              v-model="item.value"
              :clearable="item.clearable || true"
              :options="typeof item.options === 'function' ? item.options(item) : item.options ? item.options : []"
              :show-all-levels="item.showAllLevels || true"
              @change="(val) => { item.change ? item.change(val, item) : '' }"
              @active-item-change="(val) => { item.expandChange ? item.expandChange(val, item) : '' }"
              :props="item.props"
              :placeholder="item.placeholder"
              :filterable="item.filterable || false"
              :size="item.size || ''"
              :separator="item.separator"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
            >
            </el-cascader>

            <!--自定义文本-->
            <div
              v-if="item.type === 8"
              :style="{
                paddingLeft:  item.labelWidth ? item.labelWidth : '90px',
                height: '32px',
                lineHeight: '32px'
              }"
            >
              <slot name="text" />
            </div>

            <!-- 自定义控件 -->
            <span style="display: inline-block" v-if="item.type === 9">
              <slot name="controls" />
            </span>
          </div>
        </template>
        <div class="button-group">
          <el-button
            type="info"
            :icon="showSearch ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
            @click="toggleSearch"
          >
            {{showSearch ? '收起' : '筛选'}}
          </el-button>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button icon="el-icon-delete">清空</el-button>
        </div>
      </div>
      <div
        class="search-list"
        :style="{
          padding: showSearch ? '10px 20px' : '0',
          borderTop: showSearch ? '1px solid #EBEEF5' : '',
          display: showSearch ? 'block' : 'none'
        }"
      >
        <template v-for="(item, index) in message">
          <div :key="item.key" class="search-box flex_1 d-flex align-items_center">
            <div
              :style="{
                width: item.labelWidth ? `${item.labelWidth}px` : '90px',
                textAlign: 'right',
                paddingRight: '10px'
              }"
            >
              {{item.label}}
            </div>
            <!--文本控件-->
            <el-input
              v-if="item.type === 1"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :clearable="item.clearable || true"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size ||''"
              :placeholder="item.placeholder || ''"
              :icon="item.icon"
            >
              <i v-if="item.slotIcon" :slot="item.slotIcon" :class="item.slotClass"></i>
              <span
                v-if="item.iconType"
                :slot="item.iconType"
                style="cursor: pointer"
                @click="() => { item.iconClick ? item.iconClick(item) : '' }"
                :style="typeof item.iconStyle === 'function' ? item.iconStyle(item) : item.iconStyle ? item.iconStyle : ''"
                v-html="typeof item.iconFormatter === 'function' ? item.iconFormatter(item) : ''"
              />
            </el-input>

            <!--下拉框控件-->
            <el-select
              v-if="item.type === 2"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              :ref="`customValue${index}`"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :multiple="item.multiple || false"
              :filterable="item.filterable && !item.multiple ? item.filterable : false"
              @change="(val) => { handleChange(val, item, index) }"
              v-model="item.value"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :placeholder="item.placeholder || ''"
            >
              <template v-if="typeof item.options !== 'function' && Object.prototype.toString.call(item.options).indexOf('Array')">
                <el-option
                  v-for="(val, index) in item.options"
                  :key="index"
                  :label="val.label"
                  :value="val.value"
                  :disabled="typeof val.disabled === 'function' ? val.disabled(item, val) : val.disabled ? val.disabled : false"
                >
                </el-option>
              </template>
              <template v-if="typeof item.options === 'function' && Object.prototype.toString.call(item.options()).indexOf('Array')">
                <el-option
                  v-for="(val, index) in item.options()"
                  :key="index"
                  :label="val.label"
                  :value="val.value"
                >
                </el-option>
              </template>
            </el-select>

            <!--日期控件-->
            <el-date-picker
              v-if="item.type === 3"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :type="item.dateType || 'date'"
              :format="item.format"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :placeholder="item.placeholder || ''"
              :picker-options="useShortcuts(item)"
              :editable="item.editable || false"
            >
            </el-date-picker>

            <!--日期范围控件-->
            <el-date-picker
              v-if="item.type === 4"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :type="item.dateType || 'daterange'"
              :format="item.format"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              :start-placeholder="item.startPlaceholder || '开始日期'"
              :end-placeholder ="item.endPlaceholder || '结束日期'"
              :range-separator="item.separator || '-'"
              :unlink-panels="item.unlinkPanels || false"
              :picker-options="useShortcuts(item)"
            >
            </el-date-picker>

            <!-- 时间控件 -->
            <el-time-picker
              v-if="item.type === 5"
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :placeholder="item.placeholder || ''"
              :arrow-control="item.arrowControl || false"
              :picker-options="item.pickerOptions || {}"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
            >
            </el-time-picker>

            <!-- 时间范围控件选择 -->
            <el-time-picker
              v-if="item.type === 6"
              is-range
              :readonly="typeof item.readonly === 'function' ? item.readonly(item) : item.readonly ? item.readonly : false"
              v-model.trim="item.value"
              :start-placeholder="item.startPlaceholder || ''"
              :end-placeholder="item.endPlaceholder || ''"
              :range-separator="item.separator || '-'"
              :picker-options="item.pickerOptions || {}"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px' }"
              :editable="item.editable || false"
              :clearable="item.clearable || true"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
              :size="item.size || ''"
              @change="(val) => { item.change ? item.change(val, item) : () => {} }"
            >
            </el-time-picker>

            <!-- 级联选择控件 -->
            <el-cascader
              v-if="item.type === 7"
              :style="{ width: item.inputWidth ? `${item.inputWidth}px` : '240px', display: 'inline-block' }"
              v-model="item.value"
              :clearable="item.clearable || true"
              :options="typeof item.options === 'function' ? item.options(item) : item.options ? item.options : []"
              :show-all-levels="item.showAllLevels || true"
              @change="(val) => { item.change ? item.change(val, item) : '' }"
              @active-item-change="(val) => { item.expandChange ? item.expandChange(val, item) : '' }"
              :props="item.props"
              :placeholder="item.placeholder"
              :filterable="item.filterable || false"
              :size="item.size || ''"
              :separator="item.separator"
              :disabled="typeof item.disabled === 'function' ? item.disabled(item) : item.disabled ? item.disabled : false"
            >
            </el-cascader>

            <!--自定义文本-->
            <div
              v-if="item.type === 8"
              :style="{
                paddingLeft:  item.labelWidth ? item.labelWidth : '90px',
                height: '32px',
                lineHeight: '32px'
              }"
            >
              <slot name="text" />
            </div>

            <!-- 自定义控件 -->
            <span style="display: inline-block" v-if="item.type === 9">
              <slot name="controls" />
            </span>
          </div>
        </template>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    title: { type: String, default: '筛选' },
    collapse: { type: Boolean, default: true },
    shadow: { type: String, default: 'never' },
    message: { type: Array, default: () => [] },
  },
  components: {},
  data() {
    return {
      showSearch: false,
    };
  },
  watch: {},
  computed: {},
  created() {
  },
  mounted() {
  },
  methods: {
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    // 下拉筛选框数据处理
    handleChange(value, data, index) {
      console.log({ value, data, index });
      if (data.multiple) {
        const labelDom = this.$refs[`customValue${index}`][0].$el.children[0];
        if (value && value.length) {
          const labelArr = [];
          const arr = typeof data.options === 'function' ? data.options() : data.options;
          value.forEach((item) => {
            arr.forEach((val) => {
              if (val.value === item) {
                labelArr.push(val.label);
              }
            });
          });
          labelDom.innerText = labelArr.join('、');
        } else {
          labelDom.innerText = '';
        }
      }
      if (data.change) {
        data.change(value);
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .search {
    & /deep/ .el-card__header {
      padding: 10px 20px;
      border-bottom: none;
    }
    & /deep/ .el-card__body {
      padding: 0;
      font-size: 14px;
    }
    .search-header {
      .search-left-icon {
        display: inline-block;
        background-color: #1f76eb;
        width: 6px;
        height: 24px;
        border-radius: 3px;
        margin-right: 10px;
      }
      .search-left-title {
        margin-right: 20px;
      }
      .search-box {
        font-size: 14px;
        & /deep/ .el-select__tags {
          box-sizing: border-box;
          text-indent: 17px;
          margin-right: 30px;
          color: #606266;
          word-break: keep-all;
          white-space: nowrap;
          overflow: hidden;
        }
        & /deep/ .el-select__tags .el-tag {
          display: none;
        }
      }
      .button-group {
        flex: 1;
        text-align: right;
        .el-button {
          height: 30px;
          border-radius: 15px;
          padding: 0 15px;
          font-size: 14px;
        }
      }
    }
    .search-list {
    }
  }
</style>
