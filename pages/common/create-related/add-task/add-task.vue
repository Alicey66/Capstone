<template>
  <!--  添加任务-->
  <view class="add-task-box flex h-100 flex-col">
    <tw-common-topbar v-if="isTopBar">
      <view>{{ $t('vacancy.selectTask') }}</view>
    </tw-common-topbar>
    <view class="flex-1">
      <scroll-view
        scroll-y="true"
        class="scroll-Y h-full"
        :show-scrollbar="false"
        lower-threshold="100"
        :scroll-into-view="dataTask.currentId"
        scroll-with-animation="true"
      >
        <view>
          <view class="task-header" v-if="isHeader">
            <view class="header-title flex">
              <view class="flex-1">{{ $t('task.twoTasks') }} </view>
              <image class="icon" src="/static/images/discovery.ecosystem/notebook.png" mode="aspectFit"></image>
            </view>
          </view>
          <slot name="header"> </slot>
          <view class="flex flex-center-justify top30">
            <view class="task-type-select flex fit-content">
              <view
                :class="dataTask.taskType === 'left' ? 'select-active' : 'select-inactive'"
                class="select-share flex-center"
                @click="switchType('left')"
                hover-class="hoverClass"
                hover-stay-time="100"
                >{{ $t('t.tasks.daily') }}</view
              >
              <view
                :class="dataTask.taskType === 'left' ? 'select-inactive' : 'select-active'"
                class="select-share flex-center"
                @click="switchType('right')"
                hover-class="hoverClass"
                hover-stay-time="100"
                >{{ $t('group-settings.groupEdit.customizeATas') }}</view
              >
            </view>
          </view>

          <view class="task-common-box" v-show="dataTask.taskType === 'left'">
            <view class="text-center promotion-info top20 padding30">
              {{ $t('blog.add-type.Contentassistedpromotion') }}</view
            >
            <view class="why-do-tasks padding30 top20">
              <image class="icon" src="/static/icons/trumpet-task.png" mode="aspectFit"></image>
              <text> {{ $t('blog.add-type.Helppromotethecontentyouspecify') }}</text>
            </view>
            <view class="tasks-select-info padding30 top20"> {{ $t('task.taskDesc2') }}</view>
            <view class="flex flex-wrap padding30 top30 gap">
              <view
                class="task-item-name"
                :class="{ 'task-item-active': item.active }"
                v-for="(item, index) in labelArr"
                :key="item.label"
                @click="handleTaskClick(item.code)"
              >
                {{ item.label }}
                <image
                  v-show="item.active"
                  class="task-item-img"
                  src="/static/images/discovery.ecosystem/EllipseYes.png"
                  mode="aspectFit"
                ></image>
              </view>
            </view>

            <view class="task-content top20">
              <template v-for="(item, indexKey) in taskData" :key="item.bgText">
                <view class="taskItem-box top20" :id="`code${item.rollCode}`">
                  <image
                    v-if="item.bgImg"
                    class="taskItem-header"
                    :src="item.bgImg"
                    mode="aspectFill"
                    :style="{
                      width: item.bgImgWidth || '100%',
                      height: item.bgImgHeight,
                    }"
                  ></image>
                  <view v-if="item.bgText" class="taskItem-header-text" :style="{ color: item.bgTextColor }">{{
                    item.bgText
                  }}</view>
                  <view
                    v-if="item.bgTextDesc"
                    class="taskItem-header-desc"
                    :style="{ color: item.bgTextColor, top: item.bgTopDesc }"
                    >{{ item.bgTextDesc }}</view
                  >
                  <view class="custom-title flex-center">
                    <image v-if="item.subImg" :src="item.subImg" class="custom-icon" />
                    <view class="sub-title">{{ item.subTitle }}</view>
                  </view>
                  <view class="padding30 padding-btn">
                    <view class="task-info">{{ item.taskInfo }}</view>

                    <view class="taskItem-title flex-between top40" style="font-size: 35rpx">
                      <image
                        v-if="item.followUserImg"
                        :src="item.followUserImg"
                        :style="{
                          width: item.imgSize,
                          height: item.imgSize,
                          marginTop: item.marginTop,
                        }"
                      />
                      <view
                        v-if="item.followUserTitle"
                        class="taskItem-des flex-1"
                        :style="{ marginLeft: item.marginLeft }"
                        >{{ item.followUserTitle }}</view
                      >
                    </view>
                    <view
                      v-if="!item.cardData && item.selectUser"
                      class="select-entity top40 bottom40 flex-between"
                      @click="selectEntity(indexKey)"
                    >
                      <view>{{ item.selectUser }}</view>
                      <uni-icons type="forward" size="16" color="#747480"></uni-icons>
                    </view>

                    <view class="link-text top10" @click.stop="onLinkUrl(item.linkUrl)">{{ item.linkText }}</view>
                    <view class="link-text top10" @click.stop="onLinkUrl(item.linkUrl1)">{{ item.linkText1 }}</view>

                    <view
                      v-if="!item.cardData && item.selectText"
                      class="select-entity top40 bottom40 flex-between"
                      @click="selectEntity(indexKey)"
                    >
                      <view>{{ item.selectText }}</view>
                      <uni-icons type="forward" size="16" color="#747480"></uni-icons>
                    </view>

                    <!--                    群卡片-->
                    <view class="card-box top40 bottom40" v-if="indexKey === 'tweebaa.im.group' && item.cardData">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-group-card :groupData="item.cardData" :isControls="false"></tw-group-card>
                    </view>
                    <view class="card-box top40 bottom40" v-if="indexKey === 'tweebaa.activity' && item.cardData">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-reward
                        :group="item.cardData.groupBriefDTO"
                        :info="item.cardData"
                        :tag="item.cardData.tags"
                        :author="item.cardData.userDTO"
                        :btmActionBar="false"
                        statusFollow
                        @translateChange="translateChange(item.cardData, index)"
                        cardType="callOfAction"
                      />
                    </view>
                    <view
                      class="card-box top40 bottom40"
                      v-if="indexKey === 'tweebaa.ecoplus.ecoplus' && item.cardData"
                    >
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-ecology :info="item.cardData" :showOperate="false" />
                    </view>
                    <view class="card-box top40 bottom40" v-if="indexKey === 'tweebaa.im.meeting' && item.cardData">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-meeting :item="item.cardData" />
                    </view>
                    <view class="card-box top40 bottom40" v-if="indexKey === 'tweebaa.im.speech' && item.cardData">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-linkage :item="item.cardData" />
                    </view>
                    <!--帖子卡片-->
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.blog.blog'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-blog
                        :info="item.cardData"
                        :author="item.cardData.owner"
                        :tag="item.cardData.personalityTags"
                        :statusOperate="false"
                      />
                    </view>
                    <view
                      class="card-box top40 bottom40"
                      v-if="item.cardData && indexKey === 'tweebaa.interaction.redPacket'"
                    >
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <redPacket-card
                        :item="item.cardData"
                        :index="index"
                        :showKey="navIndex"
                        :moment="moment"
                        :showOperate="false"
                        @closeChange1="closeChange1"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.im.wordChain'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-sequence :item="item.cardData" :showOperate="false" />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.challenge'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-reward
                        :group="item.cardData.groupBriefDTO"
                        :info="item.cardData"
                        :tag="item.cardData.tags"
                        :btmActionBar="false"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.recommend'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-user-detail :userData="item.cardData" />
                    </view>
                    <!--                    卡片-->
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.collect'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-spotlight :item="item.cardData" />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.daonft'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.equitynft'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.definft'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.nft'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.product'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view
                      class="card-box top40 bottom40"
                      v-if="item.cardData && indexKey === 'tweebaa.ecoplus.proposal'"
                    >
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <tw-common-card-dao :item="item.cardData" />
                    </view>
                    <view class="card-box top40 bottom40" v-if="item.cardData && indexKey === 'tweebaa.ecoplusnft'">
                      <image
                        class="deleteEnter"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <productOwnerCard
                        :productDetail="item.cardData"
                        :ownerDetail="item.cardData.owner"
                        :showRate="false"
                        :noOperate="false"
                      />
                    </view>
                    <view
                      class="card-box top40 bottom40"
                      style="padding-top: 20rpx"
                      v-if="item.cardData && indexKey === 'tweebaa.tycoonplace'"
                    >
                      <image
                        class="deleteEnter"
                        style="top: -5rpx; right: -5rpx"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <view style="padding-top: 30rpx">
                        <tw-user-detail :userData="item.cardData" />
                      </view>
                    </view>
                    <view
                      class="card-box top40 bottom40"
                      style="padding-top: 20rpx"
                      v-if="item.cardData && indexKey === 'tweebaa.IPandbranding'"
                    >
                      <image
                        class="deleteEnter"
                        style="top: -5rpx; right: -5rpx"
                        src="/static/images/discovery.ecosystem/deletePng.png"
                        @click="onDelete(indexKey)"
                      ></image>
                      <view style="padding-top: 30rpx">
                        <tw-user-detail :userData="item.cardData"></tw-user-detail>
                      </view>
                    </view>

                    <view v-if="item.publishTagTitle" style="margin-bottom: 50rpx">
                      <view class="taskItem-title flex-between" style="font-size: 35rpx">
                        <image
                          :src="item.publishTagImg"
                          :style="{
                            width: item.imgSize,
                            height: item.imgSize,
                            marginTop: item.marginTop,
                          }"
                        />
                        <view class="taskItem-des flex-1" :style="{ marginLeft: item.marginLeft }">{{
                          item.publishTagTitle
                        }}</view>
                      </view>
                      <uni-easyinput
                        class="tag-entry flex-1"
                        placeholder-style="fontSize:28rpx"
                        placeholder="Enter Tag"
                      />
                    </view>
                    <template v-for="(taskItem, taskItemIndex) in item.taskItem" :key="taskItem.action">
                      <view class="taskItem-term">
                        <view class="taskItem-title flex-between">
                          <text class="icon iconfont" :class="taskItem.icon"></text>
                          <view class="taskItem-des flex-1">{{ taskItem.title }}</view>
                          <text
                            @click="onSelect(taskItem, taskItemIndex)"
                            :class="taskItem.checked ? 'selected flex-center flex-center-justify' : 'not-selected'"
                            class="iconfont"
                          >
                            &#xe631;</text
                          >
                        </view>
                        <view class="taskItem-content padding-b40">{{ taskItem.content }}</view>
                        <view class="task-ask flex" v-if="taskItem.leastText">
                          <text class="task-ask-text">{{ taskItem.leastText }}</text>
                          <!--                          浏览-->
                          <input
                            v-if="taskItem.action === 'VIEW'"
                            class="task-ask-content text-center"
                            type="number"
                            v-model="taskItem.requestedSeconds"
                          />
                          <!--                          分享-->
                          <input
                            v-if="taskItem.action === 'SHARE'"
                            class="task-ask-content text-center"
                            type="number"
                            v-model="taskItem.requestedCount"
                          />
                          <text class="task-ask-text">{{ taskItem.company }}</text>
                        </view>
                      </view>
                    </template>
                  </view>
                </view>
              </template>
            </view>
          </view>
          <view v-show="dataTask.taskType === 'right'">
            <view class="custom-box padding30 bottom40">
              <view class="custom-title flex-center">
                <image class="custom-icon" src="/static/images/task/custom-icon.png"></image>
                <text>{{ $t('chat.applicant-management.customTask') }}</text>
              </view>
              <view class="custom-info top30 bottom40">
                {{ $t('task.taskDesc12') }}
              </view>
              <!--              <uni-easyinput-->
              <!--                type="textarea"-->
              <!--                autoHeight-->
              <!--                v-model="customRichText.description"-->
              <!--                placeholder="请输入内容"-->
              <!--              ></uni-easyinput>-->
              <view class="editor_box"
                ><tw-com-editor
                  :placeholder="$t('chat.apply-join.applyDetail.inputTip')"
                  id="editor"
                  v-model="customRichText.description"
                ></tw-com-editor
              ></view>
              <view class="prompt flex-center top40">
                <image class="prompt-icon" src="/static/icons/tips.png"></image>
                <view>{{ $t('group-settings.groupEdit.theCreatorNeedsToCompleteTheValidationOfEachCustomTask') }}</view>
              </view>

              <!--              <view class="operate flex-center">-->
              <!--                <text class="operate-add iconfont">&#xe642;</text>-->
              <!--                <text>确认</text>-->
              <!--              </view>-->
            </view>
          </view>
        </view>
      </scroll-view>
      <!--      <view style="height: 500px">11111</view>-->
    </view>
    <view class="btn-box" v-if="isBottom">
      <button type="primary" class="btn" @click="btnNext">
        {{ $t('task.finishTask') }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, nextTick, watchEffect, computed, onMounted, getCurrentInstance } from 'vue'
