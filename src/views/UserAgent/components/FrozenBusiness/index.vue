<template>
  <el-dialog :title="`冻结/解冻 ${agentinfo.merchantName}`" :visible.sync="dialogTableVisible" @close="dialogClose" width="30%" :close-on-click-modal="false">
    <el-row>
      <el-col :span="20">
        <el-form :model="frozenAgent" :rules="Amountmoney" status-icon auto-complete="on">
          <el-form-item label="冻结/解冻" :label-width="formLabelWidth">
            <el-switch
              v-model="frozenAgent.frozenStatus"
              active-text="解冻"
              inactive-text="冻结">
            </el-switch>
          </el-form-item>
          <el-form-item prop="money" label="冻结/解冻金额" :label-width="formLabelWidth">
            <el-input type="number" v-model="frozenAgent.amount" name="money" placeholder="请输入冻结/解冻金额"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="frozenAgent.amount === ''||frozenAgent.amount === null">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import service from '@/api/request/UserAgent'
export default {
  name: 'index',
  data () {
    const validatemoney = (rule, value, callback) => {
      if (this.frozenAgent.amount === '' || this.frozenAgent.amount === null) {
        return callback(new Error('金额不能为空'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: true,
      formLabelWidth: '120px',
      frozenAgent: {
        amount: '',
        frozenStatus: false
      },
      amount: '',
      Amountmoney: {
        money: [{ validator: validatemoney, trigger: 'blur' }]
      }
    }
  },
  props: {
    token: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    agentinfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
    },
    async handleSubmit () {
      const freezeData = {merchant_id: this.agentinfo.merchantId, amount: this.frozenAgent.amount, token: this.token}
      !this.frozenAgent.frozenStatus ? await service.freezeBusiness(freezeData)
        .then(respone => {
          this.dialogClose()
          this.$emit('handle-click')
        })
        .catch(error => {
          this.$emit('update:visible', true)
          console.log(error)
        }) : await service.unfreezeBusiness(freezeData)
        .then(respone => {
          this.dialogClose()
          this.$emit('handle-click')
        })
        .catch(error => {
          this.$emit('update:visible', true)
          console.log(error)
        })
    }
  }
}
</script>
