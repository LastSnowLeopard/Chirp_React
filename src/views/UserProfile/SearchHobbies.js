import React, { useState } from 'react'
import { Search, X } from 'react-feather'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import { selectHobbyHandler } from '../../utility/snippets/snippets'
import { HobbieButton } from '../Styled-Components'
import { useSkin } from '@hooks/useSkin'



const SearchHobbies=(props)=>{

    const {store,selectedHobbies,setSelectedHobbies,setViewSaveButton} = props

    const [filteredHobbies,setFilteredHobbies] = useState([])
    const { skin, setSkin } = useSkin()

    const allHobbies = store.data?.all_hobbies

    const renderSelectedHobbiesList=()=>{

        const selectedIds = Object.keys(selectedHobbies)
        

        return(
            <div className={`my-1 p-2 border border-2 ${selectedIds.length?'d-block':'d-none'}`}>
                {
                    selectedIds.map(id=>{

                        const hobbies= selectedHobbies[id]

                        return(
                            
                            hobbies.map(hobby=>{
                                return(
                                    <HobbieButton 
                                    selected={selectedHobbies.hasOwnProperty(hobby.hobby_id)} 
                                    key={hobby.hobby_id} 
                                    skin={skin}
                                    onClick={()=>{
                                        setViewSaveButton(true);
                                        selectHobbyHandler(selectedHobbies,setSelectedHobbies,hobby);
                                    }}
                                    >
                                         <div className="d-flex align-items-center">
                                            <img src={hobby.hobby_icon_url} height={20} width={20}/>
                                            <span>{hobby.hobby_name}</span>
                                            <X className="ms-25" size={15}/>
                                        </div>
                                    </HobbieButton>
                                )
                            })
                        )
                    })
                }
            </div>
        )
    }
    
    const renderSearchedHobbies=()=>{

        const selectedIds = Object.keys(selectedHobbies)

        return(
            <div className='my-1 p-2'>
                {
                    filteredHobbies.filter(x=>!selectedIds.includes(x.hobby_id.toString())).map(hobby=>{
                        return(
                                <HobbieButton 
                                    selected={selectedHobbies.hasOwnProperty(hobby.hobby_id)} 
                                    key={hobby.hobby_id} 
                                    skin={skin}
                                    onClick={()=>{
                                        setViewSaveButton(true);
                                        selectHobbyHandler(selectedHobbies,setSelectedHobbies,hobby);
                                    }}>
                                         <div className="d-flex align-items-center">
                                            <img src={hobby.hobby_icon_url} height={20} width={20}/>
                                            <span>{hobby.hobby_name}</span>
                                        </div>
                                </HobbieButton>
                            
                        )
                    })
                }
            </div>
        )
    }

    return(
        <div className='p-1'>
            {/* <Input/> */}
            <InputGroup 
            style={{
                borderRadius:'20px',
                padding:'4px',
                background:'#F0F2F5'
            }}
            className='mb-2'>
                <InputGroupText 
                style={{
                    background:'transparent',
                    border:'none'
                }}
                className='border-none'>
                <Search size={20} />
                </InputGroupText>
                <Input
                style={{
                    background:'transparent',
                    border:'none'
                }} 
                placeholder='What do you do for fun?' 
                onChange={(e)=>{
                    console.log('@ hobbie value:',e.target.value)
                    
                    setFilteredHobbies(allHobbies.filter(x=>x.hobby_name.toLowerCase().includes(e.target.value.toLowerCase())))
                    
                }}
                />
            </InputGroup>
            
            {renderSelectedHobbiesList()}
            {renderSearchedHobbies()}

        </div>
    )
}
export default SearchHobbies