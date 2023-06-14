// ** React Imports
import { useState } from 'react'

// ** Reactstrap Imports
import { TabContent, Card,TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap'
import { ParagraphColor } from '../../../utility/snippets/snippets'
import OverviewTab from './OverviewTab'
import { useSkin } from '@hooks/useSkin'
import WorkAndEducation from './WorkAndEducation'
import PlacesTab from './PlacesTab'
import { useEffect } from 'react'
import { getAboutSectionData } from '../../../redux/Action/Profile'
import FamilyAndRelationship from './FamilyAndRelationship'
import LifeEvents from './LifeEvents'
import BasicInfo from './BasicInfo'



const AboutSection = () => {

  const { skin, setSkin } = useSkin()

  // ** States
  const [active, setActive] = useState('1')


  useEffect(()=>{

    getAboutSectionData()
    
  },[])

  const toggle = tab => {
    setActive(tab)
  }
  return (
    <Card className='p-1'>
        <Row>
        <Col md='4' sm='12' style={{borderRight:'1px solid gray'}}>
          <Nav className='flex-grow-1' pills vertical>
              <p className={`text-${ParagraphColor[skin]} fs-3 fw-bolder`}>About</p>
            <NavItem>
              <NavLink
                active={active === '1'}
                onClick={() => {
                  toggle('1')
                }}
                className='justify-content-start'
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '2'}
                onClick={() => {
                  toggle('2')
                }}
                className='justify-content-start'
              >
                Work and Education
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '3'}
                onClick={() => {
                  toggle('3')
                }}
                className='justify-content-start'
              >
                Places Lived
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '4'}
                onClick={() => {
                  toggle('4')
                }}
                className='justify-content-start'
              >
                Contact and Basic Info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={active === '5'}
                onClick={() => {
                  toggle('5')
                }}
                className='justify-content-start'
              >
                Family and Relationships
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink
                active={active === '6'}
                onClick={() => {
                  toggle('6')
                }}
                className='justify-content-start'
              >
                Details About you
              </NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink
                active={active === '7'}
                onClick={() => {
                  toggle('7')
                }}
                className='justify-content-start'
              >
                Life Events
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <Col md='8' sm='12'>
          <TabContent activeTab={active}>
            <TabPane tabId='1'>
              <OverviewTab/>
            </TabPane>
            <TabPane tabId='2'>
              <WorkAndEducation/>
            </TabPane>
            <TabPane tabId='3'>
                <PlacesTab/>
            </TabPane>
            <TabPane tabId='4'>
                <BasicInfo/>
            </TabPane>
            <TabPane tabId='5'>
                <FamilyAndRelationship/>
            </TabPane>
            <TabPane tabId='7'>
                <LifeEvents/>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Card>
  )
}
export default AboutSection
