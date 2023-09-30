export default {
  
   GET_SUB_CATEGORY:()=> '/subCategory',
   GET_ALL_SUB_CATEGORY:(id)=>`/subCategory?categoryId=${id}`,
   
   GET_SUB_CATEGORY_BY_ID:(id)=>`/subCategory/${id}`,
   
    }