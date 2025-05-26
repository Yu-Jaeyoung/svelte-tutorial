<script>
    import { addUser } from "../../../store/api.js";

    let number = "";
    let name = "";

    async function handleSubmit(event) {
        event.preventDefault();

        const userInfo = { userNumber: number, userName: name };

        try {
            await addUser(userInfo);
        } catch (error) {
            console.error("사용자 추가 오류:", error);
        }
    }
</script>

<form on:submit={handleSubmit}>
    <h2>사용자 입력</h2>
    <input bind:value={number} placeholder="Number" required/>
    <input bind:value={name} placeholder="Name" required/>
    <button type="submit">저장</button>
</form>