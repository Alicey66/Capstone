export default {
  // 命名空间一般推荐开启，防止和其他模块冲突
  namespaced: true,

  // state 存储数据
  state: {
    daoNft: '',
    stockNft: '',
    defiNft: '',
  },

  // mutations 用于修改 state
  mutations: {
    SET_NFTS(state, payload) {
      state.daoNft = payload.daoNft
      state.stockNft = payload.stockNft
      state.defiNft = payload.defiNft
    }
  },

  // actions 用于封装异步或复杂逻辑，也可直接提交 mutations
  actions: {
        updateNftData({ commit }, data) {
          commit('SET_NFTS', data)
        }
  },

  // getters 用来计算派生数据
  getters: {
    getDaoNft(state) {
          return state.daoNft
        },
        getStockNft(state) {
          return state.stockNft
        },
        getDefiNft(state) {
          return state.defiNft
        },
    totalNfts(state) {
      return Number(state.daoNft) + Number(state.stockNft) + Number(state.defiNft)
    }
  }
}
