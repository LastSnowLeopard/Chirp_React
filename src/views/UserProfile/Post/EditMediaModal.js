import React from "react";
import { MediaContainer } from "../../Styled-Components";
import Modal from '../../components/Modal'
import { Loader, Trash, Trash2 } from "react-feather";
import { Card } from "reactstrap";
import { deleteHandler } from "../../../redux/Action/Profile";
import { useState } from "react";




const EditMediaModal=(props)=>{

    const {view,setView,mediaArray,setMedia,setGIF} = props

    return(
        <Modal
        view={view}
        setView={setView}
        modalSize='modal-md'
        headerText='Edit Photos/Videos'
        bodyClassName='p-0'
        >
            <div className="d-flex p-1 flex-column flex-wrap gap-1">

                {
                        mediaArray.map((media,index)=>{
                            return(
                                <MediaContainer className="d-flex justify-content-center align-items-center">
                                    <Card className="position-absolute top-0 end-0 m-50 p-50 border" onClick={()=>deleteHandler(index,mediaArray,setMedia,media,setGIF)}>
                                            <Trash2/>
                                    </Card>
                                    {
                                        media.media_type.startsWith('image')?
                                        <img key={index} className='m-1' src={media.media_url} height='200' width='200'/>:
                                        <video
                                        key={index}
                                        className="VideoInput_video m-0"
                                        width="100%"
                                        height={200}
                                        controls
                                        src={media.media_url}
                                        />
                                    }
                                </MediaContainer>
                            )
                        })
                    }
                    {
                        !mediaArray.length && <p className="fw-bold fs-5 text-center">No Photos/Videos Selected</p>
                    }
                {/* {
                    images.map((x,index)=>{
                        const url = URL.createObjectURL(x)
                        return(
                            <MediaContainer key={index} className="rounded">
                                <img src={url} width='100%' height='100%' className="border rounded"/>
                            </MediaContainer>
                        )
                    })
                }

                {
                    videos.map((x,index)=>{
                        const url = URL.createObjectURL(x)
                        return(
                            <MediaContainer key={index}>
                                <video
                                key={index}
                                className="VideoInput_video m-1"
                                width="100%"
                                height={250}
                                controls
                                src={url}
                                />
                            </MediaContainer>
                        )
                    })
                } */}
            </div>

        </Modal>
    )
}
export default EditMediaModal