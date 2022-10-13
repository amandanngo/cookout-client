import './App.css';
import {Routes, Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import LogInPage from './pages/LogInPage';
import HomePage from './pages/HomePage';
import AddEventPage from './pages/AddEventPage';
import AddRecipePage from './pages/AddRecipePage'
import ProfilePage from './pages/ProfilePage';

import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import SingleRecipePage from './pages/SingleRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import LandingPage from './pages/LandingPage';


function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={
          <IsAnon>
            <SignUpPage />
          </IsAnon>
        }
        />
        <Route path="/login" element={
          <IsAnon>
            <LogInPage />
          </IsAnon>
          } 
        />
        <Route path="/home" element={
          <IsPrivate>
            <HomePage />
          </IsPrivate>
        } />
        <Route path="/add-event" element={
          <IsPrivate>
            <AddEventPage />
          </IsPrivate>
        } />
        <Route path="/add-recipe" element={
          <IsPrivate>
            <AddRecipePage />
          </IsPrivate>
        } />
        <Route path="/profile" element={
          <IsPrivate>
            <ProfilePage />
          </IsPrivate>
        } />
      <Route path="/recipe/:recipeId" element={
          <IsPrivate>
            <SingleRecipePage />
          </IsPrivate>
        } />
      <Route path="/recipe/:recipeId/edit" element={
          <IsPrivate>
            <EditRecipePage />
          </IsPrivate>
        } />
      </Routes>
    </div>
  );
}

export default App;
