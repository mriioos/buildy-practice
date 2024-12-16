'use client'

import { config, handler_json } from '@/utils/api_handler.js';

async function get_one(id, token){

    return await fetch(`${config.domain}/api/project/one/${id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function get_all(token){

    return await fetch(`${config.domain}/api/project`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function get_all_by_client(client_id, token){

    return await fetch(`${config.domain}/api/project/${client_id}`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function post_one({ name, projectCode, email, address : { street, number, postal, city, province }, code, clientId }, token){
    
    return await fetch(`${config.domain}/api/project`, {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({ 
            name : name, 
            projectCode : projectCode, 
            email : email, 
            address : { 
                street : street, 
                number : number, 
                postal : postal, 
                city : city, 
                province : province
            }, 
            code : code, 
            clientId : clientId
        })
    })
    .then(handler_json);
}

async function put_one(id, { name, code, projectCode, email, clientId, address: { street, number, postal, city, province }, notes }, token){
        
    return await fetch(`${config.domain}/api/project/${id}`, {
        method : 'PUT',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify({ 
            name : name, 
            code : code, 
            projectCode : projectCode, 
            email : email, 
            clientId : clientId, 
            address : { 
                street : street, 
                number : number, 
                postal : postal, 
                city : city, 
                province : province
            }, 
            notes : notes
        })
    })
    .then(handler_json);
}

async function delete_one(project_id, token){
    return await fetch(`${config.domain}/api/project/${project_id}`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

export const projects_api = {
    get : {
        one : get_one,
        all : get_all,
        all_by_client : get_all_by_client
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