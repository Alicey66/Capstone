<template>
  <!--  封面设置-->
  <view class="box">
    <!--    线上线下 -->
    <view class="box-item" style="padding-bottom: 0rpx">
      <view class="form-item-label">
        <view class="form-item-text-type">{{ $t('group-settings.groupEdit.type') }}</view>
      </view>
      <view class="types">
        <view class="on-line">
          <view>{{ $t('t.general.online') }}</view>
          <uni-icons
            @click="onTypeRadio(true)"
            :type="data.contactType ? 'checkbox-filled' : 'circle'"
            :color="data.contactType ? '#0187FA' : '#9DA2B1'"
            size="30"
          ></uni-icons>
        </view>
        <view class="on-below">
          <view>{{ $t('t.general.offline') }}</view>
          <uni-icons
            @click="onTypeRadio(false)"
            :type="data.contactType ? 'circle' : 'checkbox-filled'"
            :color="data.contactType ? '#9DA2B1' : '#0187FA'"
            size="30"
          ></uni-icons>
        </view>
      </view>
      <input
        v-if="data.contactType"
        class="types-input"
        placeholder-class="typesPlace"
        :placeholder="$t('t.activity.onlineLink')"
        v-model="data.appointmentAddress"
      />
      <view v-else>
        <view v-if="Object.keys(data.isOfflineFrom).length > 0">{{ data.isOfflineFrom }}</view>
        <view v-else class="types-invitation" @click="clickOffline">
          <span class="typesPlace">{{ $t('call.action.addMeetInfo') }}</span>
          <tui-icon size="24" name="arrowright"></tui-icon>
        </view>
      </view>
    </view>
   <view class="item-line"></view>
        <!--    简介-->
    <view class="box-item" id="reward-introduce">
      <view class="form-item-label">
        <view class="form-item-text">{{ $t('call.action.intro') }}<text class="required">*</text></view>
      </view>
      <view class="form-item-hint">
        {{ TRANSLATE.intro.desc[pageType] }}
      </view>
      <!--        吸睛简介输入框-->
      <tui-textarea
        class="form-item-feature-input"
        :maxlength="36"
        :borderTop="false"
        :borderBottom="false"
        isCounter
        height="100rpx"
        minHeight="100rpx"
        backgroundColor="#F4F7FD"
        :placeholder="TRANSLATE.intro.placeholder[pageType]"
        placeholderStyle="fontSize:28rpx;"
        :size="28"
        padding="30rpx"
        v-model="data.introduction"
        @blur="backCoverData"
      ></tui-textarea>
    </view>
    <view class="item-line"></view>

    <!--设置封面图片-->

    <view class="box-item" id="reward-coverUrl">
      <view class="form-item-label">
        <view class="form-item-text">{{ $t('group-settings.im.coverPicture') }}<text class="required">*</text></view>
      </view>
      <!--        吸睛简介输入框-->
      <view class="form-img">
        <view class="form-img-text">
          {{ $t('call.action.coverDesc') }}
        </view>
        <view class="add-cover">
          <image
            v-if="!data.cover.imgUrl"
            class="add-cover-temp"
            src="/static/images/discovery.ecosystem.reward/addcover.png"
            mode="aspectFit"
            @click="selectImg"
          ></image>
          <tw-image-upload
            v-model:show-upload="uploadData.showImageUpload"
            v-model:count-upload="uploadData.countImageUpload"
            @after-upload="uploadImage($event)"
          ></tw-image-upload>
          <view class="up-image" style="position: relative">
            <image
              v-if="data.cover.imgUrl"
              class="add-cover-img"
              :src="data.cover.imgUrl"
              mode="aspectFill"
              @click="onPreview(0)"
            ></image>
            <image
              v-if="data.cover.imgUrl"
              @click="onDeletPng('cover')"
              class="add-cover-img-de"
              src="/static/images/discovery.ecosystem/deletePng.png"
              mode="aspectFit"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <view class="item-line"></view>
    <view class="box-item" id="reward-endTime">
      <view class="form-item-label">
        <view class="form-item-text">{{ $t('call.action.startEndTime') }}<text class="required">*</text></view>
      </view>
      <view class="form-item-hint">
        {{ $t('t.general.set1') +TRANSLATE.preview.type[pageType]+$t('call.action.startEndTimeDesc3') }}
      </view>
      <!--        开始与结束时间*-->
      <timeStartEnd ref="returnTime" @returnTime="onReturnTime"></timeStartEnd>
    </view>
    <view class="item-line"></view>
    <view class="box-item">
      <view class="form-item-label flex-between flex-center">
        <view class="form-item-text"
          >{{ $t('call.action.signUpEndTime')
          }}<text class="noRequired">{{ $t('call.action.notRequired') }}</text></view
        >
        <uni-icons
          @click="onEndRadio"
          :type="data.showEndTime ? 'checkbox-filled' : 'circle'"
          :color="data.showEndTime ? '#0187FA' : '#9DA2B1'"
          size="30"
        ></uni-icons>
      </view>
      <view class="form-item-hint">
        <text
          >{{ $t('call.action.startEndTimeDesc1') }}
          <br />
          {{ $t('call.action.startEndTimeDesc2') }}</text
        >
      </view>
      <uni-datetime-picker type="datetime" :start="start" @change="clickStartYears2" v-if="data.showEndTime">
        <view class="end-time">
          <view class="left" :class="endTime.endYearsTime ? 'start-left-fill' : 'start-left-empty'">
            <!-- @click="clickStartYears('start')" -->

            {{ endTime.endYearsTime ? endTime.endYearsTime : $t('t.tweeLog.vote.dateRangePlaceHolder.begin') }}</view
          >
          <view class="left" :class="endTime.endHourTime ? 'start-left-fill' : 'start-left-empty'">
            <!-- @click="clickStartHour('start')" -->

            {{ endTime.endHourTime ? endTime.endHourTime : $t('t.tweeLog.vote.dateRangePlaceHolder.spec') }}</view
          >
        </view>
      </uni-datetime-picker>
    </view>
    <view class="item-line"></view>

    <!--    分类-->
    <view class="box-item">
      <view class="form-item-label">
        <view class="form-item-text">
          {{ $t('t.general.category') }}</view
        >
      </view>
      <view class="form-item-hint"> {{ $t('blog.add-type.Socialcreation') }}</view>
      <view class="type-region" @click="openCategoryPopup">
        <view v-if="data.categories.length">
          <view class="type-list">
            <span v-for="(li, index) in data.categories">
              {{ li.text }}
              <image
                style="width: 22rpx; height: 22rpx; margin-left: 5px"
                src="@/static/images/chat.calligraphy/delete.png"
                @click.stop="removeTypeList(li.code, index)"
              >
              </image>
            </span>
          </view>
        </view>
        <span v-else class="placeHolder">{{ $t('create-product.form.categories.placeholder') }}</span>
        <tui-icon class="svg-icon" name="arrowright"></tui-icon>
      </view>
    </view>
    <!--       开始与结束时间*-->
    <view class="item-line"></view>
    <!--个性标签-->
    <view class="box-item">
      <view class="form-item-label">
        <view class="form-item-text"
          >{{$t('call.action.meAndMe')}}{{TRANSLATE.preview.type[pageType]}}</view
        >
      </view>
      <view class="form-item-hint">
        {{ $t('blog.add-type.Algorithmrecommendationandkeywords') }}
      </view>
      <tw-common-form-tag @tagChange="onTags" :list="data.tags" />
    </view>

    <view class="item-line"></view>

    <!--  我的位置-->


    <view id="address" class="box-item">
      <tw-address ref="addressRef" :showPopup="true" :title="false" @onChange="onChange($event)">
        <template v-slot:label>
          <view class="box-item" style="padding: 0; margin-top: 0">
            <view class="form-item-label">
              <view class="form-item-text"> {{ $t('chat.group.myPosition') }}</view>
            </view>
          </view>
        </template>
        <template v-slot:info>
          <view v-if="isOpenPosition" class="info">
            {{ $t('chat.group.specificLocation') }}
          </view>
          <view v-else class="info">
            {{ $t('chat.group.openPosition') }}
          </view>
        </template>
      </tw-address>
    </view>

    <view class="item-line"></view>


    <!-- 截止时间-->
    <tui-datetime ref="yearsRef" :startYear="year" :endYear="2099" :type="2" @confirm="returnYearsData"></tui-datetime>

    <tui-datetime ref="hourRef" :startYear="year" :endYear="2099" :type="4" @confirm="returnHourData"></tui-datetime>
    <!--    分类-->
    <tw-category-popup
      :chooseList="data.categories"
      :show="showCategoryPopup"
      :title="$t('create-product.form.categories.title')"
      @update-category-popup="updateCategoryPopup"
    ></tw-category-popup>
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'
import { onLoad, onShow, onResize } from '@dcloudio/uni-app'
import store from '@/store'
import { ON_PREVIEW } from '@/res/publicMethod'
import timeStartEnd from './time-start-end.vue'
import { TRANSLATE } from '../utils/translate'
let props = defineProps({
  type: {
    type: String,
    default: 'HELP',
  },
})

