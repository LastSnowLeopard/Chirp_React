// // import { createSlice } from "@reduxjs/toolkit";

// // export const booking = createSlice({
// //     name:"booking",
// //     initialState:{
// //         data:[]
// //     },
// //     reducers:{
// //         book:(state, action)=>{
// //             console.log('SLICE BOOKING')
// //             state.data= action.payload
// //             console.log('sliced')
// //         }
// //     }
// // });

// // export const {book} = booking.actions;
// // export default booking.reducer;
// const initialState={

//     signinData:[],
//     signupData:[],
// }

// const authReducer= (state=initialState,action)=>{

//     switch(action.type){

//         case 'LOGIN':
//             console.log("LOGIN",action)
//             return {
//                 ...state,
//                 signinData:action.payload,
//                 signupData:action.payload
               
//             }
            
//         default:
//             return state
//     }
// }

// export default authReducer