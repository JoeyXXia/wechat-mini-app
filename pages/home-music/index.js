// pages/home-music/index.js
import { getBanners,getSongMenuList} from '../../service/api.homemusic'
import selectRect from  '../../utils/select-rect'

import  recommendStore from '../../store/recommendStore'
import { throttle } from 'underscore'

const querySelectThrottle = throttle(selectRect,100)
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swpierHeight:0,
    banners:[],
    bannerHeight:0,
    screenWidth: 375,

    recommendSongs:[],

    //song data
    hotMenuList:[],
    recMenuList:[],

    // top data
    isRankingData:false,
    rankingInfos:{},

    // current song 
    currentSong:{},
    isPlaying:false
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


    this.setData({screenWidth:app.globalData.screenWidth})
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

  //page click event
  onSearchClick() {
    wx.navigateTo({
      url: '/pages/detail-search/detail-search',
    })
  },
  onBannerImageLoad(event) {
    querySelectThrottle(".banner-image").then( res => {
      this.setData({bannerHeight: res[0].height})
    })
  },
  onRecommendMoreClick() {
    wx.navigateTo({
      url: '/pages/detail-song/detail-song?type=recommend',
    })
  },
  onSongItemTap(evnet) {
    const index = event.currentTarget.dataset.index
  
  },
  onPlayOrPauseBtnTap() {

  },
  onPlayBarAlbumTap() {
    wx.navigateTo({
      url: '/pages/music-player/music-player',
    })
  },

  //get data from store
  handleRecommendSongs(value) {
    if(!value.tracks) return 
      this.setData({recommendSongs:value.tracks.slice(0,6)})
  },
  handleNewRanking(value) {

    if(!value.name) return
    this.setData({isRankingData:true})
    const newRankingInfos = {...this.data.rankingInfos,newRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  handleOriginRanking(value) {
    if(!value.name) return
    this.setData({isRankingData:true})
    const newRankingInfos = {...this.data.rankingInfos,originRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  handleUpRanking(value) {
    if(!value.name) return
    this.setData({isRankingData:true})
    const newRankingInfos = {...this.data.rankingInfos,upRanking:value}
    this.setData({rankingInfos:newRankingInfos})
  },
  handlePlayInfos({currentSong,isPlaying}) {
    if(currentSong) {
      this.setData({currentSong})
    }
    if(isPlaying !== undefined) {
      this.setData({isPlaying})
    }
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

  onUnload() {

  }

})