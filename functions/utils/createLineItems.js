// functions/utils/createLineItems.js
const createLineItems = (orderSummary, items) => {
    return orderSummary.items.flatMap((itemDetail) => {
        // Create a line item for each item type (e.g., hardcover and paperback)
        return items.map((item, index) => ({
            "external_id": `item-${itemDetail.product_id}-${index}`, // Unique identifier
            "printable_normalization": {
                "cover": {
                    "source_url": item.cover // Use the item's cover
                },
                "interior": {
                    "source_url": item.interior // Use the item's interior
                },
                "pod_package_id": item.podPackageId // Use the item's pod package ID
            },
            "quantity": itemDetail.quantity, // Quantity from order summary
            "title": itemDetail.product_name // Title from order summary
        }));
    });
};


export default createLineItems;
