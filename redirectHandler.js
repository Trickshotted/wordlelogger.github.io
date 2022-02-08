function sleep(milisec) {
    return new Promise(resolve => {
    setTimeout(() => { resolve('') }, milisec);
    })
    }

function redirect(file){
    window.location.href = file
}
