const domain = 'https://bildy-rpmaya.koyeb.app';

export async function signup({ name, surname, email, password }){

    // Fetch signup endpoint
    return await fetch(`${domain}/api/user/register`, { 
        method : 'POST', 
        headers : { 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify({ 
            email : email, 
            password : password 
        })
    })
    .then(response => {

        // Give feeedback on error
        if(response.ok) return response.json()
        else throw new Error('Invalid credentials');
    });
}

export async function validate({ code }){

    // Fetch validation endpoint
    return await fetch(`${domain}/api/user/validation`, { 
        method : 'PUT', 
        headers : { 
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify({ 
            code : code 
        })
    })
    .then(response => {
        if(response.ok) return response.json()
        throw new Error('Invalid code');
    })
    .then(body => localStorage.setItem('bildyJWT', body.token));
}

export async function login({ email, password }){

    // Fetch login endpoint
    return await fetch(`${domain}/api/user/login`, { 
        method : 'POST', 
        headers : { 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify({ 
            email : email, 
            password : password 
        })
    })
    .then(response => {
        if(response.ok) return response.json()
        else throw new Error('Invalid credentials');
    })
    .then(body => localStorage.setItem('bildyJWT', body.token));
}