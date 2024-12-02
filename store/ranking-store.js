import {HYEventStore} from 'hy-event-store'
import { getRanking} from '../service/api.homemusic'
const rankingStore = new HYEventStore( {
  state: {
    hotRanking:{}
  },
  actions: {
    getRankingDataAction(ctx) {
      getRanking(3778678).then( res => {
       ctx.hotRanking = res.playlist
      })
    }
  }
}) 
export  {
  rankingStore
} 