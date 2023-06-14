import { Check, Globe, Lock, MessageSquare, Search, User, UserPlus, X } from "react-feather"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { HobbieButton } from "../../Views/Styled-Components"


export const ParagraphColor={
  'dark':'white',
  'light':'black'
}

export const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj)}), {})
export const baseURL = localStorage.getItem('baseURL') 

export const HobbiesRenderer=({...args},setSearchView)=>{
  
  const {hobbiesData,skin,selectedHobbies,setSelectedHobbies}=args
  
  return(
      <div className="p-1">

        {
          hobbiesData?.map(hobby=>{
              return(
                  <HobbieButton 
                  key={hobby.hobby_id} 
                  skin={skin}
                  onClick={()=> setSearchView? selectHobbyHandler(selectedHobbies,setSelectedHobbies,hobby):console.log('')}
                  >
                       <div className="d-flex align-items-center">
                            <img src={hobby.hobby_icon_url} height={20} width={20}/>
                            <span>{hobby.hobby_name}</span>
                            <X className="ms-25" size={15}/>
                        </div>
                  </HobbieButton>
              )
          })
        }
        {
          setSearchView &&
          <HobbieButton skin={skin} onClick={()=> setSearchView? setSearchView(true):''}>
            <div>
              <span>Search More</span>
              <Search className='ms-25' size={15}/>
            </div>
          </HobbieButton>
        }
      </div>
  )
}

export const ModalCloseButton=(setState,position,right,left)=>{

    return(
        <div className={`cursor-pointer ${position || 'position-absolute'} rounded-circle`}
        style={{
            background:'#6E0C0D',
            padding:'10px',
            right:right || '10px',
            left:left
        }}
        onClick={() => setState(false)}
        >
            <X
                size={20}
                color='white'
                className="fw-bold"
            />
        </div>
    )
}

export const handleConfirmText = (confirmButtonText) => {
    
    const MySwal = withReactContent(Swal)

    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        return true
      }
    })
  }


export const selectHobbyHandler=(selectedHobbies,setSelectedHobbies,hobby)=>{

    if(!selectedHobbies.hasOwnProperty(hobby.hobby_id)){

        let obj={...selectedHobbies}

        obj[hobby.hobby_id] = [hobby]

        setSelectedHobbies(obj)
    
    }else{

        let obj={...selectedHobbies}
        delete obj[hobby.hobby_id]

        setSelectedHobbies(obj)
    }
}

export const privacyOptions={
  'public':'Public',
  'friends_only':'Friends',
  'onlyme':'Only Me'
}

export const privacyOptionsIcons={
  'public':<Globe size={20}/>,
  'friends_only':<User size={20}/>,
  'onlyme': <Lock size={20}/>
}



export const yearOptions=[
  {value:'2000',label:'2000'},
  {value:'2001',label:'2001'},
  {value:'2002',label:'2002'},
  {value:'2003',label:'2003'},
  {value:'2004',label:'2004'},
  {value:'2005',label:'2005'},
  {value:'2006',label:'2006'},
  {value:'2007',label:'2007'},
  {value:'2008',label:'2008'},
  {value:'2009',label:'2009'},
  {value:'2010',label:'2010'},
  {value:'2011',label:'2011'},
  {value:'2012',label:'2012'},
  {value:'2013',label:'2013'},
  {value:'2014',label:'2014'},
  {value:'2015',label:'2015'},
  {value:'2016',label:'2016'},
  {value:'2017',label:'2017'},
  {value:'2018',label:'2018'},
  {value:'2019',label:'2019'},
  {value:'2020',label:'2020'},
  {value:'2021',label:'2021'},
  {value:'2022',label:'2022'},
]
export const months={
  '01':'January',
  '02':'February',
  '03':'March',
  '04':'April',
  '05':'May',
  '06':'June',
  '07':'July',
  '08':'August',
  '09':'September',
  '10':'October',
  '11':'November',
  '12':'December'
}
export const monthOptions=[
  {value:'01',label:'January'},
  {value:'02',label:'February'},
  {value:'03',label:'March'},
  {value:'04',label:'April'},
  {value:'05',label:'May'},
  {value:'06',label:'June'},
  {value:'07',label:'July'},
  {value:'08',label:'August'},
  {value:'09',label:'September'},
  {value:'10',label:'October'},
  {value:'11',label:'November'},
  {value:'12',label:'December'}
]


export const RelationsOptions=[
  {value:'Father',label:'Father'},
  {value:'Mother',label:'Mother'},
  {value:'GrandMother',label:'GrandMother'},
  {value:'GrandFather',label:'GrandFather'},
  {value:'Brother',label:'Brother'},
  {value:'Sister',label:'Sister'},
  {value:'Daughter',label:'Daughter'},
  {value:'Wife',label:'Wife'}
]


export const RequestsStatus={
  
  'accepted':'Message',
  "pending":'Confirm',
  "not friend":'Send Request'

}

export const RequestsStatusButtonIcon={
  
  'accepted':<MessageSquare size='14'/>,
  "pending":<Check size='14'/>,
  "not friend":<UserPlus size='14'/>

}