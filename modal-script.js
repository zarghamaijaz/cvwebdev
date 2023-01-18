function modalCloseFunctionality(){
    const modal = document.querySelector("#welcome-modal")
    const options = getOptions();
    if(modal){
        if (options.isShowModal) {
            modal.style.display = "grid";
        }
        const form = modal.querySelector(".modal-buttons");
        if(form){
            form.onsubmit = e => {
                e.preventDefault();
                const isSaveToDb = form.querySelector("input[type='checkbox']").checked;
                if (isSaveToDb) {
                    options.isShowModal = false;
                    setOptions(options);
                }
                modal.remove();
            }
        }
    }
}modalCloseFunctionality();