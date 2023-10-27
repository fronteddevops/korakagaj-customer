export default {
    GET_MY_PROFILE:()=>`/user/me`,
    UPDATE_MY_PROFILE:()=>`/user/me`,
    CHANGE_PASSWORD:()=>`/auth/change-password`,
    CREATE_MY_ADDRESS:()=>`/address`,
    GET_MY_ADDRESS:()=>`/address/me`,
    GET_MY_ADDRESS_BY_ID:(id)=>`/address/${id}`,
    UPDATE_MY_ADDRESS_BY_ID:(id)=>`/address/${id}`
}