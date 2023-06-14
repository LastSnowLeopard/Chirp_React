import React, { useState } from 'react'
import { Globe, Lock, User } from 'react-feather'
import { useSkin } from '@hooks/useSkin'
import { ParagraphColor } from '../../utility/snippets/snippets'
import { Button, Input} from 'reactstrap'
import Modal from './Modal'
import { PrivacyModalElement } from '../Styled-Components'
import ButtonLoader from './button-loader'





const PrivacyModal=(props)=>{

    const {view,setView,value,setValue,initialValue} = props
    const { skin, setSkin } = useSkin()



    const footerComponent=()=>{
        return(
            <div>
                <div>
                    <Button.Ripple
                    color='warning'
                    className='mx-1'
                    onClick={()=>{
                        setView(false)
                        setValue(initialValue)
                    }}>
                        Cancel
                    </Button.Ripple>
                    <Button.Ripple
                    color='primary'
                    onClick={()=>setView(false)}
                    >
                        <span>Done</span>
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
            modalSize='modal-md'
            headerText='Create Post'
            bodyClassName='p-0'
            footerComponent={footerComponent()}
            >
                <PrivacyModalElement onClick={()=>setValue('public')}>
                    <div>
                        <Globe size={25}/>
                    </div>
                    <div className='flex-grow-1 p-1'>
                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                            <strong>Public</strong>
                        </p>
                        <p className='m-0'>Anyone on or off Facebook</p>
                    </div>
                    <div>
                        <Input
                        type='radio'
                        checked={value.includes('public')}
                        onChange={()=>setValue('public')}/>
                    </div>
                </PrivacyModalElement>
                <PrivacyModalElement onClick={()=>setValue('friends_only')}>
                    <div>
                        <User size={25}/>
                    </div>
                    <div className='flex-grow-1 p-1'>
                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                            <strong>Friends</strong>
                        </p>
                        <p className='m-0'>Friends on Facebook</p>
                    </div>
                    <div>
                        <Input
                        type='radio'
                        checked={value.includes('friends_only')}
                        onChange={()=>setValue('friends_only')}/>
                    </div>
                </PrivacyModalElement>
                <PrivacyModalElement onClick={()=>setValue('onlyme')}>
                    <div>
                        <Lock size={25}/>
                    </div>
                    <div className='flex-grow-1 p-1'>
                        <p className={`text-${ParagraphColor[skin]} m-0 fs-5`}>
                            <strong>Only Me</strong>
                        </p>
                    </div>
                    <div>
                        <Input
                        type='radio'
                        checked={value.includes('onlyme')}
                        onChange={()=>setValue('onlyme')}/>
                    </div>
                </PrivacyModalElement>
            </Modal>

        </div>
    )
}
export default PrivacyModal