import store from '@/store'
import apiBlog from '@/api/blog'
import apiIm from '@/api/im'
import apiEcoplus from '@/api/ecoplus'
import apiActions from '@/api/actions'
import apiInteraction from '@/api/interaction.js'
import apiShop from '@/api/shop.js'
import apiFeatured from '@/api/featured.js'
import apiUser from '@/api/user.js'
import { onLoad } from '@dcloudio/uni-app'
import redPacketCard from '@/pages/chat/transfer-accounts/components/redPacket-card'
import formTags from '@/components/tw/common/form-tag.vue'
import productOwnerCard from '@/pages/product/components/product-owner-card.vue'

let app = getCurrentInstance()
let props = defineProps({
  isTopBar: {
    type: [Boolean, String],
    default: true,
  },
  isHeader: {
    type: [Boolean, String],
    default: true,
  },
  isBottom: {
    type: [Boolean, String],
    default: true,
  },
  form1: {
    type: Object,
  },
})

onLoad(option => {
  console.log('onLoadAddTask', store.state.taskStore.publicTask)
  console.log('option', option)
  props.isTopBar = Boolean(option.isTopBar)
  props.isBottom = Boolean(option.isTopBar)
  let eventChannel = app.proxy.getOpenerEventChannel()
  console.log('storeName----------------------------->')
  eventChannel.on('storeName', storeNameFN)
})

