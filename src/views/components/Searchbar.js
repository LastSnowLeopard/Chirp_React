import React from 'react'
import { Search } from 'react-feather'
import { Input, InputGroup, InputGroupText } from 'reactstrap'
import ButtonLoader from './button-loader'


const SearchBar=(props)=>{

    const {onChange,placeholder,loading,viewSearchIcon} = props

    return(
        <div>
            <InputGroup 
            style={{
                borderRadius:'20px',
                padding:'4px',
                background:'lightGray'
                // background:'#F0F2F5'
            }}>
                <InputGroupText 
                style={{
                    background:'transparent',
                    border:'none'
                }}
                className='border-none'>
                    <Search size={20} />
                </InputGroupText>
                <Input
                style={{
                    background:'transparent',
                    border:'none'
                }} 
                placeholder={placeholder}
                onChange={onChange}
                />
                <InputGroupText 
                style={{
                    background:'transparent',
                    border:'none'
                }}
                className='border-none'>
                    {
                        loading?
                        <ButtonLoader/>:''
                    }
                </InputGroupText>
            </InputGroup>
        </div>
    )
}
export default SearchBar