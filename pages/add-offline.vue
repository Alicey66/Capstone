<template>
  <view class="main">
    <view class="nav">
      <t-uni-nav-bar :fixed="true" backgroundColor="#F4F7FD">
        <view class="navTitle" style="color: #0b0b0b">{{$t('call.action.address.selectMeetInfo')}}</view>
        <block v-slot:left>
          <view class="left" @click="onBack"><tui-icon name="arrowleft" color="#0B0B0B"></tui-icon></view>
        </block>
      </t-uni-nav-bar>
    </view>
    <view class="box">
      <view class="item">
        <view class="left">{{ $t('t.setting.yourname') }}</view>
        <view class="right">
          <input v-model="from.contactName" type="text" />
        </view>
      </view>
      <view class="item">
        <view class="left">{{ $t('t.setting.phone') }}</view>
        <view class="right">
          <input v-model="from.phoneNumber" type="number" />
          <view class="right-icon" @click="clickCode"
            >+{{ from.areaCode }} <text class="iconfont">&#xe650;</text>
          </view>
        </view>
      </view>
      <view class="item">
        <view class="left">{{$t('call.action.address.meetAddress')}}</view>
        <view class="right">
          <input v-model="from.generalAddress" type="text" />
        </view>
      </view>
      <view class="item h300">
        <view class="left">{{$t('call.action.address.searchAddress')}}</view>
        <view class="right">
          <textarea class="textarea" v-model="from.detailedAddress" />
        </view>
      </view>

      <view class="item2">
        <view class="left">{{$t('call.action.address.setDefaultAddress')}}</view>
        <view class="right">
          <tw-check
            :onlyVideo="from.isDefault"
            @isShow="from.isDefault = !from.isDefault"
            :activeImg="'/static/images/chat.calligraphy/address1.png'"
            :noActiveImg="'/static/images/chat.calligraphy/address2.png'"
          ></tw-check>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn" @click="submit">{{ $t('t.general.save') }}</view>
    </view>

    <tw-common-country ref="countryBox" @countryChange="changeCode" :height="70 + 'vh'" />
  </view>
</template>

<script setup>
import apiUser from '@/api/user'
import { reactive, ref, getCurrentInstance } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import actionsApi from '@/api/actions'

let instance = getCurrentInstance()

// areaCode	手机区号			string
// contactName	联系人名字		string
// detailedAddress	详细地址			string
// generalAddress	一般地址			string
// isDefault	是否是默认地址		boolean
// phoneNumber	手机号			integer(int64)
let countryBox = ref(null)

const from = reactive({
  areaCode: '86',
  contactName: '',
  detailedAddress: '',
  generalAddress: '',
  isDefault: false,
  phoneNumber: '',
})

let type = ref('')
onLoad(e => {
  if (e.type) {
    type.value = e.type
  }

  const eventChannel = instance.proxy.getOpenerEventChannel()
  eventChannel.on('edit', async res => {
    console.log(res)
    from.areaCode = res.areaCode
    from.contactName = res.contactName
    from.detailedAddress = res.detailedAddress
    from.generalAddress = res.generalAddress
    from.isDefault = res.isDefault
    from.phoneNumber = res.phoneNumber
    // 上面怎么缩写
  })
})

const clickCode = () => {
  countryBox.value.open()
}

const changeCode = e => {
  from.areaCode = e.number

  countryBox.value.close()
}

let submit = async () => {
  if (!check()) {
    return false
  }

  console.log(from)

  // 添加
  if (type.value == 'add') {
    let res = await actionsApi.addMeetInfo(from)

    if (res.code == 0) {
      uni.showToast({
        title: '保存成功',
        icon: 'none',
      })
      uni.navigateBack()
    }
  } else if (type.value == 'edit') {
    // let res = await actionsApi.editMeetInfo(from)

    // if (res.code == 0) {
    //   uni.showToast({
    //     title: '修改成功',
    //     icon: 'none',
    //   })
    // }
    uni.navigateBack()
  }
}

//校验
let check = () => {
  if (!from.contactName) {
    uni.showToast({
      title:
        uni.$t('pusher.product-details.contact') +
        uni.$t('group-settings.groupEdit.theName') +
        uni.$t('common.cannotBeEmpty'),
      icon: 'none',
    })
    return false
  }
  if (!from.phoneNumber) {
    uni.showToast({
      title: uni.$t('t.setting.phone') + uni.$t('common.cannotBeEmpty'),
      icon: 'none',
    })
    return false
  }
  //校验手机号
  if (!/^1[3456789]\d{9}$/.test(from.phoneNumber)) {
    uni.showToast({
      title: uni.$t('t.setting.phone') + uni.$t('common.notInStandard'),
      icon: 'none',
    })
    return false
  }
  if (!from.generalAddress) {
    uni.showToast({
      title: uni.$t('t.address.searchAddress') + uni.$t('common.cannotBeEmpty'),
      icon: 'none',
    })
    return false
  }
  if (!from.detailedAddress) {
    uni.showToast({
      title: uni.$t('t.address.noAddress'),
      icon: 'none',
    })
    return false
  }
  return true
}

let onBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.right-icon {
  color: #747480;
  font-size: 28rpx;
  padding-right: 30rpx;
}

.item2 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  color: #1f2228;
  font-size: 28rpx;
}

.h300 {
  height: 190rpx !important;
  .textarea {
    height: 190rpx;
    padding: 30rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #1f2228;
  }
}

.item {
  height: 100rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx 30rpx 0;
  .left {
    width: 150rpx;
    font-size: 28rpx;
  }
  .right {
    height: 100%;
    flex: 1;
    background: #f4f7fd;
    border-radius: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      height: 100%;
      padding-left: 30rpx;
      font-size: 28rpx;
      color: #1f2228;
    }
  }
}

.main {
  width: 100vw;
  height: 100vh;
  background: #f4f7fd;
  display: flex;
  flex-direction: column;
  .box {
    flex: 1;
    background: white;
    box-shadow: 0px -4px 20px 0px #d0d6e533;
  }
  .bottom {
    height: 200rpx;
    background: white;
    .btn {
      color: white;
      background: $t-blue;
      padding: 22rpx 0;
      margin: 30rpx 30rpx 0;
      border-radius: 100rpx;
      text-align: center;
      font-size: 32rpx;
    }
  }
}
</style>
