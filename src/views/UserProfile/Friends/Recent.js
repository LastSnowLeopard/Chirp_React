import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FriendsListCard, getUserFriends } from '../../../redux/Action/Profile'
import ButtonLoader from '../../components/button-loader'
import { useSkin } from '@hooks/useSkin'



const Recent=(props)=>{

    const {active} = props

    const store = useSelector(state=>state.profileReducer)

    const all_friends = store.friends.friends_by_college
    const { skin, setSkin } = useSkin()


    useEffect(()=>{

       if(active){
            getUserFriends('recent',1)
        }
    },[active])
    


    return(
        <div className='d-flex flex-wrap w-100'>
            {
                store.friends.loading?
                <div className='d-flex justify-content-center'>
                    <ButtonLoader/>
                </div>:
                all_friends.data.map(friend=>{
                    return(
                        FriendsListCard(friend,skin)
                    )
                })
            }
        </div>
    )
}
export default Recent