let appData = reactive({
  storeName: '',
})
let storeNameFN = data => {
  console.log(data, 'datadatadatadatadatadata')
  console.log('storeNameFN1', store.state.taskStore.publicTask)
  console.log('storeNameFN2', store.state.taskStore[data])
  appData.storeName = data
  console.log('storeNameFN3', appData.storeName)
  //销毁事件
  let eventChannel = app.proxy.getOpenerEventChannel()

  eventChannel.off('storeName', storeNameFN)
}

let onTags = tags => {
  props.form1.tags = tags
}

// 任务类型数据
const labelArr = reactive([
  {
    label: uni.$t('blog.add-type.efficientpromotionaccelerator'),
    code: '0',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.VoiceVideoconferencing'),
    code: '1',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Personalizedredpacketstransfers'),
    code: '2',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.personalizedsolitairepromotion'),
    code: '3',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Limitedtimebonupromotion'),
    code: '4',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.valuerecommend'),
    code: '5',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.EcologyNFT'),
    code: '6',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Ecologyselectionandanalysiscolumn'),
    code: '7',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Valuegiveaway'),
    code: '8',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.NFTpromotion'),
    code: '9',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.DAOvotepromotion'),
    code: '10',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Ecologicalpromotion'),
    code: '11',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.IPandbranding'),
    code: '12',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.personalvaluebodyspace'),
    code: '13',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.postPromotion'),
    code: '14',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.productpromotion'),
    code: '15',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.CalloAction'),
    code: '16',
    active: false,
  },
  {
    label: uni.$t('blog.add-type.Personalizedgrouppromotion'),
    code: '17',
    active: false,
  },
])

const isTaskActive = taskType => {
  return taskData[taskType]?.taskItem.some(item => item.checked) || false
}

let taskIconArr = [
  //浏览        0
  'icon-liulan',
  //分享        1
  'icon-fenxiang',
  //收藏        2
  'icon-shoucang',
  //创意        3
  'icon-xietiezi',
  //报名        4
  'icon-baoming',
  //参加        5
  'icon-canjia',
  //购买        6
  'icon-goumaichanpin',
  //评论        7
  'icon-pingjia1',
  //点赞        8
  'icon-dianzan',
  //转推        9
  'icon-zhuantui',
  //精选
  'icon-zhenxuan-1',
]
let onScroll = code => {
  // labelArr.forEach(item => {
  //   if (item.code === code) {
  //     item.active = !item.active
  //   }
  // })

  if (dataTask.currentId === `code${code}`) {
    dataTask.currentId = ''
    setTimeout(() => {
      dataTask.currentId = `code${code}`
    }, 0)
  } else {
    dataTask.currentId = `code${code}`
  }
  console.log(dataTask.currentId)
}

const handleTaskClick = code => {
  // Trigger scroll
  onScroll(code)
}

//富文本内容
let customRichText = reactive({
  action: 'CUSTOM',
  requestedCount: '', ///
  requestedSeconds: '', ///
  subjectSiteId: '', ///
  subjectId: '', ///
  description: '', //自定义任务的描述
})

const rollCodeToTranslationKey = {
  0: 'efficientpromotionaccelerator',
  1: 'VoiceVideoconferencing',
  2: 'Personalizedredpacketstransfers',
  3: 'personalizedsolitairepromotion',
  4: 'Limitedtimebonupromotion',
  5: 'valuerecommend',
  6: 'EcologyNFT',
  7: 'Ecologyselectionandanalysiscolumn',
  8: 'Valuegiveaway',
  9: 'NFTpromotion',
  10: 'DAOvotepromotion',
  11: 'Ecologicalpromotion',
  12: 'IPandbranding',
  13: 'personalvaluebodyspace',
  14: 'postPromotion',
  15: 'productpromotion',
  16: 'CalloAction',
  17: 'Personalizedgrouppromotion',
}

