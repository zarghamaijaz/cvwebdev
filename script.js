const storedOptions = localStorage.getItem("options");
if(!storedOptions){
    const options = {
        isDarkMode: false,
        isHelpEnabled: true,
        isNoteEnabled: true
    }
    localStorage.setItem("options", JSON.stringify(options));

}

function toggleHelp(){
    const tooltips = document.querySelectorAll(".navigation-wrap-info-tip");
    if(tooltips.length){
        tooltips.forEach(tooltip=>{
            const options = JSON.parse(localStorage.getItem("options"));
            if(options.isHelpEnabled){
                tooltip.style.display = "block";
            }
            const button = tooltip.querySelector(".tooltip-button");
            if(button){
                button.onclick = e => {
                    e.preventDefault();
                    const isEnabled = tooltip.style.display === "none" ? false : true;
                    const isSaveToLocalStorage = tooltip.querySelector("input[type='checkbox']").checked;
                    if(isSaveToLocalStorage){
                        options.isHelpEnabled = false;
                        localStorage.setItem("options", JSON.stringify(options));
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
                            sectionToEnable.style.display = "block";
                        }
                    }
                }
            })
        }
    }
}toggleNavigation();