<script>
    import { timetable } from "../store/index.js";

    const days = [ "Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat" ];
    const hours = Array.from({ length: 14 }, (_, i) => i + 9);

    let studentId = "";
    let day = "Mon";
    let startTime = 9;
    let endTime = 10;
    let week = 1;

    async function submitForm() {
        if (!studentId || startTime >= endTime) {
            alert("올바른 정보를 입력해주세요.");
            return;
        }

        let schedule = {
            studentId: Number(studentId),
            day,
            startTime: Number(startTime),
            endTime: Number(endTime),
            week: Number(week),
        };

        try {
            await timetable.addTimetable(schedule);
        } catch (error) {
            console.error(error);
        }
    }

</script>

<form on:submit|preventDefault={submitForm}>
    <label>
        학번
        <input type="number" bind:value={studentId}/>
    </label>
    <br><br>
    <label>
        요일
        <select bind:value={day}>
            {#each days as d}
                <option value={d}>{d}</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label>
        시작 시간
        <select bind:value={startTime}>
            {#each hours as h}
                <option value={h}>{h}:00</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label>
        종료 시간
        <select bind:value={endTime}>
            {#each hours as h}
                <option value={h}>{h}:00</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label>
        <input type="number" bind:value={week}/>
        주차
    </label>
    <br><br>
    <button type="submit">일정 추가</button>
</form>
