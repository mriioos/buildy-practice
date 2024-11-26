const domain = 'https://bildy-rpmaya.koyeb.app';

async function signup({ name, surname, email, password }){

    // Fetch signup endpoint
    return await fetch(`${domain}/api/user/register`, { 
        method : 'POST', 
        headers : { 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.parse({ 
            email : email, 
            password : password 
        })
    });
}

function login(){

    // Check for JWT?
}

export default users = { signup, login }