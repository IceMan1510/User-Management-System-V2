<script>
  import { createEventDispatcher } from "svelte";
  $: searchField = "";
  export let block;
  const dispatch = createEventDispatcher();
</script>

<div class="table-title">
  <div class="row">
    <div class="col-sm-5">
      <h2>User <b>Management</b></h2>
    </div>

    <div class="col-sm-7">
      <button
        class="btn btn-secondary"
        on:click={() => {
          dispatch("message", { block: "userForm" });
        }}
        ><i class="material-icons">&#xE147;</i>
        <span>Add New User</span></button
      >

      <button
        class="btn btn-secondary"
        on:click={() => {
          dispatch("message", { block: "dashboard" });
        }}
        ><i class="material-icons">&#xe88a;</i>
        <span>User Dashboard</span></button
      >
      {#if block === "dashboard" || block === "searchField"}<input
          type="search"
          placeholder="Email To Search + Enter"
          bind:value={searchField}
          on:keypress={(e) => {
            if (e.key === "Enter") {
              dispatch("message", {
                block: "searchField",
                data: searchField.trim(),
              });
              searchField = "";
            }
          }}
        />{/if}
    </div>
  </div>
</div>

<style>
  .table-title {
    background: #299be4;
    color: #fff;
    padding: 16px 30px;
    margin: 0px 0px 0px;
    border-radius: 3px 3px 0 0;
  }
  .table-title h2 {
    margin: 2px 0 0;
    font-size: 24px;
  }
  .table-title .btn {
    color: #566787;
    float: right;
    font-size: 13px;
    background: #fff;
    border: none;
    min-width: 50px;
    border-radius: 2px;
    border: none;
    outline: none !important;
    margin-left: 10px;
  }
  .table-title .btn:hover,
  .table-title .btn:focus {
    color: #566787;
    background: #f2f2f2;
  }
  .table-title .btn i {
    float: left;
    font-size: 21px;
    margin-right: 5px;
  }
  .table-title .btn span {
    float: left;
    margin-top: 2px;
  }

  [type="search"] {
    float: right;
    padding: 4px;
    border: none;
    margin-top: 0px;
    margin-right: 0px;
    font-size: 16px;
    height: 34px;
    width: 204px;
  }
</style>
