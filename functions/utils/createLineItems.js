// functions/utils/createLineItems.js
const createLineItems = (orderSummary, items) => {
    return orderSummary.items.map((itemDetail, index) => ({
        "external_id": `item-${itemDetail.product_id}`,
        "printable_normalization": {
            "cover": {             // use % to cycle through an array
                "source_url": items[index % items.length].cover // Use the current item's cover
            },
            "interior": {
                "source_url": items[index % items.length].interior // Use the current item's interior
            },
            "pod_package_id": items[index % items.length].podPackageId // Use the current item's pod package ID
        },
        "quantity": itemDetail.quantity,
        "title": itemDetail.product_name
    }));
};

export default createLineItems;
