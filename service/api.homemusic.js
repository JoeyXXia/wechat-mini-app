import xxRequest from './index'

export function getBanners() {
  return xxRequest.get("/banner", {
    type:2
  })
}

export function getPlaylistDetail(id) {
  return xxRequest.get("/playlist/detail",{
    id
  })
}

export function getSongMenuList(cat="全部",limit=6, offset=0) {
  return xxRequest.get("/top/playlist",{
    cat,
    limit,
    offset
  })
}

export function getSongMenuTag() {
  return xxRequest.get("/playlist/hot")
}