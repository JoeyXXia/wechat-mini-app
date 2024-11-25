
import xxRequest from './index'

export function getTopMV(offset,limit=10) {
  return xxRequest.get("/top/mv", {
    offset,
    limit
  })
}

export function getMVURL(id) {
  return xxRequest.get("/mv/url",{
    id
  })
}

export function getMVIDetail(mvid) {
  return xxRequest.get("/mv/detail",{
    mvid
  })
}

export function getRelatedMV(id) {
  return xxRequest.get("/related/allvideo",{
    id
  })
}