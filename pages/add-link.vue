<template>
  <view class="box">
    <view class="box-bind" v-if="bindGroup">
      <tw-bind-group
        v-model:autoInvite="data.autoInvite"
        v-model:bindingImGroupId="data.bindingImGroupId"
        v-model:imGroupName="data.imGroupName"
        :title="
          $t('tw-bind-group.leverage') +
          '“' +
          TRANSLATE.preview.type[type] +
          '“,' +
          $t('discovery.ecosystem.ecoPlusItem4')
        "
        :type="type"
      ></tw-bind-group>
    </view>
    <view class="box-recommend">
      <view class="box-recommend-title flex">
        <image class="box-recommend-icon" src="/static/icons/hotspot.png"></image>
        <view class="box-recommend-text"> {{ $t('group-settings.im.addCreatorSpecialRecommendations') }}</view>
      </view>
      <view class="box-recommend-desc margin30">
        {{ $t('group-settings.im.whetherOrNotToPayWithTheTraditionalPlatformThatGivesPriorityToProfit') }}
      </view>

      <view class="add-recommend" @click="onChoose">
        <view style="font-size: 28rpx">{{
          $t('call.action.addRecommend') + '“' + TRANSLATE.preview.type[type] + '“,'
        }}</view>
        <image class="add-recommend-icon" src="/static/icons/add-rou.png"></image>
      </view>

      <view v-for="item in data.recommendedActivity">
        <!--          行动召唤卡片-->
      </view>
    </view>

    <view class="user-form">
      <view class="form-label">{{ $t('discovery.ecosystem.userInfo') }}</view>
      <view class="form-label-dec">{{ $t('discovery.ecosystem.userInfoTips') }}</view>
      <view class="form-email form-item">
        <tui-icon name="mail" :size="48" unit="rpx"></tui-icon>
        <input
          class="email-input input"
          type="text"
          v-model="data.contacts[0].details"
          :placeholder="$t('discovery.ecosystem.enterMail')"
          placeholder-class="placeholder"
        />
      </view>
      <view class="form-mobile form-item" id="eco-details2">
        <tui-icon name="mobile" :size="48" unit="rpx"></tui-icon>
        <input
          class="mobile-input input"
          type="text"
          v-model="data.contacts[1].details"
          :placeholder="$t('discovery.ecosystem.enterPhone')"
          placeholder-class="placeholder"
        />
      </view>
      <view id="reward-contacts" class="form-label" style="font-size: 30rpx; line-height: 40rpx; color: #1f2228"
        >{{ $t('discovery.ecosystem.gam') }}</view>
      <template v-for="(item, index) in data.contacts" :key="item">
        <view v-if="index >= 2" class="form-wx form-item" id="reqq">
          <image class="form-wx-img" :src="item.icon || item.logo" mode="aspectFit"></image>
          <input
            class="email-input input"
            type="text"
            v-model="item.details"
            :placeholder="PlaceholderArr[index - 2]"
            placeholder-class="placeholder"
          />
        </view>
      </template>
      <view class="add-contact">
        <view class="setup-contact" v-if="addConcat">
          <image
            @click="DeleteContact"
            class="setup-contact-de"
            src="/static/images/discovery.ecosystem/deletePng.png"
            mode="aspectFit"
          ></image>
          <view class="setup-img">
            <view v-if="!addConcat.logo" class="setup-img-bg" @click="chooseMedia">
              <image class="setup-img-bg-icon" src="/static/images/create.product/addImg.png" mode="aspectFill"></image>
              <view class="setup-img-bg-text">{{ $t('vacancy.addIcon') }}</view>
            </view>
            <view v-else class="show-img">
              <image class="show-img-icon" :src="addConcat.logo" mode="aspectFill"></image>
            </view>
            <image
              v-if="addConcat.logo"
              @click="onDeletePng"
              class="add-cover-img-de"
              src="/static/images/discovery.ecosystem/deletePng.png"
              mode="aspectFit"
            ></image>
          </view>

          <view class="setup-input">
            <input
              class="setup-input-entry"
              type="text"
              v-model="addConcat.details"
              :placeholder="$t('vacancy.addUserName')"
            />
          </view>
        </view>
        <view
          v-if="!addConcat"
          class="add-custom-contact"
          hover-class="btn-active"
          hover-stay-time="100"
          @click="newContact"
        >
          {{ $t('tw-bind-group.customizeAccount') }}
        </view>
        <view
          v-if="addConcat"
          class="add-custom-confirm"
          hover-class="btn-active"
          hover-stay-time="100"
          @click="confirm"
        >
          <image style="width: 24rpx; height: 24rpx" src="/static/images/create.product/equity-confirm.png"></image>

          <view style="font-size: 28rpx; color: #0187fa; margin-left: 12rpx"> {{ $t('chat.group.affirm') }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'
import store from '@/store'
import { linkSet } from '@/pages/common/create-related/js/link-set.js'
import { TRANSLATE } from '../utils/translate'
let props = defineProps({
  type: {
    type: String,
    default: 'HELP',
  },
})
console.log(props.type, 'props.typeprops.typeprops.type')
let emit = defineEmits(['linkData'])
// 联系方式
let email = ref({
  type: 'email',
  details: '',
})
let mobile = ref({
  type: 'mobile',
  details: '',
})
let socialInformation = ref([
  {
    type: 'wechat',
    icon: '/static/icons/social-contact/wechat.png',
  },
  {
    type: 'facebook',
    icon: '/static/icons/social-contact/Facebook.png',
  },
  {
    type: 'linkedin',
    icon: '/static/icons/social-contact/Linkedin.png',
  },
  {
    type: 'weibo',
    icon: '/static/icons/social-contact/Weibo.png',
  },
  {
    type: 'twitter',
    icon: '/static/icons/social-contact/Twitter.png',
  },
  {
    type: 'instagram',
    icon: '/static/icons/social-contact/Instagram.png',
  },
  {
    type: 'discord',
    icon: '/static/images/create-group/discord.png',
  },
  {
    type: 'cnTikTok',
    icon: '/static/images/create-group/cntiktok.png',
  },
  {
    type: 'enTikTok',
    icon: '/static/images/create-group/entiktok.png',
  },
  {
    type: 'https',
    icon: '/static/icons/social-contact/https.png',
  },
])
let data = reactive({
  autoInvite: false,
  bindingImGroupId: '',
  imGroupName: '',
  recommendedActivity: [], //推荐的行动召唤
  contacts: [email.value, mobile.value, ...socialInformation.value],
})

let bindGroup = ref(false)
setTimeout(() => {
  bindGroup.value = true
}, 3000)

let onChoose = () => {
  uni.showToast({
    title: uni.$t('t.general.notyetopen'),
    icon: 'none',
  })
  return

  uni.navigateTo({
    // url:'/pages/product/create-product/back',
    url: '/pages/common/editor-choose/index?type=blog&isRadio=0&max=5',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      selectData: data => {
        console.log(data, 'data')
      },
    },
    success: res => {
      //跳转成功后调用
      res.eventChannel.emit('setChooseList', '')
    },
  })
}
let PlaceholderArr = [
  uni.$t('discovery.ecosystem.enterWx'),
  uni.$t('discovery.ecosystem.enterFacebookn'),
  uni.$t('discovery.ecosystem.enterLinkedin'),
  uni.$t('discovery.ecosystem.enterWb'),
  uni.$t('discovery.ecosystem.enterTwitter'),
  uni.$t('discovery.ecosystem.enterInstagram'),
  uni.$t('discovery.ecosystem.discord'),
  uni.$t('create-product.form.socialMedia.douyin'),
  uni.$t('discovery.ecosystem.enTikTok'),
  uni.$t('discovery.ecosystem.enterHttps'),
]
let backLinkData = () => {
  emit('linkData', data)
}
defineExpose({
  data,
})
let { chooseMedia, addConcat, onDeletePng, DeleteContact, newContact, confirm } = linkSet(data)
</script>

