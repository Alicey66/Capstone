<template>
  <view class="add-digital">
    <t-uni-nav-bar
      color="#FFFFFF"
      left-icon="left"
      @clickLeft="onBlack"
      :fixed="true"
      :backgroundImage="navImg"
      :zIndex="11"
      leftWidth="50rpx"
      rightWidth="20rpx"
    >
      <view class="nav-bar-center">{{ $t('create-ecoplus-nft.ecoplusnft.create.title') }}</view>
    </t-uni-nav-bar>
    <view class="nav-bg" :style="{ background: `url(${navImg}) 0 0 no-repeat`, 'background-size': 'cover' }">
      <view class="header-bg-text">
        <view class="header-bg-text1">{{ $t('create.dao.header_text1') }}</view>
        <view class="header-bg-text2">{{ $t('create.dao.header_text2') }}</view>
      </view>
    </view>
    <view class="form-region">
      <view class="step-region" :class="{ step0: step === 0 }">
        <setps :step="step" :stepList="stepList"  @stepTap="stepTap"/>
        <view class="step_link" v-show="step === 0"
          >{{ $t('create.dao.noEco') }}<span @click="createEcoplus">{{ $t('create.dao.createOneNow') }}</span></view
        >
      </view>
      <view class="form-container">
        <CreateForm :formList="formList1" v-show="step === 0" ref="form1Ref" />
        <CreateForm :formList="formList2" v-show="step === 1" ref="form2Ref" />
        <CreateForm :formList="formList3" v-show="step === 2" ref="form3Ref" />
      </view>
    </view>
    <view class="button-container">
      <view class="button-region">
        <tui-button shape="circle" width="45%" plain @tap="saveFromDraft"
          >{{ $t('create-product.form.saveDraft') }}
        </tui-button>
        <tui-button shape="circle" width="45%" @tap="goNext">{{ buttonMap[step].text }}</tui-button>
      </view>
    </view>
    <!-- 助手 -->
    <components-person ref="reasonPop" />
    <!--草稿弹框-->
    <tui-modal
      :button="draftDialogButton"
      :content="$t('draft.box.hasDraft') + $t('chat.group.product')"
      :show="showDraftDialog"
      :size="32"
      :title="$t('draft.box.draftBox')"
      color="#333"
      @tap="draftClick"
    ></tui-modal>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { reactive, ref, provide, onMounted, nextTick } from 'vue'
import Setps from '@/pages/product/components/create-product/setps.vue'
import CreateForm from '@/pages/product/add-nft-ecoplus/form.vue'
import componentsPerson from '@/pages/common/components/components-person.vue'
import { createDaoFn } from '@/pages/product/add-nft-ecoplus/createNftFn.js'

import { LocalManager } from '@/locale'

const language = LocalManager.getInstance().getLanguage()
const _$t = LocalManager.getInstance().getI18nRender()

const isShowroom = ref(true)

const {
  draftId,
  showDraftDialog,
  initDraft,
  form1Ref,
  form2Ref,
  form3Ref,
  defId,
  goodsOwnerType,
  step,
  scrollTop,
  buttonMap,
  onBlack,
  goNext,
  goPosition,
  saveFromDraft,
  draftDialogButton,
  readDraft,
  draftBody,
  draftClick,
  productType,
  initMapper,
} = createDaoFn()

