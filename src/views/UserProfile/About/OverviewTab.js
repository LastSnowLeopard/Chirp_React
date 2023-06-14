import React from 'react'
import { BookOpen, Briefcase, CheckCircle, Heart, MoreVertical, Search, Video } from 'react-feather'
import { useSelector } from 'react-redux'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import { useSkin } from '@hooks/useSkin'
import { EducationRenderer, JobsRenderer, PlacesRenderer } from '../../../redux/Action/Profile'




const OverviewTab = (props)=>{

    const {postSectionCall} = props

    const { skin, setSkin } = useSkin()

    const store = useSelector(state=>state.profileReducer)
    
    const aboutSectionData = store.aboutSectionData
    const placesData = aboutSectionData.placesLived


    const profileData = store.data.profileData
    const userEducation = store?.data.user_education
    const userJobs = store?.data.user_jobs


    return(
        <div>
            {JobsRenderer({userJobs,postSectionCall,skin})}
            {EducationRenderer({userEducation,postSectionCall,skin})}
            {PlacesRenderer([profileData],skin,'lives_in')}
            
            <div className={`${profileData.marital_status!=null?'d-flex':'d-none'} align-items-center`}>
                <div className='p-1'>
                    <Heart size={20}/>
                </div>
                <div className='flex-grow-1'>
                    <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>{profileData.marital_status}</p>
                </div>
            </div>
        
        </div>
    )
}
export default OverviewTab