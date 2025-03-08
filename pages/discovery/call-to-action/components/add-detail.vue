<template>
  <view class="box">
    <view class="box-item" id="reward-details">
      <view class="form-item-label">
        <view class="form-item-text">{{ $t('discovery.ecosystem.ecoPlusItem2') }}<text class="required">*</text></view>
      </view>
      <view class="form-item-hint">
        {{
          type === 'PAID_ACTIVITIES'
            ? $t('call.action.callDetail')
            : $t('call.action.hele.detailDesc1') +
              (TRANSLATE?.preview?.type?.[data.activityType] || 'Call for Actions') +
              $t('call.action.hele.detailDesc')
        }}
      </view>

      <uni-easyinput
        type="textarea"
        v-model="data.details"
        :placeholder="$t('chat.apply-join.applyDetail.inputTip')"
        placeholderStyle="fontSize:28rpx;color:#9DA2B1"
        autoHeight
      ></uni-easyinput>
    </view>
    <view class="item-line"></view>
    <!--    综合价值-->
    <view class="box-item" id="reward-value">
      <view class="form-item-label">
        <view class="form-item-text"
          >{{ TRANSLATE.preview.type[type] + $t('call.action.keyPoint') }}<text class="required">*</text></view
        >
      </view>
      <view class="form-item-hint">
        {{ TRANSLATE.keyPoint.desc[type] }}
      </view>
      <!--        选择我“有偿召唤”的综合价值*-->

      <tui-textarea
        class="textarea-box"
        :borderTop="false"
        :borderBottom="false"
        backgroundColor="#F4F7FD"
        :placeholder="TRANSLATE.keyPoint.placeholder[type]"
        placeholderStyle="fontSize:28rpx;color:#9DA2B1"
        :size="28"
        padding="30rpx"
        v-model="data.keyPoint"
      ></tui-textarea>
    </view>
    <view class="item-line"></view>
    <!--    报名人数上限-->
    <view class="box-item">
      <view class="form-item-label flex-between flex-center">
        <view class="form-item-text">{{ $t('common.maxPeopleNum') }}</view>
        <tw-check @isShow="switchChangePeople($event)" :onlyVideo="data.isOpenRegisterLimitCount"></tw-check>
      </view>
      <view class="form-item-hint">
        {{ $t('call.action.maxPeopleNumDesc') }}
      </view>
      <!--        选择我“有偿召唤”的综合价值*-->
      <view class="input-num-box" v-if="data.isOpenRegisterLimitCount">
        <input
          class="stock-number"
          maxlength="15"
          placeholder-class="sku-place"
          :placeholder="$t('t.general.inputting')"
          type="number"
          v-model="data.registerLimitCount"
          @input="data.registerLimitCount = $event.detail.value.replace(/^(0+)|[^\d]+/g, '')"
        />
        <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx">{{
          $t('group-settings.groupEdit.people')
        }}</view>
      </view>
    </view>
    <view class="item-line"></view>
    <!--    参与人数上限-->
    <view class="box-item">
      <view class="form-item-label flex-between flex-center">
        <view class="form-item-text">{{ $t('common.cooperateNumMax') }}</view>
        <tw-check @isShow="switchJoinChange($event)" :onlyVideo="data.isOpenJoinLimitCount"></tw-check>
      </view>
      <view class="form-item-hint">
        {{ $t('call.action.joinLimitCountDesc') }}
      </view>
      <!--        选择我“有偿召唤”的综合价值*-->
      <view class="input-num-box" v-if="data.isOpenJoinLimitCount">
        <input
          class="stock-number"
          maxlength="15"
          placeholder-class="sku-place"
          :placeholder="$t('t.loginRegister.please')"
          type="number"
          v-model="data.joinLimitCount"
          @input="data.joinLimitCount = $event.detail.value.replace(/^(0+)|[^\d]+/g, '')"
        />
        <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx">{{
          $t('group-settings.groupEdit.people')
        }}</view>
      </view>
    </view>
    <!--    自定义奖励-->
    <view class="reward" v-if="type === 'PAID_ACTIVITIES'">
      <view class="box-bg">
        <view class="three-types-text">{{ $t('t.general.threeTypesofRewards') }}</view>
        <view class="bg-cen">
          {{ $t('t.index.unlimitetotalnumber') }}
        </view>
        <view class="bg-btm">
          <view class="tabs-one" @click="onScroll('digitReward')" v-if="!curImgOne">
            <image src="/static/images/discovery.ecosystem.reward/pnum.png" mode="aspectFit" />
            <view class="btm-text">{{ $t('t.tycoonplace.digital') }}</view>
          </view>
          <view class="cur-one" @click="onScroll('digitReward')" v-else>
            <image src="/static/images/discovery.ecosystem.reward/curone.png" mode="aspectFit" />
            <view class="btm-textt">{{ $t('t.tycoonplace.digital') }}</view>
            <image class="tip" src="/static/images/discovery.ecosystem.reward/nike.png" />
          </view>
          <view class="tabs-one" @click="onScroll('reward-tbanes')" v-if="!curImgTwo">
            <image src="/static/images/discovery.ecosystem.reward/tnum.png" mode="aspectFit" />
            <view class="btm-text">{{ $t('t.activity.TbeanRewards') }}</view>
          </view>
          <view class="cur-one" @click="onScroll('reward-tbanes')" v-else>
            <image src="/static/images/discovery.ecosystem.reward/curtwo.png" mode="aspectFit" />
            <view class="btm-textt">{{ $t('t.activity.TbeanRewards') }}</view>
            <image class="tip" src="/static/images/discovery.ecosystem.reward/nike.png" />
          </view>
          <view class="tabs-one" @click="onScroll('reward-custom')" v-if="!curImgThree">
            <image src="/static/images/discovery.ecosystem.reward/custom.png" mode="aspectFit" />
            <view class="btm-text">{{ $t('t.activity.customizeRewards') }}</view>
          </view>
          <view class="cur-one" @click="onScroll('reward-custom')" v-else>
            <image src="/static/images/discovery.ecosystem.reward/curthree.png" mode="aspectFit" />
            <view class="btm-textt">{{ $t('t.activity.customizeRewards') }}</view>
            <image class="tip" src="/static/images/discovery.ecosystem.reward/nike.png" />
          </view>
        </view>
      </view>
      <tui-form ref="form" :tipTop="100" tipBackgroundColor="#585858" backgroundColor="#f4f7fd">
        <!-- 数字产品奖励 -->
        <view class="form-item-name">
          <view class="form-item-name-label" id="digitReward">
            <image src="@/static/images/discovery.ecosystem.reward/numtwo.png" mode="aspectFit" />
            <view class="form-item-name-label-text"> {{ $t('t.activity.digitalRewards') }}</view>
          </view>
          <view class="form-item-name-hint">
            {{ $t('t.index.participantscompleted') }}
          </view>

          <view class="item2-8-input" @click="selectProduct" v-if="data.reward.digitalProductId">
            <view class="item2-8-place">{{ $t('t.index.pushhomespace') }}</view>
            <tui-icon name="arrowright" :size="48" unit="rpx" color="#747480"></tui-icon>
          </view>

          <view class="product-List" v-for="(item, index) in data.reward.digitalProductId">
            <image
              src="@/static/images/quming/delete2.png"
              mode="aspectFill"
              class="delete2"
              @click.stop="deleteProduct(item, index)"
            ></image>
            {{ item }}

            <!--          <tw-blog-card-product :cardData="item?.goods?.goods"></tw-blog-card-product>-->
          </view>

          <view class="form-item-name-hint">
            {{ $t('t.index.yourdigitalgoods') }}
          </view>
          <tui-textarea
            @blur="onChange"
            class="form-item-feature-input"
            :maxlength="100"
            :borderTop="false"
            :borderBottom="false"
            height="226rpx"
            minHeight="226rpx"
            backgroundColor="#F4F7FD"
            :placeholder="$t('value-body.interviewtips')"
            placeholderStyle="fontSize:28rpx;"
            :size="28"
            padding="30rpx"
            v-model="data.reward.digitalProductBrief"
          ></tui-textarea>
          <view class="card-created">
            <view class="card-created-title">
              {{ $t('discovery.ecosystem.productCard') }} <br />
              {{ $t('discovery.ecosystem.productCard1') }}
            </view>
            <view class="card-created-btn" hover-class="card-created-btn-hover" hover-stay-time="100">
              {{ $t('discovery.ecosystem.createNow') }}
            </view>
            <view class="card-created-text" id="eco-serviceDescription">
              {{ $t('discovery.ecosystem.productCardDesc') }}
            </view>
          </view>

          <view class="num-switch">
            <view class="uni-title">{{ $t('t.index.limitthenumberofdigitproduct') }}</view>
            <tw-check @isShow="switchChange($event)" :onlyVideo="data.reward.digitalProduct"></tw-check>
          </view>
          <view class="form-item-name-hint">
            {{ $t('t.index.withinalimitedtime') }}
          </view>
          <view style="position: relative" v-if="data.reward.digitalProduct">
            <input
              class="stock-number"
              maxlength="15"
              placeholder-class="sku-place"
              placeholder="0"
              type="number"
              v-model="data.reward.digitalRewardLimit"
              @blur="onChange"
              @input="data.reward.digitalRewardLimit = $event.detail.value.replace(/^(0+)|[^\d]+/g, '')"
            />
            <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx"
              >{{ $t('t.index.rewardsdigitalproducts') }}
            </view>
          </view>
        </view>
        <!--T豆奖励-->
        <view class="form-item-name">
          <view class="form-item-name-label" id="reward-tbanes">
            <image src="/static/images/discovery.ecosystem.reward/treward.png" mode="aspectFit" />
            <view class="form-item-name-label-text">{{ $t('t.activity.TbeanRewards') }}</view>
          </view>
          <view class="form-item-name-hint">
            {{ $t('t.index.completingthetask') }}
          </view>

          <view class="form-item-title">{{ $t('t.index.entertherewardamount') }}</view>
          <view style="position: relative">
            <input
              class="stock-number"
              placeholder-class="sku-place"
              placeholder="0.00"
              type="number"
              v-model="data.reward.tbeansAmount"
              @blur="onChange"
              @input="onDecimal($event)"
            />
            <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx">{{
              $t('t.index.eachparticipant')
            }}</view>
          </view>
          <view class="form-item-title" style="margin: 30rpx 0">{{ $t('t.index.Limitsonthenumbepeopleawarded') }}</view>
          <view style="position: relative">
            <input
              class="stock-number"
              placeholder-class="sku-place"
              placeholder="0"
              maxlength="15"
              type="number"
              v-model="data.reward.tbeansPrizeLimit"
              @blur="onChange"
              @input="data.reward.tbeansPrizeLimit = $event.detail.value.replace(/^(0+)|[^\d]+/g, '')"
            />
            <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx">{{
              $t('group-settings.groupEdit.people')
            }}</view>
          </view>
        </view>

        <!--自定义奖励-->
        <view class="form-item-name">
          <view class="form-item-name-label" id="reward-custom">
            <image src="/static/images/discovery.ecosystem.reward/custwo.png" mode="aspectFit" />
            <view class="form-item-name-label-text">{{ $t('t.activity.customizeRewards') }}</view>
          </view>
          <view class="form-item-name-hint">
            {{ $t('t.index.unusualbutwonderfulthinking') }}
          </view>
          <view class="rich-text">
            <!--              <tw-rich-text-->
            <!--                custom-style="min-height: 520rpx;background-color: #F4F7FD"-->
            <!--                placeholderStyle="color:#9DA2B1;font-size: 28rpx;"-->
            <!--                v-model:rich-string="data.reward.customRewardContent"-->
            <!--                placeholder="我是特斯拉中国区人事总监，完成任务者可以跟我交流15分钟。"-->
            <!--              ></tw-rich-text>-->
            <tui-textarea
              @blur="onChange"
              class="form-item-feature-input"
              :maxlength="100"
              :borderTop="false"
              :borderBottom="false"
              height="226rpx"
              minHeight="226rpx"
              backgroundColor="#F4F7FD"
              placeholder="我是特斯拉中国区人事总监，完成任务者可以跟我交流15分钟。"
              placeholderStyle="fontSize:28rpx;"
              :size="28"
              padding="30rpx"
              v-model="data.reward.customRewardContent"
            ></tui-textarea>
          </view>
          <view class="item-tip">
            <image src="/static/images/discovery.ecosystem.reward/tips.png" mode="aspectFit" />
            <view>{{ $t('t.index.distributionofeachcustomreward') }}</view>
          </view>
          <view class="num-switch">
            <view class="uni-title">{{ $t('value-body.customizerewardnumberlimit') }}</view>
            <tw-check @isShow="switchChanges($event)" :onlyVideo="data.reward.customReward"></tw-check>
          </view>
          <view class="form-item-name-hint">
            {{ $t('t.index.withinalimitedtime') }}
          </view>
          <view style="position: relative" v-if="data.reward.customReward">
            <input
              class="stock-number"
              maxlength="15"
              placeholder-class="sku-place"
              placeholder="0"
              type="number"
              v-model="data.reward.customRewardLimit"
              @blur="onChange"
              @input="data.reward.customRewardLimit = $event.detail.value.replace(/^(0+)|[^\d]+/g, '')"
            />
            <view style="position: absolute; font-size: 28rpx; top: 34rpx; right: 30rpx"
              >{{ $t('mytycoonplace.customrewards') }}
            </view>
          </view>
        </view>
      </tui-form>
    </view>

    <!--    自定义奖励-->

    <view class="item-line"></view>
    <!--    注意事项-->
    <view class="box-item">
      <view class="form-item-label">
        <view class="form-item-text">{{ $t('call.action.note') }}</view>
      </view>
      <tui-textarea
        class="textarea-box"
        :borderTop="false"
        :borderBottom="false"
        backgroundColor="#F4F7FD"
        :placeholder="$t('call.action.noteDesc')"
        placeholderStyle="fontSize:28rpx;"
        :size="28"
        padding="30rpx"
        v-model="data.note"
        @blur="backDetailData"
      ></tui-textarea>
    </view>
    <view class="long-short-box" v-if="data.talent">
      <tw-common-long-short :talent="data.talent" @emitLongShort="emitLongShort"></tw-common-long-short>
    </view>
    <view class="long-short-box" v-else>
      <tw-common-long-short :talent="data.talent" @emitLongShort="emitLongShort"></tw-common-long-short>
    </view>

    <view class="item-line"></view>

    <view class="task-box">
      <view class="task-header">
        <view class="task-label">
          {{ $t('discovery.ecosystem.setTasks1') }}<br />
          {{ $t('group-settings.im.selectTheRightFit') }}
        </view>
        <view class="btn-task" hover-class="hoverClass" hover-stay-time="100" @click="selectTask('')">{{
          data.newPlan ? $t('vacancy.alreadySetTask') : $t('chat.group.selectTask')
        }}</view>
      </view>

      <view class="form-item-hint">
        {{ $t('call.action.ifYour') + '“' + TRANSLATE.preview.type[type] + '“' + $t('call.action.ifYourDesc') }}
      </view>

      <view>
        <view-show-tasks1
          :foundId="currentUserId"
          :taskData="data.newPlan"
          @deleteTask="deleteTask"
          @taskDeleted="deleteTaskItem"
        />
      </view>

      <view class="task-desc">{{ $t('group-settings.im.instructionsToAttendMeetingsByDoingTasks') }}</view>

      <!--       会议说明*-->
      <tui-textarea
        class="textarea-box height384"
        :borderTop="false"
        :borderBottom="false"
        height="350rpx"
        minHeight="350rpx"
        backgroundColor="#F4F7FD"
        :placeholder="$t('group-settings.im.invitedANumberOfPartnersOfVentureCapitalFirms2')"
        placeholderStyle="fontSize:28rpx;"
        :size="28"
        padding="30rpx"
        v-model="data.description"
        @blur="backDetailData"
      ></tui-textarea>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed, nextTick, watch } from 'vue'
