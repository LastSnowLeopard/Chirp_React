import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FriendsListCard, getUserFriends } from '../../../redux/Action/Profile'
import ButtonLoader from '../../components/button-loader'
import { useSkin } from '@hooks/useSkin'



const Birthday=(props)=>{

    const {active} = props

    const store = useSelector(state=>state.profileReducer)
    const friends = store.friends.friends_by_birthday
    const { skin, setSkin } = useSkin()



    useEffect(()=>{

        if(active){
            getUserFriends('birthday',1)
        }
    },[active])

    return(
        <div className='d-flex flex-wrap w-100'>
            {
                store.friends.loading?
                <div className='d-flex justify-content-center'>
                    <ButtonLoader/>
                </div>:
                friends.data.map(friend=>{
                    return(
                        FriendsListCard(friend,skin)
                    )
                })
            }
        </div>
    )
}
export default Birthday