

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




INSERT INTO orders(total_cost, payment_reference
    , payment_type, receipt_url
    , order_date,
    order_status_id, account_id
)
VALUES(
    1000, "ABC123"
    , "credit", "www.google.com"
    , "2022-10-11",
    1, 1
);





INSERT INTO soaps(name, cost
    , width, height
    , shape, date_created,
    last_updated, image_url,
    thumbnail_url, base_id, oil_id,
    type_id
)
VALUES(
    "Round Honey", 1400
    , 15, 10
    , "circle", "2022-10-11",
    "2022-12-15", "www.youtube.com",
    "www.google.com", 1, 2, 3
);




INSERT INTO purposes_soaps(purpose_id, soap_id
)
VALUES(
    2, 1
);


    INSERT INTO smells_soaps(smell_id, soap_id
)
VALUES(
    3, 1
);


        INSERT INTO variants(image_url,
    thumbnail_url, stock, name, last_updated, color_id,
    soap_id
)
VALUES(
    "www.google.com", "www.youtube.com",
    3, "Big Size Soap", "2022-10-10", 5, 28
);
        

        INSERT INTO cart_items(quantity, account_id, variant_id
)
VALUES(
    1, 5, 9
);


            INSERT INTO order_items(quantity, order_id, variant_id
)
VALUES(
    3, 2, 1
);


    // Update stock number
                UPDATE variants SET stock = 500 where id = 1;



                // Insert into blacklisted tokens

                INSERT INTO blacklisted_tokens(token, date_created
                    )
                    VALUES(
                        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiYXBpIiwibGFzdF9uYW1lIjoidXNlciIsImlkIjoxMiwiZW1haWwiOiJhcGl1c2VyQGdtYWlsLmNvbSIsInJvbGVfaWQiOjMsImlhdCI6MTY3MjU2NDAwMiwiZXhwIjoxNjczMTY4ODAyfQ.KHb7RmK17_LDywHfAZgYysD7X8xN_YFEynqH_JgWMQw",
                        "2022-10-12"
                        
                    );



INSERT INTO types(type
)
VALUES(
    "Natural"
);








