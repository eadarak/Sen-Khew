import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/AjoutPrestataire.css';
import '../styles/CreateEvent.css';
import AddPrest from "./AddPrest";



function CreateEvent() {
    const InitialEvent = {
        nomEvenement: '',
        typeEvenement: 'Familliale',
        lieuEvenement: '',
        descriptionEvenement: '',
        dateEvenement: ''
    };

    const token = sessionStorage.getItem('jwt');
    const tokenWithoutBearer = token ? token.split(" ")[2] : null;

    const [formData, setFormData] = useState(InitialEvent);
    const [eventId, setEventId] = useState(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        // Si le message de succès est présent, déclencher l'affichage
        if (successMessage) {
            setShowSuccessMessage(true);

            // Définir un intervalle pour vérifier périodiquement si le message doit être masqué
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (token === null) {
            setRedirectToLogin(true);
            return;
        }

        fetch("http://localhost:8080/sen-khew/evenements", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${tokenWithoutBearer}`
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de connexion au serveur');
            }
            if (response.status === 201) {
                return response.json();
                
            }
            return null
            
        })
        .then(data => {
            if (data) {
                setSuccessMessage(`Événement créé avec succès. ID de l'événement : ${data.idEvent}`);
                setEventId(data.idEvent);
                
                // Afficher l'ID dans la console
                console.log("ID de l'événement :", data.idEvent);
            }
        })
        .catch(error => {
            setErrorMessage(`Erreur lors de la création d'événement : ${error.message}`);
            setSuccessMessage('');
        });
        setFormData(InitialEvent);
    };     
    
    if (redirectToLogin) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        return <Navigate to="../pages/Login" />;
    }
    /* -------------------------------------------------------------------------*/
    
    /* -------------------------------------------------------------------------*/


    return(
        <>  
            {showErrorMessage && <div className="error-message">{errorMessage}</div>}
            {showSuccessMessage && <div className="success-message">{successMessage}</div>}

        <div id="createPage">
        <div id="page">

        {eventId ?(
            <AddPrest eventId={eventId}/>
        ):(
            <div id='createEvent'> 
            <h1>Page de création d'événement</h1>
                <form onSubmit={handleSubmit} id="eventForm">
                    <label>
                        Nom de l'événement:
                        <input
                        type="text"
                        id="nomEvenement"
                        name="nomEvenement"
                        value={formData.nomEvenement}
                        onChange={handleChange}
                        required
                        />
                    </label>    
                    <label>
                        Type de l'événement:
                        <select
                            id="typeEvenement"
                            name="typeEvenement"
                            value={formData.typeEvenement}
                            onChange={handleChange}
                        >
                            <option value="Familliale">Familliale</option>
                            <option value="religieuse">Religieuse</option>
                            <option value="professionnelle">Professionnelle</option>
                            <option value="autres">Autres</option>
                        </select>
                    </label>    
                    <label>
                        Lieu de l'événement:
                        <input
                        type="text"
                        id="lieuEvenement"
                        name="lieuEvenement"
                        value={formData.lieuEvenement}
                        onChange={handleChange}
                        required
                        />
                    </label>    
                    <label>
                        Description de l'événement:
                        <textarea
                        id="descriptionEvenement"
                        name="descriptionEvenement"
                        value={formData.descriptionEvenement}
                        onChange={handleChange}
                        />
                    </label>    
                    <label>
                        Date de l'événement:
                        <input
                        type="date"
                        id="dateEvenement"
                        name="dateEvenement"
                        value={formData.dateEvenement}
                        onChange={handleChange}
                        required
                        />
                    </label>    
                    <button type="submit" id="create"> Create Event</button>
                </form>
            </div>
        )}

        </div>
        <Footer/>
        </div>
        
        <Outlet/>
        </>
    )
}
export default CreateEvent;