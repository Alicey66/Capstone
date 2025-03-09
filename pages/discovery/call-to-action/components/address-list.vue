<template>
  <view class="address-box h-100 flex flex-col">
    <view class="call-header">
      <tw-common-topbar>
        <view> {{ $t('call.action.address.selectMeetInfo') }}</view>
      </tw-common-topbar>
    </view>
    <view class="address-content flex-1">
      <scroll-view
        scroll-y="true"
        class="h-full overflow-y"
        :scroll-into-view="data.scrollId"
        scroll-with-animation
        :show-scrollbar="false"
      >
        <!--        <view v-if="!data.list.length">-->
        <!--   -->
        <!--        </view>-->
        <tui-no-data v-if="!data.list.length" imgUrl="/static/icons/no-data.png">
          <text class="tui-color__black">{{ $t('chat.message.search.noData') }}</text>
        </tui-no-data>
        <view class="address-item" v-for="(item, index) in data.list">
          <view class="address-card">
            <view class="user-box">
              <view class="user-title flex flex-between">
                <view class="user-left">
                  <text class="margin-r20">
                    {{ item.contactName }}
                  </text>
                  <text>{{ item.phoneNumber }}</text>
                </view>
                <view class="user-right">
                  <text class="iconfont size32 margin-r30" @click="topping(item, index)">&#xe66a;</text>
                  <text class="iconfont size32" @click="onDelete(index)">&#xe66b;</text>
                </view>
              </view>
              <view class="user-address">
                <text>{{ item.detailedAddress }}</text>
              </view>
            </view>
            <view class="item-line"></view>

            <view class="operate flex flex-between">
              <view class="operate-left flex-center">
                <uni-icons
                  :type="item.isDefault ? 'checkbox-filled' : 'circle'"
                  :color="item.isDefault ? '#0187FA' : '#9DA2B1'"
                  size="24"
                  @click="onSwitch(item)"
                ></uni-icons>
                <view :class="item.isDefault ? 'select' : 'noSelect'">{{
                  item.isDefault ? $t('call.action.address.defaultAddress') : $t('t.setting.defaultAddress')
                }}</view>
              </view>
              <view class="operate-right flex">
                <view class="btn margin-r30" hover-class="hoverClass" @click="onSaveDraftTip">
                  {{ $t('t.general.copy') }}
                </view>

                <view class="btn" hover-class="hoverClass" @click="onSaveDraftTip">
                  {{ $t('t.general.change') }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view style="height: 30rpx"></view>
      </scroll-view>
    </view>
    <view class="btn-box">
      <button class="btn" hover-class="hoverClass" @click="onSaveDraftTip">
        {{ '+' + $t('call.action.address.addMeetInfo') }}
      </button>
    </view>

    <!--    删除弹框-->
    <tui-modal
      :show="showCard"
      :content="$t('created.post.isRemove')"
      color="#333"
      :size="32"
      @click="buttonTapCard"
    ></tui-modal>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import actionsApi from '@/api/actions'
let data = reactive({
  scrollId: 'scroll-0',
  //默认
  defaultAddress: '',
  list: [],
})
let queryData = reactive({
  page: 1,
  pageSize: 10,
  list: [],
  isEnd: false,
})
let onSwitch = item => {
  console.log('onSwitch', item)
  let res = { code: -1 }
  try {
    res = actionsApi.setDefaultAddress(item.id)
  } catch (e) {}
  if (!Number(res.code)) {
    data.list.forEach(i => {
      i.isDefault = false
    })
    item.isDefault = true
  }
}
let onSaveDraftTip = () => {
  console.log('onSaveDraftTip')
  uni.navigateTo({
    url: '/pages/discovery/call-to-action/components/address-new',
  })
}
//请求数据
//请求列表数据
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
queryList()
//置顶
let topping = (item, index) => {
  data.list.splice(index, 1)
  data.list.unshift(item)
  //置顶请求
}
//删除
let deleteIndex = ref(0)
let onDelete = index => {
  console.log('detele')
  showCard.value = true
  deleteIndex.value = index
  //删除请求
}

let deleteFn = index => {
  console.log('detele', index)
  data.list.splice(index, 1)
  //删除请求
}

//确认弹框
let showCard = ref(false)
let buttonTapCard = e => {
  console.log(e, 'eeeeeeeeeee')
  if (e.index) {
    showCard.value = false
    deleteFn(deleteIndex.value)
  } else {
    showCard.value = false
  }
}
</script>

<style lang="less" scoped>
.address-box {
  background-color: #f4f7fd;

  .address-content {
    .address-item {
      background-color: white;
      border-radius: 24rpx;
      margin-bottom: 20rpx;
      .address-card {
        .user-box {
          .user-title {
            padding: 30rpx 30rpx 0 30rpx;
            .user-left {
              font-size: 15px;
              font-weight: 500;
              color: #1f2228;
            }
            .user-right {
            }
          }
          .user-address {
            font-size: 28rpx;
            color: #747480;
            margin: 20rpx 0 30rpx 30rpx;
          }
        }
        .operate {
          padding: 0 30rpx 30rpx 30rpx;
          .operate-left {
            margin-top: 28rpx;
          }
          .operate-right {
            font-size: 26rpx;
            color: #747480;
            margin-top: 20rpx;
            .btn {
              width: 88rpx;
              height: 52rpx;
              border: 1rpx solid #747480;
              border-radius: 6rpx;
              line-height: 52rpx;
              text-align: center;
            }
          }
        }
      }
    }
  }
  .btn-box {
    height: 120rpx;
    background-color: white;
    padding-top: 16rpx;
    box-sizing: border-box;
    .btn {
      margin: 0 30rpx;
      background-color: #0187fa;
      border-radius: 100rpx;
      color: white;
    }
  }
}

.item-line {
  height: 2rpx;
  background-color: #eff2fa;
}
.margin-r20 {
  margin-right: 20rpx;
}
.margin-r30 {
  margin-right: 30rpx;
}

.size32 {
  font-size: 32rpx;
}
//未选择
.noSelect {
  color: #747480;
  font-size: 26rpx;
  margin-left: 12rpx;
}
//选择
.select {
  color: #0187fa;
  font-size: 26rpx;
  margin-left: 12rpx;
}
</style>
