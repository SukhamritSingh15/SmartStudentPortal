
import React, { useState, useEffect } from "react"; 
import { Routes, Route, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
// --- FIREBASE IMPORTS ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


import Sidebar from "./components/Sidebar";
import CGPACalculator from "./components/CGPAcalculator";
import Attendance from "./components/Attendance";
import Help from "./components/Help";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Communication from "./components/Communication";
import Notice from "./components/Notice";
import Mainpage from "./components/mainpage";
import Login from "./components/login";
import Myinfo from "./components/Myinfo";
import Performance from "./components/Performance.jsx";

import Apply from "./components/Apply.jsx";

import Chatbot from "./components/Chatbot.jsx"; 

// Global variables provided by the environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
// CRITICAL: Parse the config, defaulting to an empty object
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialization variables
let app;
let authInstance = null;
let dbInstance = null;

// --- CONFIGURATION VALIDATION AND INITIALIZATION ---
// Check if the configuration has the necessary apiKey before initialization
if (firebaseConfig && firebaseConfig.apiKey) {
    try {
        app = initializeApp(firebaseConfig);
        authInstance = getAuth(app);
        dbInstance = getFirestore(app);
        console.log("Firebase initialized successfully.");
    } catch (e) {
        console.error("Firebase initialization failed:", e);
    }
} else {
    // If config is bad, we set auth/db to null and log a warning instead of crashing
    console.error("Firebase configuration (or apiKey) is missing or invalid. Authentication and Firestore services are disabled.");
    console.log("Received firebaseConfig:", firebaseConfig);
}

// Export the instances (which might be null if initialization failed)
export const auth = authInstance; 
export const db = dbInstance; 
// ----------------------------------------------------


function App() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // 1. Authentication Listener and Initial Sign-in
  useEffect(() => {
    // Attempt to sign in with custom token or anonymously
    const signIn = async () => {
      // CRITICAL GUARD: Do not proceed if Firebase Auth failed to initialize
      if (!auth) {
        setIsAuthReady(true);
        console.warn("Skipping sign-in attempt because Firebase Auth is not initialized (Invalid API Key).");
        return; 
      }

      try {
        if (initialAuthToken) {
          await signInWithCustomToken(auth, initialAuthToken);
        } else {
          // Fallback to anonymous sign-in if no custom token is available
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase Auth Error during initial sign-in:", error);
      }
    };

    // Set up the state change listener only if auth is available
    let unsubscribe = () => {};
    if (auth) {
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsAuthReady(true);
            console.log("Firebase Auth State Changed. User ID:", currentUser?.uid);
        });
    } else {
        // If auth is null (due to bad config), we must set auth ready manually
        setIsAuthReady(true);
    }


    signIn();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);


  // Routes where sidebar should NOT appear
  const noSidebarRoutes = ["/mainpage", "/login"];

  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  // If authentication is not yet ready, show a simple loading screen
  if (!isAuthReady) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading Portal...
      </div>
    );
  }
  

  return (
    <>
      {/* Sidebar only if NOT hidden */}
      {!hideSidebar && <Sidebar />}

      {/* All Pages */}
      <Routes>
        <Route path="/cgpa" element={<CGPACalculator />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/help" element={<Help />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communication" element={<Communication />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myinfo" element={<Myinfo />} />
        <Route path="/performance" element={<Performance />} />

        <Route path="/Apply" element={<Apply/>} />



        
        <Route path="/ai-assistant" element={<Chatbot />} /> 


        {/* Page without Sidebar */}
        <Route path="/mainpage" element={<Mainpage />} />

        {/* Default */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
