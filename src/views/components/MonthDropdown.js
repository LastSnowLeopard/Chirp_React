import React from 'react'
import { useState } from 'react'
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { ParagraphColor, monthOptions, yearOptions } from '../../utility/snippets/snippets'
import { ChevronDown, ChevronsDown } from 'react-feather'
import { YearContainer } from '../Styled-Components'
import { useSkin } from '@hooks/useSkin'




const MonthDropdown=(props)=>{

    const {selected,setSelected} = props
    
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen((prevState) => !prevState)

    const {skin,setSkin} = useSkin()

    return(
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="span"
                    style={{width:'100px',height:'50px',fontWeight:'bold',color:'black',padding:'1rem',background:'#E0E2E6',borderRadius:'10px'}}
                >
                    {selected!=-1? selected.label:'Month'}
                    <ChevronDown size={15}/>
                </DropdownToggle>
                <DropdownMenu className='overflow-auto' style={{height:'200px',width:'300px'}}>
                    {
                        monthOptions.map(month=>{
                            return(
                                <YearContainer 
                                onClick={()=>{
                                    setSelected(month);
                                    toggle()
                                }} 
                                skin={skin} 
                                key={month.value} 
                                className='border-bottom'
                                >
                                    <span className={`fw-bolder text-${ParagraphColor[skin]}`}>{month.label}</span>
                                </YearContainer>
                            )
                        })
                    }
                </DropdownMenu>
            </Dropdown>
        </div>
    )
}
export default MonthDropdown