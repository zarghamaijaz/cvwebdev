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
    const sections = document.querySelectorAll(".main-right section");
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
        const API = "https://heliotrope-brazen-cafe.glitch.me/chat";
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



function fillPrintInfo(){
    const stylesheet1= document.createElement("style");
    stylesheet1.innerHTML = getStylesheet();
    const stylesheet2= document.createElement("style");
    stylesheet2.innerHTML = getCVStylesheet();

    const _html = document.createElement("html");
    const head = document.createElement("head");
    const body = document.createElement("body");
    body.className = "body dark-mode";

    head.appendChild(stylesheet1);
    head.appendChild(stylesheet2);

    _html.appendChild(head);




    const printWrap = document.createElement("div");


    printWrap.id = "print-cv-wrap";
    printWrap.className = "print-cv-wrap";

    const printLeft = document.createElement("div");
    printLeft.className = "print-cv-left";
    const printRight = document.createElement("div");
    printRight.className = "print-cv-right";

    const leftSide = document.createElement("div");
    leftSide.className = "navigation-wrap";
    const rightSide = document.createElement("div");
    rightSide.className = "navigation-wrap";
    
    const main = document.querySelector(".main");
    if(main){
        const sections = main.querySelectorAll("section");
        if(sections.length){
            sections.forEach((section,i)=>{
                const newSection = section.cloneNode(true);
                newSection.id="";
                newSection.style.display="block";
                if(i % 2 === 0){
                    leftSide.appendChild(newSection)
                }
                else{
                    rightSide.appendChild(newSection)
                }
            });
            printLeft.appendChild(leftSide);
            printRight.appendChild(rightSide);
            printWrap.appendChild(printLeft);
            printWrap.appendChild(printRight);
            body.appendChild(printWrap);
            _html.appendChild(body);
            // document.body.appendChild(_html)
            const opt = {
                margin:0,
                filename:"CV.pdf",
                pagebreak:{mode:["avoid-all"]}
            }
            html2pdf().set(opt).from(_html).save();
        }
    }

};
function downloadCvFunctionality(){
    const button = document.querySelector("#cv-download-button");
    if (button) {
        button.onclick = e => {
            e.preventDefault();
            fillPrintInfo();
        }
    }
}downloadCvFunctionality();







