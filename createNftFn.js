import flowApi from '@/api/flow'
import shopApi from '@/api/shop'
import nftApi from '@/api/nft'
import { jsonMapParse } from '@/utils/jsonParser.js'
// import addSuccessDataFn from './add-success-data.js'
import { nextTick, reactive, ref, getCurrentInstance } from 'vue'
import nftMapper from './nftMapper.js'

import { LocalManager } from '@/locale'
const _$t = LocalManager.getInstance().getI18nRender()

export function createDaoFn() {
  // const { saveDao } = addSuccessDataFn()
  let {
    formData,
    initMapper,
    getTitle,
    getTitleOfDao,
    step1Mapping,
    step2Mapping,
    step3Mapping,
    getEcoPlusId,
    toSubmitData,
  } = nftMapper()
  const showDraftDialog = ref(false)
  const draftId = ref('')
  const form1Ref = ref(null)
  const form2Ref = ref(null)
  const form3Ref = ref(null)
  const defId = ref('')
  const goodsOwnerType = ref('')
  const productType = ref('')
  const step = ref(0)
  const draftAllData = ref({})

  const formatStep1 = data => {
    step1Mapping(data)
  }

  const formatStep2 = data => {
    step2Mapping(data)
  }

  const formatStep3 = data => {
    step3Mapping(data)
  }

  const draftBody = {
    uiState: {
      draftBox: {
        title: 'draft.box.product',
        url: `/pages/product/create-product/index?draftId=`,
      },
    },
  }
  const buttonMap = ref({
    0: {
      text: _$t('create-product.form.next'),
      type: 'previewCover',
    },
    1: {
      text: _$t('create-product.form.next'),
      type: 'next',
    },
    2: {
      text: _$t('create-product.form.submit'),
      type: 'preview',
    },
  })
  const draftDialogButton = [
    {
      text: _$t('t.general.cancel'),
      type: 'red',
      plain: true, //是否空心
    },
    {
      text: _$t('draft.box.check'),
      type: 'red',
      plain: false,
    },
  ]
  const initDraft = async () => {
    let dataObj = {
      defId: defId.value,
      state: 'init',
      page: 1,
      size: 1,
      bindingObjectId: 0,
    }
    await uni.showLoading()
    let res = await flowApi.getPost(dataObj)
    console.log('------initDraft', res)
    if (res.code === '0') {
      console.log('------initDraft')
      if (res.data.result.length) {
        showDraftDialog.value = true
      }
    }
    uni.hideLoading()
  }

  const formatData = data => {
    switch (step.value) {
      case 0:
        formatStep1(data)
        break
      case 1:
        formatStep2(data)
        break
      case 2:
        formatStep3(data)
    }
  }
  const scrollTop = async () => {
    await nextTick(() => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
    })
  }

  const getAllUiData = () => {
    let formData1 = form1Ref.value.methods.getAllDataUnCheck()
    let formData2 = form2Ref.value.methods.getAllDataUnCheck()
    let formData3 = form3Ref.value.methods.getAllDataUnCheck()

    return { ...formData1, ...formData2, ...formData3 }
  }

  const goNext = async () => {
    switch (buttonMap.value[step.value].type) {
      case 'previewCover':
        let formData1 = form1Ref.value.methods.getAllData()
        if (formData1 != true) {
          formatStep1(formData1)
          step.value = 1
          await scrollTop()
        }
        break
      case 'next':
        const formData2 = form2Ref.value.methods.getAllData()
        if (formData2 != true) {
          formatStep2(formData2)
          step.value = 2
          await scrollTop()
        }
        break
      case 'preview':
        const formData3 = form3Ref.value.methods.getAllData()
        formatStep3(formData3)
        if (formData3 == true) return
        let product = toSubmitData()
        await uni.showLoading({ mask: true })
        let resp = await nftApi.createDao(product)
        await uni.hideLoading()
        if (resp.code === '0') {
          //let id = resp.data
          let id = getEcoPlusId()
          console.log('the DAO title is ', getTitleOfDao())
          // saveDao(getTitleOfDao())
          console.log('add successfully. redirect to ', resp)
          uni.redirectTo({
            url: `/pages/product/create-product/add-success?targetId=${id}&type=dao`,
          })
          console.log('add successfully. redirect is done')
        }
        break
    }
  }

  const goPosition = async index => {
    if (index === step.value) {
      return
    }

    if (step.value === 0) {
      const formData1 = form1Ref.value.methods.getAllData()
      console.log('🐞 getAllData return:', formData1)
      formatStep1(formData1)
      step.value = 1
      if(index === 2) {
        const formData2 = form2Ref.value.methods.getAllData()
        formatStep2(formData2)
        step.value = 2
      }
      await scrollTop()
      return
    }

    if (step.value === 1) {
      if(index > step.value) {
        const formData2 = form2Ref.value.methods.getAllData()
        formatStep2(formData2)
        await scrollTop()
        step.value = index
        return
      } else {
        step.value = index
        return
      }
    }

    if (step.value === 2) {
      await scrollTop()
      step.value = index
      return
    }
  }

  const onBlack = async () => {
    if (step.value > 0) {
      step.value = step.value - 1
    } else {
      await uni.navigateBack({
        delta: 1,
      })
    }
    await nextTick(() => {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      })
    })
  }
  const readDraft = async formList => {
    console.log('-----readDraft', formList)
    await uni.showLoading()
    let resJson = await flowApi.getGroupDraft(draftId.value)
    if (resJson.data.code === '0') {
      const dataMap = {}
      const draftData = JSON.parse(JSON.stringify(resJson.data.data.uiState.draftData))
      draftAllData.value = draftData
      formList.forEach(item => {
        if (draftData[item.dataKey]) {
          dataMap[item.dataKey] = draftData[item.dataKey]
        }
      })

      form1Ref.value.methods.setData(dataMap)
      form2Ref.value.methods.setData(dataMap)
      form3Ref.value.methods.setData(dataMap)
    }
    uni.hideLoading()
  }
  const saveDraftToService = async data => {
    await uni.showLoading()
    draftBody.defId = defId.value
    draftBody.content = JSON.parse(
      JSON.stringify({
        formData,
      })
    )
    draftBody.uiState.draftData = data
    draftBody.uiState.draftBox.name = getTitle(data) || ''
    let res = { code: -1 }
    if (!draftId.value) {
      try {
        res = await flowApi.createAPost(draftBody)
      } catch (e) {
        uni.hideLoading()
        return
      }
      if (Number(res.code) === 0) {
        draftId.value = res.data
      }
    } else {
      try {
        res = await flowApi.putGroupDraft(draftId.value, draftBody)
      } catch (e) {
        uni.hideLoading()
        return
      }
    }
    uni.hideLoading()
  }
  const saveFromDraft = () => {
    saveDraftToService(getAllUiData())
  }
  const draftClick = e => {
    if (e.index) {
      uni.navigateTo({
        url: `/pages/common/create-related/draftBox/index-new?defId=${defId.value}`,
        events: {
          onDraftBox: res => {
            console.log(res)
            // readDradt(res)
          },
        },
      })
    }
    showDraftDialog.value = false
  }
  const stepTap = index => {
    if (step.value < index) {
      let setDone = true
      checkLoop: for (let i = step.value; i < index; i++) {
        switch (i + 1) {
          case 1:
            const formData1 = form1Ref.value.methods.getAllData()
            if (Object.prototype.toString.call(formData1) !== '[object Object]') {
              setDone = false
              break checkLoop
            }
            break
          case 2:
            const formData2 = form2Ref.value.methods.getAllData()
            if (Object.prototype.toString.call(formData2) !== '[object Object]') {
              setDone = false
              break checkLoop
            }
            break
        }
      }
      if (setDone) {
        step.value = index
      }
    } else {
      step.value = index
    }
  }
  return {
    initDraft,
    showDraftDialog,
    draftId,
    goodsOwnerType,
    form1Ref,
    form2Ref,
    form3Ref,
    defId,
    step,
    formatData,
    draftAllData,
    scrollTop,
    goNext,
    goPosition,
    buttonMap,
    onBlack,
    draftDialogButton,
    readDraft,
    draftBody,
    saveDraftToService,
    saveFromDraft,
    draftClick,
    stepTap,
    productType,
    initMapper,
    getTitle,
    step1Mapping,
  }
}
