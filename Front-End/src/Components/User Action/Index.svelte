<script>
  import Table from "./Table.svelte";

  import toast, { Toaster } from "svelte-french-toast";
  import UserForm from "../User Action/UserForm.svelte";
  import Header from "../Shared/Header/Header.svelte";
  let foundSearchData = [];
  let userData = [];
  let dataToBeUpdated = "";
  let totalPages = 0;
  let totalRecords = 0;
  let loading = true;
  $: page = 1;

  let searchData = "";

  let totalRecordPerPage = "";

  $: block = "dashboard";
  $: buttonStatusOnEvent = (event) => {
    if (event.detail.block === "userForm") {
      block = "userForm";
      console.log(block);
    } else if (event.detail.block === "dashboard") {
      page = 1;
      block = "dashboard";
      console.log(block);
    } else if (event.detail.block === "searchField") {
      block = "searchField";
      searchData = event.detail.data;

      getSingleId(searchData);
    }
  };
  $: pageNumber = (e) => {
    if (e.detail.message === "next" && page < totalPages) {
      page++;

      fetchData();
    } else if (e.detail.message === "prev" && page > 1 && page <= totalPages) {
      page--;
      fetchData();
      console.log("prev pressed");
    } else if (e.detail > 0 && e.detail <= totalPages) {
      page = e.detail;
      fetchData();
    }
  };

  const fetchData = async () => {
    try {
      const url = `http://localhost:4000/user/?page=${page}`;

      const res = await fetch(url, {
        method: "GET",
      });
      let response = await res.json();
      console.log(response.data);
      userData = response.data;
      totalPages = response.totalPages; // Total number of pages (totalrecord/8)
      totalRecords = response.totalRecords; //Total record in the db
      totalRecordPerPage = userData.length; //Records per page
    } catch (error) {
      console.log(error);
    } finally {
      () => {
        loading = false;
      };
    }
  };

  var deleteClick = async (e) => {
    try {
      const res = await fetch("http://localhost:4000/user/" + e.detail, {
        method: "DELETE",
      });
      const response = await res.text();
      console.log(response);

      var delId = "";
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id === e.detail) {
          delId = i;
        }
      }
      userData.splice(delId, 1);
      userData = userData;

      toast.success(`User Data Deleted Successfully`, {
        position: "bottom-center",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  var updateDataSend = async (e) => {
    try {
      block = "updateUser";
      dataToBeUpdated = e.detail;
      console.log(dataToBeUpdated);
    } catch (error) {
      console.log(error);
    }
  };
  var updatingTheData = async (e) => {
    try {
      let updatedData = e.detail;
      console.log(updatedData);
      if (
        updatedData.fName.trim() === "" ||
        updatedData.mName.trim() === "" ||
        updatedData.lName.trim() === ""
      ) {
        toast.error(`Name fields cannot be blank`, {
          position: "bottom-center",
        });
      } else {
        const res = await fetch(
          "http://localhost:4000/user/" + updatedData.u_id,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              f_name: updatedData.f_name,
              m_name: updatedData.m_name,
              l_name: updatedData.l_name,
              email: updatedData.email,
              contact: updatedData.contact,
              password: updatedData.password,
              confirmPassword: updatedData.confirmPassword,
              date_of_birth: updatedData.date_of_birth,
              gender: updatedData.gender,
              address_line1: updatedData.address_line1,
              address_line2: updatedData.address_line2,
              landmark: updatedData.landmark,
              city_name: dataToBeUpdated.city_name,
              zip_code: updatedData.zip_code,
              state_name: updatedData.state_name,
            }),
          }
        );
        const response = await res;
        console.log(response.status);
        var resText = await response.text();
        if (response.status === 200) {
          block = "dashboard";
          console.log(toast);
          toast.success(`Data Updated For ${updatedData.fName}`, {
            position: "bottom-center",
          });
          await fetchData();
        } else {
          toast.error(`${resText}`, {
            position: "bottom-center",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSingleId = async (email) => {
    try {
      const url = `http://localhost:4000/user/${email}`;
      console.log(url);
      const res = await fetch(url, {
        method: "GET",
      });
      let response = await res.json();
      // foundSearchData = foundSearchData.push(response);
      for (let index = 0; index < response.length; index++) {
        foundSearchData[index] = response[index];
      }

      console.log(foundSearchData);
      totalPages = 1; // Total number of pages (totalrecord/8)
      totalRecords = response.length; //Total record in the db
      totalRecordPerPage = response.length; //Records per page
      console.log();
    } catch (error) {
      console.log(error.text);
      toast.error(`Data Not Found`, {
        position: "bottom-center",
      });
      block = "dashboard";
    }
  };

  const doPost = async (e) => {
    // console.log(e.detail);
    try {
      let dataToBeAdded = e.detail;
      console.log(dataToBeAdded);
      if (dataToBeAdded.confirmPassword !== dataToBeAdded.password) {
        dataToBeAdded.password = "";
      }

      const res = await fetch("http://localhost:4000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: dataToBeAdded.fName,
          mName: dataToBeAdded.mName,
          lName: dataToBeAdded.lName,
          gender: dataToBeAdded.gender,
          dob: dataToBeAdded.dob,
          email: dataToBeAdded.email,
          password: dataToBeAdded.password,
          contact: dataToBeAdded.contact,
          address: dataToBeAdded.address,
          address1: dataToBeAdded.address1,
          landmark: dataToBeAdded.landmark,
          city: dataToBeAdded.city,
          state: dataToBeAdded.state,
          pinCode: dataToBeAdded.pinCode,
        }),
      });

      const response = await res.text();
      const status = await res.status;
      console.log(response);
      console.log(status);
      if (status === 200) {
        block = "dashboard";
        toast.success(`${response}`, {
          position: "bottom-center",
        });
        fetchData();
        page = totalPages;
      } else {
        toast.error(`${response}`, {
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
</script>

<Toaster />
<Header {block} on:message={buttonStatusOnEvent} />
{#if block === "dashboard"}
  <Table
    {userData}
    {fetchData}
    {totalRecords}
    {totalPages}
    {totalRecordPerPage}
    {page}
    on:delete={deleteClick}
    on:update={updateDataSend}
    on:page={pageNumber}
    on:next={pageNumber}
    on:prev={pageNumber}
  />
{:else if block === "userForm"}
  <UserForm on:post={doPost} />
{:else if block === "updateUser"}
  <UserForm {dataToBeUpdated} on:update={updatingTheData} />
{:else if block === "searchField"}
  <Table
    userData={foundSearchData}
    fetchData={getSingleId}
    {totalRecords}
    {totalPages}
    {searchData}
    {totalRecordPerPage}
    {page}
    on:delete={deleteClick}
    on:update={updateDataSend}
    on:page={pageNumber}
    on:next={pageNumber}
    on:prev={pageNumber}
  />
{/if}