import store from '@/store'
import { TRANSLATE } from '../utils/translate'
import viewShowTasks1 from '@/pages/reward/components/view-show-tasks1.vue'

import { coverFn } from '@/pages/reward/utils/add-set'

let props = defineProps({
  type: {
    type: String,
    default: 'HELP',
  },
})
let emit = defineEmits(['detailData'])
let data = reactive({
  details: '', //详情设置
  //价值
  keyPoint: '',
  //报名人数上限
  registerLimitCount: '',
  //是否开启
  isOpenRegisterLimitCount: true,
  //参加人数上线
  joinLimitCount: '',
  //是否开启
  isOpenJoinLimitCount: true,
  note: '', //注意事项
  talent: '',
  newPlan: computed(() => store.state.taskStore.publicTask),
  description: '',
  reward: {
    digitalProduct: false,
    // 数字产品id
    digitalProductId: '',
    // 添加数字产品理由
    digitalProductBrief: '',
    // 数字产品奖励限制数量
    digitalRewardLimit: '',
    //奖励的T豆数量
    tbeansAmount: '',
    // T豆奖励人数 T豆奖励数量限制，0就是无数量限制
    tbeansPrizeLimit: '',
    // 是否开启自定义奖励
    customReward: false,
    // 自定义奖励内容
    customRewardContent: '',
    // 自定义奖励数量限制，0就是无数量限制
    customRewardLimit: '',
  },
})
const deleteTask = index => {
  let taskDataObj = store.state.taskStore.publicTask
  const taskTypes = Object.keys(taskDataObj)
  if (index >= 0 && index < taskTypes.length) {
    const taskTypeToDelete = taskTypes[index]
    const { [taskTypeToDelete]: omit, ...updatedTaskData } = taskDataObj

    store.commit('taskStore/setPublicTask', updatedTaskData)
    data.newPlan = updatedTaskData
  } else {
    console.log('Invalid task index:', index)
  }
}

