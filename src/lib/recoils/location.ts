import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

const location = atom({
  key: 'location',
  default: {
    list: [],
    before: null
  }
})

export const useLocation = () => {
  return useRecoilState(location)
}

export const useLocationValue = () => {
  return useRecoilValue(location)
}

export const useSetLocation = () => {
  return useSetRecoilState(location)
}