uni.$on('copy', e => {
  console.log('e', e)
  data.isOfflineFrom = e
})

console.log('propspropspropspropsprops', props)
let pageType = props.type
let emit = defineEmits(['coverData'])
// :startTime="data.startTime"
// :endTime="data.endTime"
let data = reactive({
  introduction: '',
  cover: {},
  startTime: '',
  endTime: '',
  registerLimitTime: '',
  categories: [],
  tags: [],
  appointmentAddress: '',
  showEndTime: false,
  //  线下线上
  contactType: true,
  isOfflineFrom: {},
})

let start = new Date().getTime()

let year = new Date().getFullYear()

let isOpenPosition = ref(false)
let onChange = e => {
  isOpenPosition.value = e
}

// 上传图片
let uploadData = reactive({
  showImageUpload: false,
  countImageUpload: 1,
})
// 选择图片的弹窗
let selectImg = () => {
  uploadData.showImageUpload = true
  store.commit('nexusStore/setBotHide', false)
}
// 删除图片
let onDeletPng = (item, index) => {
  console.log(item, index)
  switch (item) {
    case 'cover':
      data.cover.imgUrl = ''
      break
  }
}

// 上传图片
let uploadImage = value => {
  data.cover.imgUrl = value.files[0].url
  data.cover.type = 'img'
}
//预览图片
let onPreview = index => {
  ON_PREVIEW(index, [data.cover.imgUrl])
}

