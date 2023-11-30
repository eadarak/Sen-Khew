import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { DataGrid } from "@mui/x-data-grid";
import { jwtDecode } from "jwt-decode";

function Dashboard() {
  const [providerInfo, setProviderInfo] = useState({});
  const [events, setEvents] = useState([]);
  const token = sessionStorage.getItem("jwt");

  useEffect(() => {
    fetchProviderInfo();
    fetchEvents();
  }, []);

  const fetchProviderInfo = () => {
    // Fetch provider information from your API
    // Adjust the URL and headers as needed
    fetch("http://localhost:8080/sen-khew/provider-info", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Provider Info:", data);
        setProviderInfo(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchEvents = () => {
    // Fetch provider's events from your API
    // Adjust the URL and headers as needed
    fetch("http://localhost:8080/sen-khew/provider-events", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Provider Events:", data);
        setEvents(data._embedded.evenements);
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
          <WhatsAppIcon color="black" />
        </IconButton>
      ),
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <h2>Informations du Prestataire</h2>
          <p>Nom: {providerInfo.nom}</p>
          <p>Email: {providerInfo.email}</p>
          {/* Ajoutez d'autres informations du prestataire ici */}
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2>Événements du Prestataire</h2>
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
  );
}

export default Dashboard;

