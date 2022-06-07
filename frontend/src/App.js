import React from 'react';
import { BrowserRouter, Switch, Route, } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import VideoUpload from './pages/VideoUpload';
import SearchPage from './pages/SearchPage';
import CreatorProfile from './pages/CreatorProfile';
import FollowingList from './pages/FollowingList';
import Landing from './components/Landing'
import ContentPage from './pages/ContenPage/ContentPage';
import Messages from './pages/Messages';

function App(props){
  return(
    <BrowserRouter>
      <Navbar />
      <Switch>

        {sessionStorage.getItem("Subfluence-user") == null ? 
        
          <Route path='/' exact component={Landing}/>

        :
        
          <Route path='/' exact component={Home}/>
        
        }

        <Route path='/signin' exact component={SignIn}/>
        <Route path='/signup' exact component={SignUp}/>
        <Route path='/profile' exact component={Profile}/>
        <Route path='/creator/:creator' exact component={CreatorProfile}/>
        <Route path='/upload' exact component={VideoUpload}/>
        <Route path='/search' exact component={SearchPage}/>
        <Route path='/following' exact component={FollowingList}/>
        <Route path='/content/:contentId' exact component={ContentPage}/>
        <Route path='/messages' exact component={Messages}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
