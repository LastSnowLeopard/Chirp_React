import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import { Col, Row } from 'reactstrap'
import StoryTextComponent from './StoryTextComponent'
import StoryMediaComponent from './StoryMediaComponent'


const AddStory=(props)=>{

    const {view,setView,type,image,setImage,imageFile,setImageFile} = props

    const [addText,setAddText] = useState(false)
    const [isCropped,setIsCropped] = useState(false)

    const [fontColor,setFontColor] = useState({color_code:'black'})
    const [selectedBackground,setSelectedBackground] = useState(-1)

    const [storyText,setStoryText] = useState('')
    const [addAudio,setAddAudio] = useState(false)
    const [selectedAudio,setSelectedAudio] = useState(-1)

    const [fontStyle,setFontStyle] = useState(-1)

    return(
        <div>

            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText='Preview'
            bodyClassName='p-0'
            >
                <Row className='m-0 overflow-auto' style={{height:'500px'}}>
                    <Col md='5' className='p-0'>
                        
                        <StoryTextComponent 
                        view={view}
                        setView={setView}
                        type={type}
                        addText={addText}
                        setAddText={setAddText}
                        isCropped={isCropped}
                        setIsCropped={setIsCropped}
                        setFontColor={setFontColor}
                        fontColor={fontColor}
                        selectedBackground={selectedBackground}
                        setSelectedBackground={setSelectedBackground}
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        image={image}
                        setImage={setImage}
                        storyText={storyText}
                        setStoryText={setStoryText}
                        setAddAudio={setAddAudio}
                        setSelectedAudio={setSelectedAudio}
                        addAudio={addAudio}
                        selectedAudio={selectedAudio}
                        fontStyle={fontStyle}
                        setFontStyle={setFontStyle}
                        />

                    </Col>
                    <Col md='7' className='p-1'>
                        
                        <StoryMediaComponent 
                        type={type}
                        addText={addText}
                        setAddText={setAddText}
                        isCropped={isCropped}
                        setIsCropped={setIsCropped}
                        setFontColor={setFontColor}
                        fontColor={fontColor}
                        selectedBackground={selectedBackground}
                        setSelectedBackground={setSelectedBackground}
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        image={image}
                        setImage={setImage}
                        storyText={storyText}
                        setStoryText={setStoryText}
                        setAddAudio={setAddAudio}
                        setSelectedAudio={setSelectedAudio}
                        audio={addAudio}
                        selectedAudio={selectedAudio}
                        toViewStory={false}
                        fontStyle={fontStyle}
                        setFontStyle={setFontStyle}
                        />

                    </Col>
                </Row>

            </Modal>


        </div>
    )
}
export default AddStory