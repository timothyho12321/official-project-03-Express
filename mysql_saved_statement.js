

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
    1,3
);





INSERT INTO soaps(name, cost
    , width, height
    , shape, date_created , 
    last_updated, image_url,
    thumbnail_url, base_id, oil_id,
    type_id
)
VALUES(
    "Round Honey", 1400
    , 15, 10
    , "circle", "2022-10-11", 
    "2022-12-15", "www.youtube.com",
    "www.google.com", 2, 2,3
);






