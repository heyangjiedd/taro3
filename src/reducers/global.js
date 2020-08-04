import { SETINFO } from '../constants/global'

const INITIAL_STATE = {
  systemInfo: {}
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SETINFO:
      return {
        ...state,
        systemInfo: { ...action.text},
      }
     default:
       return state
  }
}
