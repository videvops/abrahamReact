const LOCAL_URL = "http://localhost:8080";
const AZURE_URL = "https://backendublick.azurewebsites.net";


const Environment = ()=>{
    return AZURE_URL;
    //return LOCAL_URL
}

export default Environment;