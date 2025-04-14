<template>
  <view class="form-region">
    <view v-for="(item, index) in formList" class="form-item" :style="item.containerStyle">
      <form-title
        v-if="!item.hideTitle"
        :title="item.title"
        :titleStyle="item.titleStyle"
        :textStyle="item.textStyle"
        :inx="index + 1"
        :len="formList.length"
        :required="item.required"
        :titleImage="item.titleImage"
        :titleExpand="titleExpand[item.dataKey]"
        @titleExpandChange="titleExpandChange"
        :item="item"
      />

      <template v-if="(item.showTitleExpand && titleExpand[item.dataKey]) || !item.showTitleExpand">
        <view class="form-desc container" v-if="!item.hideDesc" :style="item.descStyle">{{ item.desc }}</view>
        <view class="form-extraDesc container" v-if="item.extraDesc">
          <view class="extraDesc-item" v-for="(extraI, index) in item.extraDesc">
            <view class="num">{{ index + 1 }}</view>
            <view class="desc">{{ extraI }}</view>
          </view>
        </view>
        <view class="container" v-if="item.type === 'input'">
          <tui-textarea
            :style="{ height: item.inputOuterHeight }"
            class="form-item-feature-input"
            :maxlength="item.length"
            :borderTop="false"
            :borderBottom="false"
            isCounter
            :height="item.inputHeight"
            :minHeight="item.inputHeight"
            backgroundColor="#F4F7FD"
            :placeholder="item.placeholder"
            placeholderStyle="fontSize:28rpx;"
            :size="28"
            padding="30rpx"
            v-model="data[item.dataKey]"
          ></tui-textarea>
        </view>
        <view class="container" v-else-if="item.type === 'richText'">
          <tw-com-editor
            class="mainContent"
            :placeholder="item.placeholder"
            v-model="data[item.dataKey]"
          ></tw-com-editor>
        </view>
        <view class="container" v-else-if="item.type === 'textarea'">
          <textarea class="textarea" :placeholder="item.placeholder" v-model="data[item.dataKey]"></textarea>
        </view>
        <view class="container" v-else-if="item.type === 'ecoplusSelector'">
          <ecoplusSelector :placeholder="item.placeholder" :formData="data[item.dataKey]"></ecoplusSelector>
        </view>
        <view class="container" v-else-if="item.type === 'duration'">
          <duration :formData="data[item.dataKey]"></duration>
        </view>
        <view v-else-if="item.type === 'issuance'">
          <issuance :formData="data[item.dataKey]" ref="issuanceRef"></issuance>
        </view>
        <view class="container" v-else-if="item.type === 'prezzie'">
          <Prezzie
            :item="item"
            :giftsList="data[item.dataKey]"
            :skuList="data[item.skuDataKey]"
            @valueGiftsChanged="valueGiftsChanged"
          />
        </view>
        <view class="container" v-else-if="item.type === 'richArray'">
          <richArray
            :formData="data[item.dataKey]"
            :placeholder="item.placeholder"
            :hint="item.hint"
            :btn="item.btn"
          ></richArray>
        </view>
        <view class="container" v-else-if="item.type === 'relateProduct'">
          <RelateProduct
            :item="item"
            @relateProductChange="relateProductChange"
            :products="data[item.dataKey]"
          ></RelateProduct>
        </view>
        <view class="container" v-else-if="item.type === 'eco-sku'">
          <eco-sku
            :skus="data[item.dataKey]"
            :presell="presell"
            :item="item"
            :index="index"
            :len="formLen"
            :typeSiteId="typeSiteId"
            :isShowroom="isShowroom"
            :suggesterType="suggesterType"
            :productTitle="formTitle"
            @skuChange="skuChange"
          />
        </view>
        <view v-else-if="item.type === 'selfCalculator' && data[item.dependentKey]?.isValid">
          <selfCalculator
            ref="selfCalculatorRef"
            :formData="data[item.dataKey]"
            :presell="data[item.presellDataKey]"
            :typeSiteId="item.typeSiteId"
            :isShowroom="item.isShowroom"
            :issuanceData="data[item.dependentKey]"
          ></selfCalculator>
        </view>
        <view v-else-if="item.type === 'groupCalculator' && data[item.dependentKey]?.isValid">
          <view className="create-groupCalculator">
            <view class="plan-calculator-container">
              <view class="group-calculator-plan">
                <GroupCalculatorDesc></GroupCalculatorDesc>
              </view>
              <GroupCalculator
                v-model="data[item.dataKey]"
                :isSku="false"
                :typeSiteId="item.typeSiteId"
                :priceInfo="data[item.pricingKey]"
              />
            </view>
          </view>
        </view>
        <view v-else-if="item.buttonExample" class="example-region bottom-example container">
          <view @click="onExample(item.dataKey)">{{ item.buttonExample }}</view>
        </view>
        <view class="container" v-else-if="item.type === 'media'">
          <CreateMedia :item="item" @change="mediaChange" :medias="data[item.dataKey]" :max="item.max" />
        </view>
        <view class="container" v-else-if="item.type === 'tags'">
          <Tags :item="item" :tags="data[item.dataKey]" @tagChange="tagChange" />
        </view>
        <view class="container" v-else-if="item.type === 'categories'">
          <Categories :item="item" @categoriesChange="categoriesChange" :categories="data[item.dataKey]" />
        </view>
        <view class="container" v-else-if="item.type === 'presell'">
          <Presell
            :item="item"
            @presellChange="presellChange"
            :index="index"
            :formLen="formList.length"
            :presell="data[item.dataKey]"
          />
        </view>
        <view class="container" v-else-if="item.type === 'location'">
          <Location :item="item" @locationChange="locationChange" :index="index" :len="formList.length" />
        </view>
        <view class="container" v-else-if="item.type === 'group'">
          <CreateGroup :item="item" @groupChange="groupChange" :group="data[item.dataKey]" ref="groupRef">
          </CreateGroup>
        </view>
        <view class="container" v-else-if="item.type === 'contacts'">
          <Contacts
            :item="item"
            @contactsChange="contactsChange"
            :contacts="data[item.dataKey]"
            ref="contactRef"
          ></Contacts>
        </view>
        <view class="container" v-else-if="item.type === 'socialMedia'">
          <SocialMedia
            :item="item"
            @socialMediaChange="socialMediaChange"
            :socialMedia="data[item.dataKey]"
            ref="socialMediaRef"
          ></SocialMedia>
        </view>
        <view v-else-if="item.type === 'potential'">
          <Potential
            :item="item"
            :potential="data[item.dataKey]"
            @potentialChange="potentialChange"
            ref="potentialRef"
          />
        </view>

        <view v-else-if="item.type === 'equityDistribution'">
          <equityDistribution :item="item" ref="equityDistribution" />
        </view>

        <view v-else-if="item.type === 'retainedInterest'">
          <retainedInterest :item="item" ref="retainedInterest" />
        </view>

        <view class="container" v-else-if="item.type === 'tasks'">
          <Tasks
            :item="item"
            :tasks="data[item.dataKey]"
            :index="index"
            :formLen="formList.length"
            @tasksChange="tasksChange"
          />
        </view>
        <tw-common-long-short
          ref="longShortRef"
          v-else-if="item.type === 'special'"
          :talent="data[item.dataKey]"
          @emitLongShort="emitLongShort"
          :dataKey="item.dataKey"
        ></tw-common-long-short>
      </template>
      <view class="line" v-if="index < formList.length - 1"></view>
    </view>
  </view>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, provide, reactive, ref } from 'vue'