const formList1 = reactive([
  {
    title: _$t('create-ecoplus-nft.form.nft-title.title'),
    desc: _$t('create-ecoplus-nft.desc1'),
    placeholder: _$t('create.dao.step11_placeholder'),
    type: 'ecoplusSelector',
    dataKey: 'ecoplus',
    required: true,
    errorMessage: _$t('create.dao.ecoplusBlankError'),
    defaultValue: {},
  },

  {
    title: _$t('create-ecoplus-nft.ecoplusnft.create.title1'),
    type: 'equityDistribution',
    dataKey: '',
    required: true,
    errorMessage: '1',
    defaultValue: {},
  },

  {
    title: _$t('create-ecoplus-nft.ecoplusnft.create.title2'),
    desc: _$t('create-ecoplus-nft.desc2'),
    type: 'retainedInterest',
    dataKey: '',
    required: true,
    errorMessage: '2',
    defaultValue: {},
  },

  {
    title: _$t('create-ecoplus-nft.ecoplusnft.create.title3'),
    desc: _$t('create-ecoplus-nft.desc3'),
    type: 'duration',
    dataKey: 'duration',
    required: true,
    errorMessage: _$t('create.dao.durationBlankError'),
    errorMessage1: _$t('create.dao.durationInvalidError'),
    defaultValue: {},
  },

  {
    title: _$t('create-ecoplus-nft.ecoplusnft.create.title4'),
    desc: _$t('create-ecoplus-nft.desc4'),
    type: 'eco-sku',
    dataKey: 'eco-sku',
    required: true,
    errorMessage: '完成了',
    defaultValue: {},
  },

  {
    title: _$t('create-product.form.prezzie.title'),
    desc: _$t('create-product.form.prezzie.desc'),
    errorMessage: _$t('create-product.form.prezzie.giftError'),
    type: 'prezzie',
    skuDataKey: 'skus',
    required: false,
    dataKey: 'prezzie',
    defaultValue: [{}],
  },
  {
    title: _$t('create-product.form.location.title'),
    desc: _$t('create-product.form.location.desc'),
    hideTitle: true,
    hideDesc: true,
    type: 'location',
    dataKey: 'useMyLocation',
    defaultValue: false,
  },
])

