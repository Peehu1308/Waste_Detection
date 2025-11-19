import logo from './logo.svg';
import './App.css';
import Header_App from './Header';
import Banner from './Banner';
import Footer from './Footer';
import React from 'react';
import Works from './Components/Works';
import GamificationScreen from './Gamification';
import { BrowserRouter, Routes } from 'react-router-dom';
// import FeaturesScreen from './Screens/FeaturesScreen';

import { Route } from 'react-router-dom';
import Dashboard from './uploadscreen';
import Homescreen from './Homescreen';
import FeaturesPage from './Features';
import AboutPage from './About';
import ImpactPage from './Impact';

function App() {
  const [image,setimage]=React.useState(null);
  const [prediction,setPrediction]=React.useState("");

  const handleImageUpload=(e)=>{
    setimage(e.target.files[0]);

  };

  const handleSubmit=async()=>{
    if(!image){
      alert("Please upload an image first");
      return;
    }

    const formData=new FormData();
    formData.append("file",image);

    const res=await fetch("http://localhost:8000/predict",{
      method:"POST",
      body:formData,
    });

    const data=await res.json();
    setPrediction(data.prediction);
  }

  return (
    <div className="App bg-white">
      <BrowserRouter>
      <Routes>
        
        <Route path="/gamification" element={<GamificationScreen />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/home" element={<Homescreen/>}/>
        <Route path="/features" element={<FeaturesPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/impact" element={<ImpactPage/>}/>
      </Routes></BrowserRouter>
      
    </div>
  );
}

export default App;
