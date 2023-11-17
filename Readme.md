# Authentification&authorization

Basic express.js project with basic routes:
* Express
* Joi
* Fs
* Sequelize
* jsonwebtoken
* mysql2
* nodemailer
* bcrypt
* dotenv
* uuid

---

## URL

_Server_
```
http://localhost:3000
```
---


## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints

### POST /register

> register 

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": [<data_product>],
    "message": "Success read product"
}
```

---

### GET /category

> Get category

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username" : "<username>",
  "email" : "<email>",
  "password" : "<password>",
  "role" : "<role>"
}
```

_Response (200)_
```
{
  "user" : {
    "username" : "<username>",
    "email" : "<email>",
    "password" : "<password>",
    "role" : "<role>"
  }
  "message": "Success Register"

}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" must be required"
}
```

---

### POST /login

 > LOGIN

_Request Params_

```
not needed

```

_Request Header_

```
not needed
```

_Request Body_
```
{
  "email" : "<email>",
  "password" : "<password>"
}
```

_Response (200)_
```
{
  "token" : "<token>"
  "message": "Success Login"
}
```

_Response (404)_
```
{
    "message": "Email Not Found"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"username\" must be required"
}
```

---
### POST /reset-password

> post Password

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
 "email" : "<email>"
}
```

_Response (200)_
```
{
  "message": "Success send email"
}
```

_Response (404)_
```
{
    "message": "User Not Found"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---
### GET /liquid

> GET liquid

_Request Authorization_
```
<barier_access_token>
```

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "liquid": [
    {
      "id" : "<id>",
      "flavour" : "<flavour>",
      "merek" : "<merek>",
      "volume" : "<volume>",
      "nikotin" : "<nikotin>"
    }
  ]
  "message": "Success"
}
```

---

### POST /liquid/:id

> ADD FAVORITES

_Request Params_
```
<type_id>/<id>
```

_Request Authorization_
```
<barier_access_token>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id" : "<id>",
  "flavour" : "<flavour>",
  "merek" : "<merek>",
  "volume" : "<volume>",
  "nikotin" : "<nikotin>",
  "categoryId" : "<categoryId>",
  "userId" : "<userId>"
}
```

_Response (200)_
```
{
    "fav": [<fav>],
    "message": "Succes"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Liquid Not Found"
}
```

---

### GET /fav

> READ FAVORITE

_Request Params_
```
not needed
```

_Request Authorization_
```
<barier_access_token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "favorite": [<data_favorites>],
   "message": "Succes"
}
```

---

### DELETE /fav/:id

> DELETE FAVORITE

_Request Params_
```
<type_id>/<id>
```

_Request Authorization_
```
<barier_access_token>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  message: 'Favorites deleted successfully' 
}
```

_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### DELETE /category

> Delete by id

_Request Params_
```
/<type_id>/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Category with id ${id} has been deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---

### GET /seller

> Get seller

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{

    "data": {
        "shop" : "<shop>",
    },
    "status": "Success read all seller"

}
```

---

### GET /seller/:id

 > Get by id

_Request Params_

```
<type_id>/<id>

```

_Request Header_

```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "data": {
        "shop" : "<shop>",
    },
    "message": "Success read detail product"
}
```

_Response (404)_
```
{
    "message": "Data Not Found"
}
```

---

### POST /seller

> post seller

_Request Params_
```
not needed
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "shop" : "<shop>",
  "name" : "<name>",
  "description" : "<description>",
  "price" : "<price>",
  "category" : "<category>",
  "image" : "<image>",
  "categoryId" : "<categoryId>",
  "sellerId" : "<sellerId>",
  "supplierName" : "<supplierName>"
}
```

_Response (200)_
```
{
  "data": [
    createSeller": {
      <data_seller>
    },
    createProduct: {
      <data_product>
    }
  ],
   "message": "successfully added new stores and first items"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---

### PUT /seller

> PUT seller

_Request Params_
```
<type_id>/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "shop" : "<shop>",
}
```

_Response (200)_
```
{
  "data": [
    data": {
      <data_seller>
    }
  ],
   "message": "Success edit seller/Store"
}
```

_Response (400 - Validation Error)_
```
{
    "status": "Validation Failed",
    "message": "\"name\" must be required"
}
```

---

### DELETE /seller

> Delete by id

_Request Params_
```
/<type_id>/<id>
```

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Store with id ${id} and his product has been deleted"
}
```


_Response (404 - Error Not Found)_
```
{
    "message": "Data Not Found"
}
```

---