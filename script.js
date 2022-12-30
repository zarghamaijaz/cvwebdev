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
let lastReply = "";


const chatQuestions = {
    "where can i see your projects?": "I am moving the apps to another platform. Once it is done, the links will be updated here.",
    "where can i see your projects": "I am moving the apps to another platform. Once it is done, the links will be updated here.",
    "where to see your projects?": "I am moving the apps to another platform. Once it is done, the links will be updated here.",
    "where to see your projects": "I am moving the apps to another platform. Once it is done, the links will be updated here.",

    "where to download cv?": "Here's a link to download the CV as a PDF.\n <a target='_blank' href='https://something.com' >https://something.com</a>",
    "where to download cv": "Here's a link to download the CV as a PDF.\n <a target='_blank' href='https://something.com' >https://something.com</a>",
    "where to download your cv?": "Here's a link to download the CV as a PDF.\n <a target='_blank' href='https://something.com' >https://something.com</a>",
    "where to download your cv": "Here's a link to download the CV as a PDF.\n <a target='_blank' href='https://something.com' >https://something.com</a>",

    "where can i contact you?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "where can i contact you": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "where to contact you?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "where to contact you": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",

    "how can i contact you?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "how can i contact you": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "how to contact you?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "how to contact you": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",

    "what are your contact details?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "what are your contact details": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "can you share your contact?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "can you share your contact": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "can you share your contact details?": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "can you share your contact details": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",

    "share your contact": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "share your contact details": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "please share your contact": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "please share your contact details": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "kindly share your contact": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",
    "kindly share your contact details": "You can contact me on the following.<br/> Phone: <a href='tel:03174429967' >03174429967</a> <br/> Phone 2: <a href='tel:03238404499' >03238404499</a> <br/> Email: <a href='mailto:zarghamaijaz45@gmail.com' >zarghamaijaz45@gmail.com</a>",

    "are you actually zargham?": "No i am just an intelligent program developed by him. I am here to help you with your questions.",
    "are you actually zargham": "No i am just an intelligent program developed by him. I am here to help you with your questions.",
    "are you zargham": "You can say that.",
    "are you zargham?": "You can say that.",

    "what's your name":"Zargham Aijaz",
    "what's your name?":"Zargham Aijaz",
    "what is your name":"Zargham Aijaz",
    "what is your name?":"Zargham Aijaz",

    "how's the weather?": "My CPU is getting a bit warmer.",
    "how's the weather": "My CPU is getting a bit warmer.",
    "how is the weather?": "My CPU is getting a bit warmer.",
    "how is the weather": "My CPU is getting a bit warmer.",

    "are you real": "Is anything real?",
    "are you real?": "Is anything real?",

    "are you a human":"No I am a program.",
    "are you a human?":"No I am a program.",

    "are you human":"No I am a program.",
    "are you human?":"No I am a program.",

    "are you a real human":"No I am a real program.",
    "are you a real human?":"No I am a real program.",

    "are you real human":"No I am a real program.",
    "are you real human?":"No I am a real program.",

    "are you a real person":"No I am a real program.",
    "are you a real person?":"No I am a real program.",

    "are you real person":"No I am a real program.",
    "are you real person?":"No I am a real program.",

    "are you a program":"Yes I am.",
    "are you a program?":"Yes I am.",

    "are you a robot":"Yes sort of.",
    "are you a robot?":"Yes sort of.",
    "are you robot":"Yes sort of.",
    "are you robot?":"Yes sort of.",

    "are you a bot":"Yes sort of.",
    "are you a bot?":"Yes sort of.",
    "are you bot":"Yes sort of.",
    "are you bot?":"Yes sort of.",

    "what can you do?": "I can answer some of your questions",
    "what can you do": "I can answer some of your questions",
    "what else can you do?": "I have some limitations therefore, i cannot do much :(",
    "what else can you do": "I have some limitations therefore, i cannot do much :(",
    "how are you":"I'm good thank you :)",
    "how are you?":"I'm good thank you :)",
}

const chatGreetings = {
    "hey":"Hey there! how can I help you?",
    "hey there":"Hey there! how can I help you?",
    "hello":"Hello how can I help you?",
    "hello!":"Hello how can I help you?",
    "greetings":"Greetings how can I help you?",
    "greetings!":"Greetings how can I help you?",
    "bye!":"Bye",
    "bye":"Bye",
    "goodbye!":"ByeBye",
    "goodbye":"ByeBye",
}

const chatLaughs = {
    "hehe":"hehehehehe",
    "heheh":"hehehehehe",
    "hehehe":"hehehehehe",
    "hehehehe":"hehehehehe",
    "haha":"hahahaha",
    "hahah":"hahahaha",
    "hahaha":"hahahaha",
    "hahahaha":"hahahaha",
}

const chatConversations = {
    "ok": "Great. Anything else I can do for you?",
    "cool":"Thanks. Do you want to know anything else?",
    "great":"Thanks. Anything else?",
    "good":"Thanks. Anything else?",
    "yes": "What would you like to know?",
    "no": "Thanks. It was great talking to you.",
    "sorry": "Don't be sorry. You are awesome.",
    "thanks": "My pleasure.<br/> Anything else?",
    "thank you": "Pleasure is always mine. <br/> Anything else?",
    "wow": "I'm happy that you are amazed.",
}
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
function appendReply(reply,delay,message){
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        const typing = document.createElement("div");
        typing.className = "message-wrap__message typing";
        typing.innerHTML = "<div></div><div></div><div></div>"
        messageWrap.appendChild(typing);
        messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });
        setTimeout(()=>{
            messageWrap.lastChild.remove();
            const messageNode = document.createElement("div");
            messageNode.className = "message-wrap__message";
            messageNode.innerHTML = reply;
            messageWrap.appendChild(messageNode);
            messageWrap.scrollTo({left:0, top:messageWrap.scrollHeight, behavior:"smooth" });

            if(message){
                const key = message.toLowerCase();
                if(key === "yes"){
                    appendOptions([ "Are you real?", "Are you a bot?", "What's your name?", "how can i contact you?", "Where to download your cv?" ])
                }
                else if(key === "no"){
                    appendOptions()
                }
                else{
                    if(chatConversations[key]){
                        appendOptions([ "Yes", "No", "Ok", "Thanks" ]);
                    }
                    else if(chatGreetings[key]){
                        appendOptions([ "Where to download your CV?", "What are your contact details?", "Where can i see your projects?", "How's the weather?" ]);
                    }
                    else if(chatQuestions[key]){
                        appendOptions([ "Ok", "Thanks", "Great" ]);
                    }
                    else{
                        appendOptions([ "Yes", "No" ]);
                    }
                }
            }


        }, delay || 1000)
    }
}
function getReply(message){
    const replies = {
        ...chatQuestions,
        ...chatGreetings,
        ...chatLaughs,
        ...chatConversations,
    }
    const reply = replies[message.toLowerCase()];
    const messageWrap = document.querySelector(".message-wrap__messages");
    if(messageWrap){
        if(reply){
            if(reply === lastReply && chatQuestions[message.toLowerCase()]){
                appendReply("Hey haven't I just answered that?", 1000);
            }
            else{
                lastReply = reply;
                appendReply(reply, 1500, message);
            }
        }
        else{
            appendReply("Sorry I couldn't understand that. <br/> Do you want to ask anything else?", 1000, message);
        }
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