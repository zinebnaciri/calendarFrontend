import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';
import axios from 'axios';
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from '@fullcalendar/core/locales/fr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from '@mui/material';

export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [moduleOptions, setmoduleOptions] = useState([]);
  const [salleOptions, setSalleOptions] = useState([]);
  const [moduleValue, setmoduleValue] = useState('');
  const [salleValue, setSalleValue] = useState('');
  const [dureeValue, setDureeValue] = useState('');
  const [durationOptions] = useState(['09', '10', '11', '12', '13', '14', '15', '16', '17']);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/exams/all");
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchModuleOptions() {
      try {
        const response = await axios.get("/api/modules/all");
        if (response.status === 200) {
          setmoduleOptions(response.data);
        } else {
          console.error("Failed to fetch modules options");
        }
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchSalleOptions() {
      try {
        const response = await axios.get("/api/salles/all");
        if (response.status === 200) {
          setSalleOptions(response.data);
        } else {
          console.error("Failed to fetch salle options");
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchEvents();
    fetchModuleOptions();
    fetchSalleOptions();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEvent = {
      nom: formData.get("exam_name"),
      dateTime: formData.get("date"),
      moduleId: moduleValue ? moduleOptions.find((option) => option.nom === moduleValue)?.id : null,
      salleId: salleOptions.find((option) => option.nom === salleValue)?.id,
      duree: dureeValue,
    };

    try {
      const response = await axios.post("/api/exams/create", newEvent);
      if (response.status === 200) {
        const savedEvent = response.data;
        setEvents((prevEvents) => [...prevEvents, savedEvent]);
        setShowForm(false);
        setShowModal(false);
      } else {
        toast.error('There is already an exam in this class at this time');
      }
    } catch (error) {
      console.error(error);
      toast.error('There is already an exam in this class at this time');
    }
  };


  return (
    <div>
      <Button color="secondary" variant="contained" sx={{ margin: '10px' }} onClick={() => setShowModal(true)}>Add Event</Button>
      {showModal && (

        <Modal open={showModal} >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh', // Adjust this value to control the vertical centering
            }}
            onClick={() => setShowModal(false)}
          >
            <div
              style={{
                color: 'black',
                margin: '20 auto',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '5px',
                width: '80%',
                maxWidth: '600px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '10px' }}>
                  Name Of Exam:
                  <input type="text" name="exam_name" required />
                </label>

                <label style={{ marginBottom: '10px' }}>
                  Date of exam:
                  <input type="date" name="date" required />
                </label>
                <div style={{ marginBottom: '10px' }}>
                  <label >
                    Module:
                    <Autocomplete
                      name="module"
                      items={moduleOptions}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={{
                            background: isHighlighted ? 'lightgray' : 'white',
                          }}
                        >
                          {item.nom}
                        </div>
                      )}
                      getItemValue={(item) => item.nom.toString()}
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredOptions = moduleOptions.filter((option) =>
                          option.nom.toLowerCase().includes(value.toLowerCase())
                        );
                        setmoduleOptions(filteredOptions);
                      }}
                      onSelect={(value) => {
                        setmoduleValue(value);
                      }}
                      value={moduleValue}
                      inputProps={{
                        required: true,
                      }}
                    />
                  </label>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label >
                    Salle:
                    <Autocomplete
                      name="salle"
                      items={salleOptions}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={{
                            background: isHighlighted ? 'lightgray' : 'white',
                          }}
                        >
                          {item.nom}
                        </div>
                      )}
                      getItemValue={(item) => item.nom.toString()}
                      onChange={(e) => {
                        const value = e.target.value;
                        const filteredOptions = salleOptions.filter((option) =>
                          option.nom.toLowerCase().includes(value.toLowerCase())
                        );
                        setSalleOptions(filteredOptions);
                      }}
                      onSelect={(value) => {

                        setSalleValue(value);
                      }}
                      value={salleValue}
                      inputProps={{
                        required: true,
                      }}
                    />
                  </label>
                </div>

                <label style={{ marginBottom: '10px' }}>
                  Duration:
                  <Autocomplete
                    name="duree"
                    items={durationOptions}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={{
                          background: isHighlighted ? 'lightgray' : 'white',
                        }}
                      >
                        {item}
                      </div>
                    )}
                    getItemValue={(item) => item.toString()}
                    onChange={(e) => {
                      const value = e.target.value;
                      const filteredOptions = durationOptions.filter((option) =>
                        option.includes(value)
                      );

                      setDureeValue(filteredOptions);
                    }}
                    onSelect={(value) => {
                      setDureeValue(value);
                    }}
                    value={dureeValue}
                    inputProps={{
                      required: true,
                    }}
                  />
                </label>

                <button type="submit">Add Exam to Calendar</button>
              </form>
            </div>
          </div>
        </Modal>

      )}
      <Fullcalendar

        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events.map((event) => ({
          title: event.nom,
          start: event.dateTime,

          ...event.extendedProps,
        }))}
        locales={[frLocale]}
        locale="fr"
      />
      <ToastContainer />
    </div>
  );
}