const axios = require('axios');


const getLanguageById = (lang)=>{

    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }

    return language[lang.toLowerCase()];
}

const submitBatch = async(submissions)=>{

    const options = {
    method: 'POST',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
        base64_encoded: 'false'
    },
    headers: {
        'x-rapidapi-key': '8da9c21806msh71c8976bb708c1dp13f531jsn23455c323845',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json'
    },
    data: {
        submissions
    }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    
    //response is in form of takens we need those thoken to send again to judge 0 for status code for each submissions
    return await fetchData();
}

const waiting = async(timer)=>{
    setTimeout(()=>{
        return 1;
    },timer);
}

const submitToken = async(resultToken)=>{

    const options = {
    method: 'GET',
    url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
    params: {
        //accepts token in form of string separated by comma;
        tokens:resultToken.join(","),
        base64_encoded: 'false',
        fields: '*'
    },
    headers: {
        'x-rapidapi-key': '8da9c21806msh71c8976bb708c1dp13f531jsn23455c323845',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
    }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    //if status id 1 or 2 means its still in queue;

    while(true){
        const result = await fetchData();

        const isResultObtained = result.submissions.every((r)=>r.status_id>2);

        if(isResultObtained)
            return result.submissions;

        await waiting(1000);
   }
}

module.exports = {submitBatch,getLanguageById,submitToken};