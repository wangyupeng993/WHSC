<template>
  <el-dialog :title="title" @close="dialogCloe"
             width="30%"
             :visible.sync="dialogVisible"
             :close-on-click-modal="false">
    <el-tree ref="tree" :data="menudata"
             :check-strictly="false"
             accordion
             show-checkbox node-key="id"
             :expand-on-click-node="false"
             :default-checked-keys="checkedKeys">
      <el-row style="width:100%;" slot-scope="{ node, data }">
        <el-col :span="10">{{node.label}}</el-col>
        <el-col :span="12">{{data.description}}</el-col>
      </el-row>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCloe">取消</el-button>
      <el-button @click="suerSubmit" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import service from '@/api/request/systemadmin'
import {getUserInfo} from '@/api/sessionStorage'
export default {
  name: 'inex',
  data () {
    return {
      dialogVisible: true,
      token: getUserInfo('userinfo').token,
      menudata: [],
      checkedKeys: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      dafault: ''
    }
  },
  mounted () {
    service.getRolePermission({token: this.token, role_id: this.item.id})
      .then(respone => {
        this.menudata = respone.data.result.map(item => {
          if (item.checked) {
            this.checkedKeys.push(item.id)
          }
          return {
            id: item.id,
            label: item.name,
            description: item.description,
            children: item.data.map(child => {
              if (child.checked) {
                this.checkedKeys.push(child.id)
              }
              return {
                id: child.id,
                label: child.name,
                description: child.description
              }
            })
          }
        })
        console.log(respone)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    dialogCloe () {
      this.$emit('update:visible', false)
    },
    suerSubmit () {
      const CheckedKeys = this.$refs.tree.getCheckedKeys().join(',')
      this.$emit('handle-click', {permission_Ids: CheckedKeys, role_id: this.item.id, token: this.token})
    }
  }
}
</script>
