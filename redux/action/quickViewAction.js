import * as Types from '../constants/actionTypes'

export const openQuickView = product => dispatch =>{

    dispatch({
        type: Types.OPEN_QUICK_VIEW,
        payload: { product }
    })
}

export const closeQuickView = ()=> dispatch =>{
    console.log("================")
    dispatch({
        type: Types.CLOSE_QUICK_VIEW,
    })
}