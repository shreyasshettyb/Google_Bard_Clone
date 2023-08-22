const copyResponse = (copyBtn) => {
    const responseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(responseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => (copyBtn.textContent = "done"), 1000);
};

document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.querySelector("#chat-input");
    const sendButton = document.querySelector("#send-btn");
    const themeButton = document.querySelector("#theme-btn");
    const chatContainer = document.querySelector(".chat-container");

    let userText = null;

    const createElement = (html, className) => {
        const chatDiv = document.createElement("div");
        chatDiv.classList.add("chat", className);
        chatDiv.innerHTML = html;
        return chatDiv;
    };

    const getChatResposne = (incomingChatDiv) => {
        chatInput.value="";
        const pElement = document.createElement("p");
        fetch("/process_text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: userText }),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the server
                // console.log(data);
                pElement.textContent = data;
                incomingChatDiv.querySelector(".typing-animation").remove();
                incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
            })
            .catch(function (error) {
                console.log("Error:", error);
            });
    };
    const showTypingAnimation = () => {
        const html = `  <div class="chat-content">
    <div class="chat-details">
        <img src="https://www.gstatic.com/lamda/images/sparkle_resting_v2_darkmode_2bdb7df2724e450073ede.gif" alt="AI Img">
        <div class="typing-animation">
            <div class="typing-dot" style="--delay:0.2s" ></div> 
            <div class="typing-dot" style="--delay:0.3s"></div> 
            <div class="typing-dot" style="--delay:0.4s"></div> 
        </div>
    </div>
    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
</div>`;
        const incomingChatDiv = createElement(html, "incoming");
        chatContainer.appendChild(incomingChatDiv);
        getChatResposne(incomingChatDiv);
    };

    const handleOutgoingChat = () => {
        userText = chatInput.value.trim();
        if (!userText) return;
        const html = ` <div class="chat-content">
        <div class="chat-details">
            <img src="https://cdn.icon-icons.com/icons2/3708/PNG/512/man_person_people_avatar_icon_230017.png" alt="Profile Img">
            <p></p>
        </div>
    </div>`;
        const outgoingChatDiv = createElement(html, "outgoing");
        outgoingChatDiv.querySelector("p").textContent = userText;
        chatContainer.appendChild(outgoingChatDiv);
        setTimeout(showTypingAnimation, 500);
    };

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        themeButton.innerText = document.body.classList.contains("light-mode")
            ? "dark_mode"
            : "light_mode";
    });

    sendButton.addEventListener("click", handleOutgoingChat);
});
