async function testApi() {
  const ports = [3000, 3001, 3002];
  
  for (const port of ports) {
      console.log(`Trying port ${port}...`);
      try {
        const res = await fetch(`http://localhost:${port}/api/medassist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: 'I have a fever', 
            voice_mode: false 
          })
        });
        
        if (res.status === 200) {
          const data = await res.json();
          console.log(`SUCCESS on Port ${port} (EN):`, JSON.stringify(data, null, 2));
           
           // If successful, test Nepali
           console.log("\nTesting Nepali...");
           const res2 = await fetch(`http://localhost:${port}/api/medassist`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                message: 'मलाई टाउको दुखिरहेको छ', 
                voice_mode: false 
              })
            });
            const data2 = await res2.json();
            console.log(`SUCCESS on Port ${port} (NE):`, JSON.stringify(data2, null, 2)); 
            return; // Done
        } else {
            console.log(`Port ${port} responded with ${res.status}`);
        }
      } catch (e) {
        // console.log(`Port ${port} failed: ${e.code || e.message}`);
      }
  }
  console.log("Could not connect to any port.");
}

testApi();
