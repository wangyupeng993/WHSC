<template>
    <el-row id="configure" v-loading.fullscreen.lock="Loading">
      <el-col :span="24">
        <el-row class="el-list-header">
          <el-col :span="18">
            <el-breadcrumb>
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{item.meta.title}}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
        <el-table :data="configlist" border stripe>
          <el-table-column prop="key" label="配置key"></el-table-column>
          <el-table-column prop="name" label="配置name"></el-table-column>
          <el-table-column prop="value" label="配置value">
            <template slot-scope="scope">
              <span v-if="setKey !== scope.row.key">{{scope.row.value}}</span>
              <el-input v-if="setKey === scope.row.key" v-model="scope.row.value"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="配置描述"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button v-if="setKey !== scope.row.key"
                         type="primary"
                         icon="el-icon-setting"
                         @click="setKey = scope.row.key">设置</el-button>
              <el-button-group v-if="setKey === scope.row.key">
                <el-button type="primary"
                           icon="far fa-save"
                           @click="saveconfig(scope.$index,scope.row)">保存</el-button>
                <el-button type="danger"
                           icon="el-icon-circle-close-outline"
                           @click="setKey = ''">取消</el-button>
              </el-button-group>

            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
</template>

<script>
import service from '@/api/request/systemadmin'
import {getUserInfo} from '@/api/sessionStorage'
export default {
  name: 'Configure',
  data () {
    return {
      Loading: false,
      setKey: '',
      token: getUserInfo('userinfo').token,
      configlist: []
    }
  },
  mounted () {
    this.getConfiglist({token: this.token})
  },
  methods: {
    getConfiglist (query) {
      this.Loading = true
      service.getConfig(query)
        .then(respone => {
          this.configlist = respone.data.result.map(item => item)
          this.Loading = false
        })
        .catch(error => {
          this.Loading = false
          console.log(error)
        })
    },
    async saveconfig (index, row) {
      await service.saveSystemconfig({key: row.key, value: row.value, token: this.token})
        .then(respone => {
          this.setKey = ''
        })
        .catch(error => {
          console.log(error)
        })
      await this.getConfiglist({token: this.token})
    }
  }
}
</script>