const deleteTaskItem = e => {
  let outerIndex = e.outerIndex
  let innerIndex = e.innerIndex

  let taskDataObj = store.state.taskStore.publicTask
  let updatedTaskData = {}
  const taskTypes = Object.keys(taskDataObj)

  if (outerIndex >= 0 && outerIndex < taskTypes.length) {
    const taskTypeToModify = taskTypes[outerIndex]
    taskDataObj[taskTypeToModify].taskData.splice(innerIndex, 1)
    if (taskDataObj[taskTypeToModify].taskData.length === 0) {
      const { [taskTypeToModify]: omit, ...deletedTaskData } = taskDataObj
      updatedTaskData = deletedTaskData
    } else {
      updatedTaskData = taskDataObj
    }
  }
  store.commit('taskStore/setPublicTask', updatedTaskData)
  data.newPlan = updatedTaskData
}
const currentUserId = computed(() => {
  return uni.getStorageSync('userId')
})

let switchChangePeople = e => {
  data.isOpenRegisterLimitCount = !data.isOpenRegisterLimitCount
  if (!data.isOpenRegisterLimitCount) {
    data.registerLimitCount = ''
  }
}
//是否参加人数上线
let switchJoinChange = e => {
  data.isOpenJoinLimitCount = !data.isOpenJoinLimitCount
  if (!data.isOpenJoinLimitCount) {
    data.joinLimitCount = ''
  }
}

