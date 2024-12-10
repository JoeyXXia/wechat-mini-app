// pages/home-music/index.js
import { getBanners,getSongMenuList} from '../../service/api.homemusic'
import selectRect from  '../../utils/select-rect'

import  recommendStore from '../../store/recommendStore'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swpierHeight:0,
    banners:[],
    recommendSongs:[],

    hotMenuList:[],
    recMenuList:[],

    isRankingData:false,
    rankingInfos:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPageData()
    this.fetchSongMenuList()

    //store dispatch
    recommendStore.onState("recommendSongInfo", this.handleRecommendSongs)
    recommendStore.dispatch("fetchRecommendSongsAction")

  },

  getPageData(){
    getBanners().then( res => {
     this.setData({banners:res.banners})
    })
  },

  

  fetchSongMenuList() {

    getSongMenuList().then( res => {
      this.setData({hotMenuList:res.playlists})
    })
    getSongMenuList("华语").then( res => {
      this.setData({recMenuList:res.playlists})
    })
  },
  handleRecommendSongs(value) {
    if(!value.tracks) return 
      this.setData({recommendSongs:value.tracks.slice(0,6)})
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

  

})