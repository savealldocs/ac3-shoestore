## Code Repository ##
Store Inventory code repository can be downloaded or pulled from
https://github.com/savealldocs/ac3-shoestore.git


# Above repository has API defined for managing following features:
- Items Logic :: 

        Add, delete and fetch Item details
- Transaction Logic :: 

        Save, Multiple Save, Get, Remove and Transform transaction
- Orders ::

        saveOrder, getOrders, removeOrder, makeOrderEffective, getItemsActiveOrders, getItemOrderCost
- Store::

        Store authentication happened based on long & lat stored in DB schema for each store
- Messaging System:: 

        Queue based messaging system to communicate and update all updates/transaction to the store using BUS/queue concept using redis.
- Documentation::

        Swagger API- can be tested  by running first node server using following steps:
        $node server
        then swagger json file an be viewed http://localhost:3000/swagger.json
- Test Case

        Unit Test case is written for one case due to shortage of time which can be found under <test> folder

- DB ::


    MongoDB is used to manage schema and data as NO SQL is best for scaling purpose which was main requirement

- Design Pattren 


         MVC Pattren is used

-Scaling Solution::

            We can have multiple scaling solution likes
            1) Horizontally scalling nodejs APP.
            2) Native cluster mode
            3) Network load balancing
            4) The PM2 Cluster Module 
            5) ExpressJS Framework & building microservices
            