import React,{useEffect, useRef, useState} from  "react"
import { Plus, Trash2, X } from "react-feather"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import {toast} from "react-hot-toast"
import { uploadImage } from "../../redux/Action/Profile"
import { ModalCloseButton } from "../../utility/snippets/snippets"




const UploadProfileImageModal=(props)=>{

    const {viewHeader,modalSize,view,setView,headerText,margin,fullscreen,bodyClassName,footerComponent,bodyStyle} = props

    const skin = JSON.parse(localStorage.getItem('skin'))

    return(
        <div>
            <Modal
            className={`${modalSize || 'modal-md'} ${margin}`} 
            toggle={()=>setView(false)} 
            isOpen={view}
            backdrop={true}
            fullscreen={fullscreen}
            >

                {
                    !viewHeader && 
                    <ModalHeader className="position-relative justify-content-center" close={ModalCloseButton(setView)}>
                        <h2 className={`${skin=="dark"?'text-white':'text-primary'}`}>{headerText}</h2>
                    </ModalHeader>
                }
                <ModalBody className={bodyClassName} style={bodyStyle}>
                    {props.children}
                </ModalBody>
                {
                props.footerComponent && 
                <ModalFooter>
                    {/* {footerComponent? footerComponent() : ''} */}
                    {props.footerComponent}
                </ModalFooter>
                }
            </Modal>
        </div>
    )
}
export default UploadProfileImageModal