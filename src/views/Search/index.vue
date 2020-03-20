<template>
  <div>
    <search :message="message"></search>
    <el-table :data="showData" border stripe style="margin-top: 20px">
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column prop="province" label="省份" width="120"></el-table-column>
      <el-table-column prop="city" label="市区" width="120"></el-table-column>
      <el-table-column prop="address" label="地址" width="300"></el-table-column>
      <el-table-column prop="zip" label="邮编"></el-table-column>
    </el-table>
    <div class="m-t-20 tr">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="10"
        :current-page.sync="pageNo"
        :total="pageTotal"
        @current-change="(page) => { searchData(page) }"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const Search = () => import('../../components/Search/Search');

export default {
  components: { Search },
  data() {
    return {
      search: {
        name: '',
        city: '',
      },
      pageNo: 1,
      pageTotal: 0,
      allData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '深圳',
          city: '宝安区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200332,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '深圳',
          city: '南山区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: 'moyun',
          province: '深圳',
          city: '福田区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '深圳',
          city: '罗湖区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '深圳',
          city: '龙岗区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '深圳',
          city: '龙华区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '广州',
          city: '海珠区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '广州',
          city: '天河区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '广州',
          city: '越秀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: 'moyun',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: 'moyun',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'sanmi',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: 'moyun',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: 'wjm',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: 'moyunsuibuyao',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
      ],
      showData: [],
      message: [
        {
          key: 'name',
          type: 1,
          label: '名称',
          slotIcon: 'suffix',
          value: '',
        },
        {
          key: 'selects',
          type: 2,
          label: '种类名称',
          options: [
            { value: 1, label: '11' },
            { value: 2, label: '22' },
            { value: 3, label: '33' },
          ],
          value: '',
        },
        {
          key: 'selectsMore',
          type: 2,
          multiple: true,
          placeholder: '请选择',
          label: '种类多选',
          options: [
            { value: 1, label: '11' },
            { value: 2, label: '22' },
            { value: 3, label: '33' },
          ],
          value: '',
        },
      ],
    };
  },
  created() {
    this.pageNo = 1;
    this.showData = [...this.allData].slice(0, 10);
    this.showData.sort((a, b) => a.zip - b.zip);
    this.pageTotal = this.allData.length;
  },
  methods: {
    searchData(page) {
      this.pageNo = page;
      let tableData = JSON.parse(JSON.stringify(this.allData));
      const searchData = Object.values(this.search);
      const isSearch = !(searchData.every(i => !i));
      if (isSearch) {
        tableData = this.allData.filter(item => (
          item.name.indexOf(this.search.name) > -1 && item.city.indexOf(this.search.city) > -1
        ));
      }
      this.pageTotal = tableData.length;
      this.showData = [...tableData].slice((page - 1) * 10, page * 10);
    },
  },
};
</script>
