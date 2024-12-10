'use server'

import { config, handler_json } from '@/utils/api_handler.js';

export async function signup({ name, surname, email, password }){

    // Fetch signup endpoint
    return await fetch(`${config.domain}/api/user/register`, { 
        method : 'POST', 
        headers : { 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify({ 
            email : email, 
            password : password 
        })
    })
    .then(handler_json);
}

export async function validate({ code }){

    // Fetch validation endpoint
    return await fetch(`${config.domain}/api/user/validation`, { 
        method : 'PUT', 
        headers : { 
            'Content-Type' : 'application/json'
        }, 
        body : JSON.stringify({ 
            code : code 
        })
    })
    .then(handler_json)
    .then(body => localStorage.setItem('bildyJWT', body.token));
}

export async function login({ email, password }){

    // Fetch login endpoint
    return await fetch(`${config.domain}/api/user/login`, { 
        method : 'POST', 
        headers : { 
            'Content-Type' : 'application/json' 
        }, 
        body : JSON.stringify({ 
            email : email, 
            password : password 
        })  
    })
    .then(handler_json)
    .then(body => localStorage.setItem('bildyJWT', body.token));
}