<script lang="ts" setup>
  import { loginApi, sentCaptchaApi } from '@/api'
  import { useAppStore, useUserStore } from '@/stores'
  import { icons, checkPhone, checkNotnull, checkEmail } from '@/utils'
  import type { FormInstance, MessageParamsWithType } from 'element-plus'

  const formRef = ref<FormInstance>()

  const appStore = useAppStore()
  const userStore = useUserStore()

  const showDialog = computed({
    get: () => appStore.getShowLogin,
    set: value => appStore.setShowLogin(value)
  })

  const tabName = ref('pass')
  const loading = ref(false)
  const captcha = reactive<{
    name: string | number
    disable: boolean
  }>({
    name: '验证码',
    disable: false
  })

  const form = reactive({
    email: '',
    password: '',
    phone: '',
    captcha: ''
  })

  const handleCaptcha = async () => {
    try {
      await checkNotnull(form.phone, '请输入手机号')
      await checkPhone(form.phone)
      const { code, message } = await sentCaptchaApi({ phone: form.phone })
      if (code !== 200) throw message
      const countdown = (num: number) => {
        if (num === 0) {
          captcha.name = '验证码'
          captcha.disable = false
          return
        } else {
          captcha.name = `${num}s`
          captcha.disable = true
          num--
          setTimeout(() => countdown(num), 1000)
        }
      }
      countdown(60)
      ElMessage.success('验证码发送成功')
    } catch (error) {
      ElMessage.error(error as MessageParamsWithType)
    }
  }

  const handleSubmit = async () => {
    try {
      const data = {
        email: form.email,
        phone: form.phone,
        captcha: form.captcha,
        password: form.password,
        realIP: '192.168.1.100'
      }
      if (tabName.value === 'pass') {
        await checkNotnull(form.email, '请输入邮箱或手机号')
        if (form.email.indexOf('@') !== -1) await checkEmail(form.email)
        else {
          await checkPhone(form.email)
          data.phone = form.email
          data.email = ''
        }
        await checkNotnull(form.password, '请输入密码')
      } else {
        await checkNotnull(form.phone, '请输入手机号')
        await checkPhone(form.email)
        await checkNotnull(form.captcha, '请输入验证码')
      }
      loading.value = true
      const { code, message, account, bindings, profile, token } = await loginApi(data)
      if (code !== 200) return Promise.reject(message)
      userStore.setAccount(account)
      userStore.setBindings(bindings)
      userStore.setProfile(profile)
      userStore.setToken(token)
      showDialog.value = false
      ElMessage.success('登录成功')
    } catch (error) {
      ElMessage.error(error as MessageParamsWithType)
    } finally {
      loading.value = false
    }
  }

  const onClose = () => formRef.value?.resetFields()

  watch(tabName, onClose)
</script>

<template>
  <ElDialog v-model="showDialog" :show-close="false" :modal="false" @close="onClose">
    <ElForm ref="formRef" :model="form">
      <ElTabs v-model="tabName">
        <ElTabPane label="密码登录" name="pass">
          <ElFormItem prop="email">
            <ElInput v-model="form.email" placeholder="邮箱/手机号" :prefix-icon="icons.user" />
          </ElFormItem>
          <ElFormItem prop="password">
            <ElInput
              v-model="form.password"
              placeholder="密码"
              type="password"
              show-password
              :prefix-icon="icons.lock"
              @keydown.enter="handleSubmit"
            />
          </ElFormItem>
        </ElTabPane>
        <ElTabPane label="短信登录" name="sms">
          <ElFormItem prop="phone">
            <ElInput
              v-model="form.phone"
              placeholder="手机号"
              :prefix-icon="icons.phone"
              @blur="form.phone = form.phone.trim()"
            />
          </ElFormItem>
          <ElFormItem prop="captcha">
            <ElInput
              class="captcha"
              v-model="form.captcha"
              placeholder="验证码"
              :prefix-icon="icons.turn"
            />
            <ElButton class="btn-captcha" @click="handleCaptcha" :disabled="captcha.disable">
              {{ captcha.name }}
            </ElButton>
          </ElFormItem>
        </ElTabPane>
      </ElTabs>
      <ElRow justify="space-between">
        <ElCol :span="6">
          <ElButton round auto-insert-space @click="handleSubmit" :loading="loading">登录</ElButton>
        </ElCol>
        <ElCol :span="6">
          <ElButton round auto-insert-space @click="onClose">重置</ElButton>
        </ElCol>
      </ElRow>
    </ElForm>
  </ElDialog>
</template>

<style lang="scss">
  .el-dialog {
    width: 30%;
    border-radius: 15px;
    background-color: rgba($color: #000000, $alpha: 0.3);
    overflow: hidden;
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      padding: calc(var(--el-dialog-padding-primary) + 0px) var(--el-dialog-padding-primary);
      .el-tabs__active-bar {
        color: var(--theme-color);
        border-bottom: 2px solid var(--theme-color);
      }
      .el-tabs__item {
        color: var(--inactive-color) !important;
      }
      .el-tabs__item.is-active {
        color: #eee !important;
      }
      .el-tabs__item:hover {
        color: #eee !important;
      }
      .el-tabs__new-tab:hover {
        color: #eee !important;
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent !important;
      }
      .el-input {
        height: 38px;
        line-height: 38px;
        .el-input__wrapper {
          box-shadow: none;
          background-color: rgba($color: #000000, $alpha: 0.3);
          .el-input__inner {
            color: #fff;
          }
        }
      }
      .el-button {
        width: 100%;
        border: none;
        background-color: rgba($color: #000000, $alpha: 0.3);
        &:hover {
          border: 1px solid var(--border-color) !important;
          color: var(--theme-color);
        }
      }
    }
  }
  .captcha {
    width: 78%;
  }
  .btn-captcha {
    margin-left: 2%;
    width: 20% !important;
    height: 38px;
    font-size: 0.2em;
  }
</style>