let taskList = reactive({
  'tweebaa.im.speech': {
    bgImg: '/static/images/task/mixchats-header.png',
    bgText: uni.$t('blog.add-type.mixChatsHead'),
    bgTextDesc: uni.$t('blog.add-type.mixChatsHeadDesc'),
    bgTextColor: '#3177E0',
    subImg: '/static/images/task/mixchat-icon.png',
    subTitle: uni.$t('blog.add-type.mixChatsSub'),
    taskInfo: uni.$t('blog.add-type.mixChatInfo'),
    linkText: uni.$t('blog.add-type.CreatenowMixChat'),
    linkUrl: '/pages/chat/multigroup/add',
    linkText1: uni.$t('blog.add-type.Createnow1'),
    linkUrl1: '/pages/chat/create-group-introduce',
    selectText: uni.$t('blog.add-type.selectMixchat'),
    rollCode: '0',
    class: 'tweebaa.im.speech',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.im.meeting': {
    bgImg: '/static/images/task/meetings-header.png',
    bgText: uni.$t('task.meetingHead'),
    bgTextColor: '#3177E0',
    bgTopDesc: '150rpx',
    bgTextDesc: uni.$t('blog.add-type.meetingHeadDesc'),
    subImg: '/static/images/task/meetings-icon.png',
    subTitle: uni.$t('blog.add-type.meetingsSub'),
    taskInfo: uni.$t('blog.add-type.meetingsInfo'),
    linkText: uni.$t('blog.add-type.createNowMeet'),
    linkUrl: '/pages/chat/meeting/meeting-introduce',
    selectText: uni.$t('blog.add-type.selectMeeting'),
    rollCode: '1',
    class: 'tweebaa.im.meeting',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.interaction.redPacket': {
    bgImg: '/static/images/task/readytransfer-header.png',
    bgText: uni.$t('task.promoteReadyTransfer'),
    bgTextColor: '#3177E0',
    bgTopDesc: '175rpx',
    bgTextDesc: uni.$t('blog.add-type.promoteReadyTransferDesc'),
    subImg: '/static/images/task/readytransfer-icon.png',
    subTitle: uni.$t('blog.add-type.readyTransferSubTitle'),
    taskInfo: uni.$t('blog.add-type.readyTransferInfo'),
    linkText: uni.$t('blog.add-type.createReady'),
    linkUrl: '/pages/chat/transfer-accounts/create-red-introduce?type=transfer',
    selectText: uni.$t('blog.add-type.readySelect'),
    rollCode: '2',
    class: 'tweebaa.interaction.redPacket',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.im.wordChain': {
    //need to add tip section
    bgImg: '/static/images/task/groupnotes-header.png',
    bgText: uni.$t('group-settings.im.groupNotesHeader'),
    bgTextDesc: uni.$t('blog.add-type.groupNoteHeadDesc'),
    bgTextColor: '#3177E0',
    subImg: '/static/images/task/groupnotes-icon.png',
    subTitle: uni.$t('blog.add-type.groupNoteSubTitle'),
    taskInfo: uni.$t('blog.add-type.groupNoteInfo'),
    linkText: uni.$t('blog.add-type.CreatenowGroupNote'),
    linkUrl: '/pages/user/function-introduction?type=solitaire',
    selectText: uni.$t('blog.add-type.selectGroupNote'),
    rollCode: '3',
    class: 'tweebaa.im.wordChain',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.challenge': {
    bgImg: '/static/images/task/flashrewards-header.png',
    bgText: uni.$t('blog.add-type.rewardsHead'),
    bgTextDesc: uni.$t('blog.add-type.rewardsHeadDesc'),
    bgTextColor: '#3177E0',
    subImg: '/static/images/task/flashrewards-icon.png',
    subTitle: uni.$t('blog.add-type.rewardsSubTitle'),
    taskInfo: uni.$t('blog.add-type.rewardsInfo'),
    linkText: uni.$t('blog.add-type.CreatenowFlashReward'),
    linkUrl: 'pages/reward/add',
    selectText: uni.$t('blog.add-type.selectRewards'),
    rollCode: '4',
    class: 'tweebaa.challenge',
    cardData: '',
    taskItem: [],
  },
  //didn't find link for the select
  'tweebaa.recommend': {
    bgImg: '/static/images/task/value-header.png',
    bgText: uni.$t('blog.add-type.valuerecommendationmutualpromotionproduct'),
    bgTextDesc: uni.$t('blog.add-type.valueHeadDesc'),
    bgTextColor: '#3177E0',
    subImg: '/static/images/task/value-icon.png',
    subTitle: uni.$t('blog.add-type.valueSub'),
    taskInfo: uni.$t('blog.add-type.valueInfo'),
    linkText: uni.$t('blog.add-type.createValue'),
    linkUrl: '/pages/blog/add',
    selectText: uni.$t('blog.add-type.selectValue'),
    premiumTitle: uni.$t('common.editor-choose.recommendPremiumTitle'),
    premiumText: uni.$t('common.editor-choose.recommendPremiumText'),
    rollCode: '5',
    class: 'tweebaa.recommend',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.ecoplusnft': {
    bgImg: '/static/images/task/eco+nft-header.png',
    bgText: uni.$t('blog.add-type.EcoNftHead'),
    bgTextDesc: uni.$t('blog.add-type.EcoNftHeadDesc'),
    subImg: '/static/images/task/eco+nft-icon.png',
    subTitle: uni.$t('blog.add-type.EcoNftSub'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.EcoNftInfo'),
    linkText: uni.$t('blog.add-type.CreatenowEcoNft'),
    linkUrl: '/pages/discovery/ecosystem/createdEcological',
    selectText: uni.$t('blog.add-type.selectEcoNft'),
    rollCode: '6',
    class: 'tweebaa.ecoplusnft',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.collect': {
    bgImg: '/static/images/task/spotlight-header.png',
    bgText: uni.$t('blog.add-type.spotlightHead'),
    bgTextDesc: uni.$t('blog.add-type.spotlightHeadDesc'),
    subImg: '/static/images/task/spotlight-icon.png',
    subTitle: uni.$t('blog.add-type.spotlightSub'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.spotlightInfo'),
    linkText: uni.$t('blog.add-type.CreatenowSpotlight'),
    linkUrl: '/pages/discovery/featured/add',
    selectText: uni.$t('blog.add-type.selectSpotlight'),
    rollCode: '7',
    class: 'tweebaa.collect',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.goods.freePlan': {
    bgImg: '/static/images/task/gift-header.png',
    bgText: uni.$t('blog.add-type.giftsHead'),
    bgTextDesc: uni.$t('blog.add-type.giftsHeadDesc'),
    subImg: '/static/images/task/gifts-icon.png',
    subTitle: uni.$t('blog.add-type.giftsSub'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.giftsInfo'),
    linkText: uni.$t('blog.add-type.CreatenowGifts'),
    linkUrl: '/pages/blog/value-gifts',
    selectText: uni.$t('blog.add-type.selectGifts'),
    premiumTitle: uni.$t('common.editor-choose.giftPremiumTitle'),
    premiumText: uni.$t('common.editor-choose.giftPremiumText'),
    rollCode: '8',
    class: 'tweebaa.goods.freePlan',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.daonft': {
    bgImg: '/static/images/task/daonft-header.png',
    bgText: uni.$t('blog.add-type.EcoNftHead'),
    bgTextDesc: uni.$t('blog.add-type.daoNftHeadDesc'),
    subImg: '/static/images/task/daonft-icon.png',
    subTitle: uni.$t('blog.add-type.daoNFTtitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.daoNFTtitleInfo'),
    linkText: uni.$t('blog.add-type.CreatenowdaoNFT'),
    linkUrl: '/pages/product/add-nft-nm/index?goodsOwnerType=undefined',
    selectText: uni.$t('blog.add-type.selectDaoNft'),
    rollCode: '9',
    class: 'tweebaa.daonft',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.equitynft': {
    subImg: '/static/images/task/equitynft-icon.png',
    subTitle: uni.$t('blog.add-type.equityNFTtitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.promoteEquityNFTInfo'),
    linkText: uni.$t('blog.add-type.CreatenoweEquityNFT'),
    linkUrl: '/pages/product/add-nft-nm/index?goodsOwnerType=undefined',
    selectText: uni.$t('blog.add-type.selectEquityNFT'),
    class: 'tweebaa.equitynft',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.definft': {
    subImg: '/static/images/task/definft-icon.png',
    subTitle: uni.$t('blog.add-type.DefiNFTtitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.DefiNFTinfo'),
    linkText: uni.$t('blog.add-type.CreatenowDefiNFT'),
    linkUrl: '/pages/product/add-nft-nm/index?goodsOwnerType=undefined',
    selectText: uni.$t('blog.add-type.selectDefiNFT'),
    class: 'tweebaa.definft',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.nft': {
    subImg: '/static/images/task/nft-icon.png',
    subTitle: uni.$t('blog.add-type.promoteRegularNFTtitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.promoteRegularNFT'),
    linkText: uni.$t('blog.add-type.CreatenowNFT'),
    linkUrl: '/pages/product/add-nft-nm/index?goodsOwnerType=undefined',
    selectText: uni.$t('blog.add-type.Worldwideattention'),
    rollCode: '9',
    class: 'tweebaa.nft',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.ecoplus.proposal': {
    bgImg: '/static/images/task/daovote-header.png',
    bgText: uni.$t('blog.add-type.daovoteHead'),
    bgTextDesc: uni.$t('blog.add-type.daovoteHeadDesc'),
    subImg: '/static/images/task/daovote-icon.png',
    subTitle: uni.$t('blog.add-type.daovoteSub'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.daovoteInfo'),
    linkText: uni.$t('blog.add-type.CreatenowDaovote'),
    linkUrl: '/pages/user/function-introduction?type=dAOVoting',
    selectText: uni.$t('blog.add-type.selectDaovote'),
    rollCode: '10',
    class: 'tweebaa.ecoplus.proposal',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.IPandbranding': {
    bgImg: '/static/images/task/personalBrand-header.png',
    bgText: uni.$t('blog.add-type.personalBrandHead'),
    bgImgHeight: '130rpx',
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.personalBrandInfo'),
    followUserTitle: uni.$t('blog.add-type.followUserTitle'),
    followUserImg: '/static/images/task/Icon_xs_fans.png',
    selectUser: uni.$t('blog.add-type.followUserTitle'),
    publishTagTitle: uni.$t('blog.add-type.publishTagTitle'),
    // selectText: uni.$t('blog.add-type.publichTagPlaceholder'),
    publishTagImg: '/static/images/task/tags.png',
    imgSize: '25rpx',
    rollCode: '12',
    class: 'tweebaa.IPandbranding',
    marginTop: '11rpx',
    marginLeft: '12rpx',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.ecoplus.ecoplus': {
    subImg: '/static/images/task/promEco-icon.png',
    subTitle: uni.$t('blog.add-type.ecoplusSubTitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.ecoplusInfo'),
    linkText: uni.$t('blog.add-type.ecoplusCreate'),
    linkUrl: '/pages/discovery/ecosystem/createdEcological',
    selectText: uni.$t('blog.add-type.ecoplusSelect'),
    rollCode: '11',
    class: 'tweebaa.ecoplus.ecoplus',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.tycoonplace': {
    subImg: '/static/images/task/promTycoon-icon.png',
    subTitle: uni.$t('blog.add-type.tycoonSubTitle'),
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.tycoonInfo'),
    linkText: uni.$t('blog.add-type.tycoonCreate'),
    linkUrl: '/pages/product/create-personal-introduce',
    selectText: uni.$t('blog.add-type.tycoonSelect'),
    rollCode: '13',
    class: 'tweebaa.tycoonplace',
    cardData: '',
    taskItem: [],
  },

  //defi nft, equty nft, dao nft

  //need to fix follow user and tag fields

  'tweebaa.blog.blog': {
    bgImg: '/static/images/task/blog-header.png',
    bgText: uni.$t('task.postPromotion'),
    bgTextColor: '#3177E0',
    bgImgHeight: '130rpx',
    taskInfo: uni.$t('blog.add-type.Strangersseeyourgoodposts'),
    linkText: uni.$t('blog.add-type.Createnow'),
    linkUrl: '/pages/blog/add-form/pages/product/create-product-introduce',
    selectText: uni.$t('blog.add-type.Worldwideattention'),
    rollCode: '14',
    class: 'tweebaa.blog.blog',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.product': {
    bgImg: '/static/images/task/product-header.png',
    bgText: uni.$t('blog.add-type.productHead'),
    bgImgHeight: '130rpx',
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.Strangersseeyourgoodposts'),
    linkText: uni.$t('blog.add-type.Createnow'),
    linkUrl: '/pages/product/create-product-introduce',
    selectText: uni.$t('blog.add-type.Worldwideattention'),
    rollCode: '15',
    class: 'tweebaa.product',
    cardData: '',
    taskItem: [],
  },

  'tweebaa.activity': {
    bgImg: '/static/images/task/callAction-header.png',
    bgText: uni.$t('blog.add-type.CalloActionpromotion'),
    bgImgHeight: '130rpx',
    bgTextColor: '#3177E0',
    taskInfo: uni.$t('blog.add-type.callActionInfo'),
    linkText: uni.$t('blog.add-type.callActionCreate'),
    linkUrl: '/pages/action/create-action-introduce',
    selectText: uni.$t('blog.add-type.selectCallAction'),
    rollCode: '16',
    class: 'tweebaa.activity',
    cardData: '',
    taskItem: [],
  },
  'tweebaa.im.group': {
    bgImg: '/static/images/task/group-header.png',
    bgText: uni.$t('task.groupPromotion'),
    bgTextColor: '#31B6E0',
    bgImgHeight: '130rpx',
    taskInfo: uni.$t('task.taskDesc3'),
    linkText: uni.$t('task.taskDesc55'),
    linkUrl: '/pages/chat/create-group-introduce',
    selectText: uni.$t('task.chooseapersonalizedgroup'),
    rollCode: '17',
    class: 'tweebaa.im.group',
    cardData: '',
    taskItem: [],
  },
})

const generateTaskItems = (subjectSiteId, rollCode) => {
  const translationKey = rollCodeToTranslationKey[rollCode]

  let taskItems = [
    {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[0],
      action: 'VIEW',
      title: uni.$t('task.viewThis') + ' ' + uni.$t(`blog.add-type.${translationKey}`),
      content: uni.$t('task.groupViewText'),
      leastText: uni.$t('task.minView'),
      requestedSeconds: null, //15
      company: uni.$t('t.general.second'),
      checked: false,
    },
    {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[1],
      action: 'SHARE',
      title:
        uni.$t('task.shareThis') + ' ' + uni.$t(`blog.add-type.${translationKey}`) + ' ' + uni.$t('task.shareWith'),
      content: uni.$t('task.shareText'),
      leastText: uni.$t('task.minShare'),
      requestedCount: null, //3
      company: uni.$t('task.friends'),
      checked: false,
    },
    {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[2],
      action: 'FAVORITE',
      title: uni.$t('task.bookmarkthis') + ' ' + uni.$t(`blog.add-type.${translationKey}`),
      content: uni.$t('task.favoriteText'),
      checked: false,
    },
    {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[3],
      action: 'CREATE',
      title:
        uni.$t('task.publishPost') +
        ' ' +
        uni.$t(`blog.add-type.${translationKey}`) +
        ' ' +
        uni.$t('task.publishPost1'),
      content: uni.$t('task.blogText'),
      checked: false,
    },
    {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[10],
      action: 'SUGGESTION',
      title:
        uni.$t('task.spotlightTask') +
        ' ' +
        uni.$t(`blog.add-type.${translationKey}`) +
        ' ' +
        uni.$t('task.spotlightTask1'),
      content: uni.$t('task.suggestionText'),
      checked: false,
    },
  ]
  if (subjectSiteId == 'tweebaa.tycoonplace') {
    return taskItems.filter((_, index) => index != 2 && index != 3)
  }
  if (subjectSiteId == 'tweebaa.recommend' || subjectSiteId == 'tweebaa.goods.freePlan') {
    taskItems.splice(4, 0, {
      subjectSiteId,
      subjectId: '',
      icon: taskIconArr[6],
      action: 'Premium',
      title: taskList[subjectSiteId].premiumTitle,
      content: taskList[subjectSiteId].premiumText,
      checked: false,
    })
  }
  return taskItems
}
let taskData = computed(() => {
  return taskList
})
const taskDataList = () => {
  let res = {}
  for (let key in taskList) {
    if (taskList.hasOwnProperty(key)) {
      taskList[key].taskItem = [...generateTaskItems(key, taskList[key].rollCode)]
    }
  }
  taskData = taskList
}

let initTaskData = () => {
  let storeTask = store.state.taskStore.publicTask
  if (storeTask) {
    for (const storeTaskKey in storeTask) {
      console.log('taskData[storeTaskKey]      taskData[storeTaskKey]', taskData[storeTaskKey])
      if (!taskData[storeTaskKey] && storeTaskKey === 'custom') {
        customRichText.description = storeTask[storeTaskKey].description
        customRichText.action = storeTask[storeTaskKey].action
        continue
      }
      //拿到store中的任务项
      const taskItemData = storeTask[storeTaskKey].taskData
      //本地存在这个实体兼任务 和store 中也存在就进去
      if (taskData[storeTaskKey] && taskItemData) {
        //如果本地实体存在 store 也存在就赋值
        taskData[storeTaskKey].cardData = storeTask[storeTaskKey].cardData
        //循环缓存中的任务项 修改本地任务数据
        taskItemData.forEach(item => {
          taskData[storeTaskKey].taskItem = taskData[storeTaskKey].taskItem.map(taskItem => {
            if (item.action === taskItem.action) {
              return {
                ...taskItem,
                checked: true,
                subjectId: item.subjectId,
                subjectSiteId: item.subjectSiteId,
                requestedSeconds: item.requestedSeconds,
                requestedCount: item.requestedCount,
              }
            }
            return taskItem
          })
        })
      }
    }
  }
}
onMounted(() => {
  taskDataList()
  initTaskData()
})
let dataTask = reactive({
  taskType: 'left',
  currentId: '',
})
let switchType = type => {
  dataTask.taskType = type
}
let onLinkUrl = url => {
  console.log(url)
  uni.navigateTo({
    url,
  })
}

//选择
let onSelect = (taskItem, taskItemIndex) => {
  console.log('onSelect called with:', { taskItem, taskItemIndex })

  if (!taskItem) {
    console.error('Task item is undefined')
    uni.showToast({
      title: uni.$t('task.invalidTaskItem', 'Invalid task item'),
      icon: 'none',
    })
    return
  }

  if (taskItem.action == 'VIEW' && !taskItem.checked) {
    if (!taskItem.requestedSeconds) {
      uni.showToast({
        title: uni.$t('group-settings.pleaseEnterANewLabel2'),
        icon: 'none',
      })
      return
    }
  }

  if (taskItem.action == 'SHARE' && !taskItem.checked) {
    if (taskItem.checked) return

    if (!taskItem.requestedCount) {
      uni.showToast({
        title: uni.$t('group-settings.pleaseSetTheNumberOfPeopleSharing'),
        icon: 'none',
      })
      return
    }
  }

  // Find the parent task object
  let taskType = null
  let task = null

  for (const [key, value] of Object.entries(taskData)) {
    if (value && value.taskItem && Array.isArray(value.taskItem) && value.taskItem.includes(taskItem)) {
      taskType = key
      task = value
      break
    }
  }

  if (!taskType || !task) {
    console.error('Parent task not found for task item')
    return
  }

  console.log('Found parent task:', taskType)

  // Check if a task has been selected (cardData exists)
  if (!task.cardData) {
    uni.showToast({
      title: uni.$t('task.selectTaskFirst'),
      icon: 'none',
    })
    return
  }

  // Toggle the checked state of the task item
  taskItem.checked = !taskItem.checked

  // Update the label active state
  const label = labelArr.find(item => task.rollCode === item.code.toString())
  if (label) {
    label.active = task.taskItem.some(item => item.checked)
  }
}

let selectEntity = index => {
  console.log('Here is index', index)
  switch (index) {
    case 'tweebaa.blog.blog':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=blog&name=task-blog',
        events: {
          selectData: res => {
            console.log(res, 'Response from selectData')

            if (!res || res.length === 0) {
              uni.showToast({
                title: 'No data selected',
                icon: 'none',
              })
              return
            }
            let data = res[0].id
            if (!data) {
              uni.showToast({
                title: 'Invalid data selected',
                icon: 'none',
              })
              return
            }
            uni.showLoading()
            apiBlog
              .blogDetail({
                id: data,
              })
              .then(result => {
                console.log('blogList--------------->', result)
                taskData['tweebaa.blog.blog'].taskItem.forEach(item => (item.subjectId = data))
                taskData['tweebaa.blog.blog'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error('Error fetching blog detail:', reject)
                uni.hideLoading()
                uni.showToast({
                  title: 'Failed to load blog details',
                  icon: 'none',
                })
              })
          },
        },
      })
      break
    case 'tweebaa.im.speech':
      uni.navigateTo({
        //need to change link for selecting mixchat
        url: '/pages/common/editor-choose/index?type=mixchat&isReason=0',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          selectData: res => {
            console.log(res[0].id, 'resresresr')
            let data = res[0].id
            if (!data) {
              uni.showToast({
                title: 'no data',
                icon: 'none',
              })
            }
            uni.showLoading()
            apiIm
              .getSpeechDetail(data)
              .then(result => {
                console.log('******* got result', result)
                taskData['tweebaa.im.speech'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.im.speech'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.im.group':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=group&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiIm
              .getGroupDetail({
                id: data,
              })
              .then(result => {
                console.log(result)
                taskData['tweebaa.im.group'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.im.group'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.im.meeting':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=meeting&isReason=0',
        events: {
          selectData: res => {
            let data = res[0].id
            if (!data) {
              uni.showToast({
                title: 'no data',
                icon: 'none',
              })
              return
            }
            uni.showLoading()
            console.log('******** data', data)
            apiIm
              .meetingDetail(data)
              .then(result => {
                console.log('******* result', result, taskData['tweebaa.im.meeting'])
                taskData['tweebaa.im.meeting'].taskItem.forEach(item => (item.subjectId = data))
                taskData['tweebaa.im.meeting'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
                uni.hideLoading()
              })
          },
        },
      })
      break

    case 'tweebaa.interaction.redPacket':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=redPacket&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiInteraction
              .redEnvelopeDetail(data)
              .then(result => {
                console.log(result)
                taskData['tweebaa.interaction.redPacket'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.interaction.redPacket'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break

    case 'tweebaa.im.wordChain':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=groupnote&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiIm
              .wordChainDetail({
                id: data,
              })
              .then(result => {
                taskData['tweebaa.im.wordChain'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.im.wordChain'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.challenge':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=reward&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiActions
              .getActionsDetail(data)
              .then(result => {
                taskData['tweebaa.challenge'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.challenge'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break

    case 'tweebaa.ecoplus.ecoplus':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=ecology&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiEcoplus
              .getEcoplus(data)
              .then(result => {
                taskData['tweebaa.ecoplus.ecoplus'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.ecoplus.ecoplus'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.goods.freePlan':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=giveaway&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiIm
              .getGroupDetail({
                id: data,
              })
              .then(result => {
                taskData['tweebaa.goods.freePlan'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.goods.freePlan'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.tycoonplace':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=fans&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiUser
              .getUserDetail([data])
              .then(result => {
                taskData['tweebaa.tycoonplace'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.tycoonplace'].cardData = result.data[0]
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
                uni.hideLoading()
              })
          },
        },
      })
      break
    //need to make link
    case 'tweebaa.IPandbranding':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=personal&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiUser
              .getUserDetail([data])
              .then(result => {
                taskData['tweebaa.IPandbranding'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.IPandbranding'].cardData = result.data[0]
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
                uni.hideLoading()
              })
          },
        },
      })
      break
    case 'tweebaa.recommend':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=recommend&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiIm
              .getGroupDetail({
                id: data,
              })
              .then(result => {
                taskData['tweebaa.recommend'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.recommend'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.collect':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=collect&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiFeatured
              .getDetailById(data)
              .then(result => {
                taskData['tweebaa.collect'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.collect'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
                uni.hideLoading()
              })
          },
        },
      })
      break
    case 'tweebaa.ecoplusnft':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=ecoplusnft&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.ecoplusnft'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.ecoplusnft'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.daonft':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=daonft&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.daonft'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.daonft'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.equitynft':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=equitynft&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.equitynft'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.equitynft'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.definft':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=definft&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.definft'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.definft'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.nft':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=nft&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.nft'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.nft'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.product':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=product&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiShop
              .getProductById(data)
              .then(result => {
                taskData['tweebaa.product'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.product'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.ecoplus.proposal':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=dao&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].proposal.id
            console.log('dao_id------------------->', data)
            uni.showLoading()
            apiEcoplus
              .getVote(data)
              .then(result => {
                console.log('getDao--------------->', result)
                taskData['tweebaa.ecoplus.proposal'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.ecoplus.proposal'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
    case 'tweebaa.activity':
      uni.navigateTo({
        url: '/pages/common/editor-choose/index?type=action&isReason=0',
        events: {
          selectData: function (res) {
            let data = res[0].id
            uni.showLoading()
            apiActions
              .getActionActivitiesDetail(data)
              .then(result => {
                taskData['tweebaa.activity'].taskItem.map((item, index) => (item.subjectId = data))
                taskData['tweebaa.activity'].cardData = result.data
                uni.hideLoading()
              })
              .catch(reject => {
                console.error(reject)
              })
          },
        },
      })
      break
  }
}

let onSelectPost = () => {
  uni.navigateTo({
    url: '/pages/common/add-type?type=blog&name=task-blog',
    events: {
      selectBlog: function (data) {
        if (!data) {
          uni.showToast({
            title: 'no data',
            icon: 'none',
          })
        }
        blogData.value = null
        uni.showLoading()
        apiBlog
          .blogDetail({
            id: data,
          })
          .then(result => {
            blogData.value = data
            blogDatas.value = result.data
            blogTemplate.value.map((item, index) => (item.subjectId = data))
            labelArr[7].active = true
            uni.hideLoading()
          })
          .catch(reject => {
            console.error(reject)
          })
        console.log(data, 'data')
      },
    },
  })
}

//删除实体
let onDelete = indexKey => {
  console.log(indexKey)
  uni.showModal({
    title: uni.$t('task.modalHint'),
    content: uni.$t('task.modalDelete'),
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        console.log(indexKey)
        taskData[indexKey].cardData = ''
        taskData[indexKey].taskItem.map((item, index) => {
          item.subjectId = ''
          item.checked = false
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

// 把任务处理成 提交数据
let submitTasksData = () => {
  let temp = ['action', 'subjectSiteId', 'subjectId']
  let parameter
  let returnData = {
    taskData: {},
  }

  for (const tempTaskDataKey in taskData) {
    if (
      taskData.hasOwnProperty(tempTaskDataKey) &&
      taskData[tempTaskDataKey] &&
      Array.isArray(taskData[tempTaskDataKey].taskItem)
    ) {
      let taskItem = taskData[tempTaskDataKey].taskItem
      const selectItem = taskItem
        .filter(item => item && item.checked)
        .map(item => {
          let tempObj = {}
          if (item.action === 'VIEW') {
            parameter = temp.concat(['requestedSeconds'])
          } else if (item.action === 'SHARE') {
            parameter = temp.concat(['requestedCount'])
          } else {
            parameter = temp
          }
          parameter.forEach(tempItem => {
            if (item.hasOwnProperty(tempItem)) {
              tempObj[tempItem] = item[tempItem]
            }
          })
          return tempObj
        })
      if (selectItem.length > 0) {
        returnData.taskData[tempTaskDataKey] = selectItem
      }
    }
  }

  console.log(returnData, 'returnData111')
  if (customRichText && customRichText.description) {
    returnData.taskData['custom'] = [
      {
        description: customRichText.description,
        action: 'CUSTOM',
      },
    ]
  }
  return returnData
}

let btnNext = () => {
  let storeData = submitTasksData().taskData
  delete storeData['custom']
  let storeDataObj = {}
  for (const storeDataObjKey in storeData) {
    if (!storeDataObj[storeDataObjKey]) storeDataObj[storeDataObjKey] = {}
    storeDataObj[storeDataObjKey].taskData = storeData[storeDataObjKey]
    storeDataObj[storeDataObjKey].cardData = taskData[storeDataObjKey].cardData
  }
  customRichText.description &&
    (storeDataObj['custom'] = [
      {
        description: customRichText.description,
        action: 'CUSTOM',
      },
    ])
  if (Object.keys(storeDataObj).length) {
    store.commit('taskStore/setPublicTask', storeDataObj)
    appData.storeName && store.commit(`taskStore/${appData.storeName}`, storeDataObj)
  } else {
    store.commit('taskStore/setPublicTask', '')
    appData.storeName && store.commit(`taskStore/${appData.storeName}`, {})
  }
  if (props.isBottom) {
    uni.navigateBack({
      delta: 1,
    })
  }
}

defineExpose({
  btnNext,
})
</script>

<style lang="less" scoped>
.add-task-box {
  background: linear-gradient(151deg, #eaeaff 0%, #f5ebff 33.78%, #fffbf1 65.99%, #e6ffff 96.97%);
  .tag-form {
    background-color: gray;
  }

  .task-header {
    padding: 26rpx 30rpx 0;

    .header-title {
      color: #5e70cc;
      font-size: 28rpx;
      font-weight: 400;

      .icon {
        width: 150rpx;
        height: 184rpx;
        padding-left: 50rpx;
      }
    }
  }

  .task-type-select {
    flex-direction: row;
    border-radius: 30px;
    border: 1rpx solid #bebfdd;
    background: rgba(255, 255, 255, 0.4);
    margin: 0 30rpx;

    .select-share {
      height: 72rpx;
      box-sizing: border-box;
      border-radius: 30px;
      font-size: 26rpx;
      width: 320rpx;
      text-align: center;
      justify-content: center;
    }

    .select-active {
      color: #ffffff;
      background-color: #7487ec;
    }

    .select-inactive {
      border: 2px solid #eff9ff;

      color: #4b4b4c;
    }
  }

  .promotion-info {
    color: #e77670;
    font-size: 26rpx;
  }

  .why-do-tasks {
    color: #4b4b4c;
    font-size: 26rpx;

    .icon {
      width: 38rpx;
      height: 34rpx;
    }
  }

  .tasks-select-info {
    color: #4b4b4c;
    font-size: 26rpx;
  }

  .task-item-name {
    background: linear-gradient(234.81deg, #e9fcff -10.08%, #e0edff 84.92%);
    border: 2rpx solid #8090e3;
    border-radius: 24rpx;
    height: 70rpx;
    font-size: 24rpx;
    line-height: 70rpx;
    padding: 0 20rpx;
    //margin-top: 24rpx;
    color: #7487ec;
    position: relative;
    width: fit-content;
  }

  .task-item-active {
    background: linear-gradient(233.15deg, #88c4fb 7.79%, #6781dd 84.82%);
    box-shadow: 0px 2px 20px #ffffff, inset 0px 4px 8px #4c86dc;
    color: #ffffff;
  }

  .task-item-img {
    width: 32rpx;
    height: 32rpx;
    position: absolute;
    right: -5px;
    top: -5px;
  }

  .task-content {
    //background-color: pink;
    //overflow: hidden;
    //min-height: 1000px;
    .taskItem-box {
      background: #fff;
      position: relative;

      .taskItem-header {
        height: 230rpx;
        width: 100%;
        position: relative;
        background: #f4f7fd;
        border-top-left-radius: 40rpx;
        border-top-right-radius: 40rpx;
      }

      .taskItem-header-text {
        position: absolute;
        top: 30rpx;
        left: 40rpx;
        font-size: 32rpx;
        line-height: 1.6;
        width: 85%;
        background: linear-gradient(90deg, #7183fd, #a45ed1);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .taskItem-header-desc {
        position: absolute;
        text-align: center;
        top: 130rpx;
        left: 55rpx;
        font-size: 25rpx;
        width: 70%;
        background-color: #eceafb;
        border-radius: 30rpx;
        padding: 10rpx;
        white-space: pre-line;
        overflow: hidden;
        display: -webkit-box;

        -webkit-box-orient: vertical;
        line-height: 1.2;
        max-height: 2.4em;
      }
      .task-info {
        color: #747480;
        font-size: 24rpx;
      }

      .link-text {
        color: #0187fa;
        text-align: right;
        font-size: 24rpx;
        text-decoration-line: underline;
      }

      .select-entity {
        height: 100rpx;
        line-height: 100rpx;
        background-color: #f4f7fd;
        border-radius: 24rpx;
        color: #9da2b1;
        font-size: 28rpx;
        padding: 0 30rpx 0 20rpx;
        font-size: 0.78rem;
      }

      .taskItem-term {
        position: relative;
        margin-bottom: 40rpx;

        .taskItem-title {
          margin-bottom: 10rpx;

          .icon {
            width: 25rpx;
            height: 25rpx;
            margin-right: 15rpx;
            color: #333;
          }

          .selected {
            width: 36rpx;
            height: 36rpx;
            background-color: #0187fa;
            border-radius: 50%;
            color: white;
            font-size: 22rpx;
          }

          .taskItem-des {
            color: #4b4b4c;
            font-size: 28rpx;
          }

          .not-selected {
            width: 28rpx;
            height: 28rpx;
            border-radius: 50%;
            border: 4rpx solid #9da2b1;
            color: white;
            font-size: 0;
          }
        }

        .taskItem-content {
          color: #747480;
          font-size: 24rpx;
        }

        .task-ask {
          padding-bottom: 40rpx;

          .task-ask-text {
            color: #4b4b4c;
            font-size: 28rpx;
          }

          .task-ask-content {
            color: #1f2228;
            font-size: 32rpx;
            font-weight: 700;
            width: 120rpx;
            margin: 0 20rpx;
            position: relative;
          }

          .task-ask-content::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 2rpx;
            background: #d0d6e5;
          }

          //  下划线
        }
      }

      .taskItem-term::after {
        content: '';
        position: absolute;
        left: 44rpx;
        bottom: 0;
        width: 100%;
        height: 2rpx;
        background: rgba(239, 242, 250, 0.5);
      }

      .taskItem-term:last-child::after {
        display: none;
      }
    }
  }

  .custom-box {
    color: #1f2228;
    font-size: 30rpx;
    border-radius: 40rpx;
    background-color: white;
    min-height: 500px;
    margin-top: 50rpx;
    overflow: hidden;
  }
  .custom-title {
    margin-top: 10rpx;
    padding: 20rpx;
    font-size: 35rpx;

    .custom-icon {
      max-width: 58rpx;
      height: 58rpx;
      margin-right: 30rpx;

      .sub-title {
        margin-top: 50rpx;
        padding: 20rpx;
        font-size: 24rpx;
      }
    }
  }

  .custom-info {
    color: #747480;
    font-size: 24rpx;
  }

  .prompt {
    color: #7a76b0;
    font-size: 24rpx;

    .prompt-icon {
      width: 28rpx;
      height: 28rpx;
    }
  }

  .operate {
    color: #0187fa;
    text-align: center;
    font-size: 28rpx;
    justify-content: right;

    .operate-add {
      margin-right: 10rpx;
    }
  }
}

.btn-box {
  background-color: white;
  padding: 20rpx 30rpx;

  .btn {
    border-radius: 40rpx;
  }
}

///自定义
//卡片
.card-box {
  border-radius: 20px;
  border: 2rpx solid #eff2fa;
  position: relative;
  padding-bottom: 20rpx;
  .deleteEnter {
    position: absolute;
    z-index: 1;
    right: 0;
    transform: translate(5rpx, -5rpx);
    height: 36rpx;
    width: 36rpx;
  }
}

.top40 {
  margin-top: 40rpx;
}

.top30 {
  margin-top: 30rpx;
}

.top20 {
  margin-top: 20rpx;
}

.top10 {
  margin-top: 10rpx;
}

.bottom40 {
  margin-bottom: 40rpx;
}

.padding-b40 {
  padding-bottom: 40rpx !important;
}

//左右30pading
.padding30 {
  padding: 0 30rpx;
}

.flex-wrap {
  flex-wrap: wrap;
}

.gap {
  gap: 20rpx;
}

.grid {
  grid-column-gap: 24rpx;
  grid-row-gap: 24rpx;
}

//deep
::v-deep .recommend-content {
  background: none;
}

::v-deep .blog-card-outer {
  background: none;
}

.editor_box {
  background-color: #f4f7fd;
  border-radius: 24rpx;
  min-height: 220rpx;
}
.icon {
  width: 20rpx;
  height:  20rpx;
  margin-right: 30rpx ;
}

</style>
