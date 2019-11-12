import { useState, useEffect } from "react";
import axios from "axios";

export default useAxios = (httpMethod, urlPath, requestData) => {
    const url = "https://randomuser.me/api/";

    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccessful, setIsSuccessful] = useState(false);

    axiosConfig = ({
        url: url + urlPath,
        responseType: "json",
        method: httpMethod
    });

    if (httpMethod.toUpperCase() === "PUT" && requestData !== null) axiosConfig.data = requestData;

    useEffect(async () => {
        await axios(axiosConfig)
            .then(result => {
                setResult({ data: result.data, status: result.status });
                setIsLoading(false);
                setIsSuccessful(true);
            })
            .catch(error => {
                setResult({ statusText: result.statusText, status: result.status });
                setIsLoading(false);
                setIsSuccessful(false);
            });
    }, []);

    return { result: result, isLoading: isLoading, isSuccessful: isSuccessful };
}