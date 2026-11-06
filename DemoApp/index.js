
async function runDemoApp() {
    try {
        throw new Error("Database connection failed!");

    } catch (error) {

        console.log("DemoApp encountered an error:");
        console.log(error.message);

        try {
            const response = await fetch(
                "http://localhost:5000/api/events",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: error.message,
                        stack: error.stack,
                        timestamp: new Date().toISOString()
                    })
                }
            );

            console.log("HTTP Status:", response.status);

            const result = await response.json();

            console.log("Ohaki response:", result);

        } catch (networkError) {
            console.log("Could not connect to Ohaki:");
            console.error(networkError.message);
        }
    }
}

runDemoApp();