//长项弱项组件返回数据
let emitLongShort = dataLong => {
  console.log(dataLong, 'detailSettingDown.vue')
  data.talent = dataLong
}

//选择任务
let selectTask = type => {
  uni.navigateTo({
    url: `/pages/common/create-related/add-task/add-task?isTopBar=${true}`,
  })
}

let backDetailData = () => {
  emit('detailData', data)
}
defineExpose({
  data,
})

let isOpen1 = ref(data.reward.digitalProduct)
let isOpen2 = ref(data.reward.customReward)
let switchChange = e => {
  isOpen1.value = !e
  data.reward.digitalProduct = !e
  data.reward.digitalRewardLimit = 0
}
let switchChanges = e => {
  isOpen2.value = !e
  data.reward.customReward = !e
  data.reward.customRewardLimit = 0
}
// 填写内容后切换图片
let curImgOne = ref(false)
let curImgTwo = ref(false)
let curImgThree = ref(false)
let onChange = () => {
  if (data.reward.digitalProductBrief) {
    curImgOne.value = true
  } else {
    curImgOne.value = false
  }
  if (data.reward.tbeansAmount) {
    curImgTwo.value = true
  } else {
    curImgTwo.value = false
  }
  if (data.reward.customRewardContent) {
    curImgThree.value = true
  } else {
    curImgThree.value = false
  }
  console.log('函数调用 触发父组件操作', curImgTwo.value)
  emit('onChange')
}
let onDecimal = e => {
  if (/^0{2,}/.test(e.detail.value)) {
    console.log('输入以多个零开头，不允许。')
    nextTick(() => {
      data.reward.tbeansAmount = 0
    })
  } else {
    data.reward.tbeansAmount = e.detail.value.replace(/[^\d.]/g, '')
    console.log('输入合法。')
  }
}
</script>

