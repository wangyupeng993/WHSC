<template>
  <el-dialog :title="title" @close="dialogClose" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
    <el-row>
      <el-col :span="20">
        <el-form :model="item" :rules="changeRole" status-icon auto-complete="on">
          <el-form-item  prop="id" label="角色编号" :label-width="formLabelWidth">
            <el-badge value="必填" style="display:block;">
              <el-input type="number" v-model="item.id" autocomplete="off" name="id" placeholder="请输入角色数字编号"></el-input>
            </el-badge>
          </el-form-item>
          <el-form-item  prop="name" label="角色名称" :label-width="formLabelWidth">
            <el-badge value="必填" style="display:block;">
              <el-input v-model="item.name" autocomplete="off" name="name" placeholder="请输入角色名称"></el-input>
            </el-badge>
          </el-form-item>
          <el-form-item  prop="description" label="角色描述" :label-width="formLabelWidth">
            <el-badge value="必填" style="display:block;">
              <el-input v-model="item.description" autocomplete="off" name="description" placeholder="请输入角色描述"></el-input>
            </el-badge>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="handleClick"
                 :disabled="item.name ===''||item.name === null
                 ||item.id === ''||item.id === null||
                 item.description ===''||item.description === null">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'index',
  data () {
    const validatename = (rule, value, callback) => {
      if (this.item.name === '' || this.item.name === null) {
        return callback(new Error('角色名称不能为空！'))
      } else {
        callback()
      }
    }
    const validatenumber = (rule, value, callback) => {
      const isInteger = value.indexOf('.')
      if (this.item.id === '' || this.item.id === null) {
        return callback(new Error('角色编号不能为空且为数字！'))
      } else if (!Number(this.item.id)) {
        return callback(new Error('角色编号必须为数字！'))
      } else if (isInteger !== -1) {
        return callback(new Error('角色编号必须为整数！'))
      } else {
        callback()
      }
    }
    const valdatedesc = (rule, value, callback) => {
      if (this.item.description === '' || this.item.description === null) {
        return callback(new Error('角色描述不能为空！'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '80px',
      dialogVisible: true,
      changeRole: {
        id: [{ validator: validatenumber, trigger: 'blur' }],
        name: [{ validator: validatename, trigger: 'blur' }],
        description: [{ validator: valdatedesc, trigger: 'blur' }]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      defualt: false
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
      this.$emit('cancel-submit')
    },
    handleClick () {
      this.$emit('handle-click', this.item)
    }
  }
}
</script>
