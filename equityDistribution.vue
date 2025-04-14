<template>
  <view class="form-box">
    <view class="box1">
      <view class="tips"
        >“投资股东”NFT包括 <text>DAO NFT</text> 与 <text>股权NFT</text> ,
        其商业价值随创始人/拥有者与主体“生态+”影响力的提升而不断攀升，可随时出售DAO/股权NFT及连带权益获升值收益，是越久越值钱的“硬通货”</view
      >
      <view class="nft-box">
        <view class="title"
          >“生态+”云端印象已发行“投资股东”NFT

          <text class="iconfont icon"> &#xe64a;</text>
        </view>
        <view class="title2">
          <text class="valuation">“生态+”总价值估值：100,000.00T豆</text>
          <text class="about">≈ 9800 RMB</text>
        </view>
        <view class="main">
          <view class="main-title">DAO NFT（带投票权的“投资股东”NFT）</view>
          <view class="main-text">发行总量：300000 </view>
          <view class="main-text">市场流通总量：50000 </view>
          <view class="main-text">首次公开售出数量： 3000 </view>
          <view class="main-text">发行价：980.00T豆/个 <text>≈9800 CNY</text> </view>
          <view class="main-text">本次公开售出数量： 500 </view>
          <view class="main-text">本次售出价格：980.00T豆/个 <text>≈9800 CNY</text> </view>
          <view class="border-top">
            <view class="main-title">股权 NFT（不带投票权的“投资股东”NFT）</view>
            <view class="main-text">发行总量：300000 </view>
            <view class="main-text">市场流通总量：50000 </view>
            <view class="main-text">发行价：980.00T豆/个 <text>≈9800 CNY</text> </view>
          </view>
        </view>
      </view>

      <view class="rightsAndInterests">
        <view class="tips">
          <image
            src="/static/images/quming/rightsAndInterests-tips.png"
            mode="aspectFill"
            class="rightsAndInterests-tips"
          ></image>
          <view class="tips-text">
            <image src="/static/images/quming/tips4.png" mode="aspectFit" class="tips-bg"></image>
            权益转移
          </view>
        </view>
        <view class="text"
          >“生态+所有权转让后，按下述约定，“投资股东”DAO NFT与股 权NFT的所有权也同时移交（市场上流通的数量不计入）</view
        >
        <View class="input-box">
          <view class="input-title">DAO NFT </view>
          <view class="input"> 创始人及贡献者预留 <input type="number" v-model="formData.daoNft" placeholder="0" /> 个 </view>
          <view class="notes">备注：此数字提交审批后不可再变化</view>

          <view class="input"> 非市场流通数量共计 <input type="number" placeholder="0" /> 个 </view>
          <view class="notes">备注：推易吧系统自动核算并显示此数字，并负责交付至购买者钱包</view>
        </View>

        <View class="input-box">
          <view class="input-title">股权 NFT </view>
          <view class="input"> 创始人及贡献者预留 <input type="number" v-model="formData.stockNft" placeholder="0" /> 个 </view>
          <view class="notes">备注：此数字提交审批后不可再变化</view>

          <view class="input"> 非市场流通数量共计 <input type="number" placeholder="0" /> 个 </view>
          <view class="notes">备注：推易吧系统自动核算并显示此数字，并负责交付至购买者钱包</view>
        </View>
      </view>
    </view>

    <view class="box2 box1" style="margin-top: 20rpx">
      <view class="tips"
        >“价值借款”NFT即 <text>DeFi NFT</text> ,
        其商业价值随创始人/拥有者与主体“生态+”影响力的提升而不断攀升，可随时出售DAO/股权NFT及连带权益获升值收益，是越久越值钱的“硬通货”</view
      >
      <view class="nft-box">
        <view class="title"
          >“生态+”孤寡老人夕阳红已发行“价值借款”NFT

          <text class="iconfont icon"> &#xe64a;</text>
        </view>
        <view class="title2">
          <text class="valuation">计划借款总额：100,000.00T豆</text>
          <text class="about">≈ 9800 RMB</text>
        </view>
        <view class="main">
          <view class="main-text">发行总量：300000个 </view>
          <view class="main-text">发行价：980.00T豆/个 <text>≈9800 CNY</text> </view>
          <view class="main-text">当前售出数量：100个 </view>
          <view class="main-text">实际借款总额：20000T豆 <text>≈9800 CNY</text> </view>
        </view>
      </view>

      <view class="rightsAndInterests">
        <view class="tips">
          <image
            src="/static/images/quming/rightsAndInterests-tips.png"
            mode="aspectFill"
            class="rightsAndInterests-tips"
          ></image>
          <view class="tips-text">
            <image src="/static/images/quming/tips5.png" style="width: 220rpx" mode="aspectFit" class="tips-bg"></image>
            权益与债务转移
          </view>
        </view>
        <view class="text" style="margin-bottom: 40rpx"
          >“生态+所有权转让后，按下述约定，“价值借款”DeFi
          NFT的所有权与T豆借款债务也同时移交（市场上流通的数量不计入），创始人预先承诺给DeFi
          NFT购买者的非T豆价值权益需要继续履约。</view
        >
        <View class="input-box">
          <view class="input"> 创始人及贡献者预留 <input type="number" v-model="formData.defiNft" placeholder="0" /> 个 </view>
          <view class="notes">备注：此数字提交审批后不可再变化</view>

          <view class="input"> 非市场流通数量共计 <input type="number" placeholder="0" /> 个 </view>
          <view class="notes">备注：推易吧系统自动核算并显示此数字，并负责交付至购买者钱包</view>
        </View>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, inject, nextTick, onMounted, provide, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const formData = reactive({
  daoNft: '',
  stockNft: '',
  defiNft: ''
})
watch(formData, (newValue) => {
  store.dispatch('equityDistributionNFT/updateNftData', newValue)
}, { deep: true })
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
</script>

