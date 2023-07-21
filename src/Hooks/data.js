//Main data structure to be consumed
//This file replace a relational db
//Change this file to your needs, or connect to a db through 'useAxios.js'

export const users = [
    {
        "id": 1,
        "fullName": 'admin',
        "password": '1234567890',
        "location": 'USA',
        "gender": 'M',
        "email": 'admin@gabs.com',
        "roleId": 1
    },
    {
		"id": 2,
		"fullName": "Profesor Mauro",
		"documentNo": '19919119',
		"gender": 'M',
		"birthDate": '1994-05-04',
		"cellPhone": "+4 3124534",
		"location": 'Colombia',
		"email": "teacher@gabs.com",
		"password": "12534635gdQ_",
		"roleId": 2,
		"createdAt": "2023-04-29T23:42:43.000Z",
		"updatedAt": "2023-06-30T17:06:42.000Z",
		"deletedAt": null,
		"years": 29
	},
	{
		"id": 3,
		"fullName": "Sara Losada",
		"documentNo": '33121424',
		"gender": 'F',
		"birthDate": '2000-02-02',
		"cellPhone": '+12 1445252',
		"location": 'Perú',
		"email": "student@example.com",
		"password": "32fd53w5_QEeq@",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:44.000Z",
		"updatedAt": "2023-04-29T23:42:44.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 4,
		"fullName": "Pablo Frense",
		"documentNo": "4567846",
		"gender": "M",
		"birthDate": "2000-10-15",
		"cellPhone": "+5 285793093",
        "location": "Mexico",
		"email": "blo@yahoo.com",
		"password": "wegsd@Ef345",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 22
	},
	{
		"id": 5,
		"fullName": "Barry Allen",
		"documentNo": "789830",
		"gender": "M",
		"birthDate": "2000-03-09",
		"cellPhone": "+5 688240",
		"location": "Francia",
		"email": "bar@flash.com",
		"password": "377fa43@727",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 6,
		"fullName": "Alejandro Frid",
		"documentNo": "78908",
		"gender": "M",
		
		"birthDate": "2000-04-07",
		
		"cellPhone": "+4 8319309",
		
		
		"location": "Brasil",
		
		"email": "mfridale@gmail.com",
		"password": "3@4SE7hBFK",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 7,
		"fullName": "Maria Rojas Tupayachi",
		"documentNo": "08185320",
		"gender": "F",
		"birthDate": "1995-11-14",
		"cellPhone": "+1 9456755",
		"location": "Perú",
		"email": "rmaria@gmail.com",
		"password": "$Vurr1oXKuzH",
		"roleId": 2,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 28
	},
	{
		"id": 8,
		"fullName": "Luis Felipe",
		"documentNo": "070169287",
		"gender": "M",
	
		"birthDate": "2000-09-14",
		
		"cellPhone": "+21 7647389",
		
		"location": "Mexico",
		
		
		"email": "flucho@hotmail.com",
		"password": "$2a$10678BFK",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 9,
		"fullName": "Roberto Carlos",
		"documentNo": "450255678",
		"gender": "M",
		"typeDoc": "D",
		"birthDate": "1985-10-02",
		"cellPhone": "+0 988888890",
		
		"location": "Brasil",
		
		"email": "patadura@hotmail.com",
		"password": "1#uz65652",
		"roleId": 2,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 37
	},
	{
		"id": 10,
		"fullName": "Rivera Mendoza",
		"documentNo": "090062",
		"gender": "F",
		"birthDate": "2000-08-07",
		
		"cellPhone": "+3 89701833",
		
		
		"location": "Colombia",
		
		"email": "jrivmendo@gmail.com",
		"password": "$2oy5643uzH¿",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 11,
		"fullName": "Carolina Ponce",
		"documentNo": "12378413",
		"gender": "F",
		
		"birthDate": "2000-03-30",
		
		"cellPhone": "+8 369373",
		"location": "Francia",
		
		"email": "ponce@asv.com",
		"password": "12125%$&13",
		"roleId": 3,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 23
	},
	{
		"id": 12,
		"fullName": "Philippe Lola Natan",
		"documentNo": "73737373737",
		"gender": "M",
		"typeDoc": "D",
		"birthDate": "1984-01-01",
	
		"cellPhone": "+9675435",
		
		"location": "USA",
		
		"email": "ps@fer.com",
		"password": "a_Ade23@ewqe12",
		"roleId": 4,
		"createdAt": "2023-04-29T23:42:53.000Z",
		"updatedAt": "2023-04-29T23:42:53.000Z",
		"deletedAt": null,
		"years": 39
	},
]
export const programs = [
    {
		"id": 1,
		"description": "Programa 1",
		"level": 'Pregrado',
		"Courses": [
			{
				"id": 1,
				"description": "Course 1",
				"code": "TEST01",
				"programId": 1,
				"ProgramId": 1
			},
			{
				"id": 2,
				"description": "Desarrollo de Liderazgo",
				"code": "",
				"programId": 1,
				"ProgramId": 1
			},
			{
				"id": 3,
				"description": "La Vida y Enseñanzas",
				"code": "22-NT548",
				"programId": 1,
				"ProgramId": 1
			},
			{
				"id": 4,
				"description": "Literatura",
				"code": "22-NT545",
				"programId": 1,
				"ProgramId": 1
			},
			{
				"id": 6,
				"description": "4 Elementos",
				"code": "22-TP604",
				"programId": 1,
				"ProgramId": 1
			},
			{
				"id": 7,
				"description": "Matematicas",
				"code": "22-TP612",
				"programId": 1,
				"ProgramId": 1
			},
        ]
    },
    {
		"id": 2,
		"description": "Programa 2",
		"level": 'Maestría',
		"Courses": [
			{
				"id": 8,
				"description": "Medicina",
				"code": "TEST01",
				"programId": 2 ,
				"programId": 2 
			},
			{
				"id": 9,
				"description": "Estructura Denominacional",
				"code": "22-LID663",
				"programId": 2 ,
				"programId": 2 
			},
			{
				"id": 10,
				"description": " La Vida fria",
				"code": "22-NT548",
				"programId": 2 ,
				"programId": 2 
			},
			{
				"id": 11,
				"description": "Cuencas",
				"code": "22-NT545",
				"programId": 2 ,
				"programId": 2 
			},
			{
				"id": 12,
				"description": "Historia",
				"code": "22-TP604",
				"programId": 2 ,
				"programId": 2 
			},
			{
				"id": 13,
				"description": "Madera de trebol",
				"code": "22-TP612",
				"programId": 2 ,
				"programId": 2 
			},
        ]
    },
    {
		"id": 3,
		"description": "Programa 3",
		"level": 'Doctorado',
		"Courses": [
			{
				"id": 14,
				"description": "Fincaraiz",
				"code": "TEST01",
				"programId": 3 ,
				"programId": 3 
			},
			{
				"id": 15,
				"description": "Felicidad ",
				"code": "22-LID663",
				"programId": 3 ,
				"programId": 3 
			},
			{
				"id": 16,
				"description": "Deporte y recreacion",
				"code": "22-NT548",
				"programId": 3 ,
				"programId": 3 
			},
			{
				"id": 17,
				"description": "Geografias",
				"code": "22-NT545",
				"programId": 3 ,
				"programId": 3 
			},
			{
				"id": 18,
				"description": "Culturas",
				"code": "22-TP604",
				"programId": 3 ,
				"programId": 3 
			},
        ]
    }
]

