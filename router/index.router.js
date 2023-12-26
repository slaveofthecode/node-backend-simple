import express from 'express';

const router = express.Router();

router.get('', (req, res) => {

    res.json({ 
        message: 'APIs for node-backend-simple project',
        apis: [
            {
                route: '/api/user/create',
                method: 'POST',
                description: 'Create user',
                bodyExample: {
                    email: 'string',
                    password: 'string'
                }
            },
            {
                route: '/api/user/login',
                method: 'POST',
                description: 'Login (you need to be created first)',
                bodyExample: {
                    email: 'string',
                    password: 'string'
                },
                responseExample: {
                    token: 'string'
                }
            },
            {
                route: '/api/note/list',
                method: 'GET',  
                description: 'List notes (you need to be logged in and have a token)',
                responseExample: {
                    message: 'string',
                    notes: [
                        {
                            id: 'string',
                            title: 'string',
                            description: 'string'
                        }
                    ]
                }           
            }
        ]
    });    
});

export default router;