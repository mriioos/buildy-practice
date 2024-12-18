'use client'

import { config, handler_json, handler_blob } from '@/utils/api_handler.js'; 

async function get_pdf(note_id, token){ // GET /api/deliverynote/pdf/{id}

    return await fetch(`${config.domain}/api/deliverynote/pdf/${note_id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_blob);
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

async function get_all_by_project(project_id, token){ // GET /api/deliverynote/project/{id}
    
    return await fetch(`${config.domain}/api/deliverynote/project/${project_id}`, {
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

async function put_one(note_id, { clientId, projectId, format, material, hours, description, workdate }, token){ // PUT /api/deliverynote/{id}
    
    return await fetch(`${config.domain}/api/deliverynote/${note_id}`, {
        method : 'PUT',
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

async function delete_one(note_id, token){ // DELETE /api/deliverynote/{id}
        
    return await fetch(`${config.domain}/api/deliverynote/${note_id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
}

export const deliverynotes_api = {
    get : {
        pdf : get_pdf,
        all : get_all,
        all_by_project : get_all_by_project,
    },
    post : {
        one : post_one
    },
    put : {
        one : put_one
    },
    delete : {
        one : delete_one
    }
};