import React,{useEffect, useRef, useState} from  "react"
import { Plus, Trash2, X } from "react-feather"
import { Button} from "reactstrap"
import Modal from '../components/Modal'
import {toast} from "react-hot-toast"
import { deleteProfileImage, uploadImage } from "../../redux/Action/Profile"

import ButtonLoader from "../components/button-loader"
import { handleConfirmText } from "../../utility/snippets/snippets"



const UploadProfileImageModal=(props)=>{

    const {modalSize,view,setView,data,imageType,newImageURL,setNewImageURL} = props

    const fileInput = useRef(null);

    const [imageURL,setImageURL] = useState('')
    const [imageFile,setImageFile] = useState('')

    const [deleteLoading,setDeleteLoading] = useState(false)
    const [addLoading,setAddLoading] = useState(false)


    const handleButtonClick = () => {
        fileInput.current.click();
      };


    const onSetImageHandler = (event) => {

        let file = event.target.files[0]
        let acceptedFormat = ["image/jpeg", "image/png"]

        
        if (!acceptedFormat.includes(file.type)) {
            
            return toast.warn(`Please choose an ${acceptedFormat.join(', ')} file`)

        } else {
            let sizeKB = file.size / 1000;

            if(sizeKB > 5000)
            return toast.warn('Please select image less than 5MBs')

            const imageUrl = URL.createObjectURL(file)
            setImageURL(imageUrl)
            setImageFile(file)
        }
    }

    const saveImageHandler=async ()=>{

        const formData = new FormData()
        
        formData.append(imageType,imageFile)
        
        formData.append('userId',data.user_id)
        formData.append('profileId',data.profile_id)
        const response = await uploadImage(imageType,formData,imageURL)
        if(response==1){

            setNewImageURL(imageURL)
            setView(false)

        }

    }

    const deleteImageHandler=async()=>{
        
        const choice = await handleConfirmText('Confirm')

        if(choice){
            
            setDeleteLoading(true)
            const result = await deleteProfileImage(imageType,setDeleteLoading)

            if(result){
                setView(false)
            }
        }
    }

    useEffect(()=>{

        return (()=>{
            setImageFile('')
            setImageURL('')
        })

    },[])

    useEffect(()=>{

        if(!view){
            setImageURL('')
        }

    },[view])

    return(
        <div>
            <Modal 
            view={view} 
            setView={setView}>
                <div>
                <h1 className="text-center">Upload Image</h1>
                    <hr/>
                    <div>
                        <Button.Ripple 
                        className='d-flex justify-content-center w-100 mt-1'
                        onClick={handleButtonClick}>
                            <p className="d-flex align-items-center p-0 m-0">
                                <Plus size='20px'/>
                                <span>Upload Photo</span>
                            </p>
                        </Button.Ripple>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            style={{ display: 'none' }}
                            ref={fileInput}
                            onChange={onSetImageHandler}
                            />
                        <div className={`${imageURL.length?'d-block':'d-none'} border border-1 rounded p-1 my-1`}>
                                <img
                                src={imageURL}
                                alt={'PROFILE IMAGE'}
                                width="100%"
                                />
                                <Button.Ripple 
                                color='primary' 
                                className='float-right'
                                onClick={saveImageHandler}
                                >
                                    <span className={`${addLoading?'d-none':'d-block'}`}>Save</span>
                                    {
                                        addLoading && <ButtonLoader/>
                                    }
                                </Button.Ripple>
                        </div>
                    </div>
                    <div>
                        <Button.Ripple 
                        className='d-flex justify-content-center w-100 mt-1'
                        onClick={deleteImageHandler}
                        >
                            <p className={`d-flex align-items-center p-0 m-0 ${deleteLoading?'d-none':'d-block'}`}>
                                <Trash2 size='20px'/>
                                <span>Delete Photo</span>
                            </p>
                            {
                                deleteLoading && <ButtonLoader/>
                            }
                        </Button.Ripple>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default UploadProfileImageModal