import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';


import Login from "../login page/login";
import Tile from "../pages/tile/tilePage";
import Interview from "../pages/interview/interview";
import Question from "../pages/question/question";
import InterviewSchedule from "../pages/interviewSchedule/interviewSchedule";
import InterviewGrid from "../pages/interviewGrid/interviewGrid";




function RouterIndex() {

    return (
        <>
            
            <Router>


                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/tile" element={<Tile />} />
                    <Route path="/interview" element={<InterviewGrid />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/interviewSchedule" element={<InterviewSchedule />} />
                    <Route path="/interviewGrid" element={<InterviewGrid />} />
                </Routes>

            </Router>
        </>
    );
}

export default RouterIndex;