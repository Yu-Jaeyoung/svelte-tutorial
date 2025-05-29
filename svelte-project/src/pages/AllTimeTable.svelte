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

<div class="container">
    {#if error}
        <p class="error-message" style="color: red;">{error}</p>
    {:else if allSchedules.length}
        <HeatmapTable {allSchedules}/>
    {:else}
        <p class="loading-message">로딩 중...</p>
    {/if}
</div>

<style>
    .container {
        background-color: #E1ECF7;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .error-message {
        padding: 10px;
        border: 1px solid red;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .loading-message {
        text-align: center;
        font-style: italic;
        color: #666;
        padding: 20px;
    }
</style>