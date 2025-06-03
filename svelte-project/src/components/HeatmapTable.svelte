<script>
    export let allSchedules = [];

    const days = [ 'Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat' ];
    const hours = Array.from({ length: 14 }, (_, i) => i + 9); // 9~22

    let convertMode = false;

    // 카운트 테이블 초기화
    let countMap = {};
    for (const day of days) {
        for (const hour of hours) {
            countMap[`${ day }_${ hour }`] = 0;
        }
    }

    // 시간별 카운트 집계
    for (const item of allSchedules) {
        const { day, startTime, endTime } = item;
        for (let h = startTime; h < endTime; h++) {
            countMap[`${ day }_${ h }`]++;
        }
    }

    const maxCount = Math.max(...Object.values(countMap));

    function getBackgroundColor(day, hour) {
        const key = `${ day }_${ hour }`;
        const count = countMap[key];

        if (!convertMode) {
            if (count === 0) return '#fff';
            const alpha = Math.min(1, count / maxCount);
            return `rgba(225, 236, 247, ${ alpha })`;
        } else {
            return count === 0 ? '#a4bacc' : '#fff';
        }
    }
</script>

<style>
    table {
        border-collapse: collapse;
        margin-top: 20px;
        width: 50%;
        text-align: center;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 6px;
        width: 36px;
        height: 30px;
    }

    .controls {
        margin: 10px 0;
        font-size: 14px;
    }

    label {
        display: flex;
        align-items: center;
        gap: 6px;
    }
</style>

<div class="controls">
    <label>
        <input type="checkbox" bind:checked={convertMode}/>
        일정이 없는 시간 보기 (Convert 모드)
    </label>
</div>

<table>
    <thead>
    <tr>
        <th>Hour</th>
        {#each days as day}
            <th>{day}</th>
        {/each}
    </tr>
    </thead>
    <tbody>
    {#each hours as hour}
        <tr>
            <td>{hour}</td>
            {#each days as day}
                <td style="background-color: {getBackgroundColor(day, hour)};"></td>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>