<style lang="less" scoped>
.box {
  .box-bind {
    padding: 30rpx;
  }
  .box-recommend {
    padding: 0 30rpx;
    .box-recommend-title {
      background: #fff;
      margin-top: 40rpx;
      .box-recommend-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 15rpx;
      }
      .box-recommend-text {
        font-weight: 600;
        font-size: 15px;
        color: #1f2228;
        position: relative;
        }
      .box-recommend-text::after{
         content: '';
         position: absolute;
         left: 0;
         bottom: 1rpx;
         width: 120rpx;
         height: 12rpx;
         border-radius: 12px;
         background: linear-gradient(64deg, #ffd977 19.67%, #ffbf43 83.73%);
      }

    }
    .box-recommend-desc {
      color: #747480;
      text-align: justify;
      font-size: 24rpx;
      padding: 20rpx 0 30rpx;
    }
    .add-recommend {
      display: flex;
      background-color: #f4f7fd;
      border-radius: 24rpx;
      justify-content: space-between;
      padding: 0 30rpx;
      height: 100rpx;
      align-items: center;
      color: #979797;

      .add-recommend-icon {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  .add-contact {
    .add-custom-contact {
      height: 100rpx;
      border: 2rpx solid #0187fa;
      border-radius: 24rpx;
      font-size: 32rpx;
      line-height: 100rpx;
      text-align: center;
      margin-top: 40rpx;
      color: #0187fa;
    }
    .add-custom-confirm {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 30rpx 30rpx 0;
    }
    .setup-contact {
      height: 176rpx;
      border: 1px dashed #d0d6e5;
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      margin-top: 30rpx;
      position: relative;
      .setup-contact-de {
        width: 32rpx;
        height: 32rpx;
        position: absolute;
        left: 97%;
        top: -10%;
      }

      .setup-img {
        width: 128rpx;
        height: 128rpx;
        margin: 24rpx;
        position: relative;
        .setup-img-bg {
          width: 128rpx;
          height: 128rpx;
          background: #f4f7fd;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .setup-img-bg-icon {
            width: 48rpx;
            height: 48rpx;
          }
          .setup-img-bg-text {
            font-size: 24rpx;
            line-height: 36rpx;
            color: #9da2b1;
          }
        }
        .show-img {
          width: 128rpx;
          height: 128rpx;
          border-radius: 12px;
          overflow: hidden;
          .show-img-icon {
            width: 128rpx;
            height: 128rpx;
          }
        }
        .add-cover-img-de {
          width: 32rpx;
          height: 32rpx;
          position: absolute;
          left: 85%;
          top: -10%;
        }
      }
      .setup-input {
        height: 50px;
        background: #f4f7fd;
        border-radius: 12px;
        width: 100%;
        margin-right: 30rpx;
        .setup-input-entry {
          height: 50px;
          background: #f4f7fd;
          border-radius: 12px;
          width: 100%;
          margin-right: 30rpx;
          text-indent: 30rpx;
        }
      }
    }
  }
}
.user-form {
  padding: 0 30rpx;
  .form-label {
    font-size: 30rpx;
    line-height: 40rpx;
    color: #1f2228;
    font-weight: 600;
    padding: 40rpx 0 20rpx;
    position: relative;
  }
  .form-label::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    bottom: 20rpx;
    width: 120rpx;
    height: 12rpx;
    border-radius: 20px;
    background: linear-gradient(64deg, #ffd977 19.67%, #ffbf43 83.73%);
  }

  .form-label-dec {
    font-weight: 400;
    font-size: 24rpx;
    line-height: 36rpx;
    color: #747480;
  }
  .form-email {
    .email-input {
    }
  }
  .form-mobile {
    .mobile-input {
    }
  }
  .form-wx {
    display: flex;
    align-items: center;
    .form-wx-img {
      width: 56rpx;
      height: 56rpx;
      border-radius: 12rpx;
    }
  }
}
.input {
  height: 100rpx;
  flex: 1;
  background: #f4f7fd;
  border-radius: 24rpx;
  text-indent: 30rpx;
  margin-left: 40rpx;
}
.form-item {
  display: flex;
  align-items: center;
  margin: 30rpx 0 0;
}
.required {
  color: #ef4c25;
}
</style>
