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
const props = defineProps({ showLoginPanel: { type: Boolean, default: false } })
const emit = defineEmits(['update:showLoginPanel'])
const router = useRouter()
</script>
