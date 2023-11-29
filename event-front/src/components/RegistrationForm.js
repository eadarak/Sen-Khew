import React, { Component } from 'react';
import './RegistrationForm.css'; // Assurez-vous d'importer le fichier CSS

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            phone: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = () => {
        // Vous pouvez ajouter ici la logique de validation des informations d'inscription
        // Par exemple, vérifier les informations dans une base de données ou un service backend

        // Rediriger vers la page de succès si l'inscription est réussie
        // this.props.history.push('/page-de-succes-inscription');
    }

    render() {
        return (
            <div className="form-container">
                <h2 style={{ color: '#000' }}>Bienvenu sur Sen Khew!</h2>
                <form id="registrationForm">
                    <label style={{ color: '#000' }} htmlFor="firstName">Prénom :</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="lastName">Nom :</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="address">Adresse :</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={this.state.address}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="email">E-mail :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="phone">Téléphone :</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <label style={{ color: '#000' }} htmlFor="confirmPassword">Confirmer le mot de passe :</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleInputChange}
                        required
                    /><br />

                    <button style={{ background: '#D8A43E', color: '#fff' }} type="button" onClick={this.handleSubmit}>S'inscrire</button>
                </form>
            </div>
        );
    }
}

export default RegistrationForm;
