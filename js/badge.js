document.addEventListener("DOMContentLoaded", function () {
    const terminalInput = document.getElementById("terminal-input");
    const output = document.querySelector(".output");
    const badgeContainer = document.getElementById("badge-container");

    const certifications = [
        { name: "Badge 1", link: "https://cyber-range.mist.ac.bd/CertificateCR.php" },
        { name: "Badge 2", link: "https://arcx.io/verify-certificate?id=6dd9dee809f05a18867cddb2353bcc3b5f7d1d99&k=450ccc61a5834be091859ca159e2ead2"},
        { name: "Badge 3", link: "https://www.credly.com/badges/c9810dab-2ae8-4769-8c28-331872afef1b/public_url" },
        { name: "Badge 4", link: "https://media.licdn.com/dms/image/v2/D5622AQEuidXp4xSzDw/feedshare-shrink_800/feedshare-shrink_800/0/1694929922018?e=1741824000&v=beta&t=f5X30P3HbfsL2haaYxD2ljrdlo2Uwwh9HFJse8kcvcs" },
        { name: "Badge 5", link: "https://pbs.twimg.com/media/FU4747KUcAAp7Ww?format=jpg&name=large" },
        { name: "Badge 6", link: "https://drive.google.com/file/d/1KXrVmPx2QTx82WkY0NzJLvAaQiWGoBIg/view" }
    ];

    terminalInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const command = terminalInput.value.trim().toLowerCase();
            output.innerHTML += `<p>> ${command}</p>`;

            if (command === "show badges") {
                badgeContainer.style.display = "flex";
            
                setTimeout(() => {
                    badgeContainer.classList.add("show-badges"); // Main fade-in effect
                }, 50);
            
                // Add staggered animations for each badge
                document.querySelectorAll(".test-shape").forEach((badge, index) => {
                    setTimeout(() => {
                        badge.classList.add("badge-appear");
                    }, index * 200); // Delay increases for each badge
                });
            
                output.innerHTML += `<p>💾 Badges Unlocked! Click to Show Description! </p>`;
                attachBadgeListeners();
            } else {
                output.innerHTML += `<p>❌ Unknown Command: ${command}</p>`;
            }
            
            

            terminalInput.value = "";
        }
    });

    function attachBadgeListeners() {
        const badges = document.querySelectorAll(".test-shape");
        badges.forEach((badge, index) => {
            badge.addEventListener("click", function (event) {
                event.stopPropagation(); // Prevents flipping issue
                showPopup(certifications[index]?.name || "Unknown Cert", certifications[index]?.link || "#");
            });
        });
    }

    const badgeDescriptions = {
        "Badge 1": "Information Security Assessment and Penetration Testing(VAPT)",
        "Badge 2": "Foundation Level Threat intelligence Analyst",
        "Badge 3": "API Penetration Testing - APISec University",
        "Badge 4": "Bash Scripting From Codeacademy",
        "Badge 5": "Ethical Hacking Essentials - EC COUNSIL",
        "Badge 6": "Python for Penetration Testing",
    
        // Add more as needed
    };
    
    function showPopup(name, link) {
        const popup = document.createElement("div");
        popup.classList.add("popup");
    
        const description = badgeDescriptions[name] || "No description available."; // Get the description
    
        popup.innerHTML = `
            <div class="popup-content">
                <h2>${name}</h2>
                <p>${description}</p> <!-- Displays the description -->
                <a href="${link}" target="_blank">Verify Certificate</a>
                <button onclick="closePopup(this)">Close</button>
            </div>
        `;
    
        document.body.appendChild(popup);
    }
    
});

function closePopup(button) {
    const popup = button.closest(".popup"); // Find the closest .popup container
    if (popup) {
        popup.remove(); // Remove the entire popup
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let hexagons = document.querySelectorAll(".test-shape");
    let colors = ["linear-gradient(90deg, #38CC53 0%, #003687 167%)", 
        "linear-gradient(90deg,rgb(228, 66, 26) 0%,rgb(201, 214, 10) 167%)", 
        "linear-gradient(90deg,rgb(152, 0, 172) 0%,rgb(255, 255, 255) 167%)", 
        "linear-gradient(90deg,rgb(248, 32, 32) 0%,rgb(230, 230, 230) 167%)", 
        "linear-gradient(90deg,rgb(0, 17, 110) 0%,rgb(161, 0, 167) 167%)", 
        "linear-gradient(90deg,rgba(0, 4, 247, 0.86) 0%,rgb(0, 238, 255) 167%)", 
        "linear-gradient(90deg,rgb(255, 230, 0) 0%,rgb(0, 42, 228) 167%)", 
        "linear-gradient(90deg,rgb(0, 162, 202) 0%,rgb(255, 255, 255) 167%)", 
        "linear-gradient(90deg,rgb(205, 53, 124) 0%,rgb(146, 6, 97) 167%)", 
        "linear-gradient(90deg,rgb(255, 0, 0) 0%,rgb(255, 0, 157) 167%)"];

    hexagons.forEach((hex, index) => {
        if (colors[index]) {
            hex.style.background = colors[index];
        }
    });
});
