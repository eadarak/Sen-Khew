import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/CreateEvent.css';


function CreateEvent() {
    const InitialEvent = {
        nomEvenement: '',
        typeEvenement: 'Familliale',
        lieuEvenement: '',
        descriptionEvenement: '',
        dateEvenement: ''
    };
    // State pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] = useState(InitialEvent);
    const [eventId, setEventId] = useState('');

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch("http://localhost:8080/sen-khew/evenements",{
                method:"POST", 
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            if(!response.ok){
                throw new Error('Erreur de connexion au serveur');
            }
                const data = await response.json();
                alert("create event success",data._links.self)
                const urlId= data._links.self.href;
                        // Utilisez la version fonctionnelle de setEventId pour garantir l'état actuel
                setEventId((prevEventId) => {
                    console.log(prevEventId); // La valeur précédente
                    console.log(urlId); // La nouvelle valeur que vous allez définir
                    return urlId; // La nouvelle valeur que vous définissez
                });
                console.log(eventId);
            
        }catch (error) {
            alert("Erreur lors de la creation d'evenement", error.message);
        };
    };

    return(
        <>
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
                <br />

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
                <br />

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
                <br />

                <label>
                    Description de l'événement:
                    <textarea
                    id="descriptionEvenement"
                    name="descriptionEvenement"
                    value={formData.descriptionEvenement}
                    onChange={handleChange}
                    />
                </label>
                <br />

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
                <br />

                <button type="submit" id="create"> Create Event</button>
            </form>
            
        </div>
        <Footer/>
        <Outlet/>
        </>
    )
}
export default CreateEvent;