import React, {createContext, useState} from 'react';
import InterviewGrid from '../pages/interviewGrid/interviewGrid';
import Interview from '../pages/interview/interview';
interface old{
    oldId:ObjectConstructor | undefined;
    setOldId:(data:any) => void
}

export const QuestionContext  = createContext<old>(undefined!);

export const QuestionProvider = () => {
    const [oldId, setOldId] = useState();
    return (
      <QuestionContext.Provider value={{oldId, setOldId}} >
        <Interview/>
        <InterviewGrid/>
      </QuestionContext.Provider>
    );
  };
