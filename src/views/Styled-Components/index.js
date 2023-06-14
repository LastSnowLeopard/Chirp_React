import { Button, Input } from 'reactstrap'
import styled from 'styled-components'
import { ProfilePhotoRender } from '../../redux/Action/Profile'
import DummyAvatar from '../../assets/images/avatars/2.png'
import DummyCover from "../../assets/images/profile/user-uploads/defaultCover.webp"


export const HobbieButton= styled.button`
    background:${props=>props.selected? '#6E0C0D':'transparent'};
    // width: ${props=>props.width || '100px'};
    padding: 0.5rem 1rem;
    border-radius: 20px !important;
    color: ${props=>props?.selected?'white':(props?.skin=='dark'?'white':'black')};
    border:1px solid #464040 !important;
    margin:0 5px !important;
    margin-bottom:1rem !important;
`

export const PostHeaderInput = styled.input`

    background:transparent;
    border:none;
    width:100%;
    padding:10px;
    height:100px;
    color: ${props=>props?.skin=='dark'?'white':'black'};

    &:focus {
        border: none;
    }

    ::placeholder {
        color: ${props=>props?.skin=='dark'?'white':'black'};
        font-size:25px;
    }
`

export const PrivacyModalElement=styled.div`

    height:100px;
    cursor:pointer;
    display:flex;
    align-items:center;
    padding:1rem;

    &:hover{
        background: #F0F2F5;
    }

`   


export const PostMediaContainer=styled.div`
    width:${props=>props.media.length<2?((100/props.media?.length)+'%'):'50%'};
    height:${props=>props.media?.length>2? '50%':'100%'};
    border:1px solid #575656;
    cursor:pointer;
    overflow:hidden;
    background: ${props=>props.background && `url(${ProfilePhotoRender(props.url)})`};
`
export const PostOverlay=styled.div`

    position:absolute;
    bottom:0%;
    right:0%;
    width:50%;
    height:225px;
    background: rgba(255,255,255,0.5);
    border: 1px solid rgba(255,255,255,0.25)
    display:flex !important;
    justify-content:center !important;
    align-items:center !important;
    cursor:pointer;
    
`
export const PrevArrow = styled.div`
    height:100%;
    width:20%;
    // position:absolute;
    left:0;
    top:0;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1000;
`

export const NextArrow = styled.div`
    height:100%;
    width:20%;
    // position:absolute;
    right:0;
    top:0;
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:1000;
`

export const FeelingContainer=styled.div`
    
    display:flex;
    width:50%;
    align-items:center;
    gap:1rem;
    border-radius:10px;
    padding:10px;

    background: ${props=>props.selected && '#F0F2F5'};
    
    & .img{
        padding:5px;
        background:#F0F2F5;
        border-radius:50%;
    }

    &:hover{
        background: #F0F2F5
    }

`


export const YearContainer=styled.div`

    padding:1rem;
    cursor:pointer;

    &:hover{
        background:${props=>props.skin=='light'?'#D8DADF':'#343434'}
    }
`

export const FriendsContainer=styled.div`

    &:hover{
        background:#636363;
    }
`

export const CommentInput=styled.textarea`

    width:${props=>props.display.includes('flex-column')?'100%' : '50%'} !important;
    // border-bottom: ${props=>props.display.includes('flex-column') && 'none !important'};
    // border-right: none !important;
    border:none !important;
    border-radius: ${props=>props.display.includes('flex-column') ? '20px 20px 0 0 !important':'20px 0 0 20px !important'}; 
    overflow-x:hidden !important;
    overflow-y:auto;
    min-height:50px;
    height:auto;
    padding:4px !important;

    &:focus{
        border:none !important;
        background: ${props=>props.skin=='light'? '#F0F2F5 !important' : '#3A3B3C !important'};
        padding:4px !important;
    }
    &~span{
        border:none !important;
    }
`

export const CommentInputGroup=styled.span`

        width: ${props=>props.display.includes('column') && '100%'};
        border-radius: ${props=>props.display.includes('flex-column') ? '0 0 20px 20px !important':'0 20px 20px 0 !important'}; 
        borderTop:${props=>props.display.includes('column')&& 'none !important'};
        padding:4px !important;

        background:${props=>props.skin=='light' && '#F0F2F5 !important'};
        display:flex !important;
        justify-content: end;
        &:focus{
            border:none !important;
            padding:4px !important;
        }
`