const formList2 = reactive([
  {
    title:  _$t('create-ecoplus-nft.list2.title1'),
    desc: _$t('create.dao.step21_desc'),
    reward: _$t('create-product.form.medias.reward'),
    errorMessage: _$t('create-product.form.medias.error'),
    type: 'media',
    max: 6,
    required: true,
    dataKey: 'medias',
    defaultValue: [],
  },

  {
    title: _$t('create-ecoplus-nft.list2.title2'),
    desc: _$t('create-ecoplus-nft.list2.desc2'),
    placeholder: _$t('create-ecoplus-nft.list2.placeholder1'),
    required: true,
    type: 'textarea',
    errorMessage: _$t('create.dao.stepDeclarationEmptyError'),
    dataKey: 'excited',
    defaultValue: '',
  },
  {
    title: _$t('create-ecoplus-nft.list2.title3'),
    desc: _$t('create.dao.step22_desc'),
    placeholder: _$t('create.dao.step22_placeholder'),
    required: true,
    type: 'potential',
    hideDesc: true,
    errorMessage: _$t('create.dao.potentialForSuccessEmptyError'),
    dataKey: 'potential',
    defaultValue: {},
  },
  {
    title: _$t('create.dao.step25_title'),
    desc: _$t('create.dao.step25_desc'),
    placeholder: _$t('create.dao.step25_placeholder'),
    required: true,
    type: 'textarea',
    errorMessage: _$t('create.dao.stepDeclarationEmptyError'),
    dataKey: 'declaration',
    defaultValue: '',
  },
  {
    title:_$t('create-ecoplus-nft.list2.title4'),
    desc: _$t('create-ecoplus-nft.list2.desc3'),
    placeholder:
      _$t('create-ecoplus-nft.list2.placeholder2'),
    extraDesc: [
      _$t('create-ecoplus-nft.list2.exdesc1'),
      _$t('create-ecoplus-nft.list2.exdesc2'),
      _$t('create-ecoplus-nft.list2.exdesc3'),
    ],
    required: true,
    type: 'richArray',
    hint: _$t('create-ecoplus-nft.list2.hit'),
    btn: _$t('create.dao.step26_btn'),
    errorMessage: _$t('create.dao.stepBeneiftEmptyError'),
    dataKey: 'benefits',
    defaultValue: [],
  },
  {
    title: `${_$t('discovery.ecosystem.setTasks1')}\n${_$t('discovery.ecosystem.setTasks2')}`,
    desc: _$t('create.dao.stepSetTasksDesc'),
    placeholder: _$t('create.dao.step23_placeholder'),
    textStyle: { 'white-space': 'pre-line' },
    required: false,
    hideTitle: true,
    hideDesc: true,
    type: 'tasks',
    errorMessage: _$t('create-product.form.whySuggestMe.error'),
    dataKey: 'tasks',
    defaultValue: {},
  },
  {
    title: _$t('create.dao.step27_title'),
    desc: _$t('create.dao.step27_desc'),
    errorMessage: _$t('create-product.form.special.error'),
    type: 'special',
    containerStyle: { width: '100%' },
    required: false,
    dataKey: 'strengthAndWeakness',
    defaultValue: {},
  },
  {
    title: _$t('create-product.form.whySuggestMe.title'),
    desc: _$t('create.dao.step29_desc'),
    extraDesc: [
      _$t('create.dao.step29_extraDesc1'),
      _$t('create.dao.step29_extraDesc2'),
      _$t('create.dao.step29_extraDesc3'),
    ],
    placeholder: _$t('create.dao.step29_placeholder'),
    buttonExample: _$t('create-product.form.whySuggestMe.example'),
    required: false,
    type: 'textarea',
    errorMessage: _$t('create-product.form.whySuggestMe.error'),
    dataKey: 'whyFavorMe',
    defaultValue: '',
  },
  {
    title: _$t('create-product.form.relateProduct.title'),
    desc: _$t('create-product.form.relateProduct.desc'),
    placeholder: _$t('create-product.form.relateProduct.placeholder'),
    errorMessage: _$t('create-product.form.relateProduct.error'),
    type: 'relateProduct',
    required: false,
    dataKey: 'relateProduct',
    showTitleExpand: true,
    titleExpand: true,
    defaultValue: [],
  },
])
const formList3 = reactive([
  {
    title: _$t('create-product.form.group.title'),
    textStyle: { color: '#7791FA', fontFamily: 'yixinkaijiahei', fontWeight: 'normal' },
    type: 'group',
    showTitleExpand: true,
    titleExpand: true,
    containerStyle: { width: '100%' },
    dataKey: 'group',
    defaultValue: {},
  },
  // {
  //   title: _$t('create.dao.stepRecommendTitle'),
  //   desc: _$t('create.dao.stepRecommendDesc'),
  //   placeholder: _$t('create.dao.stepRecommendPlaceholder'),
  //   titleImage: '/static/icons/hotspot.png',
  //   textStyle: { marginLeft: '10rpx' },
  //   type: 'relateProduct',
  //   dataKey: 'recommendDAO',
  //   typeSiteId: 'tweebaa.goods.types.digital.blockChain.nft.dao',
  //   defaultValue: [],
  // },
  {
    title: _$t('create-product.form.contacts.title'),
    desc: _$t('create-product.form.contacts.desc'),
    dataKey: 'contacts',
    type: 'contacts',
    defaultValue: {},
  },
  {
    title: _$t('create-product.form.socialMedia.title'),
    subTitle: _$t('create-product.form.socialMedia.desc'),
    dataKey: 'socialMedia',
    type: 'socialMedia',
    defaultValue: [],
  },
])
const navImg = ref(`/static/images/create.product/NFTBG.jpg`)
const stepList = ref([
  {
    title: _$t('create-product.step.step1'),
    iconfont: 'icon-fengmianshezhi',
    desc: _$t('create-ecoplus-nft.step.nft.desc1'),
  },
  {
    title: _$t('create-product.step.step2'),
    iconfont: 'icon-xiangqingshezhi',
    desc: _$t('create.dao.step_desc2'),
  },
  {
    title: _$t('create-product.step.step3'),
    iconfont: 'icon-lianjieshijie',
    desc: _$t('create.dao.step_desc3'),
  },
])

