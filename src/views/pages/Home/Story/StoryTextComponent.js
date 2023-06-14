import React, { useState } from 'react'
import { UserAvatar, postStory } from '../../../../redux/Action/Profile'
import { Button, Card, CardBody, CardFooter, CardHeader, Label } from 'reactstrap'
import { CreatePostInput, FontColorCircle, PostInputFieldContainer } from '../../../Styled-Components'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import DiscardModal from './DiscardModal'
import ButtonLoader from '../../../components/button-loader'
import { Music } from 'react-feather'
import AudioModal from './AudioModal'
import Select from 'react-select'



const StoryTextComponent=(props)=>{

    const {
        view,
        setView,
        type,
        addText,
        setAddText,
        isCropped,
        setIsCropped,
        fontColor,
        setFontColor,
        selectedBackground,
        setSelectedBackground,
        image,setImage,
        imageFile,
        setImageFile,
        storyText,
        setStoryText,
        addAudio,
        setAddAudio,
        selectedAudio,
        setSelectedAudio,
        fontStyle,
        setFontStyle
    }
    = props

    const userData = JSON.parse(localStorage.getItem('userData'))
    const skin = JSON.parse(localStorage.getItem('skin'))

    const profileStore = useSelector(state=>state.profileReducer)
    const store = useSelector(state=>state.NewsFeedReducer)
    const fontList = store.fontsList

    const backgrounds = profileStore.postBgImages

    const [viewDiscardModals,setViewDiscardModal] = useState(false)
    const [loading,setLoading] = useState(false)
    


    const discardHandler=()=>{
        
        setView(false)
        setAddText(false)
        setStoryText('')
        setIsCropped(false)
        setFontColor({color_code:'black'})
        setImage('')
        setImageFile()
        setSelectedBackground(-1)
        setSelectedAudio(-1)
    }

    const RenderTextComponents=()=>{

        const colors = backgrounds?.filter(x=>x.background_type=='color')

        return(
            <div className='my-1'>
                
                <div className='mb-1'>
                    <Label>Select Font</Label>
                    <Select
                    value={fontStyle}
                    options={fontList}
                    onChange={setFontStyle}
                    />
                </div>
                
                <div>
                    Font Colors
                    <div className='border rounded d-flex flex-wrap gap-1 p-1 my-1'>
                    
                        {
                            colors.map(color=>{

                                const selected = fontColor?.id == color.id
                                return(
                                    <FontColorCircle 
                                    color={color.color_code} 
                                    selected={selected}
                                    onClick={()=>setFontColor(color)}
                                    />
                                )
                            })                
                        }
                    </div>
                </div>
                {
                    type=='text' &&
                    <div>
                        Background Colors
                        <div className='border rounded d-flex flex-wrap gap-1 p-1 my-1'>
                            {
                                colors.map(image=>{

                                    const selected = selectedBackground?.id == image.id
                                    return(
                                        <FontColorCircle 
                                        color={image?.color_code} 
                                        image={image?.image_url}
                                        selected={selected}
                                        onClick={()=>setSelectedBackground(image)}
                                        />
                                    )
                                })                
                            }
                        </div>
                    </div>
                }
                
            </div>
        )

    }

    const handleSubmit=()=>{

        const formData = new FormData()
        const thumbnail = type=='image'? image : selectedBackground?.image_url

        formData.append('user_id', userData?.user_id)
        formData.append('privacy_level','friends')
        formData.append('thumb_nail_url',thumbnail )
        formData.append('text_content',storyText)
        formData.append('music_url',selectedAudio?.preview_url ?? null)
        formData.append('background_id',selectedBackground?.id || '')
        formData.append('background_image_url',selectedBackground.image_url || '')
        formData.append('story_type',type)
        formData.append('story_media',imageFile)
        formData.append('font_id',fontStyle?.value)
        formData.append('font_color_id',fontColor?.id)
        
        postStory(formData,setView,setLoading,image)
    }

    useEffect(()=>{

        if(backgrounds.length && type!='image' && type!='video'){

            const firstBg = backgrounds.find(x=>x.background_type=='color')
            
            setSelectedBackground(firstBg)

        }
    },[backgrounds])

    useEffect(()=>{

        if(fontList.length){

            setFontStyle(fontList[0])
        }

    },[fontList])

    return(
        <Card>
            <CardHeader className='flex-column align-items-start p-1'>
                
                <h2>Your Story</h2>

                <div className='py-1 d-flex align-items-center'>
                
                    {
                        UserAvatar(
                            1,
                            userData?.profile_image_url,
                            50,
                            50)
                    }
                    <p className='flex-grow-1 m-0'>{userData?.full_name ?? 'user_name'}</p>
                
                </div>
            </CardHeader>
            <CardBody>
                <div className='fs-4 cursor-pointer border rounded p-1 mb-1' onClick={()=>setAddAudio(true)}>
                    
                    <span className='me-2'><Music/></span>
                    <span className='fw-normal fs-5'>Add Audio</span>
                    {
                        selectedAudio!=-1 && 
                    
                            <p className='mt-1'>
                    
                                <strong>Selected Audio: </strong> 
                    
                                {selectedAudio?.name}
                    
                            </p>
                    }
                </div>
                
                {
                    type=='text' || addText?
                    <CreatePostInput
                    border='1px solid gray'
                    fs='14px'
                    fw='normal'
                    color={fontColor?.color_code}
                    textAlign='start'
                    height='243px'
                    value={storyText}
                    background={true}
                    autocorrect='off'
                    className='form-control' 
                    skin={skin}
                    placeholder={`What's on your mind?`}
                    onChange={(e)=>setStoryText(e.target.value)}
                    />:
                    (
                        isCropped || type=='video'?
                            <div className='fs-4 fw-bolder cursor-pointer border rounded p-1' onClick={()=>setAddText(true)}>
                                
                                <span className='me-2'>Aa</span>
                                <span className='fw-normal fs-5'>Add text</span>

                            </div>
                        :''    
                    )
                }

                {RenderTextComponents()}
            </CardBody>
            <CardFooter>
                <div>
                    
                    <Button.Ripple color='gray' onClick={()=>setViewDiscardModal(true)}>
                        <span className='text-black'>Discard</span>
                    </Button.Ripple>

                    <Button.Ripple disabled={loading} className='ms-1' color='primary' onClick={handleSubmit}>
                        {
                            loading?
                            <ButtonLoader/>:
                            <span>Share to story</span>
                        }
                    </Button.Ripple>
                
                </div>
            </CardFooter>
            <DiscardModal
            view={viewDiscardModals}
            setViewDiscardModal={setViewDiscardModal}
            discardHandler={discardHandler}
            discardHeaderText='Discard Story'
            discardBodyText='Are you sure that yo want to discard this story ? Your story Wont be saved.'
            />
            <AudioModal
            view={addAudio}
            setView={setAddAudio}
            audio={selectedAudio}
            setAudio={setSelectedAudio}
            />
            {console.log(' # AUDIO : ',selectedAudio)}
            
        </Card>
    )
}
export default StoryTextComponent