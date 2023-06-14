import React from 'react'
import { useSelector } from 'react-redux'
import { useSkin } from '@hooks/useSkin'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import { EducationRenderer, JobsRenderer } from '../../../redux/Action/Profile'
import { useState } from 'react'
import AddUpdateWork from './AddUpdateWork'
import AddUpdateEducation from './AddUpdateEducation'
import { PlusCircle } from 'react-feather'




const WorkAndEducation=(props)=>{

    const { skin, setSkin } = useSkin()

    const store = useSelector(state=>state.profileReducer)
    const postSectionCall = false
    const profileData = store.data.profileData
    const userEducation = store?.data.user_education
    const userJobs = store?.data.user_jobs
    
    const [workView,setWorkView] = useState(false)
    const [workLoading,setWorkLoading] = useState(false)

    const [educationView,setEducationView] = useState(false)
    const [educationLoading,setEducationLoading] = useState(false)
    
    const viewAll = true

    const workRenderer=()=>{

        return(
            <div>
                <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Work</p>
                <p 
                className={`${workView? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder m-1 fs-4 cursor-pointer`}
                onClick={()=>{
                    setWorkView(true)
                }}
                >
                    <PlusCircle size={25}/>    
                    <span className='mx-1'>Add Your Work</span>
                </p>
                <div className={`${workView?'d-block':'d-none'}`}>
                    <AddUpdateWork
                    view={workView}
                    setView={setWorkView}
                    loading={workLoading}
                    setLoading={setWorkLoading}
                    />
                </div>
                <hr/>
                {JobsRenderer({userJobs,postSectionCall,skin,viewAll})}
            </div>
        )
    }

    const educationRenderer=()=>{
        
        return(
            <div>
                <p className={`text-${ParagraphColor[skin]} fw-bolder m-1 fs-4`}>Education</p>
                <p 
                className={`${educationView? 'd-none':'d-block'} text-${ParagraphColor[skin]} fw-bolder m-1 fs-4 cursor-pointer`}
                onClick={()=>{
                    setEducationView(true)
                }}
                >
                    <PlusCircle size={25}/>    
                    <span className='mx-1'>Add Your Education</span>
                </p>
                <div className={`${educationView?'d-block':'d-none'}`}>
                    <AddUpdateEducation
                    view={educationView}
                    setView={setEducationView}
                    loading={educationLoading}
                    setLoading={setEducationLoading}
                    />
                </div>
                <hr/>
                {EducationRenderer({userEducation,postSectionCall,skin,viewAll})}
                
            </div>
        )
    }

    return(
        <div>

            {workRenderer()}
            {educationRenderer()}
        </div>
    )
}
export default WorkAndEducation