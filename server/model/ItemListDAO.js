
module.exports = class ItemListDAO {

    static async createItem(client, newItem) {
        const item = {
            itemId: newItem.getItemId(),
            itemName: newItem.getItemName(),
            itemSKU: newItem.getItemSKU(),
            itemManufacturer: newItem.getItemManufacturer(),
            itemDescription: newItem.getItemDescription(),
            itemPrice: newItem.getItemPrice(),
            itemImageLink: newItem.getItemImageLink()
        }

        const result = await client.db("inventory").collection("itemList").insertOne(item);
        console.log(`New item created with the following id: ${result.insertedId}`);
    }

    static async getAllItems(client) {
        const result = await client.db("inventory").collection("itemList").find().toArray();
        return result;
    }

    static async findOneAndDeleteItem(client, id) {
        const result = await client.db("inventory").collection("itemList").findOneAndDelete({itemId: id});
        return result["value"];
    }

    static async deleteAllItem(client) {
        await client.db("inventory").collection("itemList").deleteMany({});
    }

    static async findOneAndUpdateItem(client, id, newItem) {
        const result = await client.db("inventory").collection("itemList").findOneAndUpdate({itemId: id}, {$set: {
            itemDescription: newItem["itemDescription"], itemPrice: newItem["itemPrice"]
        } })
        const resultValueProperty = result["value"]

        //Source: https://www.w3schools.com/howto/howto_js_remove_property_object.asp
        delete resultValueProperty["_id"]
        return resultValueProperty
    }

    static async getLastestItemId(client) {
        const result = await client.db("inventory").collection("itemList").find().sort({itemId: -1}).limit(1).toArray()
        return result[0].itemId
    }

}