<style lang="less" scoped>
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
    .input-num-box {
      position: relative;
      .stock-number {
        height: 100rpx;
        border-radius: 12px;
        background: #f4f7fd;
        padding: 0 30rpx;
      }
    }
  }
  .task-box {
    padding: 0 30rpx;

    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 50rpx;
      .task-label {
        font-weight: 600;
        font-size: 30rpx;
        line-height: 44rpx;
        color: #1f2228;
      }
      .btn-task {
        height: 68rpx;
        padding: 0 20rpx;
        background: #29bac3;
        border-radius: 20px;
        text-align: center;
        line-height: 68rpx;
        color: white;
        font-size: 28rpx;
      }
    }
    .form-item-hint {
      font-size: 24rpx;
      line-height: 36rpx;
      color: #747480;
      margin-bottom: 30rpx;
      margin-top: 40rpx;
    }
    .task-desc {
      color: #1f2228;
      font-size: 24rpx;
      padding-bottom: 20rpx;
    }
  }
}
.item-line {
  width: 100%;
  height: 20rpx;
  background: #f4f7fd;
  margin-top: 40rpx;
}
.required {
  color: #ef4c25;
}
::v-deep .is-input-border {
  background-color: #f4f7fd !important;
  border: none !important;
  border-radius: 24rpx !important;
}
.textarea-box {
  height: 256rpx;
  background-color: #f4f7fd;
  border-radius: 30rpx;
  overflow: hidden;
}
.height384 {
  height: 384rpx;
}

