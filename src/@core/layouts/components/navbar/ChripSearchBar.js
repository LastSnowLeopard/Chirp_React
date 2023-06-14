import React, { useEffect, useState } from 'react'
import SearchBar from '../../../../Views/components/Searchbar'
import { RenderSearchFriendButton, searchValues } from '../../../../redux/Action/NewsFeed'
import { SearchList, SearchListValue } from '../../../../Views/Styled-Components'
import { Card } from 'reactstrap'
import { data } from 'jquery'
import { UserAvatar } from '../../../../redux/Action/Profile'
import { useRef } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import classNames from 'classnames'




const ChripSearchBar=(props)=>{

    const [loading,setLoading] = useState(false)
    
    const [searchValue,setSearchValue] = useState('')
    const [searchData,setSearchData] = useState([])
    const [view,setView] = useState(false)

    const searchRef = useRef(null)
    const searcHListRef = useRef(null)

    const getData=async()=>{

        const result = await searchValues(searchValue)

        if(result){
            setSearchData(result)
        }
        setLoading(false)

    }

    
    function handleClickOutside(event) {
       

        if(searchData.length==0)
        return

        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchData([])
            setLoading(false)
        } 
    
    } 

    useEffect(()=>{

        if(searchData.length){
            window.addEventListener('click',handleClickOutside)

            return(()=>{
                window.removeEventListener('click',handleClickOutside)
            })
        }

    },[searchData])

    useEffect(()=>{

        let searchTimeout

        if(searchValue.length){

            setLoading(true)

            searchTimeout = setTimeout(()=>{

                getData()

            },2000)

        }else{
            setSearchData([])
        }

        return(()=>clearTimeout(searchTimeout))
    },[searchValue])

    return(
        <div ref={searchRef} className='position-relative'>
    
            <SearchBar
            loading={loading}
            placeholder={'Start Typing to search'}
            onChange={(e)=>setSearchValue(e.target.value)}
            />

            {
                searchData.length?
                <SearchList className='m-0'>
                    {
                        searchData.map(search=>{

                            return(
                               
                                <SearchListValue key={search.peopleid}>
                                    <div>
                                        {UserAvatar(1,search?.profile_image_url,40,40,{},search?.full_name ?? 'user')}
                                    </div>
                                    <div className='flex-grow-1'>
                                        <p className='text-black m-0'>{search.full_name}</p>
                                    </div>
                                    <div>
                                        {RenderSearchFriendButton(search)}
                                    </div>
                                </SearchListValue>
                            
                            )
                        })
                    }
                </SearchList>:''
            }
            

        </div>
    )
}
export default ChripSearchBar