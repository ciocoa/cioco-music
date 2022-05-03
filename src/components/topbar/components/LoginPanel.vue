<template>
  <el-dialog v-model="showDialog" :show-close="false" :before-close="btnCancel">
    <el-form ref="formRef">
      <el-tabs v-model="tagName" @tab-click="handleClick">
        <el-tab-pane label="密码登录" name="pass">
          <el-form-item>
            <el-input v-model="loginData.phoneNum" placeholder="邮箱/手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              type="password"
              show-password
              v-model="loginData.phonePwd"
              placeholder="密码"
              @keyup.enter="btnSubmit"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="sms">
          <el-form-item>
            <el-input v-model="loginData.phoneNum" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginData.phonePwd" placeholder="验证码" class="captcha"></el-input>
            <el-button class="captcha-btn" @click="getCode">获取验证码</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <el-row justify="space-between">
        <el-col :span="6">
          <el-button round auto-insert-space @click="btnSubmit">登录</el-button>
        </el-col>
        <el-col :span="6">
          <el-button round auto-insert-space @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { sentCaptcha, phoneLogin } from '@/api/user'
import { useUserStore } from '@/stores/user'

const props = defineProps({ showLoginPanel: { type: Boolean, default: false } })
const emit = defineEmits(['update:showLoginPanel'])
const router = useRouter()
const userStore = useUserStore()

const showDialog = computed({
  get: () => props.showLoginPanel,
  set: val => emit('update:showLoginPanel', val)
})
const loginData = reactive({
  phoneNum: '',
  phonePwd: ''
})
const tagName = ref('pass')
const handleClick = () => {
  loginData.phoneNum = ''
  loginData.phonePwd = ''
}
const formRef = ref(null)

const getCode = async () => {
  try {
    const { data } = await sentCaptcha({ phone: loginData.phoneNum })
    if (data.code === 200) ElMessage.success('验证码发送成功')
    else ElMessage.error('Error! ' + data.message)
  } catch (error: any) {
    ElMessage.error('Error! ' + error)
  }
}
const btnSubmit = async () => {
  try {
    let result
    if (tagName.value == 'pass') {
      result = await phoneLogin({ phone: loginData.phoneNum, password: loginData.phonePwd })
    } else if (tagName.value == 'sms') {
      result = await phoneLogin({ phone: loginData.phoneNum, captcha: loginData.phonePwd })
    }
    if (result.data.code == 200) {
      ElMessage.success('登录成功')
      router.push({ path: '/' })
      userStore.setUserToken(result.data.token)
    } else ElMessage.error('Error! ' + result.data.message)
  } catch (error: any) {
    ElMessage.error('Error! ' + error)
  }
}
const btnCancel = () => {
  loginData.phoneNum = ''
  loginData.phonePwd = ''
  showDialog.value = false
}
</script>

<style lang="scss">
.el-dialog {
  width: 35% !important;
  border-radius: 15px !important;
  background-color: transparent !important;
  overflow: hidden;
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    background: var(--theme-bg-color);
    .el-tabs__active-bar {
      border-top: 1px solid var(--border-color) !important;
      color: var(--theme-color) !important;
      border-bottom: 2px solid var(--theme-color) !important;
    }
    .el-tabs__item {
      color: var(--inactive-color) !important;
    }
    .el-tabs__item.is-active {
      color: #fff !important;
    }
    .el-tabs__item:hover {
      color: #fff !important;
    }
    .el-tabs__new-tab:hover {
      color: #fff !important;
    }
    .el-tabs__nav-wrap::after {
      background-color: transparent !important;
    }
    .el-input {
      .el-input__inner {
        background-color: var(--search-bg) !important;
        color: var(--theme-color) !important;
        background-repeat: no-repeat !important;
        border: none !important;
        box-shadow: none;
        border-radius: 10px;
        height: 38px;
        line-height: 38px;
        &:hover {
          border: 1px solid var(--border-color) !important;
        }
      }
    }
    .el-button {
      width: 100%;
      border: none;
      background-color: var(--theme-bg-color);
      &:hover {
        border: 1px solid var(--border-color) !important;
        color: var(--theme-color);
      }
    }
  }
}

.captcha {
  width: 80% !important;
}

.captcha-btn {
  width: 20% !important;
  height: 38px !important;
  border-radius: 10px !important;
}
</style>
