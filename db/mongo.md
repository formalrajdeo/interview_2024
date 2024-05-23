db name => amazon
--------------------------------------------------------------------------------
Sure! Below is a cheat sheet of common `mongosh` commands for working with MongoDB databases, collections, and documents.

### MongoDB Shell (mongosh) Cheat Sheet

#### General Commands

- **Start MongoDB Shell**: 
  ```shell
  mongosh
  ```

- **Help**: 
  ```shell
  help
  ```

- **Show all databases**: 
  ```shell
  show dbs
  ```

- **Switch to (or create) a database**: 
  ```shell
  use databaseName
  ```

- **Show current database**: 
  ```shell
  db
  ```

#### Collection Commands

- **Show all collections in the current database**: 
  ```shell
  show collections
  ```

- **Create a collection**: 
  ```shell
  db.createCollection("collectionName")
  ```

- **Drop a collection**: 
  ```shell
  db.collectionName.drop()
  ```

- **Rename a collection**: 
  ```shell
  db.collectionName.renameCollection("newCollectionName")
  ```

#### Document Commands

- **Insert a document**:
  ```shell
  db.collectionName.insertOne({ field1: "value1", field2: "value2" })
  ```

- **Insert multiple documents**:
  ```shell
  db.collectionName.insertMany([{ field1: "value1" }, { field2: "value2" }])
  ```

- **Find one document**:
  ```shell
  db.collectionName.findOne({ field: "value" })
  ```

- **Find all documents**:
  ```shell
  db.collectionName.find()
  ```

- **Find with a query**:
  ```shell
  db.collectionName.find({ field: "value" })
  ```

- **Update one document**:
  ```shell
  db.collectionName.updateOne({ field: "value" }, { $set: { fieldToUpdate: "newValue" } })
  ```

- **Update multiple documents**:
  ```shell
  db.collectionName.updateMany({ field: "value" }, { $set: { fieldToUpdate: "newValue" } })
  ```

- **Replace a document**:
  ```shell
  db.collectionName.replaceOne({ field: "value" }, { newField: "newValue" })
  ```

- **Delete one document**:
  ```shell
  db.collectionName.deleteOne({ field: "value" })
  ```

- **Delete multiple documents**:
  ```shell
  db.collectionName.deleteMany({ field: "value" })
  ```

#### Index Commands

- **Create an index**:
  ```shell
  db.collectionName.createIndex({ field: 1 })
  ```

- **Drop an index**:
  ```shell
  db.collectionName.dropIndex("indexName")
  ```

- **Show indexes**:
  ```shell
  db.collectionName.getIndexes()
  ```

#### Database Commands

- **Drop a database**:
  ```shell
  db.dropDatabase()
  ```

- **Create a user**:
  ```shell
  db.createUser({
    user: "username",
    pwd: "password",
    roles: [ { role: "readWrite", db: "databaseName" } ]
  })
  ```

- **Drop a user**:
  ```shell
  db.dropUser("username")
  ```

This cheat sheet covers basic commands for database, collection, and document management in MongoDB using the `mongosh` shell.


db.getCollection('orders').aggregate(
  [
    {
      $lookup: {
        from: 'customers',
        localField: 'customerId',
        foreignField: '_id',
        as: 'customerDetails'
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);
-------

Aggregation in MongoDB is a powerful framework for data processing and transformation, allowing you to perform operations like filtering, grouping, and sorting. It's essential for handling complex queries and data analytics tasks. Below are some examples of aggregation pipelines that are commonly discussed in interviews.

### Example Scenario: E-commerce Database

Let's assume you have a simple e-commerce database with two collections: `customers` and `orders`.

#### Customers Collection
```json
{
    "_id": ObjectId("60c72b2f9b1d8a001f634c71"),
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 28
}
{
    "_id": ObjectId("60c72b2f9b1d8a001f634c72"),
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 32
}
```

#### Orders Collection
```json
{
    "_id": ObjectId("60c72b2f9b1d8a001f634c73"),
    "customerId": ObjectId("60c72b2f9b1d8a001f634c71"),
    "product": "Laptop",
    "quantity": 1,
    "price": 1000,
    "orderDate": new ISODate("2024-05-23T00:00:00Z")
}
{
    "_id": ObjectId("60c72b2f9b1d8a001f634c74"),
    "customerId": ObjectId("60c72b2f9b1d8a001f634c72"),
    "product": "Smartphone",
    "quantity": 2,
    "price": 500,
    "orderDate": new ISODate("2024-05-23T00:00:00Z")
}
{
    "_id": ObjectId("60c72b2f9b1d8a001f634c75"),
    "customerId": ObjectId("60c72b2f9b1d8a001f634c71"),
    "product": "Tablet",
    "quantity": 1,
    "price": 300,
    "orderDate": new ISODate("2024-05-24T00:00:00Z")
}
```

### Aggregation Examples

#### 1. Sum of Orders per Customer

Find the total amount spent by each customer.

```shell
db.orders.aggregate([
  {
    $group: {
      _id: "$customerId",
      totalSpent: { $sum: { $multiply: ["$quantity", "$price"] } }
    }
  }
])
```

#### 2. Lookup to Combine Customer Details with Orders

Combine customer details with their orders.

```shell
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },
  {
    $unwind: "$customerDetails"
  },
  {
    $project: {
      _id: 0,
      product: 1,
      quantity: 1,
      price: 1,
      orderDate: 1,
      "customerDetails.name": 1,
      "customerDetails.email": 1
    }
  }
])
```

#### 3. Total Sales per Day

Calculate the total sales (revenue) per day.

```shell
db.orders.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
      totalSales: { $sum: { $multiply: ["$quantity", "$price"] } },
      totalOrders: { $sum: "$quantity" }
    }
  },
  {
    $sort: { _id: 1 }
  }
])
```

#### 4. Average Age of Customers Who Placed Orders

Calculate the average age of customers who have placed orders.

```shell
db.orders.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },
  {
    $unwind: "$customerDetails"
  },
  {
    $group: {
      _id: null,
      averageAge: { $avg: "$customerDetails.age" }
    }
  }
])
```

#### 5. Top 3 Most Sold Products

Find the top 3 products based on the quantity sold.

```shell
db.orders.aggregate([
  {
    $group: {
      _id: "$product",
      totalQuantity: { $sum: "$quantity" }
    }
  },
  {
    $sort: { totalQuantity: -1 }
  },
  {
    $limit: 3
  }
])
```

### Explanation of the Aggregation Stages

1. **$group**: Groups documents by a specified identifier and allows aggregation operations like `$sum`, `$avg`, `$max`, `$min`, etc.
2. **$lookup**: Performs a left outer join to a different collection to filter in documents from the "joined" collection for processing.
3. **$unwind**: Deconstructs an array field from the input documents to output a document for each element.
4. **$project**: Reshapes each document in the stream, such as by including, excluding, or adding new fields.
5. **$sort**: Sorts all input documents by specified fields.
6. **$limit**: Limits the number of documents passed to the next stage in the pipeline.

These examples and explanations should provide a solid foundation for understanding and discussing MongoDB aggregation in an interview setting. If you have further questions or need more detailed examples, feel free to ask!