let backCoverData = () => {
  emit('coverData', data)
}
defineExpose({
  data,
})

let returnTime = ref(null)
let onReturnTime = value => {
  // store.commit('nexusStore/setBotHide', true)

  if (value.startYearsTime && value.startHourTime) {
    data.startTime = new Date(value.startYearsTime + ' ' + value.startHourTime).getTime()
  }
  if (value.endYearsTime && value.endHourTime) {
    data.endTime = new Date(value.endYearsTime + ' ' + value.endHourTime).getTime()
  }
}
watch(
  () => [data.startTime, data.endTime],
  (newVal, oldVal) => {
    console.log('newVal', data.startTime)
    if (data.startTime) {
      let startDate = new Date(Number(data.startTime))
      let startArr = timeFn(startDate)
      returnTime.value.data.startYearsTime = startArr[0]
      returnTime.value.data.startHourTime = startArr[1]
    }

    if (data.endTime) {
      let endDate = new Date(Number(data.endTime))
      let endArr = timeFn(endDate)
      returnTime.value.data.endYearsTime = endArr[0]
      returnTime.value.data.endHourTime = endArr[1]
    }
  },
  { deep: true }
)

let clickOffline = () => {
  uni.navigateTo({
    url: '/pages/discovery/call-to-action/offline-list',
  })
}

