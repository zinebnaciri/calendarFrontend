import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExamComponent() {
  const [examDataList, setExamDataList] = useState([]);

  useEffect(() => {
    // Make the API request to fetch exam data
    axios.get('api/exams/all')
      .then(response => {
        setExamDataList(response.data);
      })
      .catch(error => {
        console.error('Error fetching exam data:', error);
      });
  }, []);

  if (examDataList.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin:'20px'}}>
      {examDataList.map(examData => (
        <div key={examData.id}>
          <p>Nom: {examData.nom}</p>
          <p>Duree: {examData.duree}</p>
          <p>Date and Time: {examData.dateTime}</p>
          <p>Module Nom: {examData.moduleEntity?.nom}</p>
          <p>Salle Nom: {examData.salle?.nom}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ExamComponent;