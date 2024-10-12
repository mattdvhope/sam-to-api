This comes from console.log(event.body) in process-order.js
(...in stringified format)

{
    "orderSummary": {
        "id": 19026152,
        "created_at": "2024-10-10 16:53:37",
        "total_amount": "0.51",
        "total_shipping": "0.00",
        "total_tax": "0.00",
        "items": [
            {
                "type": "product",
                "product_id": 910707,
                "product_name": "Test product",
                "amount": "0.51",
                "quantity": 1,
                "source": "primary"
            }
        ],
        "customer": {
            "first_name": "Matthew",
            "last_name": "Malone",
            "email": "mattagape@gmail.com",
            "phone": "+18502873540"
        },
        "billing_address": {
            "address_line_1": "",
            "address_line_2": null,
            "city": "",
            "region": "FL",
            "postal_code": "32503",
            "country": "USA"
        },
        "shipping_address": {
            "address_line_1": "103 Oleander Dr.",
            "address_line_2": null,
            "city": "Pensacola",
            "region": "FL",
            "postal_code": "32503",
            "country": "USA"
        },
        "custom_fields": []
    }
}
