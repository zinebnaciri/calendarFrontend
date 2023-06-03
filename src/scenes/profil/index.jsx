import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/bootstrap.min.css';
import '../../css/profile_details.css';
import Modal from '@mui/material/Modal';
import PasswordChanger from './tache/passwordChange.jsx';
import { TextField } from '@mui/material';
import BasicModal from './tache/modal.jsx';

export default function ProfileUser() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const username = localStorage.getItem('username');

  const [userData, setUserData] = useState({
    id:'',
    nom: '',
    email: '',
    prenom: '',
    telephone: '',
    matricule: '',
    filiere: ''
  });

  useEffect(() => {
    if (username) {
      axios
        .get(`/api/user/find/${username}`)
        .then(response => {
          const { data } = response;
          setUserData(data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [username]);

  return (
    <div className="container" style={{ marginTop: 20, marginBottom: 30 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PasswordChanger />
      </Modal>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body mt-5">
              <div className="account-settings">
                <div className="user-profile">
                  <div className="user-avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar1.png"
                      alt="profile"
                    />
                  </div>
                  <h5 className="user-name" style={{ color: 'white' }}>
                    {userData.nom}
                  </h5>
                  <h6 className="user-email">{userData.email}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="card h-100">
            <div className="card-body">
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mb-3 text-primary" style={{ textAlign: 'left' }}>
                    Personal Details
                  </h6>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group" style={{ textAlign: 'left' }}>
                    <label htmlFor="eMail">Nom</label><br />
                    <TextField
                      id="nom"
                      value={userData.nom}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label><br />
                    <TextField
                      id="email"
                      value={userData.email}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="phone">Prenom</label><br />
                    <TextField
                      id="prenom"
                      value={userData.prenom}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="website">Telephone</label><br />
                    <TextField
                      id="telephone"
                      value={userData.telephone}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="Street">Matricule</label><br />
                    <TextField
                      id="matricule"
                      value={userData.matricule}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="filiere">Filiere</label><br />
                    <TextField
                      id="filiere"
                      value={userData.filiere}
                      variant="standard"
                      InputProps={{
                        readOnly: true,
                        style: { color: 'white' }
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="text-right">
                    <button
                      type="button"
                      id="submit"
                      onClick={handleOpen}
                      name="submit"
                      className="btn btn-primary"
                    >
                      Changer Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BasicModal />
      </div>
    </div>
  );
}
