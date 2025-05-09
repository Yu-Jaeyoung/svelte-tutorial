<script>
    import ScheduleTable from "../components/ScheduleTable.svelte";
    import { timetable } from "../store/index.js";

    let userId = "";
    let userData = null;
    let error = null;
    let loading = false;

    async function fetchUserData() {
        loading = true;
        error = null;
        userData = null;

        try {
            const data = await timetable.getTimetableByUserId(userId);
            userData = Array.isArray(data) ? data : [];
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }
</script>

<input type="text" bind:value={userId} placeholder="사용자 ID 입력"/>
<button on:click={fetchUserData}>데이터 가져오기</button>

{#if loading}
    <p>로딩 중...</p>
{:else if error}
    <p style="color: red;">{error}</p>
{:else if userData && userData.length === 0}
    <p>사용자를 찾을 수 없습니다.</p>
{:else if userData}
    <ScheduleTable {userData}/>
{/if}
