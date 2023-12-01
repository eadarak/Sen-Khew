import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');


function AddPrest({ eventId }) {
    const token = sessionStorage.getItem('jwt');
    const tokenWithoutBearer = token ? token.split(" ")[2] : null;
    const [prestataires, setPrestataires] = useState([]);
    const [selectedPrestataireId, setSelectedPrestataireId] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [askForNewPrestataire, setAskForNewPrestataire] = useState(false);
    const [showModal, setShowModal] = useState(false);


        


    useEffect(() => {
        if (successMessage) {
            setShowSuccessMessage(true);

            const intervalId = setInterval(() => {
                setShowSuccessMessage(false);
            }, 2000); // 2000 millisecondes = 2 secondes

            // Nettoyer l'intervalle lorsque le composant est démonté ou lorsqu'un nouveau message de succès est affiché
            return () => clearInterval(intervalId);
        }
    }, [successMessage]);

    useEffect(() => {
        // Si le message de succès est présent, déclencher l'affichage
        if (errorMessage) {
            setShowErrorMessage(true);

            // Définir un intervalle pour vérifier périodiquement si le message doit être masqué
            const intervalId = setInterval(() => {
                setShowErrorMessage(false);
            }, 2000); // 2000 millisecondes = 2 secondes

            // Nettoyer l'intervalle lorsque le composant est démonté ou lorsqu'un nouveau message de succès est affiché
            return () => clearInterval(intervalId);
        }
    }, [errorMessage]);


    useEffect(() => {
        // Fetch prestataires data
        fetch("http://localhost:8080/sen-khew/prestataires", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${tokenWithoutBearer}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de connexion au serveur');
            }
            return response.json();
        })
        .then(data => {
            console.log(data._embedded.prestataires);
            setPrestataires(data._embedded.prestataires);
        })
        .catch(error => {
            console.error(`Erreur lors de la récupération des prestataires : ${error.message}`);
        });
    }, [tokenWithoutBearer]);

    const extractIdFromUrl = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const handleSelectChange = (e) => {
        const selectedId = extractIdFromUrl(e.target.value);
        setSelectedPrestataireId(selectedId);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Vérifiez que selectedPrestataireId est défini
        if (!selectedPrestataireId) {
            console.error("L'ID du prestataire sélectionné n'est pas défini.");
            return;
        }

        // Effectuer la requête POST vers /sen-khew/evenements/{idEvenement}/prestataires
        fetch(`http://localhost:8080/sen-khew/evenements/${eventId}/prestataires?existingPrestataireIds=${selectedPrestataireId}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${tokenWithoutBearer}`
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de lajout du prestataire à l événement');
            }
            setSuccessMessage(`Prestataire ${selectedPrestataireId} ajouté avec succès à l'événement ${eventId}`);
            setAskForNewPrestataire(true);

        })
        
        .catch(error => {
            setErrorMessage(`Erreur lors de l'ajout du prestataire à l'événement : ${error.message}`);
        });
    };
    const navigate = useNavigate();

    useEffect(() => {
        if (successMessage) {
            setShowModal(true);

            const modalTimeout = setTimeout(() => {
                setSuccessMessage(null); // Réinitialiser le message de succès après la fermeture de la boîte modale
            }, 2000); // 2000 millisecondes = 2 secondes

            return () => clearTimeout(modalTimeout);
        }
    }, [successMessage]);

    return (
        <>
            {showErrorMessage && <div className="error-message">{errorMessage}</div>}
            {showSuccessMessage && <div className="success-message">{successMessage}</div>}
            
            <div id='addPrestataire'> 
                <h1>Page d'ajout de prestataire</h1>
                <form onSubmit={handleSubmit} id="prestForm">
                    {eventId && (
                        <>
                            <select onChange={handleSelectChange}> 
                                <option value="" disabled selected hidden>Sélectionnez un prestataire</option>
                                {Array.isArray(prestataires) && prestataires.map(prestataire => (
                                    <option key={prestataire._links.self.href} value={prestataire._links.self.href}>
                                        {prestataire.nomPrestataire} -  {prestataire.typeService}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" id="create"> Ajouter Prestataire à l'événement</button> 
                        </>
                    )}
                </form>
            </div>  
            {/* Boîte modale React Modal */}
            <Modal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        padding: '20px',
                        borderRadius: '8px',
                        maxWidth: '400px',
                        margin: 'auto',
                        height:'14%',
                        bottom: '80%',
                        
                    },
                }}
            >
                <p style={{fontFamily:'Libre Baskerville', fontSize:'1.2    rem',paddingBottom:'10px'}}>Voulez-vous vraiment ajouter un nouveau prestataire ?</p>
                <button onClick={() => { 
                    setAskForNewPrestataire(true); 
                    setShowModal(false);
                }} 
                style={{
                    padding:'10px',
                    borderRadius:'10px',
                    width:'20%',
                    fontSize:'16px',
                    fontFamily:'Libre Baskerville',
                    color:'white',
                    backgroundColor:'green',
                    marginRight:'20%'
                }}>
                    Oui
                </button>
                <button onClick={() => { 
                    setAskForNewPrestataire(false);
                    navigate('../pages/DashClient'); 
                    setShowModal(false);
                }} 
                style={{
                    padding:'10px',
                    borderRadius:'10px',
                    width:'20%',
                    fontSize:'16px',
                    fontFamily:'Libre Baskerville',
                    color:'white',
                    backgroundColor:'red',
                    marginLeft:'20%'
                }}>
                    Non
                </button>
            </Modal>
        </>
    );
}

export default AddPrest;