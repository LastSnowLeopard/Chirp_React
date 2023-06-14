import React from 'react'
import Modal from '../../../components/Modal'
import { ParagraphColor } from '../../../../utility/snippets/snippets'
import { Button } from 'reactstrap'


const DiscardModal=(props)=>{

    const {view,setView,discardHeaderText,discardBodyText,discardHandler} = props

    const skin = JSON.parse(localStorage.getItem('skin'))

    const footerComponent=()=>{

        return(
            <div>
                <Button.Ripple color='white' onClick={()=>setView(false)}>
                    Continue
                </Button.Ripple>
                <Button.Ripple className='ms-1' color='primary' onClick={discardHandler}>
                    Discard
                </Button.Ripple>

            </div>
        )
    }
    return(
        <div>
            <Modal
            view={view}
            setView={setView}
            modalSize='modal-lg'
            headerText={discardHeaderText}
            bodyClassName='p-0'
            footerComponent={footerComponent()}
            >
                <div className='p-1'>
                    <p className={`text-center text-${ParagraphColor[skin]}`}>{discardBodyText}</p>
                </div>
                
            </Modal>
        </div>
    )

}
export default DiscardModal