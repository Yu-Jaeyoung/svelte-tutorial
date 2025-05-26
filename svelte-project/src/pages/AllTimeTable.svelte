<script>
    import HeatmapTable from "../components/HeatmapTable.svelte";
    import { timetable } from "../store/index.js";

    let allSchedules = [];
    let error = null;

    async function fetchAllSchedules() {
        error = null;
        try {
            const result = await timetable.getAllTimetables();
            allSchedules = Array.isArray(result) ? result : [];
        } catch (err) {
            error = err.message;
        }
    }

    fetchAllSchedules();
</script>

{#if error}
    <p style="color: red;">{error}</p>
{:else if allSchedules.length}
    <HeatmapTable {allSchedules}/>
{:else}
    <p>로딩 중...</p>
{/if}
