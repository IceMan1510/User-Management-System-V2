<script>
    //  disabled={validateButton(userDetail)}
    let firstLoad = false;
    import { createEventDispatcher } from "svelte";
  
    const handleButton = (dataToBeUpdated) => {
      firstLoad = true;
  
      if (dataToBeUpdated === undefined || dataToBeUpdated === "") {
        handlePost();
      } else {
        handleUpdate();
      }
    };
  
    let checkPwd = (str) => {
      if (
        str.length < 8 ||
        str.length > 500 ||
        str.search(/\d/) == -1 ||
        str.search(/[a-zA-Z]/) == -1 ||
        str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1
      ) {
        return false;
      } else {
        return true;
      }
    };
    const dispatch = createEventDispatcher();
    let userDetail = "";
    var containsAlpha = (str) => {
      const specialChars = /^[a-zA-Z]+$/;
      return specialChars.test(str);
    };
    var validation = (field) => {
      if (field.trim() === "" || !containsAlpha(field)) {
        return false;
      } else {
        return true;
      }
    };
    var validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    var validateContactNumber = (input) => {
      const regex = /^\d{10}$/; // regex pattern to match exactly 10 digits
      return regex.test(input);
    };
    var isZipNumber = (zip) => {
      if (isNaN(zip)) {
        return false;
      }
  
      if (zip.toString().length !== 6) {
        return false;
      }
  
      return true;
    };
  
    var checkDate = (date) => {
      if (
        new Date(date).getFullYear() < 1970 ||
        new Date(date).getFullYear() > 2005 ||
        userDetail.dob === "Select Date" ||
        userDetail.dob === ""
      ) {
        return false;
      } else {
        return true;
      }
    };
  
    export let dataToBeUpdated;
    console.log(dataToBeUpdated);
    if (dataToBeUpdated === undefined) {
      userDetail = {
        fName: "",
        mName: "",
        lName: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
        confirmPassword: "",
        contact: "",
        address: "",
        address1: "",
        landmark: "",
        city: "",
        state: "Select State",
        pinCode: "",
      };
    } else {
      userDetail = {
        id: dataToBeUpdated.id,
        fName: dataToBeUpdated.fName,
        mName: dataToBeUpdated.mName,
        lName: dataToBeUpdated.lName,
        gender: dataToBeUpdated.gender,
        dob: dataToBeUpdated.dob,
        email: dataToBeUpdated.email,
        password: "",
        confirmPassword: "",
        contact: dataToBeUpdated.contact,
        address: dataToBeUpdated.address,
        address1: dataToBeUpdated.address1,
        landmark: dataToBeUpdated.landmark,
        city: dataToBeUpdated.city,
        state: dataToBeUpdated.state,
        pinCode: dataToBeUpdated.pinCode,
      };
    }
    const handlePost = () => {
      dispatch("post", userDetail);
    };
    const handleUpdate = () => {
      dispatch("update", userDetail);
    };
  </script>
  
  <main>
    <h1>Registration Form</h1>
    <div class="container">
      <div class="formContainer">
        <div class="threeNames">
          <div class="one">
            <label for="firstName" class="fl fontLabel">
              First Name <span class="required">*</span> :
            </label>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              type="text"
              name="firstName"
              title="Enter a valid name"
              class={firstLoad && !validation(userDetail.fName)
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.fName}
              placeholder="First Name"
              autofocus="on"
              required
            />
            <div class="invalid-feedback">Please enter a valid first name</div>
          </div>
          <div class="two">
            <label for="middleName" class="fl fontLabel">
              Middle Name : <span class="required">*</span></label
            >
            <input
              type="text"
              name="LastName"
              title="Enter a valid middle name"
              bind:value={userDetail.mName}
              placeholder="Middle Name"
              class={firstLoad && !validation(userDetail.mName)
                ? "form-control is-invalid"
                : "form-control"}
              required
            />
            <div class="invalid-feedback">Please enter a valid middle name</div>
          </div>
          <div class="three">
            <label for="lastName" class="fl fontLabel">
              Last Name <span class="required">*</span> :
            </label>
            <input
              type="text"
              name="firstName"
              title="Enter a valid last name"
              bind:value={userDetail.lName}
              placeholder="Last Name"
              class={firstLoad && !validation(userDetail.lName)
                ? "form-control is-invalid"
                : "form-control"}
              required
            />
            <div class="invalid-feedback">Please enter a valid last name</div>
          </div>
        </div>
  
        <div class="twoPassword">
          <div class="pwd">
            <label for="email" class="fl fontLabel">
              Email ID <span class="required">*</span> :</label
            >
            <input
              type="email"
              required
              name="email"
              bind:value={userDetail.email}
              title="Enter a unique and valid email id"
              class={firstLoad && !validateEmail(userDetail.email)
                ? "form-control is-invalid"
                : "form-control"}
              placeholder="Email Id"
            />
            <div class="invalid-feedback">Please enter a valid email</div>
          </div>
          <div class="cnfpwd">
            <label for="Contact" class="fl fontLabel">
              Contact <span class="required">*</span> :</label
            >
            <input
              type="Contact"
              required
              name="Contact"
              maxlength="10"
              title="Enter a password"
              class={firstLoad && !validateContactNumber(userDetail.contact)
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.contact}
              placeholder="Contact"
            />
            <div class="invalid-feedback">
              Enter a valid 10 digit contact number
            </div>
          </div>
        </div>
        <div class="twoPassword">
          <div class="pwd">
            <label for="password" class="fl fontLabel">
              {dataToBeUpdated === undefined || dataToBeUpdated === ""
                ? "Password"
                : "Old Password"} <span class="required">*</span> :</label
            >
            <input
              type="Password"
              required
              name="password"
              title="Password should be greater than 8 digits"
              bind:value={userDetail.password}
              placeholder="Password"
              class={firstLoad && !checkPwd(userDetail.password)
                ? "form-control is-invalid"
                : "form-control"}
            />
            <div class="invalid-feedback">
              Password should be greater than 8 digits and at must contain 1
              number, 1 special character, 1 upper and 1 lower case letter.
            </div>
          </div>
          <div class="cnfpwd">
            <label for="password" class="fl fontLabel">
              {dataToBeUpdated === undefined || dataToBeUpdated === ""
                ? "Confirm Password"
                : "New Password"} <span class="required">*</span> :</label
            >
            <input
              type="Password"
              required
              name="password"
              title="Confirm Password should match password "
              class={firstLoad &&
              userDetail.password !== userDetail.confirmPassword
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.confirmPassword}
              placeholder="Password"
            />
            <div class="invalid-feedback">
              Password and Confirm Password should match
            </div>
          </div>
        </div>
  
        <div class="twoMore">
          <div class="oneTest">
            <label for="dateOfBirth" class="fl fontLabel">
              Date Of Birth <span class="required">*</span>:
            </label>
            <input
              type="date"
              name="dateOfBirth"
              class={firstLoad && !checkDate(userDetail.dob)
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.dob}
              placeholder="Enter Date"
              onfocus="(this.type='date')"
              min="1990-01-01"
              max="2005-12-31"
              required
            />
            <div class="invalid-feedback">Please enter a valid date</div>
          </div>
          <div class="gender">
            <label for="gender" class="fontLabel">
              Gender <span class="required">*</span> :
            </label>&nbsp; &nbsp;
            <input
              title="Select Gender"
              type="radio"
              name="Gender"
              value="Male"
              bind:group={userDetail.gender}
              required
            />Male &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              type="radio"
              name="Gender"
              value="Female"
              bind:group={userDetail.gender}
              required
            />
            Female &nbsp; &nbsp; &nbsp; &nbsp;
            <input
              type="radio"
              name="Gender"
              value="Other"
              bind:group={userDetail.gender}
              required
            />
            Other
            <div
              class={firstLoad && userDetail.gender.trim() === ""
                ? "address"
                : "invisible"}
            >
              Please select a gender
            </div>
          </div>
        </div>
        <div class="threeNames">
          <div class="one">
            <label for="firstName" class="fl fontLabel">
              Building/Apartment <span class="required">*</span> :
            </label>
            <!-- svelte-ignore a11y-autofocus -->
            <input
              type="text"
              name="firstName"
              title="Enter building/apartment name"
              class={firstLoad && userDetail.address.trim() === ""
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.address}
              placeholder="Building/Apartment"
              autofocus="on"
              required
            />
            <div class="invalid-feedback">Please enter a building/apartment</div>
          </div>
          <div class="two">
            <label for="middleName" class="fl fontLabel">
              Street/Locality : <span class="required">*</span></label
            >
            <input
              type="text"
              name="LastName"
              title="Enter Street/Locality"
              bind:value={userDetail.address1}
              placeholder="Street/Locality"
              class={firstLoad && userDetail.address1.trim() === ""
                ? "form-control is-invalid"
                : "form-control"}
              required
            />
            <div class="invalid-feedback">Please enter a valid data</div>
          </div>
          <div class="three">
            <label for="lastName" class="fl fontLabel">
              Landmark <span class="required">*</span> :
            </label>
            <input
              type="text"
              name="firstName"
              title="Enter landmark"
              bind:value={userDetail.landmark}
              placeholder="Landmark"
              class={firstLoad && userDetail.landmark.trim() === ""
                ? "form-control is-invalid"
                : "form-control"}
              required
            />
            <div class="invalid-feedback">Please enter a valid data</div>
          </div>
        </div>
  
        <div class="threeNames">
          <div class="one">
            <label for="address" class="fl fontLabel">
              City <span class="required">*</span> :</label
            >
            <input
              title="Enter your City"
              type="Location"
              required
              name="Location"
              bind:value={userDetail.city}
              placeholder="City"
              class={firstLoad && userDetail.city.trim() === ""
                ? "form-control is-invalid"
                : "form-control"}
            />
            <div class="invalid-feedback">Please enter a valid city</div>
          </div>
          <div class="two">
            <label for="state" class="fl fontLabel">
              State <span class="required">*</span> :</label
            >
            <select
              title="Select State"
              name="state"
              id="state"
              class={firstLoad && userDetail.state === "Select State"
                ? "form-control is-invalid"
                : "form-control"}
              bind:value={userDetail.state}
            >
              <option value="Select State">{userDetail.state}</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Andaman and Nicobar Islands"
                >Andaman and Nicobar Islands</option
              >
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Dadar and Nagar Haveli"
                >Dadar and Nagar Haveli</option
              >
              <option value="Daman and Diu">Daman and Diu</option>
              <option value="Delhi">Delhi</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
            <div class="invalid-feedback">Please enter a valid State</div>
          </div>
          <div class="three">
            <label for="state" class="fl fontLabel">
              Pin Code <span class="required">*</span> :</label
            >
            <input
              title="Enter Pin Code"
              type="text"
              name="pin"
              class={firstLoad && !isZipNumber(userDetail.pinCode)
                ? "form-control is-invalid"
                : "form-control"}
              placeholder="Pin Code"
              pattern="[0-9]{4}"
              maxlength="6"
              bind:value={userDetail.pinCode}
            />
            <div class="invalid-feedback">Please enter a valid pin code</div>
          </div>
        </div>
  
        <button
          class=" btn btn-primary button"
          on:click={() => {
            handleButton(dataToBeUpdated);
          }}>Submit</button
        >
      </div>
    </div>
  </main>
  
  <style>
    h1 {
      text-align: center;
      font-size: 25px;
      font-weight: bold;
      color: #212529;
      margin-top: 20px;
      margin-bottom: -30px;
    }
    .fontLabel {
      font-size: 15px;
      color: #212529;
      font-weight: bold;
    }
    .container {
      margin-top: 50px;
    }
    .formContainer {
      width: 70%;
      margin-left: 250px;
    }
    .threeNames {
      display: flex;
      gap: 4px;
      width: 82%;
    }
    .required {
      color: red;
    }
    .button {
      display: flex;
      margin-left: 36%;
      margin-top: 10px;
    }
  
    .gender {
      width: 60%;
    }
  
    .invalid-feedback {
      margin-top: -0.75rem;
    }
    .twoPassword {
      display: flex;
  
      gap: 4px;
      width: 82%;
    }
    .pwd {
      width: 50%;
    }
    .cnfpwd {
      width: 50%;
    }
    .add {
      width: 50%;
    }
    .twoMore {
      display: flex;
      gap: 4px;
    }
    .oneTest {
      width: 41%;
    }
    .address {
      margin-top: 0;
      font-size: 0.875em;
      margin-left: 15px;
      color: #de3545;
    }
  </style>
  