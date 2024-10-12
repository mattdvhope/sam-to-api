// functions/utils/createLineItems.js
const createLineItems = (orderSummary, books) => {
    return orderSummary.items.flatMap((itemDetail) => {
        // Create a line item for each item type (e.g., hardcover and paperback)
        return books.map((book, index) => ({
            "external_id": `item-${itemDetail.product_id}-${index}`, // Unique identifier
            "printable_normalization": {
                "cover": {
                    "source_url": book.cover // Use the book's cover
                },
                "interior": {
                    "source_url": book.interior // Use the book's interior
                },
                "pod_package_id": book.podPackageId // Use the book's pod package ID
            },
            "quantity": itemDetail.quantity, // Quantity from order summary
            "title": itemDetail.product_name // Title from order summary
        }));
    });
};


export default createLineItems;