export const courses = [
    {
        "id": 1,
        "description": "Course 1",
        "code": "TEST01",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 2,
        "description": "Desarrollo de Liderazgo",
        "code": "",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 3,
        "description": "La Vida y Enseñanzas",
        "code": "22-NT548",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 4,
        "description": "Literatura",
        "code": "22-NT545",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 6,
        "description": "4 Elementos",
        "code": "22-TP604",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 7,
        "description": "Matematicas",
        "code": "22-TP612",
        "programId": 1,
        "ProgramId": 1
    },
    {
        "id": 8,
        "description": "Medicina",
        "code": "TEST01",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 9,
        "description": "Estructura Denominacional",
        "code": "22-LID663",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 10,
        "description": " La Vida fria",
        "code": "22-NT548",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 11,
        "description": "Cuencas",
        "code": "22-NT545",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 12,
        "description": "Historia",
        "code": "22-TP604",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 13,
        "description": "Madera de trebol",
        "code": "22-TP612",
        "programId": 2 ,
        "programId": 2 
    },
    {
        "id": 14,
        "description": "Fincaraiz",
        "code": "TEST01",
        "programId": 3 ,
        "programId": 3 
    },
    {
        "id": 15,
        "description": "Felicidad ",
        "code": "22-LID663",
        "programId": 3 ,
        "programId": 3 
    },
    {
        "id": 16,
        "description": "Deporte y recreacion",
        "code": "22-NT548",
        "programId": 3 ,
        "programId": 3 
    },
    {
        "id": 17,
        "description": "Geografias",
        "code": "22-NT545",
        "programId": 3 ,
        "programId": 3 
    },
    {
        "id": 18,
        "description": "Culturas",
        "code": "22-TP604",
        "programId": 3 ,
        "programId": 3 
    },

]

export const locations = [
    {
        'id': 1,
        'name': 'USA'
    },
    {
        'id': 2,
        'name': 'Colombia'
    },
    {
        'id': 3,
        'name': 'Perú'
    },
    {
        'id': 4,
        'name': 'Francia '
    },
    {
        'id': 5,
        'name': 'Mexico'
    },
    {
        'id': 6,
        'name': 'Brasil'
    }

]