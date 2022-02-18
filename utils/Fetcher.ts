export const Fetcher = async (url,data) => 
    fetch(window.location.origin + url, {
        method: !data ? "GET" : "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data) 
    }).then(result => result.json())