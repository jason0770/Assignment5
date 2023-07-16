// Source: https://www.w3schools.com/js/js_classes.asp
class ItemList {
    constructor(itemId, itemName, itemSKU, itemManufacturer, itemDescription, itemPrice, itemImageLink) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemSKU = itemSKU;
        this.itemManufacturer = itemManufacturer;
        this.itemDescription = itemDescription;
        this.itemPrice = itemPrice;
        this.itemImageLink = itemImageLink
    }

    getItemId() {
        return this.itemId;
    }

    getItemName() {
        return this.itemName;
    }

    getItemSKU() {
        return this.itemSKU;
    }

    getItemManufacturer() {
        return this.itemManufacturer;
    }

    getItemDescription() {
        return this.itemDescription;
    }

    getItemPrice() {
        return this.itemPrice;
    }

    getItemImageLink() {
        return this.itemImageLink;
    }
}

module.exports = ItemList;