// 自定义奖励
.reward {
  .box-bg {
    display: flex;
    // justify-content: center;
    align-items: center;
    border-radius: 24px;
    flex-direction: column;
    margin: 34rpx 0 20rpx;
    padding: 0 30rpx;
    height: 380rpx;
    background: url('/static/images/discovery.timeReward/reward.png') 50% 0px / 100% no-repeat;
    .three-types-text {
      font-weight: 600;
      margin: 20rpx;
    }
    .bg-top {
      height: 72rpx;
      margin: 40rpx 0 36rpx;
    }
    .bg-cen {
      line-height: 40rpx;
      font-size: 26rpx;
      color: #7574b5;
    }
    .bg-btm {
      display: flex;
      justify-content: space-evenly;
      width: 100%;
      margin: 30rpx 0;
      > view {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 156rpx;
        height: 88rpx;
        border: 4rpx solid transparent;
        border-radius: 24rpx;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
      }
      image {
        width: 32rpx;
        height: 32rpx;
      }
      .btm-text {
        font-size: 20rpx;
        color: #7574b5;
      }
      .btm-textt {
        font-size: 20rpx;
        color: #fff;
      }
      .tabs-one {
        background-image: linear-gradient(to right, #d1cfff, #ffd6ed),
          linear-gradient(234.81deg, #ffe8f7 -10.08%, #e5e4ff 84.92%);
      }

      .cur-one {
        box-shadow: 0px 2px 20px #ffffff, inset 0px 4px 8px rgba(114, 100, 155, 0.7);
        background-image: linear-gradient(to right, #8481e8, #bb93df),
          linear-gradient(234.81deg, #e3caff -10.08%, #bebcff 84.92%);
        position: relative;
        .tip {
          width: 32rpx;
          height: 32rpx;
          position: absolute;
          top: -10rpx;
          right: -10rpx;
        }
      }
    }
  }

  .form-item-name {
    padding: 50rpx 30rpx;
    border-radius: 30rpx;
    background: #fff;
    margin-bottom: 20rpx;
    .form-item-name-hint {
      font-weight: 400;
      font-size: 24rpx;
      line-height: 36rpx;
      color: #747480;
    }
    .rich-text {
      margin: 30rpx 0 40rpx;
    }
    .item-tip {
      display: flex;
      align-items: center;
      margin-bottom: 30rpx;
      > image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 10rpx;
      }
      > view {
        color: #7a76b0;
        font-size: 24rpx;
      }
    }
    .item2-8-input {
      height: 100rpx;
      background: #f4f7fd;
      border-radius: 24rpx;
      margin: 30rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 40rpx;
      .item2-8-place {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #9da2b1;
        margin-left: 30rpx;
      }
    }
    .product-List {
      // background: rgb(239, 242, 250);
      border: 1px solid #dae0ef;
      border-radius: 40rpx;
      margin: 22rpx 0;
      padding: 20rpx;
      position: relative;

      .delete2 {
        position: absolute;
        width: 28rpx;
        height: 28rpx;
        top: 16rpx;
        right: 18rpx;
      }
    }

    .card-created {
      height: 344rpx;
      background-image: url('/static/images/discovery.ecosystem/detailSettings1.jpg');
      background-size: 100%;
      border-radius: 24rpx;
      margin: 30rpx 0 52rpx;
      .card-created-title {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #6b679e;
        padding-top: 30rpx;
        padding-left: 30rpx;
        font-weight: 600;
      }

      .card-created-btn {
        height: 68rpx;
        width: 152rpx;
        border-radius: 333rpx;
        background: linear-gradient(233.15deg, #bb93df 7.79%, #8481e8 84.82%);
        font-size: 26rpx;
        color: #ffffff;
        text-align: center;
        line-height: 68rpx;
        margin-left: 30rpx;
        margin-top: 16rpx;
      }

      .card-created-btn-hover {
        opacity: 0.8;
      }

      .card-created-text {
        font-size: 24rpx;
        color: #6b679e;
        width: 440rpx;
        padding: 24rpx;
        line-height: 36rpx;
      }
    }
    .num-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;
      .uni-title {
        font-size: 28rpx;
        color: #4b4b4c;
      }
    }
    .stock-number {
      height: 100rpx;
      background: #f4f7fd;
      border-radius: 24rpx;
      margin-top: 30rpx;
      text-indent: 30rpx;
      font-size: 32rpx;
      color: #1f2228;
      font-weight: 700;
    }
    .form-item-title {
      font-size: 28rpx;
      color: #4b4b4c;
      margin: 40rpx 0 30rpx;
    }
    .form-item-feature-input {
      height: 256rpx !important;
      background-color: #f4f7fd;
      border-radius: 30rpx !important;
      overflow: hidden;
      margin-top: 30rpx !important;
    }
    .form-item-feature-input2 {
      height: 338rpx !important;
      background-color: #f4f7fd;
      border-radius: 30rpx !important;
      overflow: hidden;
      margin-top: 30rpx !important;
      line-height: 40rpx !important;
    }
    .form-item-name-input {
      width: 690rpx;
      height: 160rpx;
      background-color: #f4f7fd;
      border-radius: 30rpx;
      overflow: hidden;
      margin-top: 30rpx !important;
    }
    .form-item-name-label {
      padding-bottom: 30rpx;
      // height: 112rpx;
      display: flex;
      align-items: center;
      font-size: 30rpx;
      > image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 20rpx;
      }
      .form-item-name-label-text {
        // padding: 50rpx 0 20rpx 0;
        font-weight: 600;
        background: #fff;
      }
    }
    .form-item-name-input-info {
      position: relative;
      font-size: 23rpx;
      line-height: 36rpx;
      color: #9da2b1;
      top: -60rpx;
      left: 540rpx;
    }
  }
}
</style>
