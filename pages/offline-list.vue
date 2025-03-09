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
      <view class="item" v-for="(item, index) in data.list" @click="clickCopy(item)">
        <view class="top-item">
          <view class="text1">
            <view class="left">{{ item.contactName }} {{ item.phoneNumber }}</view>
            <view class="right">
              <image
                src="/static/images/quming/topUp.png "
                mode="aspectFill"
                class="icon"
                @click.stop="clickTop(item.id)"
              ></image>
              <image
                src="/static/images/quming/x4.png "
                mode="aspectFill"
                class="icon"
                style="margin-left: 30rpx"
                @click.stop="clickDelete(item.id)"
              ></image>
            </view>
          </view>
          <view class="text2">{{ item.generalAddress }}</view>
        </view>
        <view class="bottom-item">
          <view class="left selected" v-if="item.isDefault" @click.stop="clickDefault(item.id)">
            <image src="/static/icons/selected.png " mode="aspectFill" class="icon"></image>
            {{$t('call.action.address.defaultAddress')}}</view
          >
          <view class="left noselected" v-else @click.stop="clickDefault(item.id)">
            <image src="/static/images/quming/yuan.png " mode="aspectFill" class="icon"></image>

            默认</view
          >

          <view class="right">
            <view class="btn" @click.stop="clickCopy(item)">复制</view>
            <view class="btn" @click.stop="clickEdit(item)">修改</view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom">
      <view class="btn" @click="addOffline('add')">+{{$t('call.action.address.addMeetInfo')}}</view>
    </view>
  </view>
</template>

<script setup>
import apiUser from '@/api/user'
import { reactive, ref, getCurrentInstance } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'

import actionsApi from '@/api/actions'

const data = reactive({
  list: [],
})
let queryList = async () => {
  let res = { code: -1 }
  try {
    res = await actionsApi.getMyMeetInfo()
  } catch (e) {}
  if (!Number(res.code)) {
    data.list = res.data
    console.log(data.list, 'data.list')
  }
}

onShow(() => {
  queryList()
})

let clickCopy = item => {
  uni.setClipboardData({
    data: JSON.stringify(item),
    success: function () {
      uni.showToast({
        title: 'Copy Success',
        icon: 'none',
        duration: 1000,
      })
      // back
      uni.navigateBack()
    },
  })

  uni.$emit('copy', item)
}

let clickEdit = item => {
  uni.navigateTo({
    url: `/pages/discovery/call-to-action/add-offline?type=edit&id=${item.id}`,
    success: res => {
      // console.log(res)

      res.eventChannel.emit('edit', item)
    },
  })
}

let addOffline = type => {
  uni.navigateTo({
    url: `/pages/discovery/call-to-action/add-offline?type=${type}`,
  })
}

let clickTop = async id => {
  let res = { code: -1 }
  try {
    res = await actionsApi.getMeetInfoSetTop({
      id,
    })
  } catch (e) {}
  if (!Number(res.code)) {
    queryList()
  }
}

let clickDelete = async id => {
  let res = { code: -1 }
  try {
    res = await actionsApi.getMeetInfoDelete(id)
  } catch (e) {}
  if (!Number(res.code)) {
    queryList()
  }
}

let clickDefault = async id => {
  let res = { code: -1 }
  try {
    res = await actionsApi.getMeetInfoSetDefault({
      id,
    })
  } catch (e) {}
  if (!Number(res.code)) {
    queryList()
  }
}

let onBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.selected {
  font-size: 26rpx;
  color: #0187fa;
  display: flex;
  align-items: center;
  image {
    margin-right: 12rpx;
  }
}

.noselected {
  font-size: 26rpx;
  color: #747480;
  display: flex;
  align-items: center;
  image {
    margin-right: 12rpx;
  }
}

.icon {
  width: 30rpx;
  height: 30rpx;
}

.box {
  overflow-y: auto;
}

.item {
  background: white;
  margin-bottom: 20rpx;
  border-radius: 24rpx;
  .top-item {
    padding: 30rpx;
    .text1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      .left {
        color: #1f2228;
        font-weight: bold;
        font-size: 30rpx;
      }
      .right {
      }
    }
    .text2 {
      color: #747480;
      font-size: 28rpx;
    }
  }
  .bottom-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx 30rpx;
    border-top: 1px solid #eff2fa;
    .left {
      display: flex;
    }
    .right {
      display: flex;
      .btn {
        color: #747480;
        font-size: 26rpx;
        border: 1rpx solid #9da2b1;
        padding: 8rpx 16rpx;
        border-radius: 6rpx;
        margin: 0 10rpx;
      }
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
