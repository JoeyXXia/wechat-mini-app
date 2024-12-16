// components/menu-area/menu-area.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    title:{
      type:String,
      value:"默认菜单"
    },
    menuList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth:375
  },
  lifetimes:{
    attached() {
      this.setData({screenWidth:applicationCache.globalData.screenWidth})
    }
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onMenuMoreClick() {
      wx.navigateTo({
        url: '/pages/detail-menu/detail-menu',
      })
    }
  }
})