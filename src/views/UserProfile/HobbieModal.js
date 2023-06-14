import React, { useEffect } from "react" 
import { getAllHobbies, getUserHobbies, saveHobbiesHandler } from "../../redux/Action/Profile"
import Modal from "../components/Modal"
import { HobbieButton } from "../Styled-Components"
import { useSkin } from '@hooks/useSkin'
import { Loader, X } from "react-feather"
import { useState } from "react"
import { groupByKey, HobbiesRenderer, selectHobbyHandler } from "../../utility/snippets/snippets"
import ButtonLoader from "../components/button-loader"
import { Button } from "reactstrap"
import SearchHobbies from "./SearchHobbies"

const HobbiesModal=(props)=>{

    const {view,setView,store} = props

    const profileData = store.data.profileData
    const hobbiesData = store.data?.user_hobbies
    const allHobbies = store.data?.all_hobbies

    const loading =store.hobbiesLoading

    const { skin, setSkin } = useSkin()

    const [selectedHobbies,setSelectedHobbies] = useState({})
    const [deltedHobbies,setDeltedHobbies] = useState([])

    const [viewSearch,setViewSearch] = useState(false)
    const [saveLoading,setSaveLoading] = useState(false)

    const [viewSaveButton,setViewSaveButton] = useState(false)



    useEffect(()=>{

        if(view){
            getAllHobbies()
        }

    },[view])

    useEffect(()=>{

        if(hobbiesData?.length){
            setSelectedHobbies(groupByKey(hobbiesData,'hobby_id'))
            setViewSearch(true)
        }
    },[hobbiesData])
    

    const allHobbiesMap=()=>{

        return(
            allHobbies?.length>9?
                allHobbies.slice(0,9):allHobbies
        )
    }
    
    const footerComponent=()=>{
        return(
            <div>
                <div>
                    <Button.Ripple
                    className='mx-1'
                    onClick={()=>setView(false)}>
                        Cancel
                    </Button.Ripple>
                    <Button.Ripple
                    color='primary'
                    onClick={()=>saveHobbiesHandler(selectedHobbies,hobbiesData,setView,setSaveLoading)}
                    >
                        <span className={`${saveLoading? 'd-none':'d-inline'}`}>Save</span>
                        {
                            saveLoading && <ButtonLoader/>
                        }
                    </Button.Ripple>
                </div>
            </div>
        )
    }
    
    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Add Hobbies'
            bodyClassName='p-0'
            footerComponent={
                viewSaveButton? footerComponent() :''
            }
            >

                {
                    !viewSearch?(loading?
                    <ButtonLoader/>:
                    (
                        <>
                            {HobbiesRenderer({setViewSaveButton,hobbiesData,skin,selectedHobbies,setSelectedHobbies},setViewSearch)}
                            <div className="pt-1">
                                
                                <p className="text-center">What do you love to do? Choose from the popular hobbies below or add others.</p>
                                <hr/>
                                <p className="text-center">Recommended Hobbies</p>
                                <br/>
                                <div className="px-5">
                                    {
                                        allHobbies?.filter(x=>typeof(x.hobby_name)=='string' && x.hobby_name!='undefined')?.map(hobby=>{
                                            return(
                                                <HobbieButton 
                                                selected={selectedHobbies.hasOwnProperty(hobby.hobby_id)} 
                                                key={hobby.hobby_id} 
                                                skin={skin}
                                                onClick={()=>selectHobbyHandler(selectedHobbies,setSelectedHobbies,hobby)}>
                                                    <div className="d-flex align-items-center">
                                                        <img src={hobby.hobby_icon_url} height={20} width={20}/>
                                                        <span>{hobby.hobby_name}</span>
                                                        {/* <X className="ms-25" size={15}/> */}
                                                    </div>
                                                </HobbieButton>
                                            )
                                        })
                                    }
                                </div>
                                
                            </div>
                        </>
                    )
                    ):
                    <SearchHobbies
                    store={store}
                    selectedHobbies={selectedHobbies}
                    setSelectedHobbies={setSelectedHobbies}
                    setViewSaveButton={setViewSaveButton}
                    />
                }

            </Modal>
        </div>
    )
}
export default HobbiesModal