import * as Types from '../constants/actionTypes'

export const updateProductFilters = productFilters => dispatch => {
    console.log('productFiltersdata',productFilters)
    dispatch({
        type: Types.UPDATE_PRODUCT_FILTERS,
        payload:{ productFilters }
    })
}

export const updateProductCategory = category => dispatch => {
    console.log('updateProductCategory',category)
    dispatch({
        type: Types.UPDATE_PRODUCT_CATEGORY,
        payload:{ category }
    })
}

export const updateProductSubCategory = category => dispatch => {
    console.log('updateProductCategory',category)
    dispatch({
        type: Types.UPDATE_PRODUCT_CATEGORY,
        payload:{ category }
    })
}
export const updateProductRating = rating => dispatch => {
    console.log(rating);
    dispatch({
        type: Types.UPDATE_RATING,
        payload: rating 
    })
}