import FormTitle from '@/pages/product/components/create-product/form-title.vue'
import equityDistribution from '@/pages/product/components/create-product/equityDistribution.vue'
import retainedInterest from '@/pages/product/components/create-product/retainedInterest.vue'
import CreateMedia from '@/pages/product/components/create-product/media.vue'
import RelateProduct from '@/pages/product/components/create-product/relate-product.vue'
import Categories from '@/pages/product/components/create-product/categories.vue'
import Tags from '@/pages/product/components/create-product/tags.vue'
import Presell from '@/pages/product/components/create-product/presell.vue'
import Prezzie from '@/pages/product/components/create-product/prezzie.vue'
import Location from '@/pages/product/components/create-product/location.vue'
import AdditionalInfo from '@/pages/product/components/create-product/additional-info.vue'
import CreateGroup from '@/pages/product/components/create-product/group.vue'
import Contacts from '@/pages/product/components/create-product/contacts.vue'
import SocialMedia from '@/pages/product/components/create-product/social-media.vue'
import UploadFile from '@/pages/product/components/create-product/upload-file.vue'

import selfCalculator from '@/pages/product/create-product/self-calculator.vue'
import ecoplusSelector from '@/pages/product/add-nft-ecoplus/ecoplus-selector.vue'
import duration from '@/pages/product/create-product/duration.vue'
import issuance from '@/pages/product/create-product/dao-issuance.vue'
import richArray from '@/pages/product/create-product/rich-array.vue'
import Potential from '@/pages/product/create-product/potential.vue'
import Tasks from '@/pages/product/create-product/set-tasks.vue'

