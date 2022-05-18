REST API for an e-commerce marketplace

This project is built using Node.js and MongoDB as the database.
Various other libraries like crypto-js, jsonwebtoken have also been used.

In this project you can do all this:
-> Buyers and sellers can register and login to the system
-> Sellers can build a catalog of items, with each item having a name and price
-> Buyers can GET a list of sellers
-> Buyers can GET a specific seller's catalog (list of items)
-> Buyers can create an Order that contains a list of items from the seller's catalog
-> Sellers can GET a list of all orders they've received

APIs

-> Auth APIs

- POST /api/auth/register
  Register a user (accept username, email, password, type of user - buyer/seller)

```
    Input:
    {
    "username": "lakshya",
    "email": "lakshya@123.com",
    "password": "lakshya",
    "type": "seller"
    }

    Response:
    {
     _id:628484ab4b1c242a2b7b720f
    username:"lakshya"
    email:"lakshya@123.com"
    password:"U2FsdGVkX1/qUZ+RtRSbFUhvyXjboHKSuvCOvlj5mKk="
    type:"seller"
    createdAt:2022-05-18T05:31:23.262+00:00
    updatedAt:2022-05-18T05:31:23.262+00:00
    __v:0
    }

  - POST /api/auth/login
    Let a previously registered user log in

    Input:
    {
        "username": "lakshya",
        "password": "lakshya"
    }
    Response:
    {
    "_id": "628484ab4b1c242a2b7b720f",
    "username": "lakshya",
    "email": "lakshya@123.com",
    "type": "seller",
    "createdAt": "2022-05-18T05:31:23.262Z",
    "updatedAt": "2022-05-18T05:31:23.262Z",
    "__v": 0,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODQ4NGFiNGIxYzI0MmEyYjdiNzIwZiIsInR5cGUiOiJzZWxsZXIiLCJpYXQiOjE2NTI4NTUxNDcsImV4cCI6MTY1MzExNDM0N30.VLNCC-RHA4HtkxTkiGF93IbG-8WsxmbLCLpjOg49TUU"
    }

-> Buyer API's

- GET /api/buyer/list-of-sellers
   Get a list of all sellers

- GET /api/buyer/seller-catalog/:seller_id
  Get the catalog of a seller by seller_id

- POST /api/buyer/create-order/:seller_id
  Send a list of items to create an order for seller with id = seller_id


-> Seller API's

- POST /api/seller/create-catalog
  Send a list of items to create a catalog for a seller

- PUT /api/catalog/add
  Send a new list of items to add to the existing Catalog

- GET /api/seller/orders
  Retrieve the list of orders received by a seller




```
