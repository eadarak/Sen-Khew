import { useRouteError } from "react-router-dom";


function PageError (){
    const error = useRouteError();
    return(
        
        <div>
            <h1>Une erreur est survenue</h1>
            <p>
                {error?.error?.toString() ?? error?.toString()}
            </p>
        </div>
    )
}
export default PageError;