import GroupCalculator from '@/pages/product/components/create-product/groupCalculator.vue'
import GroupCalculatorDesc from '@/pages/product/components/create-product/groupCalculator/desc.vue'
import moment from 'moment'
import EcoSku from '@/pages/product/components/create-product/eco-sku.vue'
let suggesterType = 'dao'

const issuanceRef = ref(null)
const selfCalculatorRef = ref(null)
const longShortRef = ref(null)
const groupRef = ref(null)
const contactRef = ref(null)
const socialMediaRef = ref(null)
const potentialRef = ref(null)
const data = reactive({})
const titleExpand = reactive({})

const props = defineProps({
  formList: {
    type: Array,
    default: () => [],
  },
})

onMounted(() => {
  initData()
})

const initData = () => {
  props.formList.forEach(item => {
    switch (item.type) {
      case 'group':
        data[item.dataKey] = {
          createGroupBind: false,
          chooseGroupBind: false,
          groupData: null,
          groupName: '',
          isFission: false,
        }
      default:
        data[item.dataKey] = item.defaultValue
    }
    if (item.titleExpand) {
      titleExpand[item.dataKey] = item.titleExpand
    }
  })
}

const mediaChange = res => {
  data[res.dataKey] = res.media
}
const categoriesChange = res => {
  data[res.dataKey] = res.categories
}
const tagChange = res => {
  data[res.dataKey] = res.tags
}
const presellChange = res => {
  data[res.dataKey] = { ...data[res.dataKey], ...res.data }
}
const locationChange = res => {
  data[res.dataKey] = res.data
}
const titleExpandChange = dataKey => {
  titleExpand[dataKey] = !titleExpand[dataKey]
}
const showErrorMessage = errorMessage => {
  uni.showToast({
    icon: 'none',
    title: errorMessage,
  })
  return true
}
const additionalInfoChange = res => {
  data[res.dataKey] = res.data
}
const socialMediaChange = res => {
  data[res.dataKey] = res.data
}
const contactsChange = res => {
  data[res.dataKey] = { ...data[res.dataKey], ...res.data }
}
const groupChange = res => {
  data[res.dataKey] = { ...data[res.dataKey], ...res.data }
}
const relateProductChange = res => {
  data[res.dataKey] = res.data
}
const valueGiftsChanged = res => {
  data[res.dataKey] = res.data
}
const tasksChange = res => {
  data[res.dataKey] = res.data
}
const potentialChange = res => {
  data[potentialRef.value[0].methods.getDataKey()] = res
}

