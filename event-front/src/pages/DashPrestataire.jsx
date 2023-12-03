import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Card,
  CardContent,
  IconButton
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "../styles/Prest.css";

function DashPrestataire() {
  const [providerInfo, setProviderInfo] = useState({});
  const [events, setEvents] = useState([]);
  const [client, setClient] = useState([]);
  const token = sessionStorage.getItem("jwt");
  const decodedToken = token ? jwtDecode(token) : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const userName = decodedToken ? decodedToken.nom : null;
  //console.log(decodedToken)
  useEffect(() => {
    fetchClients();
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    // Fetch provider information from your API
    // Adjust the URL and headers as needed
    fetch(`http://localhost:8080/sen-khew/prestataires/${decodedToken.id}/evenements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let index = data._embedded.evenements.length
        console.log("Provider Info:", data._embedded.evenements[index]._links.client.href);
        
        setEvents(data._embedded.evenements);
      })
      .catch((err) => console.error(err));
  };
  
  const fetchClients = () => {
    
    fetch(`http://localhost:8080/sen-khew/clients`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Client Info:", data._embedded.clients);
        //data._embedded.evenements[data._embedded.evenements.length]._links.client.href)
        setClient(data._embedded.client);
      })
      .catch((err) => console.error(err));
  };

  
  const deleteEvent = (eventId) => {
    if (window.confirm("Are you sure to delete this event?")) {
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
            console.log("Event deleted successfully");
          } else {
            alert("Quelque chose s'est mal passé !");
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const redirectToWhatsApp = (clientWhatsApp) => {
    // Implement logic to redirect to WhatsApp using clientWhatsApp
    console.log("Redirecting to WhatsApp:", clientWhatsApp);
  };

  const columns = [
    { field: "nomEvenement", headerName: "Nom", width: 200 },
    { field: "typeEvenement", headerName: "Type", width: 200 },
    { field: "dateEvenement", headerName: "Date", width: 200 },
    { field: "lieuEvenement", headerName: "Lieu", width: 150 },
    { field: "descriptionEvenement", headerName: "Description", width: 150 },
    {
      field: "delete",
      headerName: "Supprimer",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton onClick={() => deleteEvent(row.data._links.self.href)}>
          <DeleteIcon color="black" />
        </IconButton>
      ),
    },
    {
      field: "contactWhatsApp",
      headerName: "Contact WhatsApp",
      sortable: false,
      filterable: false,
      renderCell: (row) => (
        <IconButton
          onClick={() => redirectToWhatsApp(row.data.contactWhatsApp)}
        >
          <WhatsAppIcon color="green" />
        </IconButton>
      ),
    },
  ];
  console.log("Events",events);
  return (
    <>
      <div>
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <h2 id="infoPrest">Informations du Prestataire</h2>
          <p id="prest">Nom: {userName}</p>
          {/*<p>Email: {}</p>*/}
          {/* Ajoutez d'autres informations du prestataire ici */}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 id="title">Événements du Prestataire</h2>
          <DataGrid
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: "rgba( 244, 208, 63, 0.34)",
            }}
            rows={events}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={(row) => row._links.self.href}
          />
        </CardContent>
      </Card>
    </div>
    <Footer />
    </>
  );
}

export default DashPrestataire;

