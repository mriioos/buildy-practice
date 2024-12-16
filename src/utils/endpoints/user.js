'use client'

import { config, handler_json } from '@/utils/api_handler.js';

async function get_one(token){
    
    return await fetch(`${config.domain}/api/user`, {
        method : 'GET',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

async function delete_one(token){
    return await fetch(`${config.domain}/api/user`, {
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(handler_json);
}

export const users_api = {
    get : {
        one : get_one
    },
    delete : {
        one : delete_one
    }
};