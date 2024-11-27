// pages/home-music/index.js
import { getBanners} from '../../service/api.homemusic'
import selectRect from  '../../utils/select-rect'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swpierHeight:0,
    banners:[]
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
  },

})