
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';
import "../styles/CreateEvent.css";
import "bootstrap/dist/css/bootstrap.css"

function CreateEvent() {
    return <>
    <div>
        <div>   
            <div className="contents">
                <form >
                    <div class=" mb-3">
                        <label for="Nom" >Nom : </label>
                        <input type="text"  class="form-control" placeholder="Votre Nom" size="60"/>
                    </div>
                    <br></br>
                    <div class="mb-3">
                        <label >E-mail : </label>
                        <input type="email"  class="form-control" placeholder="Votre E-mail" size="60"/>
                    </div>
                    <br></br>
                    <div class="mb-3">
                        <label >Telephone : </label>
                        <input type="tel"  class="form-control" placeholder="Votre Telephone" size="60"/>
                    </div>
                    <br></br>                   
                    <div class="mb-3">
                        <label >lieu d'evenement : </label>
                        <input type="text"  class="form-control" placeholder="Lieu d'evenement" size="60"/>
                    </div>
                    <br></br>
                    <div class="mb-3">
                        <label >Date de l'evenement : </label>
                        <input type="date"  class="form-control" size="60"/>
                    </div>
                   <br></br>
                   <div class="mb-3">
                        <label >type d'evenement : </label>
                        <select>
                            <option>Mettez le type d'evenement</option>
                            <option>Mariage</option>
                            <option>Bapteme</option>
                            <option>Anniversaire</option>
                            <option>Thiante</option>
                            <option>Communion/Confirmation</option>
                            <option>Seminaire</option>
                        </select>
                    </div>
                    <br></br>  
                    <div>
                        <label  for="commentaire">  Description: </label><br></br>
                        <textarea  cols="62" id="commentaire" rows="5" name="Commentaire"></textarea>
                    </div> <br></br>
                    <div className="buttons">
                        <input  type="submit" class="btn btn-success" value="Envoyer" name="Envoyer"  size="60"/>
                        {/* <button style={{ background: '#D8A43E', color: '#fff' }} type="button" onClick={this.handleSubmit}>Se Connecter</button> */}

                    </div>
                    <br></br>   
                </form>    
            </div>
            <Footer/>
        </div>
        <ScrollTopButton/>
        <Outlet/>
    </div>
</>
}
export default CreateEvent;