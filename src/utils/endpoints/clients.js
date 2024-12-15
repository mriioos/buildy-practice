'use client'

import { config, handler_json } from '@/utils/api_handler.js';

async function get_one(id, token){
    
    return await fetch(`${config.domain}/api/client/${id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function get_all(token){
    return await fetch(`${config.domain}/api/client`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function post_one({ name, cif, address : { street, number, postal, city, providence }}, token){
    return await fetch(`${config.domain}/api/client`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({ 
            name : name, 
            cif : cif, 
            address : { 
                street : street, 
                number : number, 
                postal : postal, 
                city : city, 
                providence : providence 
            }
        })
    })
    .then(handler_json);
}


export const clients_api = {
    get : {
        one : get_one,
        all : get_all
    },
    post : {
        one : post_one
    }
};