<style lang="scss" scoped>
.rightsAndInterests {
  // background: lineargradient(90deg, #fff4f4 0%, #fee4ff 100%);
  // 渐变
  padding: 30rpx;
  margin: 0 20rpx;
  border-radius: 40rpx;
  background: linear-gradient(90deg, #fff4f4 0%, #fee4ff 100%);
  .input-box {
    .input-title {
      color: #4b4b4c;
      font-size: 28rpx;
      padding: 30rpx 30rpx 30rpx 0;
    }
    .input {
      display: flex;
      font-size: 28rpx;
      color: #4b4b4c;
      align-items: center;
      input {
        flex: 1;
        margin: 0 40rpx;
        border-bottom: 1px solid #4b4b4c;
        text-align: center;
        font-size: 32rpx;
        font-weight: bolder;
      }
    }
    .notes {
      color: #ff8484;
      font-size: 20rpx;
      padding: 15rpx 0;
    }
  }

  .tips {
    display: flex;
    align-items: center;
    .rightsAndInterests-tips {
      width: 48rpx;
      height: 48rpx;
      margin-right: 26rpx;
    }
    .tips-text {
      position: relative;
      z-index: 1;
      .tips-bg {
        width: 140rpx;
        // padding-right: 100rpx;
        // width: 100%;
        height: 50rpx;
        position: absolute;
        z-index: -1;
        top: -10rpx;
        left: -15rpx;
      }
    }
    padding: 0;
    margin-bottom: 20rpx;
  }
  .text {
    font-size: 24rpx;
    color: #f0539d;
  }
}

.nft-box {
  border-radius: 40rpx;
  margin: 0 18rpx;
  overflow: hidden;
  .title {
    background: #e1f1ff;
    padding: 20rpx 0;
    display: flex;
    align-items: center;
    color: $t-blue;
    font-size: 26rpx;
    justify-content: center;
    .icon {
      margin-left: 20rpx;
    }
  }
  .title2 {
    background: #ffefcc;
    padding: 30rpx 0;
    .valuation {
      font-size: 30rpx;
      color: $t-blue;
      padding-left: 30rpx;
    }
    .about {
      color: #b85738;
      font-size: 24rpx;
    }
  }
  .main {
    background: white;
    padding: 0rpx 40rpx;
    margin-bottom: 20rpx;
    border-bottom-right-radius: 40rpx;
    border-bottom-left-radius: 40rpx;

    .border-top {
      border-top: 1px solid #e4e8f5;
    }
    .main-title {
      color: #4b4b4c;
      font-size: 28rpx;
      padding-top: 24rpx;
    }
    .main-text {
      color: #747480;
      font-size: 24rpx;
      padding: 16rpx;
      text {
        color: #b85738;
      }
    }
  }
}

.box1 {
  background: linear-gradient(90deg, #76c6ff 0%, #73c6ff 100%);
  border-radius: 40rpx;
  padding-bottom: 30rpx;
}
.tips {
  color: #ffffff;
  font-size: 24rpx;
  padding: 30rpx;
  text {
    color: $t-blue;
    text-decoration: underline;
  }
}
</style>
