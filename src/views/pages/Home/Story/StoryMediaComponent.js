import React, { useEffect, useState } from 'react'
import { AddStoryImageContainer, AddStoryMediaBox, AddStoryTextOnImage, StoryAudioContainer } from '../../../Styled-Components'
import ImageCropper from '../../../components/CropImage'
import AudioGIF from './audioGIF.gif'
import { useRef } from 'react'
import { Pause, Play } from 'react-feather'
import { baseURL } from '../../../../utility/snippets/snippets'

const StoryMediaComponent=(props)=>{

    const {
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
        selectedAudio,
        setSelectedAudio,
        addAudio,
        setAddAudio,
        toViewStory,
        audioRef,
        videoRef,
        setTotalDuration,
        fontStyle,
        setFontStyle
    }
    = props
    
    const [croppedImage,setCroppedImage] = useState()
    // const audioRef = useRef(null)

    const handleLoadedMetadata=()=>{

        const duration = audioRef?.current?.duration

        if(setTotalDuration){
            setTotalDuration(duration)
        }
        
    }

    const handleLoadedVideoMetadata=()=>{

        
        const duration = videoRef?.current?.duration

        if(setTotalDuration){
            setTotalDuration(duration)
        }
    }
    const AudioRenderer=()=>{


        return(
            <StoryAudioContainer display={selectedAudio!=-1}>
                
                <img src={AudioGIF} width='50' height='50'/>
                
                    <audio
                    ref={audioRef}
                    src={selectedAudio?.preview_url}
                    autoPlay={toViewStory}
                    controls={!toViewStory}
                    onLoadedMetadata={handleLoadedMetadata}
                    />
                
            </StoryAudioContainer>
        )
    }

    const getBackground=()=>{

        if(type=='image'){

            return image
        
        }else{

            return selectedBackground?.image_url

        }
    }

    useEffect(()=>{

        if(croppedImage){

            setIsCropped(true)
            setImage(croppedImage)
        }

    },[croppedImage])


    return(
        <div className='w-100 h-100'>
            <AddStoryMediaBox>

                {
                    type=='image' && !isCropped?
                    <ImageCropper
                    imageToCrop={image}
                    croppedImage={croppedImage}
                    setCroppedImage={setCroppedImage}
                    setImageFile={setImageFile}
                    />
                    :
                    (
                        type=='video'?
                            <div className='video-container'>
                                <video
                                ref={videoRef}
                                height='100%'
                                width='100%'
                                autoPlay
                                src={image.includes('upload')?`${baseURL}/${image}`:image}
                                onLoadedMetadata={handleLoadedVideoMetadata}
                                />
                                <AddStoryTextOnImage
                                color={fontColor?.color_code}
                                fontStyle={fontStyle?.label}
                                >
                                    <p>{storyText}</p>
                                </AddStoryTextOnImage>
                                {AudioRenderer()}
                            </div>
                                :
                            <AddStoryImageContainer
                            background={getBackground()}
                            color={selectedBackground?.color_code}
                            >
                                <AddStoryTextOnImage
                                color={fontColor?.color_code}
                                fontStyle={fontStyle?.label}
                                >
                                    <p>{storyText}</p>
                                </AddStoryTextOnImage>
                                {AudioRenderer()}
                            </AddStoryImageContainer>
                    )
                    
                }
                {
                    props.children
                }
            </AddStoryMediaBox>
        </div>
    )
}
export default StoryMediaComponent