import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { DataGrid } from "@mui/x-data-grid";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Footer from '../components/Footer';
import "../styles/Dashboard.css";

function EventList() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const token = sessionStorage.getItem("jwt");

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? (decodedToken.id-3) : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const userName = decodedToken ? decodedToken.sub : null;
  
  console.log(userName)

  const fetchEvents = () => {
    fetch(`http://localhost:8080/sen-khew/clients/${userId}/evenements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse de l'API :", data);
        setEvents(data._embedded.evenements);
      })
      .catch((err) => console.error(err));
  };

  const deleteEvent = (eventId) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(eventId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            fetchEvents();
            setOpen(true);
          } else {
            alert("Quelque chose s'est mal passé !");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const columns = [
    { field: "nomEvenement", headerName: "Nom", width: 160 },
    { field: "typeEvenement", headerName: "Type", width: 160 },
    { field: "dateEvenement", headerName: "Date", width: 160 },
    { field: "lieuEvenement", headerName: "Lieu", width: 160 },
    { field: "descriptionEvenement", headerName: "Description", width: 160 },
    {
      field: "edit",
      headerName: "Modifier",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton
          onClick={() => {
            // Mettez en œuvre la logique pour ouvrir le formulaire de modification
            console.log("Modifier l'événement :", row.data);
          }}
        >
          <EditIcon color="black" />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Supprimer",
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton onClick={() => deleteEvent(row.data._links.self.href)}>
          <DeleteIcon color="black" />
        </IconButton>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        id="dashboard"
      >
        <h1>
          Mes événements
        </h1>
        <DataGrid
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba( 244, 208, 63, 0.34)",
            margin: 'auto'
          }}
          rows={events}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={1600}
          onClose={() => setOpen(false)}
          message="Evenement Supprime"
        />
      </div>
      <Stack
        style={{
          marginTop: "100px",
        }}
        mt={2}
        mb={2}
      >
        {/* Ajoutez votre composant de formulaire de modification ici */}
      </Stack>
      <Footer/>
    </React.Fragment>
  );
}

export default EventList;