let timeFn = timeStamp => {
  if (!timeStamp) return []
  let date = new Date(Number(timeStamp))
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let timeText = `${year}-${month}-${day} ${hour}:${minute}`
  let timeArr = timeText.split(' ')
  return timeArr
}

//是否设置截止时间
let onEndRadio = () => {
  console.log('onEndRadio', data.showEndTime)
  data.showEndTime = !data.showEndTime
  if (!data.showEndTime) {
    data.registerLimitTime = ''
  }
}
//设置截止时间
let yearsRef = ref(null)
let hourRef = ref(null)

let clickStartYears2 = e => {
  console.log(e)
  let time = e.split(' ')
  console.log(time)
  endTime.value.endYearsTime = time[0]
  endTime.value.endHourTime = time[1]
}

let clickStartYears = status => {
  yearsRef.value.show()
}
let clickStartHour = status => {
  hourRef.value.show()
}
let endTime = ref({
  // endYearsTime: timeFn(data.registerLimitTime)[0],
  // endHourTime: timeFn(data.registerLimitTime)[1],
  endYearsTime: '',
  endHourTime: '',
})
let returnYearsData = value => {
  endTime.value.endYearsTime = value.result
}
let returnHourData = value => {
  endTime.value.endHourTime = value.result
}

let endTimeComputed = computed(() => {
  let arr = timeFn(data.registerLimitTime)
  return arr
})
watch(
  () => data.registerLimitTime,
  (newVal, oldVal) => {
    if (newVal) {
      endTime.value.endYearsTime = timeFn(newVal)[0]
      endTime.value.endHourTime = timeFn(newVal)[1]
    }
  },
  { deep: true }
)
watch(
  () => endTime.value,
  (newVal, oldVal) => {
    if (newVal.endYearsTime && newVal.endHourTime) {
      data.registerLimitTime = new Date(newVal.endYearsTime + ' ' + newVal.endHourTime).getTime()
    }
  },
  { deep: true }
)

//标签返回
let onTags = value => {
  data.tags = value
}
//分类
let showCategoryPopup = ref(false)
let openCategoryPopup = () => {
  showCategoryPopup.value = true
  store.commit('nexusStore/setBotHide', false)
}
let updateCategoryPopup = e => {
  if (e.dirty) {
    data.categories = e.choose
  }
  showCategoryPopup.value = false
  store.commit('nexusStore/setBotHide', true)
}
let removeTypeList = (selectedId, index) => {
  data.categories.map(item => {
    if (item.code === selectedId) {
      item.active = false
    }
  })
  data.categories.splice(index, 1)
}

// 判断是否开启位置
let isOpenAddress = ref(false)
let OpenAddress = e => {
  isOpenAddress.value = e
}

//判断是否开启准确的地理位置
let isAccurate = ref(false)
let onAccurate = value => {
  isAccurate.value = value
}

let onTypeRadio = value => {
  // if (!value) {
  //   uni.showToast({
  //     title: '线下暂未开放',
  //     icon: 'none',
  //     duration: 2000,
  //   })
  //   return
  // }
  data.contactType = value
}
</script>

<style lang="less" scoped>
::v-deep .position {
  padding: 30rpx 0;
}
::v-deep .uni-calendar--mask-show {
  z-index: 600 !important;
}
::v-deep .uni-calendar--fixed {
  z-index: 996;
}

