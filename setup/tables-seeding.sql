INSERT INTO product (`name`,price,image) VALUES 
( 'Milanesa clásica'   , 1150 ,'https://cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/GJRGCMJWGVSDEOJYMVSDKNZXMU.jpg'),
( 'Milanesa a caballo' , 1350 ,'https://media.lmneuquen.com/p/f19bd5d3305e4e0f384f6c7c84da0c36/adjuntos/195/imagenes/005/541/0005541110/milanesas-a-caballojpg.jpg'),
( 'Milanesa napolitana', 1470 ,'https://www.196flavors.com/wp-content/uploads/2020/03/milanesa-a-la-napolitana-1-FP.jpeg' ),
( 'Nuggets de pollo'   , 350  ,'https://www.cocinavital.mx/wp-content/uploads/2017/12/nuggets-parmesanos.jpg'),
( 'Pollo al spiedo'    , 1750 ,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZK479cZhNXu-PSmQLfSRAIrSDkWEjam-uhA&usqp=CAU');

INSERT INTO User(username,fullname,email,tel,adress,`password`,role) VALUES
( '_admin_', '_admin_', 'admin@admin.com', '_admin_' , '_admin_' ,'secret-admin' , 1), 
( '_user1_', '_user1_', 'user1@user.com', '_user1_' , '_user1_' ,'secret-user1' , 0),
( '_user2_', '_user2_', 'user2@user.com', '_user2_' , '_user2_' ,'secret-user2' , 0),
( '_user3_', '_user3_', 'user3@user.com', '_user3_' , '_user3_' ,'secret-user3' , 0) ;

INSERT INTO paymethod(name,isactive) VALUES
( 'cash'   , 1 ),
( 'debit'  , 1 ),
( 'credit' , 1 ),
( 'paypal', 1 );

INSERT INTO `order`(date,status,price,user_id,paymethod_id) Values
('2021-7-1 17:52:23' ,'delivered'  , 1500  ,1 , 1),
('2021-7-1 19:03:44' ,'delivered'  , 4170  ,3 , 2),
('2021-7-3 12:24:13' ,'delivered'  , 3220  ,3 , 2),
('2021-7-8 13:22:17' ,'delivered'  , 1820  ,2 , 1),
('2021-7-8 22:31:56' ,'delivering' , 4050  ,1 , 2),
('2021-7-8 23:16:06' ,'placed'     , 1400  ,2 , 3);

INSERT INTO order_has_product(order_id,product_id,amount)VALUES
( 1 , 1 , 1 ),( 1 , 4 , 1 ),
( 2 , 2 , 2 ),( 2 , 3 , 1 ),
( 3 , 3 , 1 ),( 3 , 5 , 1 ),
( 4 , 4 , 1 ),( 4 , 3 , 1 ),
( 5 , 1 , 2 ),( 5 , 5 , 1 ),
( 6 , 4 , 4 );

