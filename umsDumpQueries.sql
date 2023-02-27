`SELECT *
    FROM ums.users
    JOIN ums.addresses ON users.u_id = addresses.u_id
    JOIN ums.cities ON addresses.city_id = cities.city_id
    JOIN ums.states ON cities.state_id = states.state_id
    WHERE users.del='0' ORDER BY users.u_id LIMIT ${limit} OFFSET ${offset} ;`
  );


  SELECT *
    FROM ums.users
    JOIN ums.addresses ON users.u_id = addresses.u_id
    JOIN ums.cities ON addresses.city_id = cities.city_id
    JOIN ums.states ON cities.state_id = states.state_id
    WHERE users.email LIKE '%${id}%' AND del='0'


    SELECT 
    *
FROM
    AllUserData
WHERE
    u_id > (SELECT 
            AVG(u_id)
        FROM
            users);



            
    const updateUser = await Pool.query(`update ums.users set f_name='${f_name}', m_name='${m_name}', l_name='${l_name}', email='${email}',contact='${contact}', password='${password}', date_of_birth='${date_of_birth}', gender='${gender}' where u_id=${id}`);
    const updateAddress = await Pool.query(
      `update ums.addresses set address_line1='${address_line1}', address_line2='${address_line2}', landmark='${landmark}', zip_code='${zip_code}' where add_id=${add_id}`
    );
    const updateCity = await Pool.query(
      `update ums.cities set city_name='${city_name}', state_id='${mapState(
        state_name
      )}' where city_id=${city_id} `
    );