.box {
  // title
  .box-item {
    padding: 0 30rpx;
    .form-item-label {
      height: 112rpx;
      .form-item-text {
        padding: 50rpx 0 20rpx 0;
        font-weight: 600;
        background: #fff;
        position: relative;
        width: fit-content;
        z-index: 2;
      }
      .form-item-text-type {
        padding: 50rpx 0 20rpx 0;
        font-weight: 600;
        background: #fff;
        position: relative;
        width: fit-content;
        z-index: 2;
      }
      .form-item-text-type::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 0;
        bottom: 20rpx;
        width: 100%;
        height: 12rpx;
        border-radius: 20px;
        background: linear-gradient(64deg, #ffd977 19.67%, #ffbf43 83.73%);
      }
      .form-item-text::after {
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
    }
    .form-item-hint {
      font-size: 24rpx;
      line-height: 36rpx;
      color: #747480;
      margin-bottom: 30rpx;
    }
    .form-item-feature-input {
      height: 200rpx !important;
      background-color: #f4f7fd;
      border-radius: 30rpx !important;
      overflow: hidden;
    }
    .form-item-time {
      height: 220rpx;
      background: url('/static/images/quming/division.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .end-time {
      display: flex;
      align-items: center;
      .left {
        width: 380rpx;
        height: 100rpx;
        line-height: 100rpx;
        border-radius: 24rpx;
        background: #f4f7fd;
        margin-right: 20rpx;
        text-align: center;
      }
      .center {
        width: 200rpx;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        background: #f4f7fd;
        border-radius: 24rpx;
      }
      .right {
        color: #1f2228;
        font-size: 28rpx;
        margin-left: 30rpx;
      }
    }
    .type-region {
      background: #f4f7fd;
      border-radius: 24rpx;
      line-height: 100rpx;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .type-list {
        display: flex;
        padding-left: 30rpx;

        span {
          background: #ffffff;
          border: 2rpx solid #e9ecf4;
          border-radius: 40rpx;
          font-size: 24rpx;
          color: #1f2228;
          line-height: 24rpx;
          padding: 12rpx 24rpx;
          display: flex;
          align-items: center;
          margin-right: 12rpx;

          .module-icon {
            margin-left: 16rpx;
          }
        }
      }

      .placeHolder {
        color: #9da2b1;
        font-size: 28rpx;
        margin-left: 30rpx;
        width: 100%;
      }

      .svg-icon {
        font-size: 24px;
      }
    }
    .types {
      display: flex;
      .on-line {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .uni-icons {
          margin-right: 20rpx;
        }
      }
      .on-below {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;
        .uni-icons {
          margin-right: 20rpx;
        }
      }
    }
    .types-input {
      border-radius: 24rpx;
      background: #f4f7fd;
      height: 100rpx;
      padding: 30rpx;
      box-sizing: border-box;
    }
    .types-invitation {
      background: #f4f7fd;
      height: 100rpx;
      padding: 30rpx;
      border-radius: 24rpx;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .svg-right-icon {
        font-size: 16rpx;
      }
    }
  }
}

//封面

.form-img {
  display: flex;
  align-items: center;
  background: #f4f7fd;
  border-radius: 24rpx;
  padding: 20rpx;

  .form-img-text {
    font-size: 24rpx;
    line-height: 34rpx;
    color: #9da2b1;
    margin-right: 20rpx;
  }
  .add-cover {
    position: relative;

    .add-cover-temp {
      width: 150rpx;
      height: 150rpx;
    }

    .up-image {
      .add-cover-img {
        width: 150rpx;
        height: 150rpx;
        border-radius: 30rpx;
      }

      .add-cover-img-de {
        width: 44rpx;
        height: 44rpx;
        position: absolute;
        left: 120rpx;
        top: -16rpx;

        > image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

///地址

.address-item-text {
  font-weight: 600;
  background: #fff;
  position: relative;
  width: fit-content;
  z-index: 2;
}
.address-item-text::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 12rpx;
  border-radius: 20px;
  background: linear-gradient(64deg, #ffd977 19.67%, #ffbf43 83.73%);
}

//

.noRequired {
  color: #747480;
  font-size: 24rpx;
}

.start-left-empty {
  color: #9da2b1;
}
.start-left-fill {
}

::v-deep .info {
  color: #747480;
  font-size: 24rpx;
  margin-bottom: 30rpx;
}

.box-address {
  padding: 0 30rpx 0;
}
.item-line {
  width: 100%;
  height: 20rpx;
  background: #f4f7fd;
  margin-top: 40rpx;
}
.typesPlace {
  color: #9da2b1;
  font-size: 28rpx;
}
.required {
  color: #ef4c25;
}
</style>
