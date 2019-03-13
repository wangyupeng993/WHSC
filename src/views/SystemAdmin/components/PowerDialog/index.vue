<template>
    <el-dialog :title="title" @close="dialogClose" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-row>
        <el-col :span="20">
          <el-form :model="item"  :rules="rulecheck" status-icon auto-complete="on">
            <el-form-item  prop="name" label="权限名称" :label-width="formLabelWidth">
              <el-badge value="必填" style="display:block;">
                <el-input v-model="item.name" autocomplete="off" name="name" placeholder="请输入权限名称"></el-input>
              </el-badge>
            </el-form-item>
            <el-form-item prop="icon" label="权限图标" :label-width="formLabelWidth">
              <el-input v-model="item.icon" autocomplete="off" placeholder="请输入权限图标的class名称"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="权限描述" :label-width="formLabelWidth">
              <el-input v-model="item.description" autocomplete="off" placeholder="请输入权限相关的描述"></el-input>
            </el-form-item>
            <el-form-item prop="url" label="权限URL" :label-width="formLabelWidth">
              <el-input v-model="item.url" autocomplete="off" placeholder="请输入权限相关的URL名称"></el-input>
            </el-form-item>
            <el-form-item prop="number" label="排序号" :label-width="formLabelWidth">
              <el-badge value="必填" style="display:block;">
                <el-input v-model="item.order_id" type="number" autocomplete="off" name="number"  placeholder="请输入排序数字号"></el-input>
              </el-badge>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button @click="handleclick" type="primary" :disabled="item.name ===''||item.order_id === ''">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  name: 'index',
  data () {
    const validatename = (rule, value, callback) => {
      console.log(value)
      if (this.item.name === '') {
        return callback(new Error('权限名不能为空！'))
      } else {
        callback()
      }
    }
    const validatenumber = (rule, value, callback) => {
      if (this.item.order_id === '') {
        return callback(new Error('排序号不能为空且为数字！'))
      } else if (!Number(this.item.order_id)) {
        return callback(new Error('排序号必须为数字！'))
      } else if (Number.isInteger(this.item.order_id)) {
        return callback(new Error('排序号必须为整数！'))
      } else {
        callback()
      }
    }
    return {
      formLabelWidth: '70px',
      dialogVisible: true,
      rulecheck: {
        name: [{ validator: validatename, trigger: 'blur' }],
        number: [{ validator: validatenumber, trigger: 'blur' }]
      }
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
      default: ''
    }
  },
  components: {},
  methods: {
    dialogClose () {
      this.$emit('update:visible', false)
    },
    handleclick () {
      this.$emit('handle-onclick', this.item)
    },
    cancelSubmit () {
      this.$emit('handle-cancel')
      this.$emit('update:visible', false)
    }
  }
}
</script>
