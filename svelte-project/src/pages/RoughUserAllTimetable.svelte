<script>
    import { timetable } from "../store/index.js";

    let userId = "";
    let userData = null;
    let error = null;
    let loading = false;

    // 수정 모드 상태
    let editMode = {};

    async function fetchUserData() {
        loading = true;
        error = null;
        userData = null;

        try {
            const data = await timetable.getTimetableByUserId(userId);
            console.log(typeof data);
            userData = Array.isArray(data) ? data : [];
            Object.keys(userData).forEach(key => {
                editMode[key] = false;
            });
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    function toggleEditMode(index) {
        editMode[index] = !editMode[index];
    }

    async function updateTimetable(index, updatedData) {
        console.log("업데이트 요청:", index, updatedData);
        await timetable.patchTimeTableById(userId, updatedData);
        toggleEditMode(index); // 업데이트 후 수정 모드 해제
    }

    const hours = Array.from({ length: 14 }, (_, i) => i + 9);
</script>

<input type="text" bind:value={userId} placeholder="사용자 ID 입력"/>
<button on:click={fetchUserData}>데이터 가져오기</button>

{#if loading}
    <p>로딩 중...</p>
{:else if userData && Array.isArray(userData)}
    <ul>
        {#each userData as item, index}
            <li>
                <b>ID:</b> {item.id} (수정 불가)
                <br>
                {#if editMode[index]}
                    <label>
                        요일:
                        <select bind:value={item.day}>
                            <option value="Sun">Sun</option>
                            <option value="Mon">Mon</option>
                            <option value="Tue">Tue</option>
                            <option value="Wed">Wed</option>
                            <option value="Thu">Thu</option>
                            <option value="Fri">Fri</option>
                            <option value="Sat">Sat</option>
                        </select>
                    </label>
                    <br>
                    <label>
                        시작 시간:
                        <select bind:value={item.startTime}>
                            {#each hours as hour}
                                <option value={hour}>{hour}:00</option>
                            {/each}
                        </select>
                    </label>
                    <br>
                    <label>
                        종료 시간:
                        <select bind:value={item.endTime}>
                            {#each hours as hour}
                                <option value={hour}>{hour}:00</option>
                            {/each}
                        </select>
                    </label>
                    <br>
                    <button on:click={() => updateTimetable(index, item)}>저장</button>
                    <button on:click={() => toggleEditMode(index)}>취소</button>
                {:else}
                    <span>
                        요일: {item.day}, 시작 시간: {item.startTime}:00, 종료 시간: {item.endTime}:00
                    </span>
                    <button on:click={() => toggleEditMode(index)}>수정</button>
                {/if}
            </li>
        {/each}
    </ul>
{:else if userData}
    {userData}
{/if}