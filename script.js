let isProjectsBroken = true; // Added this bit here to open the chat and show a message that project links are broken.

function getOptions(){
    const options = JSON.parse(localStorage.getItem("options"));
    return options;
}
function setOptions(options){
    localStorage.setItem("options", JSON.stringify(options));
}

const InitialOptions = {
    isDarkMode: true,
    isHelpEnabled: true,
    isNoteEnabled: true,
    isSkillSectionHelpEnabled:true,
    isShowModal: true,
}

const storedOptions = getOptions();
if(!storedOptions){
    const options = InitialOptions;
    setOptions(options);

}

function resetChoicesFunctionality(){
    const button = document.querySelector(".reset-choices");
    if(button){
        button.onclick = e => {
            e.preventDefault();
            const options = InitialOptions;
            setOptions(options);
            window.location.reload();
        }
    }
}resetChoicesFunctionality();

function toggleHelp(){
    const tooltips = document.querySelectorAll(".navigation-wrap-info-tip");
    if(tooltips.length){
        tooltips.forEach(tooltip=>{
            const options = getOptions();
            if(options.isHelpEnabled){
                tooltip.style.display = "block";
            }
            const button = tooltip.querySelector(".tooltip-button");
            if(button){
                button.onclick = e => {
                    e.preventDefault();
                    const options = getOptions();
                    const isEnabled = tooltip.style.display === "none" ? false : true;
                    const isSaveToLocalStorage = tooltip.querySelector("input[type='checkbox']").checked;
                    if(isSaveToLocalStorage){
                        options.isHelpEnabled = false;
                        setOptions(options);
                    }

                    if(isEnabled){
                        tooltip.style.display = "none";
                    }
                    else{
                        tooltip.style.display = "block";
                    }
                }
            }
        })
    }
}toggleHelp();

function skillsHelpFunctionality(){
    const skillsSectionHelpWraps = document.querySelectorAll(".skills-section-help-wrap");
    const options = getOptions();
    if(skillsSectionHelpWraps.length){
        skillsSectionHelpWraps.forEach(skillsSectionHelpWrap=>{
            if(options.isSkillSectionHelpEnabled){
                skillsSectionHelpWrap.style.display = "grid";
            }
            const button = skillsSectionHelpWrap.querySelector("form button");
            if(button){
                button.onclick = e => {
                    e.preventDefault();
                    skillsSectionHelpWraps.forEach(item=>item.style.display = "none");
                    const isSaveToLocalStorage = skillsSectionHelpWrap.querySelector("form .checkbox-wrap input[type='checkbox']").checked;
                    if(isSaveToLocalStorage){
                        const options = getOptions();
                        options.isSkillSectionHelpEnabled = false;
                        setOptions(options);
                    }
                }
            }
        })
    }

}skillsHelpFunctionality();



// This function opens dropdown inside of the section when it is clicked for the first time.
function openFirstExpandable(section){
    const expandables = section.querySelectorAll(".expandable");
    if(expandables.length){
        let isFirstTime = false;
        expandables.forEach(expandable=>{
            if(expandable.style.maxHeight === ""){
                isFirstTime = true;
            }
        });
        if(isFirstTime){
            setTimeout(()=>{
                const expandable = section.querySelector(".expandable");
                if(expandable){
                    const height = expandable.scrollHeight;
                    expandable.style.maxHeight = `${height}px`;
                    const button = section.querySelector(".expandable-button");
                    if(button){
                        button.classList.add("button--active");
                    }
                }
            })
        }
    }
}


// This function runs when user opens Projects section for the first time.
function showProjectLinksMessage(section){
    const isProjectSection = section.id === "projects" ? true : false;
    if(isProjectSection){
        if(isProjectsBroken){
            toggleMessageExpand(true);
            appendReply();
            setTimeout(()=>{
                appendReply("Hello");
                appendReply();
                setTimeout(()=>{
                    appendReply("Some project links might be down because Heroku recently changed their free plan.<br/>Sorry for that. 😓");
                    appendOptions(["Where can i see your projects?", "Ok"]);
                },1500);
            },1500);
            isProjectsBroken = false;
        }
    }
}

