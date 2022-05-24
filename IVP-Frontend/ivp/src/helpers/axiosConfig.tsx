const base_URL="http://localhost:4000/admin"
function Config(PARAM:any,METHOD:any,DATA?:any) {
    var config = {
        method: METHOD,
        url: base_URL+PARAM,
        headers: {
            'Content-Type': 'application/json'
        },
        data: DATA
    }
    return config;
};


var axiosConfig = {
    Config: Config
}



export default axiosConfig;