export const ReplyButton=styled.span`

        cursor:pointer;
        font-weight:bold;
        
        &:hover{
            text-decoration:underline;
        }


`


export const CreatePostInput=styled.textarea`
    background: transparent !important;
    border: ${props=> props?.border ?? 'none !important'};

    font-size: ${props=>props.background? (props?.fs ?? '32px'):'18px'};
    text-align: ${props=>props.background && (props?.textAlign ?? 'center')};
    font-weight: ${props=>props.background && (props?.fw ?? 'bolder')};
    height: ${props=>props.background ? ( props?.height ?? '100px'):''};
    line-height:40px !important;

    color: ${props=>props.background && (`${props?.color} !important` ?? 'white !important')};

    &:focus{
        border: ${props=> props?.border ?? 'none !important'};
        background: transparent !important;
        box-shadow: none !important;
    }

    ::placeholder{
        color:${props=>props.background && 'white !important'};
        align-text:center;
    }

`


export const PostElementModalDiv=styled.div`
    
    cursor:pointer;
    padding:1rem;

    width:50%;

    &:hover{
        background:${props=>props.skin=='light'?'#F0F2F5':'#3A3B3C'}
    }

`

export const MediaContainer=styled.div`

    width:100%;
    height:250px;
    cursor:pointer;
    border:1px solid;

    position:relative;
    

`


export const PostInputFieldContainer=styled.div`
    
    background: ${props=>props.background && `url(${props?.url && props?.url!=null? ProfilePhotoRender(props.url) : DummyCover})`};
    height: ${props=>props.background? (props?.height ?? '250px'):''};
    display:flex;
    justify-content:center;
    align-items:center;
    background-repeat:${props=> props?.story? 'no-repeat':''};
    background-size:${props=> props?.story? 'contain':''};
    background-position:${props=> props?.story? 'center':''};
    width:${props=>props.width};
`

export const PostBackgroundImageRenderer=styled.div`

    background: ${props=>props.background && props.background!=null && `url(${ProfilePhotoRender(props.url)})`};
    height: 100%;
    width:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-repeat: no-repeat;
    background-size: cover;
`


export const SearchList=styled.div`

    background:white;
    position: absolute;
    top:105%;

    max-height:400px;
    width:100%;
    border-radius:1rem;
    overflow-y:auto;

    &::-webkit-scrollbar {
        width: 0.5em;
        padding:10px
      }
    
    &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background:transparent;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #504949;
background: -webkit-linear-gradient(0deg, #504949 0%, #5b595b 100%);
background: linear-gradient(0deg, #504949 0%, #5b595b 100%);
    outline: 1px solid gray;
    border-radius:200px;
    }
    
`    

export const SearchListValue=styled.div`

    display:flex;
    align-items:center;
    padding:0.5rem;

    border-bottom: 1px solid lightGray;
    cursor:pointer;
`
    
export const StoriesContainer=styled.div`

    padding:1rem 0;
    position:relative;

    display:flex;
    gap:17px;
    width:100%;

    overflow-x: scroll;

    &::-webkit-scrollbar {
        display:none;   
    }
`
export const StoryBox= styled.div`

    // height:213px;
    // width:138px;
    
    height:225px;
    width:170px;

    border-radius:10px;
    cursor:pointer;

    flex-shrink:0;

    background-image:url(${props=>props.image && !props?.image?.includes('null') ? props.image : DummyAvatar});
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;

    & .footer{
        position:relative;
        top:78%;
        border-radius:0 0 10px 10px;
        height:51px;
        // background:white;
        // box-shadow:-1.5px -6.5px 10px -4px gray;
        
        font-size:1.1rem;
        font-weight:bold;

        color:white;
        display: flex;
        align-items: end;
        justify-content: center;
    }

    & .footer .add-button{
        
        background:white;
        border-radius:50%;
        
        position:absolute;
        top:-10%;
        left:50%;
        transform:translate(-50%,-50%);

        box-shadow: 3px 3px 10px gray;

    }

    & .footer .add-button .plus{
        color: #6E0C0D;
    }

    // & .footer span{
    //     color: #6E0C0D;
    //     font-weight:bold;
    // }


`

