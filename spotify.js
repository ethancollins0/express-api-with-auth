function getSongs(){
    
}


function getToken(){
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Basic OWMwMzQ0ZWNlNWZiNDMzOWFhNzlkMzg4MWFlY2U3YWM6MGY5M2Q4Y2VhMGIzNDU4Nzk2ZGVkNjhjZjMzYzYzMmQ='
        },
        body: {
            'grant_type': 'client_credentials'
        }
    }).then(resp => resp.json())
    .then(console.log)
}

getToken()








module.exports = {
    getSongs,
}