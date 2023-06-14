import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FriendsListCard, getUserFriends } from '../../../redux/Action/Profile'
import ButtonLoader from '../../components/button-loader'
import { useSkin } from '@hooks/useSkin'



const AllFriends=(props)=>{

    const {active} = props

    const store = useSelector(state=>state.profileReducer)

    const { skin, setSkin } = useSkin()

    const all_friends = store.friends.all_friends
    const [page,setPage] = useState(all_friends.page)

    const onScroll = () => {

        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
    
        if (Math.round(scrollTop + clientHeight)+1 >= scrollHeight) {
            
            setPage(page+1)
        }
    }

    useEffect(()=>{

        getUserFriends('all',1)

    },[])

    useEffect(()=>{

        if(all_friends.data){
    
            window.addEventListener('scroll', ()=>onScroll())
            
            return () => window.removeEventListener('scroll', onScroll)

        }

    },[all_friends.data])

    useEffect(()=>{

       if(all_friends.data.length){
            getUserFriends('all',page)
        }
    },[page])
    
    return(
        <div className='d-flex flex-wrap w-100'>
            {
                all_friends.data.map(friend=>{
                    return(
                        FriendsListCard(friend,skin)
                    )
                })
            }
            {
                store.friends.loading &&
                <div className='d-flex justify-content-center'>
                    <ButtonLoader/>
                </div>
            }
        </div>
    )
}
export default AllFriends