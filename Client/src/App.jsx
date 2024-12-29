import React from 'react'
import Organization from './components/Organization'
import Home from './components/Home'
import {Route, Routes} from 'react-router-dom';
import AddOrg from './components/AddOrg';
import Team from './components/Team';
import Member from './components/Member';
import AddTeam from './components/AddTeam';
import { Toaster } from 'react-hot-toast';
import AddMember from './components/AddMember';
import Heirarchy from './components/Heirarchy';

function App() {
  return (
  <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/organization' element={<Organization/>} />
      <Route path='/addOrganization' element={<AddOrg/>}/>
      <Route path='/teams' element={<Team/>}/>
      <Route path='/addTeam' element={<AddTeam/>}/>
      <Route path='/member' element={<Member/>}/>
      <Route path='/addMember' element={<AddMember/>}/>
      <Route path='/heirarchy' element={<Heirarchy/>}/>

    </Routes>

    <Toaster/>
  </>
  )
}

export default App
