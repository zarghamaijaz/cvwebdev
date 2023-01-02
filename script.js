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
    isSkillSectionHelpEnabled:true
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

let lastReply = "";

function getReply(message){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        // Showing Typing animation
        const typing = document.createElement("div");
        typing.className = "message-wrap__message typing";
        typing.innerHTML = "<div></div><div></div><div></div>"
        messageWrap.appendChild(typing);
        messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });

        // Sending API request
        const API = "http://localhost:5000/chat";
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
        fetch(API, requestObj).then(json=>json.json()).then(res=>{
            // removeing typing animations if any exists
            const typings = messageWrap.querySelectorAll(".message-wrap__message.typing");
            if(typings.length){
                typings.forEach(typing=>typing.remove());
            }
            const messageNode = document.createElement("div");
            messageNode.className = "message-wrap__message";
            messageNode.innerHTML = res.reply;
            messageWrap.appendChild(messageNode);
            messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
            appendOptions(res.suggestions);
            lastReply = res.reply;
        });
    }
}
function sendMessage(text){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        const messageNode = document.createElement("div");
        messageNode.className = "message-wrap__message is-own";
        messageNode.innerText = text;
        messageWrap.appendChild(messageNode);
        messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
        getReply(text);
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