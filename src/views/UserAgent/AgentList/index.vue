<template>
    <el-row>
      <el-col :span="24">
        <business-account v-if="BusAgent.length > 0" :totalAmount.sync="paging.totalAmount" :totalFreezeAmount.sync="paging.totalFreezeAmount" />
        <el-table :data="BusAgent" stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline  class="demo-table-expand">
                <el-form-item label="商户名称">
                  <span>{{props.row.merchantName}}</span>
                </el-form-item>
                <el-form-item label="账户可用余额">
                  <span>{{props.row.amount}}</span>
                </el-form-item>
                <el-form-item label="商户编号">
                  <span>{{props.row.merchantId}}</span>
                </el-form-item>
                <el-form-item label="提现待结算金额">
                  <span>{{props.row.freezeAmount}}</span>
                </el-form-item>
                <el-form-item label="商户认证状态">
                  <span>{{props.row.merAuthStatus}}</span>
                </el-form-item>
                <el-form-item label="上级代理编号">
                  <span>{{props.row.parent}}</span>
                </el-form-item>
                <el-form-item label="角色">
                  <span>{{props.row.identity|getRoleName(props.row.identity,rolelist)}}</span>
                </el-form-item>
                <el-form-item label="登录手机号">
                  <span>{{props.row.loginId}}</span>
                </el-form-item>
                <el-form-item label="结算周期">
                  <span>{{props.row.settlePeroid}}</span>
                </el-form-item>
                <el-form-item label="创建日期">
                  <span>{{props.row.createTime}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="merchantName" label="商户名称"></el-table-column>
          <el-table-column prop="merAuthStatus" label="商户认证状态"></el-table-column>
          <el-table-column prop="settlePeroid" label="结算周期"></el-table-column>
          <el-table-column prop="createTime" label="创建日期"></el-table-column>
          <el-table-column label="操作" width="350px">
            <template slot-scope="scope">
              <el-button-group style="margin-bottom:10px;">
                <el-button type="primary" size="mini">冻结</el-button>
                <el-button type="primary" size="mini">费率</el-button>
                <el-button type="primary" size="mini">通道</el-button>
              </el-button-group>
              <el-button-group style="margin-bottom:10px;">
                <el-button type="primary" size="mini">结算周期设置</el-button>
                <el-button type="primary" size="mini">自动代付</el-button>
                <el-button type="primary" size="mini">划拨变更</el-button>
              </el-button-group>
              <el-button-group>
                <el-button type="primary" size="mini">登录</el-button>
                <el-button type="primary" size="mini">D0T1</el-button>
                <el-button type="primary" size="mini">解锁</el-button>
              </el-button-group>
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
import service from '@/api/request/UserAgent'
import {getUserInfo} from '@/api/sessionStorage'
import {pagination, BusinessAccount} from '@/views/UserAgent/components'
import {getRoleName} from '@/api/filters'
export default {
  name: 'AgentList',
  data () {
    return {
      BusAgent: [],
      rolelist: [],
      paging: {},
      agentprop: {
        merchant_id: '',
        mer_auth_status: 1,
        identity: '1,2,4',
        token: getUserInfo('userinfo').token
      }
    }
  },
  components: {pagination, BusinessAccount},
  filters: {getRoleName},
  async created () {
    await this.getRolequery({token: this.agentprop.token})
    await this.getAgentAll({...this.agentprop, size: 5})
  },
  async mounted () {},
  methods: {
    getAgentAll (query) {
      service.getAgentAll(query)
        .then(respone => {
          this.BusAgent = respone.data.result.content.map(item => item)
          this.paging = respone.data.result
          delete this.paging.content
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取角色列表
    getRolequery (query) {
      service.getRoleQuery(query)
        .then(respone => {
          this.rolelist = respone.data.result.map(item => item)
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleSizeChange (page) {
      this.getAgentAll({...this.agentprop, number: page.number, size: 5})
    }
  }
}
</script>
