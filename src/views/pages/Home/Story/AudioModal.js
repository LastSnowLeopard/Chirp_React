import React, { useState } from "react";
import Modal from  '../../../components/Modal'
import { Button, Input } from "reactstrap";
import axios from 'axios'
import toast from "react-hot-toast";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";




const AudioModal=(props)=>{

    const {view,setView,audio,setAudio} = props

    const [currentAudio, setCurrentAudio] = useState(null)

    const [tracks,setTracks] = useState([])
    const [song,setSong] = useState('')

    const handleImageClick = (audioUrl,track) => {
      
      setAudio(track)

      if (currentAudio && currentAudio.paused === false) {
        currentAudio?.pause()
      }

      const audio = new Audio(audioUrl);
      
      if (audio !== currentAudio) {
        audio.play();
        setCurrentAudio(audio);
      } else {
        setCurrentAudio(null);
      }
    }

    const searchTracks = async (query) => {

        setCurrentAudio(currentAudio?.pause())

        const clientId = '74769cbd532d408abea1de6f60e4b6fd';
        const clientSecret = 'f23a8a8fc1f74ecd9016b8178705be5c';
        const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        
        try{
            const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`,
          },
        });
        
        const accessToken = response.data.access_token;
        
        const searchResponse = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        
        if(searchResponse){

            const tracks = searchResponse.data.tracks.items;
           
            setTracks(tracks)
        }  
        }  catch(err){

            console.log('audio err : ',err)

            return toast.error('Failed to get Music !!')
        }    
    }

    useEffect(()=>{

        if(!view){
            setCurrentAudio(currentAudio?.pause())
        }else{
             setTracks([])
        }
    },[view])
      

    return(
        <div>

            <Modal
            view={view}
            setView={setView}
            modalSize='modal-md'
            headerText='Select Audio'
            bodyClassName='p-0'
            >
                <div className="d-flex flex-wrap gap-1 p-1">
                <Input
                placeholder="Search songs here"
                onChange={(e)=>setSong(e.target.value)}
                />
                <Button
                color="primary"
                onClick={()=>{
                    if(song.length){
                        searchTracks(song)
                    }else{
                        setTracks([])
                    }
                }}>
                    Search
                </Button>
                {
                  currentAudio!=null?
                  <Button
                  color="primary"
                  onClick={()=>{
                      if(currentAudio!=null){
                          setView(false)
                      }
                  }}>
                      Save
                  </Button>:''
                }
                </div>

                <div className="d-flex justify-content-center flex-wrap gap-1 h-450 overflow-auto">
                      
                      {
                        tracks.map((track,index)=>{

                            const imgURL = track.album.images[0].url
                            const audioSrc = track.preview_url


                            return(
                                <div className={`${currentAudio?.src==audioSrc? 'border-primary':''} w-25 d-flex flex-column align-items-center justify-content-column cursor-pointer`} key={index}>
                                    <div className="p-75 border rounded">
                                      <img src={imgURL} width='70' onClick={()=>handleImageClick(audioSrc,track)}/>
                                    </div>
                                    <p>{track.name}</p>
                                </div>
                            )
                        })
                      }
                </div>

            </Modal>

        </div>
    )
}

export default AudioModal