import { select } from './tools.js';

export const config = {
    domain : 'https://bildy-rpmaya.koyeb.app'
}

// Switcher for error handling
const error_messages = {
    401 : 'Unauthenticated',
    404 : 'Not found',
    409 : 'Already exists',
    422 : 'Unprocessable entity',
    500 : 'Internal server error',
    default : 'Unhandled error'
}

// Response handler for JSON body
export async function handler_json(response){

    // Give feedback on error
    return response.ok 
    ? await response.json()
    : Promise.reject(select(response.status, error_messages));
}

// Response handler for text body
export async function handler_text(response){

    // Give feedback on error
    return response.ok 
    ? await response.text()
    : Promise.reject(select(response.status, error_messages));
}
