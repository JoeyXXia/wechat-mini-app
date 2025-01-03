import {HYEventStore} from 'hy-event-store'
import { getPlaylistDetail} from '../service/api.homemusic'
const recommendStore = new HYEventStore( {
  state: {
    recommendSongInfo:{}
  },
  actions: {
    fetchRecommendSongsAction(ctx) {
      getPlaylistDetail(3778678).then( res => {
       ctx.recommendSongInfo = res.playlist
      })
    }
  }
}) 
export default recommendStore