export const StoryNavigationBtns=styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    // display: flex;
    // justify-content:space-between;
    padding: 10px;
    // background-color: rgba(255, 255, 255, 0.8);
    width:100%;
`
export const NavButtons=styled.div`

    border-radius:50%;
    display:flex;
    justify-content:center;
    align-items:center;

    height: 50px;
    width:50px;
    background:${props=> props.disabled? 'lightGray':'white'};
    box-shadow:5px 5px 10px gray;
    z-index:1000;

    position:absolute;
    top:45%;

    cursor:${props=> props.disabled? '':'pointer'};

    left:${props=>props.prev? '1%':'85%'}

`

export const StoryMediaContainer=styled.div`

    height:500px;
    width:500px;
    background:black;
    display:${props=>props.display? 'block':'none'}

`

export const StoryContentContainer=styled.div`

    // background:white;

    display:flex;
    align-items:center;
    
    padding:1rem;
    padding-top:3rem;

    position:absolute;
    top:0%;

    width:100%;
    height:80px;

    // background: rgba(255,255,255,0.3);
    // -webkit-backdrop-filter: blur(10px);
    // backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255,255,255,0.15);

    & span{
        font-weight:bolder;
        color:white;
    }
`


export const AddStoryBox=styled.div`

    cursor:pointer;
    position:relative;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    grid-gap:10px;
    height: 520px;
    background: ${props=>props.color=='blue'?'linear-gradient(180deg, #86AFFF 0%, #B2F6FF 100%)':'linear-gradient(180deg, #FF7C7C 0%, rgba(255, 230, 0, 0.27) 100%);'};
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px 10px 0px 0px;
`

export const AddStoryBoxIcon=styled.div`

    width: 127.76px;
    height: 127.76px;
    background:white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius:50%;

    display:flex;
    justify-content:center;
    align-items:center;
`


export const FontColorCircle=styled.div`

    height:20px;
    width:20px;
    border-radius:50%;
    background:${props=>props?.color?.length? props?.color : `url(${ProfilePhotoRender(props?.image)})`};
    cursor:pointer;
    border:${props=>props.selected? '2px solid blue':''}
    
`

export const AddStoryMediaBox=styled.div`

    height: 600px;
    width:100%;
    background: black;
    border-radius: 35px;
    padding:1rem;
    position:relative;

    & .video-container{

        position:relative;

        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;

    }

`

export const AddStoryImageContainer=styled.div`

    height: 100%;
    background: ${props=> props?.color && props?.color?.length? props?.color : (props?.background ? `url(${ProfilePhotoRender(props?.background)})` : '')};
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;

    border-radius: 15px;
    padding:1rem;
    position:relative;

    // display:flex;
    // justify-content:center;
    // align-items:center;

`

export const AddStoryTextOnImage=styled.div`

    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);

    color:${props=>props.color};
    font-family:${props=>props?.fontStyle ?? 'Verdana'};
    font-size:32px;
    font-weight:bold;
    width:60%;


    & p{
        text-align:center;
        margin:0px;
        line-height:35px;
    }

`


export const StoryAudioContainer=styled.div`

    display:${props=>props.display ? 'flex':'none'};
    position:absolute;
    top:2%;
    left:5%;
    align-items:center;

    & p{
        margin:0px;
        color:black;
        font-size:20px;
        font-weight:bold;
    }
`


export const StoryProgressContainer=styled.div`

    position:absolute;
    top:1%;
    left:1%;
    width:100%;

    padding:5px;
    z-index:10000;

    display:flex;
    // grid-gap:1rem;
    
`

export const StoryProgressBar = styled.div`


    background: #d7d7d7;
    background: -webkit-linear-gradient(0deg, #d7d7d7 0%, #eeeeee 100%);
    background: linear-gradient(0deg, #d7d7d7 0%, #eeeeee 100%);
    border:1px solid white;
    border-radius:10px;
    margin:0 2px;
    width: ${props=>`${props.containerWidth}%`};
    height:5px;


    & .progress{
        
        background:#6E0C0D;
        width:${props=> props?.current ? `${props?.width}%` : '0%'};
        height:100%;
    }
    


`