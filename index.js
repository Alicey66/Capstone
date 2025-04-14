import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'

import timStore from './modules/timStore'
import businessStore from './modules/businessStore'
import meetingStore from './modules/meetingStore'
import taskStore from './modules/taskStore'
import skuStore from './modules/skuStore'
import nexusStore from './modules/nexusStore'
import chatStore from './modules/chatStore'
import shopStore from './modules/shopStore'
import footprintStore from './modules/footprintStore'
import componentBrowseStore from './modules/componentBrowseStore'
import equityDistributionNFT from'./modules/equityDistributionNFT_store'

const PERSIST_PATHS = [
  'timState.conversationList',
  'timState.isLogin',
  'timState.conversation',
  'timState.conversationID',
  'timState.messageList',
  'timState.scrollTop',
  'timState.userInfo',
  'taskState.scrollTop',

]

const plugins = [
  createPersistedstate({
    key: 'vuex',
    paths: PERSIST_PATHS,
    storage: {
      getItem: key => uni.getStorageSync(key),
      setItem: (key, val) => uni.setStorageSync(key, val),
      removeItem: key => uni.removeStorageSync(key),
    },
  }),
]
export default createStore({
  modules: {
    businessStore,
    timStore,
    meetingStore,
    taskStore,
    skuStore,
    nexusStore,
    chatStore,
    shopStore,
    footprintStore,
    componentBrowseStore,
    equityDistributionNFT,
  },
  plugins,
})
