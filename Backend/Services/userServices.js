const bcrypt = require("bcrypt");
const Pool = require("../Config/db");
exports.getAllUsersService = async (page) => {
  const limit = 4;
  const offset = (page - 1) * limit;
  const allUsers = await Pool.query(
    `SELECT u.u_id, u.f_name, u.m_name, u.l_name, u.email, u.contact, u.date_of_birth, u.gender,
    a.address_line1, a.address_line2, a.landmark,
    c.city_name, c.zip_code,
    s.state_name
    FROM ums.users u
    INNER JOIN ums.addresses a ON u.u_id = a.u_id
    INNER JOIN ums.states s ON a.state_id = s.state_id
    INNER JOIN ums.cities c ON s.city_id = c.city_id 
    WHERE u.del='0' ORDER BY u.u_id LIMIT 4 OFFSET ${offset} ;`
  );

  const totalRecords =
    await Pool.query(`SELECT COUNT(del) FROM ums.users where del='0';
  `);

  return {
    data: allUsers.rows,
    totalRecords: totalRecords.rows[0].count,
    totalPages: Math.ceil(totalRecords.rows[0].count / 4),
  };
};
exports.getSingleUserService = async (id) => {
  id = id.trim().toLowerCase();
  const user =
    await Pool.query(`SELECT u.u_id, u.f_name, u.m_name, u.l_name, u.email, u.contact, u.date_of_birth, u.gender,
    a.address_line1, a.address_line2, a.landmark,
    c.city_name, c.zip_code,
    s.state_name
    FROM ums.users u
    INNER JOIN ums.addresses a ON u.u_id = a.u_id
    INNER JOIN ums.states s ON a.state_id = s.state_id
    INNER JOIN ums.cities c ON s.city_id = c.city_id
    WHERE u.email LIKE '%${id}%' AND u.del='0'`);
  return user.rows;
};

exports.deleteUserService = async (id) => {
  const del = await Pool.query(`UPDATE ums.users set del='1' where u_id=${id}`);
  console.log(del.rowCount);
  if (del.rowCount === 0) {
    return false;
  } else {
    return true;
  }
};

exports.updateUserService = async (id, body) => {
  const userId = parseInt(id);
  const {
    f_name,
    m_name,
    l_name,
    email,
    contact,
    password,
    date_of_birth,
    gender,
    address_line1,
    address_line2,
    landmark,
    city_name,
    zip_code,
    state_name,
  } = body;

  const userExists = await Pool.query(
    `SELECT * FROM ums.users WHERE u_id = ${id}`
  );
  if (userExists.rowCount === 0) {
    return false;
  } else {
    const updateUser = await Pool.query(`
    update ums.users set f_name='${f_name}', m_name='${m_name}', l_name='${l_name}', email='${email}',contact='${contact}', password='${password}', date_of_birth='${date_of_birth}', gender='${gender}' where u_id=${id}`);

    const updateAddress = await Pool.query(
      `update ums.addresses set address_line1='${address_line1}', address_line2='${address_line2}', landmark='${landmark}' where add_id=${id}`
    );
    const updateState = await Pool.query(
      `update ums.states set state_name='${state_name}' where state_id=${id}`
    );
    const updateCity = await Pool.query(
      `update ums.cities set city_name='${city_name}', zip_code='${zip_code}' where city_id=${id} `
    );
    return true;
  }
  // await client.query("DELETE FROM addresses WHERE u_id = $1", [id]);
  // await client.query("DELETE FROM states WHERE state_id=$1", [id]);
  // await client.query("DELETE FROM cities WHERE city_id=$1", [id]);
  // const { rowCount: userDeleted } = await client.query(
  //   "DELETE FROM users WHERE u_id = $1",
  //   [id]
  // );
  // if (userDeleted === 0) {
  //   return false;
  // } else {
  //   await client.query("COMMIT");
  //   client.release();
  //   return true;
  // }
};
