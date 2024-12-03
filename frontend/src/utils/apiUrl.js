const getApiUrl = () => {
    let hostname = window.location.hostname;

    if (hostname === "localhost" || hostname === "127.0.0.1") {
        return "http://localhost:6789";
    }

    if (hostname.startsWith('www.')) {
        hostname = hostname.substring(4);
    }

    return `http://api.${hostname}`;
}

export default getApiUrl;