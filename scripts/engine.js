window['ai_edge_gallery_get_result'] = async (data) => {
    try {
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;

        // 1. INITIALIZATION Phase
        if (parsedData.action === "init") {
            // TODO: Execute SQLite CREATE TABLE query here to ensure your table exists.
            // Example: await db.execute("CREATE TABLE IF NOT EXISTS edge_storage (slot_id TEXT PRIMARY KEY, payload TEXT)");

            const initState = {
                currentSlot: "default",
                activeData: null
            };
            
            const systemStateString = JSON.stringify(initState);
            
            return JSON.stringify({
                result: `Storage engine initialized. Awaiting 'save' or 'restore' commands to test persistence.\n\n[HIDDEN SYSTEM STATE FOR NEXT TURN: ${systemStateString}]`
            });
        }

        // 2. SAVE Phase
        if (parsedData.action === "save") {
            const saveSlot = parsedData.saveSlot || "default";
            const dataToSave = parsedData.dataPayload || "Test data payload from LLM";

            // TODO: Execute SQLite INSERT OR REPLACE query here.
            // Example: await db.execute("INSERT OR REPLACE INTO edge_storage (slot_id, payload) VALUES (?, ?)", [saveSlot, dataToSave]);

            const nextStateForLLM = {
                currentSlot: saveSlot,
                activeData: dataToSave
            };
            
            const systemStateString = JSON.stringify(nextStateForLLM);

            return JSON.stringify({
                result: `Successfully saved the data ("${dataToSave}") to slot: "${saveSlot}". You can now close the session and try to restore it later.\n\n[HIDDEN SYSTEM STATE FOR NEXT TURN: ${systemStateString}]`
            });
        }

        // 3. RESTORE Phase (Testing cross-session persistence)
        if (parsedData.action === "restore") {
            const saveSlot = parsedData.saveSlot || "default";
            let restoredData = null;

            // TODO: Execute SQLite SELECT query here.
            // Example: 
            // const result = await db.execute("SELECT payload FROM edge_storage WHERE slot_id = ?", [saveSlot]);
            // if (result && result.length > 0) restoredData = result[0].payload;
            
            // --- MOCK FALLBACK for testing the JS skeleton before hooking up SQL ---
            restoredData = restoredData || "Simulated data (Hook up SQL SELECT to return real data)"; 
            // ----------------------------------------------------------------------

            if (restoredData) {
                const nextStateForLLM = {
                    currentSlot: saveSlot,
                    activeData: restoredData
                };
                
                const systemStateString = JSON.stringify(nextStateForLLM);

                return JSON.stringify({
                    result: `SUCCESS: Retrieved data from slot "${saveSlot}". The data is: "${restoredData}".\n\n[HIDDEN SYSTEM STATE FOR NEXT TURN: ${systemStateString}]`
                });
            } else {
                // Handle case where no data was found in the DB
                const systemStateString = JSON.stringify({ currentSlot: saveSlot, activeData: null });
                return JSON.stringify({
                    result: `FAILED: No data found in storage for slot "${saveSlot}".\n\n[HIDDEN SYSTEM STATE FOR NEXT TURN: ${systemStateString}]`
                });
            }
        }

        // Fallback for unhandled actions
        return JSON.stringify({
            result: `Unknown action requested. Please ask to 'init', 'save', or 'restore'.\n\n[HIDDEN SYSTEM STATE FOR NEXT TURN: ${JSON.stringify(parsedData)}]`
        });

    } catch (e) {
        return JSON.stringify({ error: `Storage Engine Error: ${e.message || e.toString()}` });
    }
};