function stripHtml(html) {
  // 正则表达式来匹配所有的尖括号标签
  const regex = /<[^>]*>/g
  // 使用空字符串替换所有的HTML标签
  return html.replace(regex, '')
}
defineExpose({
  methods: {
    getAllData() {
      const { formList } = props
      let isBreak = false
      checkLoop: for (let i = 0, len = formList.length; i < len; i++) {
        const item = formList[i]
        if (item.required) {
          if (
            !data[item.dataKey] ||
            JSON.stringify(data[item.dataKey]) == '{}' ||
            JSON.stringify(data[item.dataKey]) == '[]'
          ) {
            isBreak = showErrorMessage(item.errorMessage)
            break checkLoop
          }
          switch (item.type) {
            case 'duration': {
              const duration = data[item.dataKey]
              if (!(duration.requestStartTime && duration.requestEndTime)) {
                isBreak = showErrorMessage(item.errorMessage)
                break checkLoop
              }
              if (duration.requestStartTime >= duration.requestEndTime) {
                isBreak = showErrorMessage(item.errorMessage1)
                break checkLoop
              }
              break
            }
            case 'selfCalculator': {
              const selfCalculator = data[item.dataKey]
              if (!selfCalculator.costInfo || !selfCalculator.costInfo) {
                isBreak = showErrorMessage(item.errorMessage)
                break checkLoop
              }
              break
            }
            case 'potential': {
              const potential = data[item.dataKey]
              if (!(potential.values && potential.growth && potential.responsibility)) {
                isBreak = showErrorMessage(item.errorMessage)
                break checkLoop
              }
              break
            }
            case 'richArray': {
              const richArray = data[item.dataKey]

              for (const index in richArray) {
                richArray[index] = stripHtml(richArray[index])
              }
              if (richArray.length === 0) {
                isBreak = showErrorMessage(item.errorMessage)
                break checkLoop
              }
              break
            }
            case 'special': {
              const special = data[item.dataKey]
              if (
                !(
                  special.strengthsLabels &&
                  special.strengthsLabels.length &&
                  special.weaknessLabels &&
                  special.weaknessLabels.length
                )
              ) {
                isBreak = showErrorMessage(item.errorMessage, `itemId${i}`)
                break checkLoop
              }
              break
            }
            case 'eco-sku': {
              const skus = data[item.dataKey]
              if (!skus || skus.length === 0) {
                isBreak = showErrorMessage(item.errorMessage)
                break checkLoop
              }
              break
            }
          }
        } else {
          switch (item.type) {
            case 'prezzie':
              const prezzie = data[item.dataKey]
              // check if any gift plan has no attached gifts
              if (prezzie.some(plan => Object.keys(plan).length > 0 && (!plan.gifts || plan.gifts.length === 0))) {
                isBreak = showErrorMessage(item.errorMessage, `itemId${i}`)
                break checkLoop
              }
              break
          }
        }
      }
      return isBreak ? isBreak : data
    },
    getAllDataUnCheck: () => {
      return data
    },
    setData: res => {
      console.log('-------form.setData', res)
      const { formList } = props
      formList.forEach(item => {
        if (res[item.dataKey]) {
          data[item.dataKey] = res[item.dataKey]
        }
      })
      nextTick(() => {
        /*
        if (groupRef.value) {
          groupRef.value[0].methods.setData()
        }
        if (contactRef.value) {
          contactRef.value[0].methods.setData()
        }
        */

        /*
        if (selfCalculatorRef.value) {
          selfCalculatorRef.value[0].methods.setData()
        }
        */
        if (contactRef.value) {
          contactRef.value[0].methods.setData()
        }
        if (issuanceRef.value) {
          issuanceRef.value[0].methods.setData()
        }
        if (socialMediaRef.value) {
          socialMediaRef.value[0].methods.setData()
        }
        if (longShortRef.value) {
          longShortRef.value[0].methods.setData()
        }
      })
      //console.log('---------form.formList',data)
    },
  },
})
const emitLongShort = res => {
  data[longShortRef.value[0].methods.getDataKey()] = res
}
</script>

<style lang="less" scoped>
.form-region {
  margin-top: 20rpx;
  .container {
    width: 92%;
    margin: 0 auto;
  }
  .example-region {
    color: #0187fa;
    font-size: 12px;
    text-decoration: underline;
    display: flex;
    justify-content: flex-end;
  }
  .example-region {
    justify-content: flex-start;
    margin-top: 28rpx;
  }
  .form-desc {
    width: 92%;
    margin: 0 auto;
    margin-top: 20rpx;
    font-size: 12px;
    color: #747480;
    margin-bottom: 30rpx;
  }
  .form-item-feature-input {
    height: 180rpx;
    background-color: #f4f7fd;
    border-radius: 30rpx;
    overflow: hidden;
  }
  .form-item {
  }
  .btn_border {
    border: 1px solid #0187fa;
    font-size: 32rpx;
    line-height: 44rpx;
    padding: 20rpx 24rpx;
    border-radius: 60rpx;
    margin: 60rpx;
    color: #0187fa;
    text-align: center;
  }
  .mainContent {
    background: #f4f7fd;
    border-radius: 24rpx;
    margin-top: 30rpx;
    margin-bottom: 40rpx;
  }
  .extraDesc-item {
    display: flex;
    margin-bottom: 20rpx;
    .num {
      background: #1f2228;
      color: #54eaf3;
      font-weight: bold;
      font-size: 24rpx;
      width: 32rpx;
      height: 32rpx;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 16rpx;
    }
    .desc {
      flex: 1;
      color: #747480;
      font-size: 24rpx;
    }
  }
  .line {
    height: 20rpx;
    width: 98%;
    margin-top: 50rpx;
    margin-bottom: 50rpx;
    background: #f4f7fd;
  }
  .textarea {
    width: 100%;
    background: #f4f7fd;
    height: 500rpx;
    border-radius: 24rpx;
    font-size: 28rpx;
    padding: 30rpx;
    box-sizing: border-box;
  }
}

.create-groupCalculator {
  background: #fdfdd8;
  .container {
    width: 92%;
    margin: 0 auto;
  }
  .form-desc {
    color: #525252;
    font-size: 12px;
    line-height: 18px;
    margin-top: 32rpx;
  }
  .plan-calculator-container {
    padding-top: 10rpx;
  }
}
</style>
