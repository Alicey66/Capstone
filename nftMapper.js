export default function daoMapper() {
  let formData
  let goodsOwnerType = 'tweebaa.goods.owner.types.tycoon'
  let type = 'Publisher'
  let daoSiteId = 'tweebaa.goods.types.digital.blockChain.nft.dao'

  const initMapper = (options, siteId) => {
    console.log('-----------daoMapper initMapper siteId', siteId)
    daoSiteId = siteId
    if (options.goodsOwnerType) {
      goodsOwnerType = options.goodsOwnerType
    }
    if (options.type) {
      type = options.type
    }
  }

  const step1Mapping = data => {
    console.log('--------------daoMapper step1Mapping', data)
    let ecoplus = { ...data.ecoplus }
    //delete data.ecoplus
    formData = { ...data, ...ecoplus }
    formData.owner = uni.getStorageSync('userInfo')
    formData.goodsownertype = goodsOwnerType



    const ca = data['eco-sku']?.costInfo
      if (ca) {
        formData.highestPromoterBonus = Number(ca.promoterBonus || 0) + Number(ca.surplusPromoterBonus || 0)
        formData.highestRecommenderBonus = Number(ca.recommenderBonus || 0) + Number(ca.surplusRecommenderBonus || 0)
        formData.highestSharerBonus = Number(ca.sharerBonus || 0) + Number(ca.surplusSharerBonus || 0)
      }


    console.log('@@@@@@@formatStep1', formData)
  }

  const step2Mapping = data => {
    formData = { ...formData, ...data }
    formData.hasRelatedGoods = data.relateProduct.length === 0 ? false : true
    console.log('@@@@@@@formatStep2', formData)
  }

  const step3Mapping = data => {
    if (data.group) {
      let group = { ...data.group }
      delete data.group
      formData = { ...formData, ...data }
      formData.group = {
        chooseGroupBind: group.chooseGroupBind,
        id: group.groupData?.id,
      }
    } else {
      formData = { ...formData, ...data }
    }

    console.log('@@@@@@@formatStep3', formData)
  }

  //ecoplus title from the UI data
  const getTitle = data => {
    console.log('----------daoMapper.getTitle', data.ecoplus.title)
    return data.ecoplus.title
  }

  const getTitleOfDao = () => {
    return formData.ecoplus?.title
  }

  const toSubmitData = () => {
    console.log('---------------daoMapper', formData)
    let product = {
      title: formData.title,
      goodsownertype: formData.goodsownertype,
      ecoPlusId: formData.ecoPlusId,
      requestStartTime: formData.duration.requestStartTime || new Date().getTime(),
      requestEndTime: formData.duration.requestEndTime,
      totalValue: formData.issuance.totalValue,
      totalCount: formData.issuance.totalCount,
      daoPrice: formData.issuance.daoPrice,
      daoCount: formData.issuance.daoCount,
      sharePrice: formData.issuance.reservedItem?.retailPrice,
      shareCount: formData.issuance.reservedItem?.totalCount,
      bindingImGroupId: formData.group?.id,
      publishType: 'tweebaa.goods.types.digital.blockChain.nft.dao',
      requesterType: type === 'Publisher' ? 'owner' : 'suggester',
      content: formData,
    }
    console.log('----product', product)
    return product
  }

  const getEcoPlusId = () => {
    return formData.ecoPlusId
  }

  return {
    initMapper,
    getTitle,
    step1Mapping,
    step2Mapping,
    step3Mapping,
    getTitleOfDao,
    getEcoPlusId,
    toSubmitData,
  }
}
