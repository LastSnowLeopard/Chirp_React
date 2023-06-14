import { useState } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Card, Input, InputGroup, InputGroupText } from "reactstrap";
import { GOOGLE_MAPS_API_KEY } from "../../../utility/api/constants/API";
import { MapPin, Search } from "react-feather";
import { useEffect } from "react";
import ButtonLoader from "../../components/button-loader";



const AutoComplete = ({setView,setLocation,notApplyStyle,dataAvailable,formDataValue}) => {

  const {
    placePredictions,
      getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: GOOGLE_MAPS_API_KEY,
  });

  const [value, setValue] = useState('');
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    if(dataAvailable){
      setLoading(true)
      setValue(formDataValue)
      setTimeout(()=>{
        setLoading(false)
      },500)
    }
  },[formDataValue])

  return (
    <div className={`${!notApplyStyle?'p-1':''}`}>
    <div className={`${!notApplyStyle?'px-1':''}`}>
        <InputGroup 
            style={!notApplyStyle?{
              borderRadius:'20px',
              padding:'2px',
              background:'#F0F2F5'
          }:{}}
            className='mb-2'>
                {!notApplyStyle?<InputGroupText 
                style={{
                    background:'transparent',
                    border:'none'
                }}
                className={`${!notApplyStyle?'border-none':''}`}>
                <Search size={20} />
                </InputGroupText>:''}
                {
                  loading?
                  <ButtonLoader/>:
                  <Input
                      style={!notApplyStyle?{
                        background:'transparent',
                        border:'none'
                    }:{}}
                      value={value}
                      placeholder="Where Are you ?"
                      onChange={(evt) => {
                      getPlacePredictions({ input: evt.target.value });
                      setValue(evt.target.value);
                      }}
                  />
                }
                
        </InputGroup>
    </div>
    
      {!isPlacePredictionsLoading && placePredictions.length!=0 && (
        <Card style={{
            backgroundColor: 'rgba(245, 241, 241, 0.959)', 
            color: '#000',
            overflow: 'auto',
            height:'50vh'
        }}>
            {placePredictions.map(e => (
                <div 
                className="d-flex align-items-center" 
                style={{
                    padding: '10px',
                    borderTop: '1px solid #ccc',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    setLocation(e.description)
                    setValue(e.description)
                    setView(false)   
                    // setData([]) 
                    getPlacePredictions({input:''})
                }}>
                    <div style={{height:'40px',width:'40px'}} className="bg-black rounded d-flex align-items-center justify-content-center">
                        <MapPin size={20} color="white"/>
                    </div>
                    <div className="flex-grow-1 px-1">
                        <p className="m-0">{e.description}</p>
                    </div>
                </div>
            ))}
        </Card>
      )}
    </div>
  );
};

export default AutoComplete