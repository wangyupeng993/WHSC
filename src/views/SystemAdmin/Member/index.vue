<template>
    <el-row id="member" v-loading.fullscreen.lock="Loading">
      <el-col :span="24">
        <el-table :data="memberlist">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商家名称">
                  <span>{{props.row.merchantName}}</span>
                </el-form-item>
                <el-form-item label="创建日期">
                  <span>{{props.row.createTime}}</span>
                </el-form-item>
                <el-form-item label="商家编号">
                  <span>{{props.row.merchantId}}</span>
                </el-form-item>
                <el-form-item label="账户可用余额">
                  <span>{{props.row.amount}}</span>
                </el-form-item>
                <el-form-item label="商户认证状态">
                  <span v-if="props.row.merAuthStatus === '0'">未认证</span>
                  <span v-if="props.row.merAuthStatus === '1'">已认证</span>
                  <span v-if="props.row.merAuthStatus === '2'">拒绝</span>
                </el-form-item>
                <el-form-item label="提现待结算金额">
                  <span>{{props.row.freezeAmount}}</span>
                </el-form-item>
                <el-form-item label="登录手机号">
                  <span>{{props.row.loginId}}</span>
                </el-form-item>
                <el-form-item label="结算周期">
                  <span v-if="props.row.settlePeroid>=1">t + {{props.row.settlePeroid}}</span>
                  <span v-if="props.row.settlePeroid === 0"> d + {{props.row.settlePeroid}}</span>
                </el-form-item>
                <el-form-item label="角色">
                  <span>{{getRoleName(props.row.identity).name}}</span>
                </el-form-item>
                <el-form-item label="上级代理编号">
                  <span>{{props.row.parent}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商家名称"></el-table-column>
          <el-table-column prop="merchantId" label="商家编号"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column prop="merAuthStatus" label="商户认证状态">
            <template slot-scope="scope">
              <span v-if="scope.row.merAuthStatus === '0'">未认证</span>
              <span v-if="scope.row.merAuthStatus === '1'">已认证</span>
              <span v-if="scope.row.merAuthStatus === '2'">拒绝</span>
            </template>
          </el-table-column>
          <el-table-column allgn="right" width="300px">
            <template slot="header" slot-scope="scope">
              <div style="display:flex;">
                <el-input
                  style="min-width:140px;"
                  v-model="searchNumber.merchant_id"
                  placeholder="请输入商家编号"/>
                <el-button type="primary" @click="getmemberlist(searchNumber)" size="mini" icon="el-icon-search">搜索</el-button>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button type="primary" @click="unlockbusiness(scope.$index,scope.row)">解锁</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :item.sync="paging"
                    :pageSize.sync="paging.size"
                    @handle-change="handleSizeChange"
                    :total.sync="paging.totalElements"/>
      </el-col>
    </el-row>
</template>

<script>
import service from '@/api/request/systemadmin'
import {pagination} from '@/views/SystemAdmin/components'
import {getUserInfo} from '@/api/sessionStorage'
export default {
  name: 'Member',
  data () {
    return {
      Loading: false,
      memberlist: [],
      rolelist: [],
      paging: {},
      search: '',
      role: null,
      searchNumber: {
        token: getUserInfo('userinfo').token,
        merchant_id: '',
        mer_auth_status: 1,
        identity: '0,3,5',
        size: 10
      }
    }
  },
  components: {pagination},
  watch: {
    searchNumber: {
      async handler (query) {
        if (query.merchant_id === '') {
          await this.getmemberlist(this.searchNumber)
        }
      },
      deep: true
    }
  },
  async mounted () {
    await this.getmemberlist(this.searchNumber)
    await this.getRolequery({token: this.searchNumber.token})
  },
  methods: {
    getmemberlist (query) {
      this.Loading = true
      service.getmemberAll(query)
        .then(respone => {
          this.memberlist = respone.data.result.content.map(item => item)
          this.paging = respone.data.result
          delete this.paging.content
          this.Loading = false
        })
        .catch(error => {
          this.Loading = false
          console.log(error)
        })
    },
    getRolequery (query) {
      service.getRoleQuery(query)
        .then(respone => {
          this.rolelist = respone.data.result.map(item => item)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRoleName (roleid) {
      return this.rolelist.filter(item => item.id === Number(roleid))[0]
    },
    async unlockbusiness (index, row) {
      this.Loading = true
      await service.unlockbusiness({token: this.searchNumber.token, merchant_id: row.merchantId})
        .then(respone => {})
        .catch(error => {
          console.log(error)
        })
      await this.getmemberlist(this.searchNumber)
    },
    handleSizeChange (page) {
      this.getmemberlist({...this.searchNumber, ...page})
    }
  }
}
</script>
