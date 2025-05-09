<script>
    import { users } from "../store/index.js";

    let number = "";
    let name = "";

    function saveUser() {
        const userInfo = { userNumber: number, userName: name };

        users.add(userInfo);

        number = "";
        name = "";
    }
</script>

<div>
    <h2>사용자 입력</h2>
    <input bind:value={number} placeholder="Number"/>
    <input bind:value={name} placeholder="Name"/>
    <button on:click={saveUser}>저장</button>
</div>