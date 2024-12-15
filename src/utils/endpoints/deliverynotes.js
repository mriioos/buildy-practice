'use client'

import { config, handler_json } from '@/utils/api_handler.js'; 

async function get_pdf(id, token){ // GET /api/deliverynote/pdf/{id}

    return await fetch(`${config.domain}/api/deliverynote/pdf/${id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function get_all(token){ // GET /api/deliverynote
    
    return await fetch(`${config.domain}/api/deliverynote`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function post_one({ clientId, projectId, format, material, hours, description, workdate }, token){ // POST /api/deliverynote

    return await fetch(`${config.domain}/api/deliverynote`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({ 
            clientId : clientId, 
            projectId : projectId, 
            format : format, 
            material : material, 
            hours : hours, 
            description : description, 
            workdate : workdate 
        })
    })
}

export const deliverynotes_api = {
    get : {
        pdf : get_pdf,
        all : get_all
    },
    post : {
        one : post_one
    }
};