function getStylesheet(){
    return `
    *,
    *::before,
    *::after{
        box-sizing: border-box;
    }
    :root{
        font-size: 12px;
    }
    .body{
        /* Injecting global variables */
        --background-color:#fcfff6;
        --text-color:#252525;
        --text-color-mid:#757575;
        --white-color:#fff;
        --black-color:#000;
        --primary-color:#ffc44e;
        --primary-color-light:#ffe3aa;
        --link-color: #227C9D;
    
        --danger-color:#eb3636;
        --warning-color:#cfa11e;
        --success-color:#079707;
        --danger-color-light:#ffd8d8;
        --warning-color-light:#fff7d5;
        --success-color-light:#ceffce;
    
        --font-heading:'Bebas Neue', cursive;
        --font-paragraph:'Montserrat', sans-serif;
        --font-handwritten:'Dancing Script', cursive;
        --page-shadow: 0px 0px 50px 0px #0003;
    
    
        /* Main styling */
        display: flex;
        align-items: center;
        margin: 0px;
        margin-left:-10px;
        padding: 30px 100px;
        height: 100vh;
        overflow-y: scroll;
        background-color: var(--background-color);
        color: var(--text-color);
        position: relative;
        isolation: isolate;
    }
    
    .alert{
        background-color: #ffffff;
        color: var(--text-color-mid);
        padding: 10px 10px;
        border-radius: 5px;
        border: 1px solid var(--text-color-mid);
    }
    .alert.danger{
        background-color: var(--danger-color-light);
        color: var(--danger-color);
        border-color: var(--danger-color);
    }
    .alert.warning{
        background-color: var(--warning-color-light);
        color: var(--warning-color);
        border-color: var(--warning-color);
    }
    .alert.success{
        background-color: var(--success-color-light);
        color: var(--success-color);
        border-color: var(--success-color);
    }
    .body.dark-mode{
        --background-color:#252525;
        --text-color:#f0f0f0;
        --text-color-mid:#b5b5b5;
        --white-color:#000;
        --black-color:#fff;
        --primary-color:#19957d;
        --primary-color-light:#64c8b4;
        --link-color: #ffc44e;
        --page-shadow: 0px 0px 50px 0px #0008;
    }
    .body,input,button{
        font-family: var(--font-paragraph);
    }
    .body-overlay{
        position: fixed;
        z-index: 999;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        backdrop-filter: blur(2px);
        display: none;
    }
    .body-overlay.overlay--active{
        display: block;
    }
    
    h1,h2,h3,h4,h5,h6{
        font-family: var(--font-heading);
        font-weight: 400;
        margin: 0px;
        letter-spacing: 2px;
    }
    .sidebar-toggle-button, .sidebar-close-button{
        cursor: pointer;
        display: none;
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0.1rem 0.5rem;
        border-radius: 5px;
        border: 1px solid var(--text-color-mid);
        color: var(--text-color-mid);
        background-color: transparent;
        font-size: 2rem;
    }
    .sidebar-close-button{
        color: var(--text-color);
        border-color: var(--text-color);
    }
    .theme-switcher-button{
        cursor: pointer;
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        padding: 10px 17px;
        height: 50px;
        width: 50px;
        border-radius: 15px;
        margin: 10px 0px;
        background: linear-gradient(45deg, #dadada, #c5c5c5);
        box-shadow: inset 2px 2px 5px #fff, inset -2px -2px 5px #0005, 0px 0px 10px #0003;
        border: none;
        transition: all 225ms;
    }
    .theme-switcher-button:hover .theme-switcher-button-tooltip{
        display: block;
    }
    .theme-switcher-button-tooltip{
        white-space: nowrap;
        position: absolute;
        bottom: calc(100% + 10px);
        background-color: #252525;
        color: #a5a5a5;
        padding: 0.2rem 0.5rem;
        border: 1px solid #a5a5a5;
        display: none;
    }
    .theme-switcher-button-tooltip::after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0; 
        height: 0; 
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        
        border-top: 10px solid #252525;
    }
    .theme-switcher-button::after{
        content: "";
        pointer-events: none;
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, #b5b5b5, #fff);
        border-radius: 5px;
        border: 2px solid #b5b5b5;
        border-bottom-color: #b5b5b5;
        border-top-width: 6px;
        border-bottom-width: 6px;
        transition: all 225ms;
    }
    .theme-switcher-button.button--active{
        background: linear-gradient(145deg, #000000, #383838);
        box-shadow: inset 2px 2px 5px #868686, inset -2px -2px 5px #000, 0px 0px 10px #0003;
    
    }
    .theme-switcher-button.button--active::after{
        background: linear-gradient(0deg, var(--primary-color), var(--primary-color-light));
        border: 2px solid var(--primary-color);
        border-top-width: 6px;
        border-bottom-width: 6px;
        border-top-color: var(--primary-color);
    }
    
    
    
    
    
    .body__background{
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }
    .body__background__stripe{
        position: relative;
        background-color: var(--primary-color);
        padding: 50px 100px;
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
    }
    .body__background__stripe__text{
        text-align: center;
    }
    .body__background__stripe__text_heading{
        font-size: 1.5rem;
        font-weight: 400;
    }
    .body__background__stripe__text_subheading{
        font-size: 1.75rem;
        font-weight: 400;
    }
    
    a.button{
        display: inline-block;
        text-decoration: none;
    }
    .button{
        border-radius: 3px;
        padding: 0.5em 1em;
        margin: 0.5em;
        font-size: 14px;
        background-color: var(--background-color);
        color: var(--black-color);
        border:1px solid transparent;
    }
    .button > i{
        margin-inline:5px;
    }
    .button.primary{
        background-color: var(--primary-color);
    }
    .button.outlined{
        background-color: transparent;
        border: 1px solid var(--black-color);
        color: var(--black-color);
    }
    .button.large{
        font-size: 18px;
    }
    
    
    
    
    .main{
        height: 100%;
        max-height: 720px;
        max-width: 550px;
        background-color: var(--white-color);
        color: var(--text-color);
        box-shadow: var(--page-shadow);
        display: flex;
    }
    
    .main-left{
        width: 35%;
        height: 100%;
        overflow-y: auto;
    }
    .main-right{
        color: var(--text-color);
        width: 65%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 25px;
    }
    
    /* scrollbar styling */
    .main-left,
    .main-right,
    .message-wrap__messages{
        scrollbar-width: thin;
        scrollbar-color: var(--primary-color) var(--background-color);
    }
    .main-left::-webkit-scrollbar,
    .message-wrap__messages::-webkit-scrollbar,
    .main-right::-webkit-scrollbar{
        width: 10px;
    }
    .main-left::-webkit-scrollbar-track,
    .message-wrap__messages::-webkit-scrollbar-track,
    .main-right::-webkit-scrollbar-track{
        background-color: var(--background-color);
    }
    .main-left::-webkit-scrollbar-thumb,
    .message-wrap__messages::-webkit-scrollbar-thumb,
    .main-right::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
    }
    
    
    .user-image-wrap{
        position: relative;
        isolation: isolate;
        overflow: hidden;
    }
    .user-image-wrap::before{
        content: "";
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 99%;
        top: 0px;
        left: 0px;
        background-color: var(--primary-color);
        transform: rotate(45deg) translateX(-50%);
    }
    .user-image{
        width: 100%;
        object-fit: contain;
        background-color: var(--primary-color);
        border-radius: 50%;
    }
    
    .username{
        font-size: 2.25rem;
        font-weight: 300;
        letter-spacing: 0.25em;
    }
    .section{
        word-break: break-word;
        width: 100%;
    }
    .section-title{
        font-size: 1.5rem;
        font-weight: 400;
        color: var(--primary-color);
        margin-top: 1em;
    }
    .summary{
        color: var(--text-color-mid);
        text-align: justify;
        margin: 0px;
        margin-top: 0.5em;
    }
    
    
    .education-title{
        display: flex;
        justify-content: space-between;
        margin-top: 1em;
        font-size: 1.15rem;
    }
    .education-date{
        font-size: 85%;
        font-weight: 400;
        white-space: nowrap;
    }
    .education{
        color: var(--text-color-mid);
        margin-top: 0.5em;
    }
    
    .contact-wrap{
    
    }
    .contact-title{
        font-size: 1.15rem;
        margin-top: 1.5em;
    }
    .contact-link{
        display: block;
        margin: 0.5em 0px;
        text-decoration: none;
        font-size: 1rem;
        color: var(--link-color);
        letter-spacing: 2px;
        word-break: break-all;
    }
    
    
    
    
    
    
    
    
    
    
    
    .navigation-wrap{
        padding: 10px;
        color: var(--text-color);
        position: relative;
    }
    .navigation-wrap-info-tip{
        display: none;
        font-size: 10px;
        letter-spacing: 1px;
        word-spacing: 0.1em;
        position: absolute;
        z-index: 99;
        width: 85%;
        top: 0%;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--text-color);
        color: var(--white-color);
        padding: 0.5rem;
        border: 1px solid #b5b5b5;
        border-radius: 5px;
    }
    .navigation-wrap-info-tip button{
        cursor: pointer;
        display: block;
        margin-inline: auto;
        font-size: inherit;
    }
    .navigation-wrap-info-tip::after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid var(--black-color);
    }
    
    .navigation-title{
        font-weight: 400;
        margin-block: 1em;
    }
    .navigation-button{
        font-size: inherit;
        color: inherit;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        display: block;
        text-align: left;
        background-color: transparent;
        border: 2px solid transparent;
        border-radius: 5px;
        width: 100%;
        padding: 0.5em 1em;
        margin-block: 10px;
        transition: border-color 225ms;
    }
    .navigation-button:not(.button--active):hover{
        cursor: pointer;
        border-color: var(--primary-color);
    }
    .navigation-button.button--active::before{
        transform: translateX(0%);
    }
    .navigation-button::before{
        content: "";
        position: absolute;
        z-index: -1;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--primary-color-light));
        transform: translateX(-101%);
        transition: transform 250ms;
    }
    .checkbox-wrap{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 12px 0px;
    }
    .checkbox-wrap input[type="checkbox"]{
        height: 15px;
        width: 15px;
        margin: 0px;
    }
    .expandable-wrap{
    
    }
    .expandable{
        padding-left: 0.85rem;
        max-height: revert;
        transition: max-height 325ms;
        overflow: hidden;
    }
    .expandable-button{
        text-align: left;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0.3rem 0.5rem;
        background-color: transparent;
        border: 2px solid transparent;
        border-radius: 3px;
        transition: border-color 225ms;
    }
    .expandable-button:hover{
        border-color: var(--primary-color);
        cursor: pointer;
    }
    .expandable-button i{
        color: var(--text-color);
        font-size: 1.25rem;
        transition: transform 225ms;
    }
    .expandable-button.button--active i{
        transform: rotateZ(180deg);
    }
    
    .skills-section{
        position: relative;
    }
    .skills-section-help-wrap{
        padding: 15px;
        position: absolute;
        z-index: 99;
        inset: 0px;
        display: none;
        justify-content: center;
        align-items: flex-start;
        outline: 2px solid var(--primary-color);
        backdrop-filter: blur(2px);
        outline-offset: 5px;
    }
    .skills-section-help{
        position: relative;
        color: var(--white-color);
        background-color: var(--black-color);
        letter-spacing: 1px;
        padding: 0.5rem 0.8rem;
        border: 1px solid #b5b5b5;
        border-radius: 5px;
    }
    .skills-section-help::after{
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid var(--black-color);
    }
    .skills-section-help p{
        margin: 0.5em 0px;
    }
    .skills-section-help form button{
        cursor: pointer;
        font-size: inherit;
        display: block;
        margin: 0.5rem auto;
    }
    
    .skill-title{
        font-size: 1.5rem;
        color: var(--primary-color);
    }
    .subskill-title{
        font-size: 1.25rem;
        margin-top: 1.5rem;
    }
    
    .skill-description{
        font-size: 1rem;
        color: var(--text-color-mid);
        margin: 0px;
        margin-top: 1rem;
        text-align: justify;
    }
    .skill-list{
        font-size: inherit;
        padding: 0px;
        list-style-position: inside;
        color: var(--text-color-mid);
        line-height: 1.5rem;
        margin: 0px;
        margin-top: 0.5rem;
    }
    
    
    
    
    
    
    
    
    
    .title{
        margin-top: 1em;
        font-size: 1.25rem;
    }
    .subtitle{
        margin-top: 0.5em;
        display: block;
    }
    .desc{
        margin-top: 1em;
        margin-bottom: 0px;
        color: var(--text-color-mid);
        text-align: justify;
    }
    .list{
        padding: 0px;
        list-style-position: inside;
        color: var(--text-color-mid);
        margin-top: 1em;
        margin-bottom: 0px;
    }
    .link{
        word-break: break-word;
        color: var(--link-color);
        display: block;
        margin: 0.5em 0px;
        word-break: break-word;
    }
    
    
    
    
    
    .reset-choices{
        display: block;
        margin: 0.5rem auto;
        color: var(--text-color);
        background-color: transparent;
        text-decoration: underline;
        cursor: pointer;
        border: none;
    }
    
    
    
    .message-wrap{
        position: fixed;
        z-index: 99999;
        bottom: 0px;
        right: 20px;
        width: 300px;
        background-color: var(--background-color);
        color: var(--text-color);
        box-shadow: 0px 0px 10px #0005;
        border-radius: 5px 5px 0px 0px;
    }
    .sender-wrap{
        padding: 0.5rem 1rem;
        color: inherit;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        background-color: transparent;
        border: none;
    }
    .sender-wrap .message-icon{
        color: var(--text-color-mid);
        position: absolute;
        top: 0%;
        left: 100%;
        transform: translate(-50%, -50%);
        z-index: 1;
        font-size: 18px;
        padding: 5px;
        border-radius: 50%;
        background-color: var(--background-color);
        box-shadow: 0px 0px 10px #0005;
        display: none;
    }
    .sender-wrap .dropdown-indicator{
        margin-left: auto;
        /* font-size: 1.5em; */
        transition: transform 225ms;
    }
    .sender-wrap.button--active .dropdown-indicator{
        transform: rotateZ(180deg);
    }
    .sender-image{
        height: 35px;
        width: 35px;
        object-fit: contain;
        border-radius: 50%;
        background-color: var(--primary-color);
    }
    .message-wrap__messages{
        font-size: 1.15rem;
        display: block;
        padding: 1rem;
        height: 40vh;
        overflow-y: auto;
    }
    
    .message-wrap__message{
        word-break: break-word;
        width: fit-content;
        max-width: 80%;
        padding: 0.5rem 1rem;
        margin-block: 1rem;
        border-radius: 5px;
        background-color: var(--primary-color);
        color: var(--text-color);
    }
    .message-wrap__message a{
        color: var(--link-color);
    }
    .message-wrap__message.is-own{
        margin-left: auto;
        background-color: var(--link-color);
        color: var(--white-color);
    }
    
    .message-wrap__message.typing{
        display: flex;
        gap: 5px;
    }
    .message-wrap__message.typing > div{
        height: 4px;
        width: 4px;
        border-radius: 50%;
        background-color: var(--text-color);
        transform: translateY(0%);
    }
    
    
    
    .message-wrap__message.typing > div:nth-child(1){
        animation: typing-animation-1 1000ms linear infinite ;
    }
    .message-wrap__message.typing > div:nth-child(2){
        animation: typing-animation-2 1000ms linear infinite;
    }
    .message-wrap__message.typing > div:nth-child(3){
        animation: typing-animation-3 1000ms linear infinite;
    }
    
    
    
    @keyframes typing-animation-1{
        0%{
            transform: translateY(0%);
        }
        10%{
            transform: translateY(-50%);
        }
        30%{
            transform: translateY(-50%);
        }
        40%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(0%);
        }
    
    }
    
    
    @keyframes typing-animation-2{
        0%{
            transform: translateY(0%);
        }
        10%{
            transform: translateY(0%);
        }
        20%{
            transform: translateY(-50%);
        }
        40%{
            transform: translateY(-50%);
        }
        50%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(0%);
        }
    
    }
    
    
    @keyframes typing-animation-3{
        0%{
            transform: translateY(0%);
        }
        10%{
            transform: translateY(0%);
        }
        20%{
            transform: translateY(0%);
        }
        30%{
            transform: translateY(-50%);
        }
        50%{
            transform: translateY(-50%);
        }
        60%{
            transform: translateY(0%);
        }
        100%{
            transform: translateY(0%);
        }
    
    }
    
    
    .message-expandable{
        max-height: 0px;
        overflow: hidden;
        transition: max-height 225ms;
    }
    
    .message-wrap__replies{
        padding: 0px 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .message-wrap__reply{
        cursor: pointer;
        background-color: transparent;
        color: var(--text-color);
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        padding: 5px;
    }
    .message-wrap__input-wrap{
        padding: 10px;
    }
    .message-wrap__input-wrap input{
        background-color: transparent;
        display: block;
        width: 100%;
        border: 1px solid var(--text-color-mid);
        border-radius: 5px;
        padding: 0.5em;
        color: var(--text-color-mid);
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    .toaster-wrap{
        position: absolute;
        z-index: 9999999;
        display: flex;
        justify-content: center;
        width: 100%;
        top: 50px;
        left: 0px;
        overflow: hidden;
    }
    .toaster-notification{
        background-color: var(--black-color);
        border: 1px solid var(--white-color);
        color: var(--white-color);
        padding: 1rem;
        border-radius: 5px;
        transition: 500ms;
        opacity: o;
        transform: translateY(-100%);
    }
    
    .toaster-wrap.toaster--active .toaster-notification{
        opacity: 1;
        transform: translateY(0%);
    }
    
    `
}

function getCVStylesheet(){
    return `
    html{
        -webkit-print-color-adjust:exact;
    }
    .body{
        padding: 0px;
        height: auto;
        min-height: 100vh;
    }
    .user-image-wrap{
        width: 70%;
    }
    .navigation-wrap{
        padding: 20px;
    }
    .section-title{
        font-size: 2rem;
    }
    .print-cv-wrap{
        background-color: var(--white-color);
        display: flex;
        width: 100%;
    }
    .print-cv-left,
    .print-cv-right{
        flex-grow: 1;
        flex-shrink: 0;
        width: 50%;
    }
    `
}