function toggleNavigation(){
    const navigationWrap = document.querySelector(".navigation-wrap");
    const sections = document.querySelectorAll("section");
    // closing every section except the very first one
    if(sections){
        sections.forEach((section,i)=>{
            if(i !==0 ){
                section.style.display = "none";
            }
        })
    }
    // this function will close all the sections that are opened and then we can open the one that was clicked 
    function closePreviousSections(){
        if(sections){
            sections.forEach(section=>section.style.display = "none");
        }
    }

    if(navigationWrap){
        const buttons = navigationWrap.querySelectorAll(".navigation-button");
        function disablePreviousButtons(){
            if(buttons.length){
                buttons.forEach(button=>button.classList.remove("button--active"));
            }
        }
        if(buttons.length){
            buttons.forEach((button,i)=>{
                // making the very first button active by default
                if(i===0){
                    button.classList.add("button--active");
                }
                button.onclick = e => {
                    e.preventDefault();
                    disablePreviousButtons();
                    button.classList.add("button--active");
                    const section = button.dataset.toggleSection;
                    if(section){
                        const sectionToEnable = document.querySelector(`#${section}`);
                        if(sectionToEnable){
                            closePreviousSections();
                            openFirstExpandable(sectionToEnable);
                            showProjectLinksMessage(sectionToEnable);
                            sectionToEnable.style.display = "block";
                        }
                    }
                }
            })
        }
    }
}toggleNavigation();


function toggleTheme(){
    const buttons = document.querySelectorAll(".theme-switcher-button");
    const options = getOptions();
    const { isDarkMode } = options;
    if(isDarkMode){
        document.body.classList.add("dark-mode");
    }
    else if(document.body.classList.contains("dark-mode")){
        document.body.classList.remove("dark-mode");
    }
    if(buttons.length){
        buttons.forEach(button=>{
            if(isDarkMode){
                button.classList.add("button--active");
            }
            button.onclick = e => {
                e.preventDefault();
                const isDarkMode = document.body.classList.contains("dark-mode");
                const options = getOptions();
                if(isDarkMode){
                    document.body.classList.remove("dark-mode");
                    button.classList.remove("button--active");
                    options.isDarkMode = false;
                }
                else{
                    document.body.classList.add("dark-mode");
                    button.classList.add("button--active");
                    options.isDarkMode = true;
                }
                setOptions(options);
            }
        })
    }
}toggleTheme();


function setSidebar(option){
    const sideBar = document.querySelector(".body__background");
    const overlay = document.querySelector(".body-overlay");
    if(sideBar){
        if(option){
            sideBar.classList.add("active");
            if(overlay){
                overlay.classList.add("overlay--active");
            }
        }
        else{
            sideBar.classList.remove("active");
            if(overlay){
                overlay.classList.remove("overlay--active");
            }
        }
    }
}

function hamburgerIconFunctionality(){
    const button = document.querySelector(".sidebar-toggle-button");
    if(button){
        button.onclick = e => {
            e.preventDefault();
            setSidebar(true);
        }
    }
}hamburgerIconFunctionality();





function sidebarCloseIconFunctionality(){
    const button = document.querySelector(".sidebar-close-button");
    if(button){
        button.onclick = e => {
            e.preventDefault();
            setSidebar(false);
        }
    }
}sidebarCloseIconFunctionality();






function overlayFunctionality(){
    const overlay = document.querySelector(".body-overlay");
    if(overlay){
        overlay.onclick = e => {
            e.preventDefault();
            setSidebar(false);
        }
    }
}overlayFunctionality();


function expandableFunctionality(){
    const sections = document.querySelectorAll(".section");
    if(sections){
        sections.forEach(section=>{
            const buttons = section.querySelectorAll(".expandable-button");
            if(buttons.length){
                buttons.forEach(button=>{
                    button.onclick = e => {
                        e.preventDefault();
                        const expandable = button.parentElement.querySelector(".expandable");
                        if(expandable){
                            buttons.forEach(button=>button.classList.remove("button--active"));
                            const scrollables = section.querySelectorAll(".expandable");
                            if(scrollables.length){
                                scrollables.forEach(scrollable=>scrollable.style.maxHeight = "0px");
                            }
                            const height = expandable.scrollHeight;
                            expandable.style.maxHeight = `${height}px`;
                            button.classList.add("button--active");
                        }
                    }
                })
            }
        })
    }
}expandableFunctionality();

function toggleMessageExpand(option){
    const messageExpandable = document.querySelector(".message-expandable");
    if(messageExpandable){
        const button = messageExpandable.parentElement.querySelector(".sender-wrap");
        if(option){
            const height = messageExpandable.scrollHeight;
            messageExpandable.style.maxHeight = `${height}px`;
            if(button){
                button.classList.add("button--active");
            }
        }
        else{
            messageExpandable.style.maxHeight = `0px`;
            if(button){
                button.classList.remove("button--active");
            }
        }
    }
}
function messageExpandHandler(){
    const button = document.querySelector(".sender-wrap");
    if(button){
        button.onclick = e => {
            e.preventDefault();
            const expandable = button.parentElement.querySelector(".message-expandable");
            if(expandable){
                const isActive = expandable.clientHeight === 0 ? false : true;
                toggleMessageExpand(!isActive);
            }
        }
    }
}messageExpandHandler();


let lastReply = ""; // We need to send last API response to the API along with our message.
let isGettingReply = false; // This is to prevent user from sending multiple messages until a response arrives.



