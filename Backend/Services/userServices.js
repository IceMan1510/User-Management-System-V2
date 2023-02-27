const bcrypt = require("bcrypt");
const Pool = require("../Config/db");

exports.getAllUsersService = async (page) => {
  const limit = 8;
  const offset = (page - 1) * limit;
  const allUsers = await Pool.query(
    `SELECT *
    FROM ums.users
    JOIN ums.addresses ON users.u_id = addresses.u_id
    JOIN ums.cities ON addresses.city_id = cities.city_id
    JOIN ums.states ON cities.state_id = states.state_id
    WHERE users.del='0' ORDER BY users.u_id LIMIT ${limit} OFFSET ${offset} ;`
  );
  const totalRecords =
    await Pool.query(`SELECT COUNT(del) FROM ums.users where del='0';
  `);
  return {
    data: allUsers.rows,
    totalRecords: totalRecords.rows[0].count,
    totalPages: Math.ceil(totalRecords.rows[0].count / limit),
  };
};
exports.getSingleUserService = async (id) => {
  id = id.trim().toLowerCase();
  const user = await Pool.query(`SELECT *
    FROM ums.users
    JOIN ums.addresses ON users.u_id = addresses.u_id
    JOIN ums.cities ON addresses.city_id = cities.city_id
    JOIN ums.states ON cities.state_id = states.state_id
    WHERE users.email LIKE '%${id}%' AND del='0'`);
  return user.rows;
};
exports.deleteUserService = async (id) => {
  const del = await Pool.query(`UPDATE ums.users set del='1' where u_id=${id}`);
  if (del.rowCount === 0) {
    return false;
  } else {
    return true;
  }
};
exports.updateUserService = async (id, body) => {
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
    city_id,
    state_id,
    add_id,
  } = body;
  const userExists = await Pool.query(
    `SELECT * FROM ums.users WHERE u_id = ${id}`
  );
  if (userExists.rowCount === 0) {
    return false;
  } else {
    const client = await Pool.connect();

    try {
      await client.query("BEGIN");
      const updateUser = await client.query(`
      update ums.users set f_name='${f_name}', m_name='${m_name}', l_name='${l_name}', email='${email}',contact='${contact}', password='${password}', date_of_birth='${date_of_birth}', gender='${gender}' where u_id=${id}`);
      const updateAddress = await client.query(
        `update ums.addresses set address_line1='${address_line1}', address_line2='${address_line2}', landmark='${landmark}', zip_code='${zip_code}' where add_id=${add_id}`
      );
      const updateCity = await client.query(
        `update ums.cities set city_name='${city_name}', state_id='${mapState(
          state_name
        )}' where city_id=${city_id} `
      );

      await client.query("COMMIT");
      return true;
    } catch (error) {
      await client.query("ROLLBACK");
      console.log(error);
    } finally {
      client.release();
    }
  }
};
exports.createUserService = async (user) => {
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  const isUnique = await Pool.query(
    `select * from ums.users where email='${user.email}' and del='0';`
  );

  if (isUnique.rowCount !== 0) {
    return { success: false, body: `Email already exists` };
  } else {
    const client = await Pool.connect();
    try {
      await client.query("BEGIN");
      const insertUser =
        await client.query(`INSERT INTO ums.users (f_name, m_name, l_name, email, contact, password, date_of_birth, gender)
   VALUES 
   ('${user.f_name}', '${user.m_name}', '${user.l_name}', '${user.email}', '${user.contact}', '${user.password}', '${user.date_of_birth}', '${user.gender}') returning u_id`);
      const u_id = insertUser.rows[0].u_id;
      const state_id = mapState(user.state_name);
      const insertCity = await client.query(
        `INSERT INTO ums.cities (city_name, state_id) VALUES ('${user.city_name}', ${state_id}) returning city_id`
      );
      const city_id = insertCity.rows[0].city_id;
      const insertAddresses =
        await client.query(`INSERT INTO ums.addresses (u_id, address_line1, address_line2, landmark,zip_code, city_id)
  VALUES 
  (${u_id}, '${user.address_line1}', '${user.address_line2}', '${user.landmark}','${user.zip_code}', ${city_id});`);
      await client.query("COMMIT");
      return {
        success: true,
        body: `Thank You For Registrations ${user.f_name}`,
      };
    } catch (error) {
      await client.query("ROLLBACK");
      console.log(error);
    } finally {
      client.release();
    }
  }
};

var mapState = (State) => {
  switch (State) {
    case "Andhra Pradesh":
      return 1;
    case "Andaman and Nicobar Islands":
      return 2;
    case "Arunachal Pradesh":
      return 3;
    case "Assam":
      return 4;
    case "Bihar":
      return 5;
    case "Chhattisgarh":
      return 6;
    case "Dadar and Nagar Haveli":
      return 7;
    case "Daman and Diu":
      return 8;
    case "Delhi":
      return 9;
    case "Lakshadweep":
      return 10;
    case "Puducherry":
      return 11;
    case "Goa":
      return 12;
    case "Gujarat":
      return 13;
    case "Haryana":
      return 14;
    case "Himachal Pradesh":
      return 15;
    case "Jammu and Kashmir":
      return 16;
    case "Jharkhand":
      return 17;
    case "Karnataka":
      return 18;
    case "Kerala":
      return 19;
    case "Madhya Pradesh":
      return 20;
    case "Maharashtra":
      return 21;
    case "Manipur":
      return 22;
    case "Meghalaya":
      return 23;
    case "Mizoram":
      return 24;
    case "Nagaland":
      return 25;
    case "Odisha":
      return 26;
    case "Punjab":
      return 27;
    case "Rajasthan":
      return 28;
    case "Sikkim":
      return 29;
    case "Tamil Nadu":
      return 30;
    case "Telangana":
      return 31;
    case "Tripura":
      return 32;
    case "Uttar Pradesh":
      return 33;
    case "Uttarakhand":
      return 34;
    case "West Bengal":
      return 35;
    default:
      break;
  }
};
