// pages/home-music/index.js
import { getBanners} from '../../service/api.homemusic'
import selectRect from  '../../utils/select-rect'

import { rankingStore} from '../../store/ranking-store'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swpierHeight:0,
    banners:[],
    recommendSongs:[]
  },


  getPageData(){
    getBanners().then( res => {
     this.setData({banners:res.banners})
    })
  },


  // click event 
  handleSearchClick:function() {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  handleSwierImageLoaded() {
    selectRect(".swpier-image").then( res => {
      const rect = res[0]
      this.setData({swpierHeight:rect.height})
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPageData()

    //store dispatch
    rankingStore.dispatch("getRankingDataAction")

    // get shared data
    rankingStore.onState("hotRanking", res => {
      if(!res.tracks) return 
      const recommendSongs = res.tracks.slice(0,6)
      this.setData({recommendSongs})
    })
  },

})