function appendOptions (options){
    const form = document.querySelector(".message-wrap__replies");
    if(form){
        const buttons = form.querySelectorAll(".message-wrap__reply");
        if(buttons.length){
            buttons.forEach(button=>button.remove())
        }
        if(options){
            options.forEach(option=>{
                const button = document.createElement("button");
                button.className = "message-wrap__reply";
                button.innerText = option;
                form.appendChild(button);
            });
        }
        const expandable = document.querySelector(".message-expandable");
        if(expandable){
            const height = expandable.scrollHeight;
            expandable.style.maxHeight = `${height}px`;
        }
    }
}

function appendReply(message){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        // If message is passed to the function then we will append the message otherwise, we will append typing animation
        if(message){
            // removeing typing animations if any exists
            const typings = messageWrap.querySelectorAll(".message-wrap__message.typing");
            if(typings.length){
                typings.forEach(typing=>typing.remove());
            }
            // Appending message and scrolling to bottom
            const messageNode = document.createElement("div");
            messageNode.className = "message-wrap__message";
            messageNode.innerHTML = message;
            messageWrap.appendChild(messageNode);
            messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
        }
        else{
             // Showing Typing animation
            const typing = document.createElement("div");
            typing.className = "message-wrap__message typing";
            typing.innerHTML = "<div></div><div></div><div></div>"
            messageWrap.appendChild(typing);
            messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
        }
    }
}


function getReply(message){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        // Showing Typing animation
        appendReply();

        // Sending API request
        const API = "https://heliotrope-brazen-cafe.glitch.me";
        const payload = {
            message,
            lastReply,
        }
        const requestObj = {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(payload),
        }

        isGettingReply = true;

        fetch(API, requestObj).then(json=>json.json()).then(res=>{
            // removeing typing animations if any exists
            const typings = messageWrap.querySelectorAll(".message-wrap__message.typing");
            if(typings.length){
                typings.forEach(typing=>typing.remove());
            }
            appendReply(res.reply);
            appendOptions(res.suggestions);
            lastReply = res.reply;
            isGettingReply = false;
        }).catch(err=>{
            isGettingReply = false;
            appendReply("I think we are having some network issues.<br/><br/>How about you write an email to me?<br/>Email: <a href='mailto:zarghamaijaz45@gmail.com'>zarghamaijaz45@gmail.com</a>");
            appendOptions([]);
        });
    }
}
function sendMessage(text){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        if(isGettingReply){
            toasterAlert("<div><i style='color:#ff2222' class='fa fa-exclamation-triangle'></i> Please wait for the reply</div>", 3000);
        }
        else{
            const messageNode = document.createElement("div");
            messageNode.className = "message-wrap__message is-own";
            messageNode.innerText = text;
            messageWrap.appendChild(messageNode);
            messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
            getReply(text);
        }
    }
}

function sendMessageHandler(){
    const form = document.querySelector(".message-wrap__replies");
    if(form){
        form.onsubmit = e => {
            e.preventDefault();
            if(e.submitter.innerText !== ""){
                sendMessage(e.submitter.innerText);
            }
        }
    }
}sendMessageHandler();

function sendMessageInputHandler(){
    const form = document.querySelector(".message-wrap__input-wrap");
    if(form){
        form.onsubmit = e => {
            e.preventDefault();
            const input = e.target.querySelector("input[type='text']");
            if(input){
                if(input.value !== ""){
                    sendMessage(input.value);
                    input.value = ""
                }
            }
        }
    }
}sendMessageInputHandler();


function toasterAlert( HTML, timeout ){
    const prevToasters = document.querySelectorAll(".toaster-wrap");
    if(prevToasters.length){
        prevToasters.forEach(toaster=>toaster.remove());
    }

    if(HTML){
        const toasterWrap = document.createElement("div");
        toasterWrap.className = "toaster-wrap";

        const toasterNotification = document.createElement("div");
        toasterNotification.className = "toaster-notification";

        toasterNotification.innerHTML = HTML;
        toasterWrap.appendChild(toasterNotification);
        document.body.prepend(toasterWrap);

        setTimeout(()=>{
            document.body.querySelector(".toaster-wrap").classList.add("toaster--active");
        })

        timeout = setTimeout(()=>{
            document.body.querySelector(".toaster-wrap").classList.remove("toaster--active");
        },timeout || 5000);

    }
}

function showRandomGreetMessage(){
    const messages = [
        "Hi!",
        "Howdy!",
        "Hey there!",
        "!السلام عليكم",
        "Good to see you here.",
        "Hey how's it going.",
        "Hey what's up.",
        "Welcome!",
        "Welcome to my website.",
        "Thank you for your interest!",
        "Thanks for visiting",
    ];
    const number = Math.floor(Math.random()*messages.length);
    toasterAlert(`<div style='text-align:center;'>${messages[number]} 😄</div>`);
}showRandomGreetMessage();