let suggesterType = ref('SUPPLIER')

onLoad(options => {
  console.log('-----onLoad')
  goodsOwnerType.value = options.goodsOwnerType
  defId.value = 'tweebaa.goods.types.digital.blockChain.nft.dao'
  draftId.value = options.draftId

  if (options.goodsOwnerType === 'tweebaa.goods.owner.types.tweebaa') {
    formList1.splice(formList1.length - 1, 0, {
      title: _$t('create.dao.step15_title'),
      desc: _$t('create.dao.step15_desc'),
      type: 'groupCalculator',
      dataKey: 'groupCalculator',
      pricingKey: 'selfCalculator',
      dependentKey: 'issuance',
      typeSiteId: 'tweebaa.goods.types.digital.blockChain.nft.dao',
      hideDesc: true,
      errorMessage: _$t('create-product.form.title.error'),
      defaultValue: [],
    })
  } else {
    isShowroom.value = false
    // formList1 step 5 - selfCalculator
    formList1[4].isShowroom = isShowroom.value
  }

  initMapper(options, defId.value)
  let query = ''
  Object.keys(options).forEach(item => {
    if (item !== 'draftId') {
      query += `${item}=${options[item]}&`
    }
  })
  draftBody.uiState.draftBox.url = `/pages/product/create-product/index?${query}draftId=`
})

onMounted(() => {
  if (draftId.value) {
    readDraft([...formList1, ...formList2, ...formList3])
  } else {
    initDraft()
  }

  nextTick(() => {
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0,
    })
  })
})

const createEcoplus = () => {
  uni.navigateTo({
    url: '/pages/discovery/ecosystem/createdEcological',
  })
}

//打开范例助手
const reasonPop = ref(null)
const openExample = dataKey => {
  switch (dataKey) {
    case 'whySuggestMe':
      reasonPop.value.toggle()
      break
    case 'attraction':
      uni.navigateTo({
        url: '/pages/product/adv-entity-product/other/example-guidance',
      })
      break
  }
}

const stepTap = index => {
  goPosition(index)
}

provide('openExample', openExample)
</script>

<style lang="less" scoped>
.nav-bg {
  background: url('/static/images/quming/public-bg3.png');
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: 0 calc(-44px - var(--status-bar-height));
  min-height: 1100rpx;
}

.add-digital {
  padding-bottom: 160rpx;
}

.button-container {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  height: 4.0625rem;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  box-shadow: 0px 0px 0.25rem 0.0625rem #eff2fa;
  z-index: 9;
}

.form-region {
  margin-top: -90rpx;
}

.button-region {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.form-container {
}

.step-region {
  transform: translateY(-150rpx);

  :deep(.step_text) {
    color: #4b4b4c;
  }
  &.step0 .product-created-steps {
    padding-bottom: 20rpx;
  }
  .step_link {
    font-size: 26rpx;
    line-height: 20px;
    color: #0187fa;
    position: absolute;
    bottom: 20rpx;
    right: 60rpx;

    span {
      text-decoration: underline;
    }
  }
}
.header-bg-text {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 180rpx;

  .header-bg-text1 {
    font-family: 'eryaliuyehei';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    background: linear-gradient(90deg, #b6f6ff 8.54%, #ff8dd2 100%);
    -webkit-background-clip: text;
    color: transparent;
    // 转变为行内块元素 文字渐变才会生效
  }

  .header-bg-text2 {
    font-weight: 400;
    font-size: 19px;
    background: linear-gradient(90deg, #c6f9ff 4.37%, #ffb6f8 51.39%, #bbcaff 100%);
    -webkit-background-clip: text;
    color: transparent;
    // 转变为行内块元素 文字渐变才会生效
  }
}
</style>
