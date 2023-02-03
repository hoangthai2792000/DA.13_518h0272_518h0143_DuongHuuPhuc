from pymilvus import connections, utility, CollectionSchema, FieldSchema, DataType, Collection, Partition

# connect milvus DB
connections.connect(
    alias="default",
    host='localhost',
    port='19530'
)




# # Drop collection
# utility.drop_collection('productImage')
# print(utility.list_collections())


# # Prepare parameters for creating collection
# imageID = FieldSchema(
#   name="imageID",
#   dtype=DataType.INT64,
#   is_primary=True,
#   auto_id=True
# )
#
# imageURL = FieldSchema(
#     name="imageURL",
#     dtype=DataType.VARCHAR,
#     max_length=200
# )
#
# productCode = FieldSchema(
#   name="productCode",
#   dtype=DataType.INT64,
# )
#
# imageVector = FieldSchema(
#   name="imageVector",
#   dtype=DataType.FLOAT_VECTOR,
#   dim=4096
# )
#
# schema = CollectionSchema(
#   fields=[imageID, imageURL, productCode, imageVector]
# )
#
# collectionName = 'productImage'
#
# # Create Collection
# collection = Collection(
#   name=collectionName,
#   schema=schema,
# )
# collection = Collection('productImage')
# print(collection.schema)


# # Create partitions
# Collection('productImage').create_partition('Nike')
# Collection('productImage').create_partition('Adidas')
# Collection('productImage').create_partition('Converse')
# Collection('productImage').create_partition('Vans')
# print(Collection('productImage').partitions)


# # Create Index
# index_params = {
#   "metric_type":"L2",
#   "index_type":"IVF_FLAT",
#   "params":{"nlist":1024}
# }
# collection = Collection("productImage")
# collection.create_index(
#   field_name="imageVector",
#   index_params=index_params
# )



# collection = Collection("productImage")  # Get an existing collection.
# partition = collection.load(['Nike'], replica_number=1)
#
# url = "https://res.cloudinary.com/dwhtbfgh9/image/upload/v1668663610/Products/196149230900/tmp-2-1668663607655_dqk1ac.png"
# res = collection.query(
#     expr=f'''imageURL like "{url}"''',
#     # expr="productCode in [196149230900]",
#     # expr="imageID > 0",
#     partition_names=['Nike'],
#     output_fields=["imageID", "productCode"],
#     consistency_level="Strong"
# )
# print(res)
# collection.release()

# expr = f"imageID in [{res[0]['imageID']}]"
# collection = Collection("productImage")  # Get an existing collection.
# deleteIMG = collection.delete(expr)
# print(deleteIMG)



print(Collection('productImage').num_entities)
