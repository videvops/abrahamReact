const LOCAL_URL = "http://localhost:8080";
const AZURE_URL = "https://backendublick.azurewebsites.net";


const Environment = ()=>{
    return LOCAL_URL;
}

export const TimeToReload =() => {
    return 6000;
}

export default Environment;