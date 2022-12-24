

INSERT INTO accounts(first_name, last_name
    , contact_number, email
    , password, created_date, 
    shipping_country, shipping_address_1,
    shipping_address_2, shipping_postal_code, role_id
)
VALUES(
    "John", "Lee"
    , 91234567, "johnlee@gmail.com"
    , "password", "2022-10-11", 
    "Singapore", "Ang Mo Kio Avenue 1",
    "03-04", "100200", "3"
);




INSERT INTO orders(total_cost , payment_reference
    , payment_type , receipt_url 
    , order_date,
    order_status_id, account_id 
)
VALUES(
    1000, "ABC123"
    , "credit", "www.google.com"
    , "2022-10-11", 
    1,2
);