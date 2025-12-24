

// TEST PERSONNEL
fetch("http://localhost:3000/personnel")
    .then(res => res.json())
    .then(data => {
        console.log("PERSONNEL :", data);
    });

// TEST OPERATIONS
fetch("http://localhost:3000/operations")
    .then(res => res.json())
    .then(data => {
        console.log("OPERATIONS :", data);
    });
