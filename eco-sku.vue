<template>
  <view class="eco-sku">

    <view class="tip-image">
      <text>{{ $t('create-product.form.tip') }}</text>
    </view>
    <view class="tips-text">{{ $t('create-ecoplus-nft.form.nft.tip')}}</view>
    <view class="stimulateTips">
      <view class="left">
        <image src="/static/icons/calculator.png" mode="aspectFill" class="calculator-icon"></image>
      </view>
      <view class="right">{{ $t('create-ecoplus-nft.form.nft.info')}}</view>
    </view>
    <view class="example mt_20" @tap="setContributorCase">
      <text class="text">{{ $t('create-ecoplus-nft.form.nft.tip2')}}</text>
      <tui-icon name="arrowright" color="#004F93" :size="20"></tui-icon>
    </view>
     <view class="sku-main">
    <Calculator @calculatorChange="calculatorChange" :data="costInfo" :calculatorType="calculatorType"
                @changeCalculatorType="data => calculatorType = data" ref="calRef" :presell="presell"
                :typeSiteId="props.typeSiteId" :isShowroom="isShowroom" :suggesterType="suggesterType.toUpperCase()"/>
    <!-- 优惠劵设置 -->
    <Coupon :data="couponInfo" :typeSiteId="typeSiteId" :presell="presell" :productTitle="productTitle"
            @couponChange="couponChange" ref="couponRef" />
    </view>
  </view>
</template>

<script setup>


import Calculator from "@/pages/product/components/create-product/sku/calculator.vue";
import Coupon from "@/pages/product/components/create-product/sku/coupon.vue";


import {ref, reactive, nextTick, computed, onMounted} from "vue";

onMounted(() => {
  console.log($t('create-ecoplus-nft.ecoplusnft.create.desc'))
})

import {LocalManager} from "@/locale";

const language = LocalManager.getInstance().getLanguage()
const _$t = LocalManager.getInstance().getI18nRender()


let couponInfo = reactive({ selectedIds: [] });
let costInfo = reactive({
  costPrice: '', costPrice2: '', suggesterBonus: '', suggesterBonus2: '',
  salePrice: '', salePrice2: '', surplusPromoterBonus: '', surplusSharerBonus: '',
  surplusRecommenderBonus: '', availableBonus: '', promoterBonus:'',
  sharerBonus:'', recommenderBonus:'', availableBonus:''
});

const calculatorType = ref(false);
const props = defineProps({
  skus: { type: Object, default: () => ({}) },
  presell: { type: Object, default: () => ({}) },
  item: { type: Object, default: () => ({}) },
  index: { type: Number, default: 0 },
  len: { type: Number, default: 0 },
  typeSiteId: { type: String, default: 'tweebaa.goods.types.real' },
  isShowroom: { type: Boolean, default: true },
  suggesterType:{ type: String, default: 'SUPPLIER' },
  productTitle: { type: String, default: '' }
});

const setContributorCase = () => {
  uni.navigateTo({ url: '/pages/product/components/show-contributor-case' });
};



const calculatorChange = (data) => {
  if(data === 'delete'){
    delete props.skus.costInfo;
    return;
  }
  costInfo = {...costInfo, ...data};
  props.skus.costInfo = costInfo;
  console.log('--------calculatorChange', costInfo);
};
const couponChange = (data) => {
  couponInfo = {...couponInfo, ...data};
  props.skus.couponInfo = couponInfo;
  console.log('-------------couponChange', couponInfo);
};
</script>

<style scoped lang="scss">
.sku-main {
  background: linear-gradient(227.51deg, #f3b03e 5.36%, #ffd94a 96.58%);
  border-radius: 24rpx;
  padding: 30rpx 10rpx 30rpx;
  border-radius: 24rpx;
  width: 730rpx;
  position: relative;
  left: -40rpx;
  margin: 30rpx 10rpx -40rpx;
}

.stimulateTips {
    display: flex;

    justify-content: space-around;
    margin-top: 30rpx;
    padding: 1 20rpx;
    font-size: 12rpx;
.left {
  .calculator-icon {
        width: 28rpx;
        height: 36rpx;
      }

      margin-right: 10rpx;
    }

  .right {
      color: #4b4b4c;
      font-size: 12px;

    }
  }
 .example{
   justify-content: flex-end;
   align-items: center;
   display: flex;
   .text{
     color: #004F93;
     font-size: 12px;
     text-decoration: underline;
   }
 }
.tips-text {
      color: #ff00ff;
      font-size: 12px;
      padding-left: 10rpx;
      margin-top: 30rpx;
    }
.tip-image {
    position: relative;
    width: 157rpx;
    height: 40rpx;
    background-image: url('/static/images/create.product/presale-tip.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 10rpx;
    text {
      position: absolute;
      top: 2rpx;
      right: 30rpx;
      color: #fff;
      font-size: 26rpx;
    }
    }
</style>
